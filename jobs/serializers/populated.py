from companies.serializers.common import CompanySerializer
from .common import JobSerializer

# user serializer will be used to populate owner field
from jwt_auth.serializers.common import UserSerializer


class PopulatedJobSerializer(JobSerializer):
    owner = UserSerializer()
