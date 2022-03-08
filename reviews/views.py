from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import ReviewSerializer
from .models import Review


class ReviewListView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        request.data["owner"] = request.user.id
        # request.user["owner"] = request.user.id
        serialized_review = ReviewSerializer(data=request.data)
        try:
            serialized_review.is_valid()
            serialized_review.save()
            return Response(serialized_review.data, status=status.HTTP_201_CREATED)
        except AssertionError as err:
            return Response(
                {"detail": str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        except:
            return Response(
                "Unprocessable entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )


class ReviewDetailedView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def delete(self, request, pk):
        print("USER =>", request.user.id)
        try:
            review_to_delete = Review.objects.get(pk=pk)
            if review_to_delete.owner != request.user:
                raise PermissionDenied(detail="Unauthorised")
            else:
                review_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Review.DoesNotExist:
            raise NotFound(detail="Review not found")
        except:
            return Response(
                {"detail": "Failed to delete review"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
