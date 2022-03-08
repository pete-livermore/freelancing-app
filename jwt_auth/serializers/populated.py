from jobs.serializers.populated import PopulatedJobSerializer
from skills.serializers.common import SkillSerializer
from experience.serializers.populated import PopulatedExperienceSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from .common import UserSerializer


class PopulatedUserSerializer(UserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = PopulatedJobSerializer(many=True)
    skills = SkillSerializer(many=True)
    experience = PopulatedExperienceSerializer(many=True)
    received_reviews = PopulatedReviewSerializer(many=True)
    given_reviews = PopulatedReviewSerializer(many=True)


class PopulatedAuthUserSerializer(PopulatedUserSerializer):
    created_jobs = PopulatedJobSerializer(many=True)
    jobs = PopulatedJobSerializer(many=True)
    skills = SkillSerializer(many=True)
    experience = PopulatedExperienceSerializer(many=True)
    received_reviews = PopulatedReviewSerializer(many=True)
    given_reviews = PopulatedReviewSerializer(many=True)
