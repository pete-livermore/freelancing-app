from jobs.serializers.common import JobSerializer
from jobs.serializers.populated import PopulatedJobSerializer
from .common import SkillSerializer, UserSerializer


class PopulatedUserSerializer(UserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = JobSerializer(many=True)
    skills = SkillSerializer(many=True)


class PopulatedAuthUserSerializer(PopulatedUserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = JobSerializer(many=True)
    skills = SkillSerializer(many=True)
