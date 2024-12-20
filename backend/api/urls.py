from django.urls import path
from . import views


urlpatterns = [
 path("products/", views.ProductListCreate.as_view(), name="product-list"),
    path("products/delete/<int:pk>/", views.ProductDelete.as_view(), name="delete-product"),
    path("products/update/<int:pk>/", views.ProductUpdate.as_view(), name="update-product"),  # New update route
    path('user-info/', views.UserInfoView.as_view(), name='user_info'),
]


