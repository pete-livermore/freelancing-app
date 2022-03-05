# Generated by Django 4.0.3 on 2022-03-05 16:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('companies', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='assigned_freelancer',
            field=models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='job',
            name='company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='posted_jobs', to='companies.company'),
        ),
        migrations.AddField(
            model_name='job',
            name='deliverables',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job', to='jobs.deliverable'),
        ),
        migrations.AddField(
            model_name='job',
            name='milestones',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job', to='jobs.milestone'),
        ),
        migrations.AddField(
            model_name='job',
            name='owner',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='created_jobs', to=settings.AUTH_USER_MODEL),
        ),
    ]
