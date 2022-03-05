from .common import CompanySerializer
from jobs.serializers.common import JobSerializer


class PopulatedCompanySerializer(CompanySerializer):
    posted_jobs = JobSerializer(many=True)
