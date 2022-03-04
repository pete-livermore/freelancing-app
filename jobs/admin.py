from django.contrib import admin
from .models import Deliverable, Job, Milestone

# Register your models here.
admin.site.register(Job)
admin.site.register(Deliverable)
admin.site.register(Milestone)
