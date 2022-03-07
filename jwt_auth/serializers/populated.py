from jobs.serializers.common import JobSerializer
from jobs.serializers.populated import PopulatedJobSerializer
from skills.serializers.common import SkillSerializer
from experience.serializers.populated import PopulatedExperienceSerializer
from .common import UserSerializer


class PopulatedUserSerializer(UserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = JobSerializer(many=True)
    skills = SkillSerializer(many=True)
    experience = PopulatedExperienceSerializer(many=True)


class PopulatedAuthUserSerializer(PopulatedUserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = JobSerializer(many=True)
    skills = SkillSerializer(many=True)
    experience = PopulatedExperienceSerializer(many=True)
