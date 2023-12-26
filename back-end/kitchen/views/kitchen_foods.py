from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from kitchen.pagination import StandardResultsSetPagination
from authen.renderers import UserRenderers
from foods.models import Foods
from kitchen.serializer.food_serializers import KitchenFoodsSerializers


class KitchenFoodsView(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["name", "categories", "kitchen", "price"]

    @property
    def paginator(self):
        if self._paginator is None:
            if self.pagination_class is not None:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(self.request, view=self)

    def get_paginated_response(self, data):
        if self.paginator is None:
            raise AssertionError("Paginator is not set.")
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
            serializer = self.get_paginated_response({"results": self.serializer_class( page, many=True, context={"request": request}).data, "count": queryset.count()})
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class KitchenFoodView(APIView):
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers

    @property
    def paginator(self):
        if self._paginator is None:
            if self.pagination_class is not None:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(self.request, view=self)

    def get_paginated_response(self, data):
        if self.paginator is None:
            raise AssertionError("Paginator is not set.")
        return self.paginator.get_paginated_response(data)

    def get(self, request, pk, format=None, *args, **kwargs):
        instance = Foods.objects.filter(kitchen=pk)
        page = self.paginate_queryset(instance)

        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True, context={'user': request.user.id, "request": request}).data)
        else:
            serializer = self.serializer_class(instance, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)


class KitchenCategoryFoodsView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    serializer_class = KitchenFoodsSerializers

    @property
    def paginator(self):
        if self._paginator is None:
            if self.pagination_class is not None:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(self.request, view=self)

    def get_paginated_response(self, data):
        if self.paginator is None:
            raise AssertionError("Paginator is not set.")
        return self.paginator.get_paginated_response(data)

    def get(self, request, id_category, pk, format=None, *args, **kwargs):
        queryset = Foods.objects.filter(categories=id_category, kitchen=pk)
        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_paginated_response(self.serializer_class(page, many=True, context={'user': request.user.id, "request": request}).data)
        else:
            serializer = self.serializer_class(queryset, many=True)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
