from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()


# ================= REGISTER =================
@api_view(["POST"])
def register(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not email or not password:
        return Response({"message": "All fields are required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already exists"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"message": "Email already exists"}, status=400)

    # 🔥 FORCE BUYER ROLE (IMPORTANT FOR SAAS SECURITY)
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    user.role = "buyer"
    user.save()

    return Response({
        "message": "User created successfully",
        "role": user.role
    }, status=201)


# ================= LOGIN =================
@api_view(["POST"])
def login(request):

    email = request.data.get("email")
    password = request.data.get("password")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"message": "Invalid email or password"}, status=401)

    if not user.check_password(password):
        return Response({"message": "Invalid email or password"}, status=401)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),

        # 🔥 SAAS USER INFO
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,   # ✅ IMPORTANT FIX
        }
    })