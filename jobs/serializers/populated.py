from .common import JobSerializer, MilestoneSerializer, DeliverableSerializer

# user serializer will be used to populate owner field
from jwt_auth.serializers.common import UserSerializer


class PopulatedJobSerializer(JobSerializer):
    owner = UserSerializer()
    milestones = MilestoneSerializer(many=True)
    deliverables = DeliverableSerializer(many=True)
