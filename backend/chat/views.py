import os

from google import genai
from google.genai import errors as genai_errors
from google.genai import types
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from users.permissions import IsAdminRole

from .models import ChatMessage, ChatSession
from .serializers import ChatSessionListSerializer, ChatSessionSerializer

SYSTEM_PROMPT = """You are the customer support assistant for Bhumipun, a real estate company \
(presented by J and R Company) dealing in land and property in Gujarat, India.

You help visitors with:
- Buying, selling, or renting residential, commercial, and agricultural properties
- Land Survey & Measurement services
- Land Documentation & 7/12 record services
- Legal Assistance & Land Dispute Resolution
- Government Land Services
- N.A. (Non-Agricultural) Land Conversion
- Investment & Property Consultation
- Land Against Finance (loans against land)
- PMC (Project Management Consultancy) Services
- Property Alerts

Guidelines:
- Be concise, friendly, and helpful.
- Direct users to the relevant service form under the Services section for anything requiring \
a formal submission (survey number, documents, etc.) — you cannot submit forms on their behalf.
- Never invent specific property listings, prices, or availability you don't actually have \
access to — tell the user to check the Properties page or contact the team instead.
- For anything you're not confident about (legal advice, exact fees, document specifics), \
recommend they submit the relevant service form or contact the team directly so a human can help.
- Keep responses short — a few sentences, not an essay — unless the user asks for detail."""


GEMINI_MODEL = "gemini-flash-latest"


def _call_gemini(history):
    client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

    contents = [
        types.Content(
            role="model" if m["role"] == "assistant" else "user",
            parts=[types.Part(text=m["content"])],
        )
        for m in history
    ]

    response = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=contents,
        config=types.GenerateContentConfig(system_instruction=SYSTEM_PROMPT),
    )

    if not response.text:
        return "Sorry, I couldn't generate a response. Please try again."
    return response.text


class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        message = (request.data.get("message") or "").strip()
        session_id = request.data.get("session_id")

        if not message:
            return Response({"detail": "Message is required."}, status=status.HTTP_400_BAD_REQUEST)

        if session_id:
            session = ChatSession.objects.filter(id=session_id, user=request.user).first()
            if not session:
                return Response({"detail": "Session not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            session = ChatSession.objects.create(user=request.user)

        ChatMessage.objects.create(session=session, role="user", content=message)

        history = [
            {"role": m.role, "content": m.content}
            for m in session.messages.all()
        ]

        try:
            reply = _call_gemini(history)
        except (genai_errors.APIError, ValueError) as exc:
            return Response(
                {"detail": f"Chat service is unavailable right now: {exc}"},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        ChatMessage.objects.create(session=session, role="assistant", content=reply)
        session.save(update_fields=["updated_at"])

        return Response({"session_id": session.id, "reply": reply})


class ChatSessionViewSet(viewsets.ReadOnlyModelViewSet):
    """Admin-only: view all customer chat transcripts."""

    queryset = ChatSession.objects.select_related("user").prefetch_related("messages")
    permission_classes = [IsAdminRole]

    def get_serializer_class(self):
        if self.action == "list":
            return ChatSessionListSerializer
        return ChatSessionSerializer
