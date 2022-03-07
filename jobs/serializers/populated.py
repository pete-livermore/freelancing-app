from companies.serializers.common import CompanySerializer
from sectors.serializers.common import SectorSerializer
from .common import JobSerializer, DeliverableSerializer, MilestoneSerializer

# user serializer will be used to populate owner field
from jwt_auth.serializers.common import UserSerializer


class PopulatedJobSerializer(JobSerializer):
    owner = UserSerializer()
    deliverables = DeliverableSerializer(many=True)
    milestones = MilestoneSerializer(many=True)
    company = CompanySerializer()
    sector = SectorSerializer(many=True)
