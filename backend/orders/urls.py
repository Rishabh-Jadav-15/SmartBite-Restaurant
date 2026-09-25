from django.urls import path
from .views import(
    OrderListView,
    OrderDetailView,
    OrderItemListView,
    OrderItemDetailView,
    PaymentListView,
    PaymentDetailView,
)

urlpatterns = [
    path("",OrderListView.as_view(),name="order-list"),
    path("<int:pk>/",OrderDetailView.as_view(),name="order-detail"),
    path("items/",OrderItemListView.as_view(),name="order-item-list"),
    path("items/<int:pk>/",OrderItemDetailView.as_view(),name="order-item-detail"),
    path("payments/",PaymentListView.as_view(),name="payment-list"),
    path("payments/<int:pk>/",PaymentDetailView.as_view(),name="payment-detail"),

]