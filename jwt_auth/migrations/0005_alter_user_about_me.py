# Generated by Django 4.0.3 on 2022-03-11 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0004_user_personal_website'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='about_me',
            field=models.TextField(blank=True, max_length=800),
        ),
    ]
