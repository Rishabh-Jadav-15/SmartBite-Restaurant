from django.contrib import admin
from .models import (
    Category,
    MenuItem,
    Ingredient,
    MenuItemIngredient,
    Inventory
)

# Register your models here.
# admin.site.register(Category)
# admin.site.register(MenuItem)
# admin.site.register(Ingredient)
# admin.site.register(MenuItemIngredient)
# admin.site.register(Inventory)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name","description")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):
    list_display = ("name","category","price","health_rating","is_available")
    search_fields = ("name","category__name")
    list_filter = ("category", "is_available", "health_rating")
    ordering = ("name",)


@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ("name", "unit", "cost_per_unit")
    search_fields = ("name",)
    ordering = ("name",)


@admin.register(MenuItemIngredient)
class MenuItemIngredientAdmin(admin.ModelAdmin):
    list_display = (
        "menu_item",
        "ingredient",
        "quantity_required",
        "unit",
    )
    search_fields = ("menu_item__name", "ingredient__name")
    list_filter = ("unit",)
    ordering = ("menu_item", "ingredient")


@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = (
        "ingredient",
        "quantity",
        "minimum_stock",
    )
    search_fields = ("ingredient__name",)
    ordering = ("ingredient",)