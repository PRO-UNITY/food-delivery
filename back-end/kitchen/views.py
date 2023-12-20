from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from django.shortcuts import get_object_or_404
from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from authen.renderers import UserRenderers
from authen.models import KitchenUser, KitchenLike, CustomUser
from kitchen.models import KitchenFoods
from foods.models import FoodsCategories, Foods
from foods.serializers import AllCategoriesFoodsSerializer
from kitchen.serializers import (
    UserInformationSerializers,
    AllKitchenSerializers,
    KitchenCrudSerializers,
    AllFoodKitchenSerializers,
    KitchenUserWithCounterSerializer,
    FoodKitchenCrudSerializers,
    DeliveryChickenSerializers,
    CategoriesFoodsCrudSerializer,
)


class KitchenCreateViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = AllKitchenSerializers

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        instance = KitchenUser.objects.all()
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

    @extend_schema(
        request=KitchenCrudSerializers,
        responses={201: KitchenCrudSerializers},
    )
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(
                [
                    "name",
                    "logo",
                    "description",
                    "user",
                    "is_active",
                    "open_time",
                    "close_time",
                    "latitude",
                    "longitude",
                ]
            )
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = KitchenCrudSerializers(
                data=request.data,
                context={
                    "user": request.user,
                },
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save(logo=request.data.get("logo"))
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class KitchenLikeViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = KitchenUser.objects.filter(id=pk)[0]
        like_litchen = KitchenLike.objects.filter(id_kitchen=objects_list)[0]
        like_litchen.lik = like_litchen.lik + 1
        like_litchen.user_id = request.user
        like_litchen.is_active = True
        like_litchen.id_kitchen = objects_list
        like_litchen.save()
        return Response({"like"}, status=status.HTTP_200_OK)


class KitchenCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = get_object_or_404(KitchenUser, id=pk)
        serializers = AllKitchenSerializers(objects_list)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=KitchenCrudSerializers,
        responses={201: KitchenCrudSerializers},
    )
    def put(self, request, pk):
        if request.user.is_authenticated:
            expected_fields = set(
                [
                    "name",
                    "logo",
                    "description",
                    "user_id",
                    "is_active",
                    "open_time",
                    "close_time",
                    "latitude",
                    "longitude",
                ]
            )
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = KitchenCrudSerializers(
                context={
                    "user": request.user,
                },
                instance=KitchenUser.objects.filter(id=pk)[0],
                data=request.data,
                partial=True,
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save(logo=request.data.get("logo"))
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(
                {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def delete(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "manager":
                    objects_get = KitchenUser.objects.get(id=pk)
                    objects_get.delete()
                    return Response(
                        {"message": "Delete success"}, status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {
                            "error": "It is not possible to add information to such a user"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            return Response(
                {"error": "User does not belong to any role"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class AllKitchenViews(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenUserWithCounterSerializer

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        instance = KitchenUser.objects.all()
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class KitchenIsActiveViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = KitchenUser.objects.filter(is_active=True, user_id=request.user)
        serializers = AllKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class KitchenCategoriesViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = FoodsCategories.objects.filter(kitchen_id=pk)
        serializers = AllCategoriesFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class KitchenFoodsViews(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = AllFoodKitchenSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "categories", "kitchen", "price"]

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        search_category = request.query_params.get("category", None)
        search_restaurant = request.query_params.get("restaurant", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Foods.objects.all()

        if search_category:
            queryset = queryset.filter(Q(categories__id__icontains=search_category))

        if search_restaurant:
            queryset = queryset.filter(Q(restaurant__id__icontains=search_restaurant))

        if sort_by == "price_asc":
            queryset = queryset.order_by("id")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-id")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_paginated_response({
                "results": self.serializer_class(page, many=True).data,
                "count": queryset.count()
            })
        else:
            serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class KitchenFoodsCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = KitchenFoods.objects.filter(id=pk)
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=FoodKitchenCrudSerializers,
        responses={201: FoodKitchenCrudSerializers},
    )
    def put(self, request, pk):
        serializers = FoodKitchenCrudSerializers(
            instance=KitchenFoods.objects.filter(id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save(categor_img=request.data.get("categor_img"))
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        objects_get = KitchenFoods.objects.get(id=pk)
        objects_get.delete()
        return Response({"message": "Delete success"}, status=status.HTTP_200_OK)


class AllKitchenFood(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = AllFoodKitchenSerializers

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk, format=None, *args, **kwargs):
        instance = Foods.objects.filter(kitchen=pk)
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class CategoryFood(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = AllFoodKitchenSerializers

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        else:
            pass
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk, format=None, *args, **kwargs):
        instance = Foods.objects.filter(categories=pk)
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class DeteileKitchenFood(APIView):
    def get(self, request, pk):
        objects_list = KitchenFoods.objects.filter(user_id=pk)
        serializers = AllFoodKitchenSerializers(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class ManagerKitchenCreateViews(APIView):
    """Change manager information and status"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        object_list = KitchenUser.objects.filter(id=pk)
        queryset = CustomUser.objects.filter(
            delivery__isnull=True,
            groups__name__in=["manager"],
            user_id=request.user.id,
            active_profile=True,
        )
        serializer = DeliveryChickenSerializers(object_list, many=True)
        no_active_delivery = UserInformationSerializers(queryset, many=True)
        return Response(
            {"delivery": serializer.data, "no_active": no_active_delivery.data},
            status=status.HTTP_200_OK,
        )

    @extend_schema(
        request=DeliveryChickenSerializers,
        responses={201: DeliveryChickenSerializers},
    )
    def put(self, request, pk):
        serializers = DeliveryChickenSerializers(
            instance=KitchenUser.objects.filter(id=pk)[0],
            data=request.data,
            partial=True,
        )
        if serializers.is_valid(raise_exception=True):
            serializers.save()
            return Response(serializers.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )


class KitchenCategoryViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(categories=pk)
        serializers = AllCategoriesFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class CategoriesKitchenViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = FoodsCategories.objects.all()
        serializers = AllCategoriesFoodsSerializer(objects_list, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=CategoriesFoodsCrudSerializer,
        responses={201: CategoriesFoodsCrudSerializer},
    )
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(["name", "kitchen", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = CategoriesFoodsCrudSerializer(
                data=request.data,
                context={
                    "user_id": request.user,
                },
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_201_CREATED)
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class CategoriesCrudViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = get_object_or_404(FoodsCategories, id=pk)
        serializers = AllCategoriesFoodsSerializer(objects_list)
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=CategoriesFoodsCrudSerializer,
        responses={201: CategoriesFoodsCrudSerializer},
    )
    def put(self, request, pk):
        if request.user.is_authenticated:
            expected_fields = set(["name", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
                )
            serializers = CategoriesFoodsCrudSerializer(
                context={
                    "user_id": request.user,
                },
                instance=FoodsCategories.objects.filter(id=pk)[0],
                data=request.data,
                partial=True,
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(
                {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

    def delete(self, request, pk):
        if request.user.is_authenticated:
            user_get = request.user
            groups = user_get.groups.all()
            if groups:
                if str(groups[0]) == "admins":
                    objects_get = FoodsCategories.objects.get(id=pk)
                    objects_get.delete()
                    return Response(
                        {"message": "Delete success"}, status=status.HTTP_200_OK
                    )
                else:
                    return Response(
                        {
                            "error": "It is not possible to add information to such a user"
                        },
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            return Response(
                {"error": "User does not belong to any role"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
