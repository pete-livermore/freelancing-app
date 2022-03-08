from companies.serializers.populated import PopulatedCompanySerializer
from sectors.serializers.common import SectorSerializer
from .common import JobSerializer, DeliverableSerializer, MilestoneSerializer

# user serializer will be used to populate owner field
from jwt_auth.serializers.common import UserSerializer


class PopulatedJobSerializer(JobSerializer):
    owner = UserSerializer()
    deliverables = DeliverableSerializer(many=True)
    milestones = MilestoneSerializer(many=True)
    company = PopulatedCompanySerializer()
    sector = SectorSerializer(many=True)
