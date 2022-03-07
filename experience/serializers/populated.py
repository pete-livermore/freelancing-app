from .common import ExperienceSerializer
from companies.serializers.common import CompanySerializer


class PopulatedExperienceSerializer(ExperienceSerializer):
    company_name = CompanySerializer()
