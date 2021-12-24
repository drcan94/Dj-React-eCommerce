from django.urls import path
from . import views

urlpatterns = [
    path('user/register/', views.registerUser, name="register"),
    path('user/login', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('products/', views.getProducts, name="products"),
    path('user/profile', views.getUserProfile, name="user-profile"),
    path('users', views.getAllUsers, name="users"),
    path('products/<str:pk>/', views.getProduct, name="product"),
]
