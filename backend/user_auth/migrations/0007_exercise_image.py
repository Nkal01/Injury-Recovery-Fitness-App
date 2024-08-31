# Generated by Django 4.2.8 on 2024-08-01 15:30

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0006_exercise'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='exercise_images/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])]),
        ),
    ]
