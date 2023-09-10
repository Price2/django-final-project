from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('shop', views.products, name='products'),
    path('checkout', views.checkout, name='checkout'),
    path('thanks', views.thanks, name='thanks'),
    path('order/success', views.place_order, name='place_order'),

    # Add more URL patterns for the other app here...
]