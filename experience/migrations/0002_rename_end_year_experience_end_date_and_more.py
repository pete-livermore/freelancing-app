# Generated by Django 4.0.3 on 2022-03-11 11:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('experience', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='experience',
            old_name='end_year',
            new_name='end_date',
        ),
        migrations.RenameField(
            model_name='experience',
            old_name='start_year',
            new_name='start_date',
        ),
    ]
