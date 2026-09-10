from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,CustomerProfile, StaffProfile


# Register your models here.
# admin.site.register(User)
# admin.site.register(CustomerProfile)
# admin.site.register(StaffProfile)

@admin.register(User)
class CustomerUserAdmin(UserAdmin):
    list_display = ("name","email","phone","role","is_active","is_staff")
    search_fields = ("name","email","phone")
    list_filter = ("role","is_active","is_staff")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields":("email","password")}),
        ("Personal Information", {"fields":("name","phone","role")}),
        ("Permissions", {"fields":("is_active","is_staff","is_superuser","groups","user_permissions")}),
        ("Important Dates",{"fields":("last_login","date_joined")}),   
    )

    add_fieldsets = (
        (None,{
            "classes":("wide",),
            "fields":("email","name","phone","role","password1","password2"),
        }),
    )

    readonly_fields = ("last_login","date_joined")


@admin.register(CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    list_display = ("user","gender","date_of_birth","created_at")
    search_fields = ("user__name","user__email")
    list_filter = ("gender",)
    ordering = ("-created_at",)
    readonly_fields = ("created_at",)


@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    list_display = ("employee_id", "user", "department", "designation", "joining_date")
    search_fields = ("employee_id", "user__name", "user__email")
    list_filter = ("department", "designation")
    ordering = ("employee_id",)
    readonly_fields = ("created_at",)