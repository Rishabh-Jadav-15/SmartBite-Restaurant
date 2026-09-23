from django.urls import path

from .views import (
    RestaurantTableListView,
    RestaurantTableDetailView,
)


urlpatterns = [
    path(
        "tables/",
        RestaurantTableListView.as_view(),
        name="restaurant-table-list",
    ),
    path(
        "tables/<int:pk>/",
        RestaurantTableDetailView.as_view(),
        name="restaurant-table-detail",
    ),
]