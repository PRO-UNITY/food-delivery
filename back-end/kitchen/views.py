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
from kitchen.models import Restaurants
from foods.models import FoodsCategories, Foods
from foods.serializers import (
    CategoriesSerializer,
    AllCategoriesFoodsSerializer,
)
from kitchen.serializers import (
    AllKitchenSerializers,
    KitchenCrudSerializers,
    AllFoodKitchenSerializers,
    CategoriesFoodsCrudSerializer,
    KitchenKategorySerializers,
    
)


class KitchenViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = AllKitchenSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "description", "is_active", "open_time", "close_time"]

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
        return self.paginator.paginate_queryset(
            queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        search_name = request.query_params.get("name", None)
        search_description = request.query_params.get(" ", None)
        search_is_active = request.query_params.get("is_active", None)
        search_open = request.query_params.get("open_time", None)
        price_close = request.query_params.get("close_time", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Restaurants.objects.all()

        if search_name:
            queryset = queryset.filter(Q(name__icontains=search_name))

        if search_is_active:
            queryset = queryset.filter(
                Q(is_active=search_is_active))

        if search_open:
            queryset = queryset.filter(
                Q(open_time__gte=search_open)
            )

        if price_close:
            queryset = queryset.filter(
                Q(close_time__lte=price_close)
            )

        if search_description:
            queryset = queryset.filter(Q(description__icontains=search_description))

        if sort_by == "asc":
            queryset = queryset.order_by("id")
        elif sort_by == "desc":
            queryset = queryset.order_by("-id")
        page = self.paginate_queryset(queryset)
        if page is not None:    
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True, context={'request':request}).data
            )
        else:
            serializer = self.serializer_class(queryset, many=True)
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
                    {"error": error_message},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializers = KitchenCrudSerializers(
                data=request.data,
                context={
                    "user": request.user,
                },
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save(logo=request.data.get("logo"))
                return Response(
                    serializers.data, status=status.HTTP_201_CREATED)
            return Response(
                serializers.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class KitchenDetileViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = get_object_or_404(Restaurants, id=pk)
        serializers = AllKitchenSerializers(objects_list, context={"request": request})
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
                    {"error": error_message},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializers = KitchenCrudSerializers(
                context={
                    "request": request,
                    "user": request.user,
                },
                instance=Restaurants.objects.filter(id=pk)[0],
                data=request.data,
                partial=True,
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save(logo=request.data.get("logo"))
                return Response(serializers.data, status=status.HTTP_200_OK)
            return Response(
                {"error": "update error data"},
                status=status.HTTP_400_BAD_REQUEST
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
                    objects_get = Restaurants.objects.get(id=pk)
                    objects_get.delete()
                    return Response(
                        {"message": "Delete success"},
                        status=status.HTTP_200_OK
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


class KitchenCategoryFoodsViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, pk):
        objects_list = Foods.objects.filter(categories=pk)
        serializers = KitchenKategorySerializers(objects_list, many=True, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)


class KitchenCategoryViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        objects_list = FoodsCategories.objects.all()
        serializers = CategoriesSerializer(objects_list, many=True, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=CategoriesFoodsCrudSerializer,
        responses={201: CategoriesFoodsCrudSerializer},
    )
    def post(self, request):
        if request.user.is_authenticated:
            expected_fields = set(["name", "create_at", "updated_at"])
            received_fields = set(request.data.keys())

            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (
                    f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
                )
                return Response(
                    {"error": error_message},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializers = CategoriesFoodsCrudSerializer(
                data=request.data,
                context={
                    "user_id": request.user,
                },
            )
            if serializers.is_valid(raise_exception=True):
                serializers.save()
                return Response(serializers.data,
                                status=status.HTTP_201_CREATED)
            return Response(serializers.errors,
                            status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(
                {"error": "The user is not logged in"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class CategoryDeteileViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = AllFoodKitchenSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "kitchen"]

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
        return self.paginator.paginate_queryset(
            queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk, format=None, *args, **kwargs):
        search_name = request.query_params.get("q", None)
        search_restaurant = request.query_params.get("restaurant", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Foods.objects.filter(categories=pk)

        if search_name:
            queryset = queryset.filter(Q(name__icontains=search_name))

        if search_restaurant:
            queryset = queryset.filter(
                Q(restaurant__id__icontains=search_restaurant))

        if sort_by == "asc":
            queryset = queryset.order_by("price")
        elif sort_by == "desc":
            queryset = queryset.order_by("-price")
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True, context={"request": request}).data
            )
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)

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
                    {"error": error_message},
                    status=status.HTTP_400_BAD_REQUEST
                )
            serializers = CategoriesFoodsCrudSerializer(
                context={
                    "request": request,
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
                {"error": "update error data"},
                status=status.HTTP_400_BAD_REQUEST
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
                        {"message": "Delete success"},
                        status=status.HTTP_200_OK
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
        return self.paginator.paginate_queryset(
            queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, format=None, *args, **kwargs):
        search_category = request.query_params.get("category", None)
        search_restaurant = request.query_params.get("restaurant", None)
        sort_by = request.query_params.get("sort", None)
        queryset = Foods.objects.all()

        if search_category:
            queryset = queryset.filter(
                Q(categories__id__icontains=search_category)
            )

        if search_restaurant:
            queryset = queryset.filter(
                Q(restaurant__id__icontains=search_restaurant))

        if sort_by == "price_asc":
            queryset = queryset.order_by("id")
        elif sort_by == "price_desc":
            queryset = queryset.order_by("-id")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_paginated_response(
                {
                    "results": self.serializer_class(page, many=True, context={"request": request}).data,
                    "count": queryset.count(),
                }
            )
        else:
            serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class KitchenFoods(APIView):
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
        return self.paginator.paginate_queryset(
            queryset, self.request, view=self)

    def get_paginated_response(self, data):
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk, format=None, *args, **kwargs):
        instance = Foods.objects.filter(kitchen=pk)
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_paginated_response(
                self.serializer_class(page, many=True, context={"request": request}).data
            )
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class KitchenCategoryFoodViews(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request, id_category, pk):
        objects_list = get_object_or_404(Foods, categories=id_category, id=pk)
        serializers = AllFoodKitchenSerializers(objects_list, context={"request": request})
        return Response(serializers.data, status=status.HTTP_200_OK)
