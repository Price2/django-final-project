from django.test import TestCase, Client
from users.models import Customer
from users.forms import CustomerForm
from users.views import register
from django.urls import reverse
from phonenumbers import parse, format_number, PhoneNumberFormat



# The RegisterViewTestCase class contains test methods to verify the functionality of the register
# view in a Django application.
class RegisterViewTestCase(TestCase):
    def setUp(self):
        self.client = Client()
    
    def test_register_valid_form(self):
        phone_number_string = '+12125552368'  # Replace with your actual phone number
        parsed_phone_number = parse(phone_number_string, None)
        formatted_phone_number = format_number(parsed_phone_number, PhoneNumberFormat.E164)

        # Prepare valid form data
        form_data = {
            'username': 'testuser',
            'password': 'testpassword',
            'email': 'test@example.com',  # Add the email field
            'phone': formatted_phone_number,
            'address': '123 Main St',
        }

        # Send a POST request with valid form data to the register view
        response = self.client.post(reverse('register'), form_data, follow=True)
        print("response ", response)
        # Check the response status code and content
        self.assertEqual(response.status_code, 200)  # Expect a successful registration

        # Check that a customer was created in the database
        self.assertEqual(Customer.objects.count(), 1)

        # Check the customer's attributes
        customer = Customer.objects.first()
        self.assertEqual(customer.username, 'testuser')
        self.assertEqual(customer.email, 'test@example.com')
        self.assertEqual(customer.phone, formatted_phone_number)
        self.assertEqual(customer.address, '123 Main St')

        # Check that the registration form is empty after successful registration
        self.assertIsInstance(response.context['form'], CustomerForm)
        self.assertTrue(response.context['form'].is_bound)
        self.assertFalse(response.context['form'].errors)

    def test_register_invalid_form(self):
        # Prepare invalid form data (missing required email)
        form_data = {
            'username': 'testuser',
            'password': 'testpassword',
             'phone': '+12125552368',
            'address': '123 Main St',
        }

        # Send a POST request with invalid form data to the register view
        response = self.client.post(reverse('register'), form_data)

        # Check the response status code and content
        self.assertEqual(response.status_code, 200)  # Expect a re-render of the registration form

        # Check that no customer was created in the database
        self.assertEqual(Customer.objects.count(), 0)

        # Check that the registration form contains errors
        self.assertIsInstance(response.context['form'], CustomerForm)
        self.assertTrue(response.context['form'].is_bound)
        self.assertTrue(response.context['form'].errors)

    def tearDown(self):
        Customer.objects.all().delete()
