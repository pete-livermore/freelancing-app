from rest_framework import serializers
from ..models import Sector


class SectorSerializer(serializers.ModelSerializer):
    class Meta():
        model = Sector
        fields = '__all__'
