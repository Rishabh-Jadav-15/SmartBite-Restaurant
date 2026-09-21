from django.urls import path

from .views import (
    CategoryListView,
    CategoryDetailView,
    MenuItemListView,
    MenuItemDetailView,
    IngredientListView,
    IngredientDetailView,
    MenuItemIngredientListView,
    MenuItemIngredientDetailView,
    InventoryListView,
    InventoryDetailView,
)


urlpatterns = [
    path(
        "categories/",
        CategoryListView.as_view(),
        name="category-list",
    ),
    path(
        "categories/<int:pk>/",
        CategoryDetailView.as_view(),
        name="category-detail",
    ),

    path(
        "items/",
        MenuItemListView.as_view(),
        name="menu-item-list",
    ),
    path(
        "items/<int:pk>/",
        MenuItemDetailView.as_view(),
        name="menu-item-detail",
    ),

    path(
        "ingredients/",
        IngredientListView.as_view(),
        name="ingredient-list",
    ),
    path(
        "ingredients/<int:pk>/",
        IngredientDetailView.as_view(),
        name="ingredient-detail",
    ),

    path(
        "menu-item-ingredients/",
        MenuItemIngredientListView.as_view(),
        name="menu-item-ingredient-list",
    ),
    path(
        "menu-item-ingredients/<int:pk>/",
        MenuItemIngredientDetailView.as_view(),
        name="menu-item-ingredient-detail",
    ),

    path(
        "inventory/",
        InventoryListView.as_view(),
        name="inventory-list",
    ),
    path(
        "inventory/<int:pk>/",
        InventoryDetailView.as_view(),
        name="inventory-detail",
    ),
]