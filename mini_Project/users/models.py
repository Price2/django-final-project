from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.utils import timezone
from phonenumber_field.modelfields import PhoneNumberField


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
    username = models.CharField(
        max_length=150,
        unique=False,
        blank=True,  # Allow an empty username
        null=True    # Allow NULL for the username in the database
    )
    email = models.EmailField(error_messages={'unique': 'A user with that email already exists.'}, unique=True, max_length=254, verbose_name='email address')
    # phone = models.CharField(max_length=20, blank=True, null=True)
    phone = PhoneNumberField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='customer_users')
    user_permissions = models.ManyToManyField(Permission, related_name='customer_users')
    def __str__(self):
        return self.email
