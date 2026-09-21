from rest_framework import generics

from .models import (
    Category,
    MenuItem,
    Ingredient,
    MenuItemIngredient,
    Inventory,
)

from .serializers import (
    CategorySerializer,
    MenuItemSerializer,
    IngredientSerializer,
    MenuItemIngredientSerializer,
    InventorySerializer,
)


class CategoryListView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class MenuItemListView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.select_related("category").all()
    serializer_class = MenuItemSerializer


class MenuItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.select_related("category").all()
    serializer_class = MenuItemSerializer


class IngredientListView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class IngredientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class MenuItemIngredientListView(generics.ListCreateAPIView):
    queryset = MenuItemIngredient.objects.select_related(
        "menu_item",
        "ingredient",
    ).all()
    serializer_class = MenuItemIngredientSerializer


class MenuItemIngredientDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItemIngredient.objects.select_related(
        "menu_item",
        "ingredient",
    ).all()
    serializer_class = MenuItemIngredientSerializer


class InventoryListView(generics.ListCreateAPIView):
    queryset = Inventory.objects.select_related("ingredient").all()
    serializer_class = InventorySerializer


class InventoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.select_related("ingredient").all()
    serializer_class = InventorySerializer