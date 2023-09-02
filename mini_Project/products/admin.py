from django.contrib import admin
from .models import Category, Order, OrderDetails, Product

admin.site.register(Category)
admin.site.register(Order)
admin.site.register(OrderDetails)
admin.site.register(Product)