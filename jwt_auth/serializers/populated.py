from jobs.serializers.populated import PopulatedJobSerializer
from .common import UserSerializer


class PopulatedUserSerializer(UserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
