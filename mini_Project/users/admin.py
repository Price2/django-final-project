from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Admin, Customer


admin.site.register(Admin, UserAdmin)
admin.site.register(Customer)
