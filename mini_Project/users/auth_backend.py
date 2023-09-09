from django.contrib.auth.backends import ModelBackend
from .models import Customer  # Import your Customer model

class CustomerAuthenticationBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        print("im being called")
        try:
            customer = Customer.objects.get(email=username, is_active=True)
        except Customer.DoesNotExist:
            return None

        if customer.check_password(password):
            return customer

    def get_user(self, user_id):
        try:
            return Customer.objects.get(pk=user_id)
        except Customer.DoesNotExist:
            return None
