from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils import timezone


class Admin(AbstractUser):
    class Meta:
        verbose_name_plural = 'Admin'
    job_title = models.CharField(max_length=100, default='')
    hire_date = models.DateField(default=timezone.now)
    groups = models.ManyToManyField(Group, related_name='admin_users')
    user_permissions = models.ManyToManyField(Permission, related_name='admin_users')

    def __str__(self):
        return self.username

class Customer(AbstractUser):
    class Meta:
        verbose_name_plural = 'Customer'
    phone = models.CharField(max_length=20)
    address = models.TextField()
    groups = models.ManyToManyField(Group, related_name='customer_users')
    user_permissions = models.ManyToManyField(Permission, related_name='customer_users')
    def __str__(self):
        return self.username
