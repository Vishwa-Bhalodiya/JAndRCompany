import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('properties', '0006_property_latitude_property_longitude'),
    ]

    operations = [
        migrations.AddField(
            model_name='propertydocument',
            name='status',
            field=models.CharField(
                choices=[('pending', 'Pending'), ('verified', 'Verified'), ('rejected', 'Rejected')],
                default='pending',
                max_length=10,
            ),
        ),
        migrations.AddField(
            model_name='propertydocument',
            name='rejection_reason',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AddField(
            model_name='propertydocument',
            name='verified_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='propertydocument',
            name='uploaded_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='propertydocument',
            name='verified_by',
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='verified_documents',
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
