# Generated by Django 4.2.8 on 2024-06-07 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_auth', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='has_plan',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
