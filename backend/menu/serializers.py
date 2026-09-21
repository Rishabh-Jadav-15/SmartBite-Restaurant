from rest_framework import serializers
from .models import (
    Category,
    MenuItem,
    Ingredient,
    MenuItemIngredient,
    Inventory,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class MenuItemSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )

    class Meta:
        model = MenuItem
        fields = [
            "id",
            "category",
            "category_name",
            "name",
            "description",
            "price",
            "calories",
            "protein",
            "carbohydrates",
            "sugar",
            "fat",
            "health_rating",
            "is_available",
        ]


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class MenuItemIngredientSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(
        source="menu_item.name",
        read_only=True
    )

    ingredient_name = serializers.CharField(
        source="ingredient.name",
        read_only=True
    )

    class Meta:
        model = MenuItemIngredient
        fields = [
            "id",
            "menu_item",
            "menu_item_name",
            "ingredient",
            "ingredient_name",
            "quantity_required",
            "unit",
        ]


class InventorySerializer(serializers.ModelSerializer):
    ingredient_name = serializers.CharField(
        source="ingredient.name",
        read_only=True
    )

    class Meta:
        model = Inventory
        fields = [
            "id",
            "ingredient",
            "ingredient_name",
            "quantity",
            "minimum_stock",
        ]