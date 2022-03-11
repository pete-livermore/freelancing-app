from experience.serializers.common import ExperienceSerializer
from sectors.serializers.common import SectorSerializer
from .common import CompanySerializer
from jobs.serializers.common import JobSerializer


class PopulatedCompanySerializer(CompanySerializer):
    posted_jobs = JobSerializer(many=True)
    sector = SectorSerializer(many=True)
    past_employees = ExperienceSerializer(many=True)
