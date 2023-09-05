from django.test import TestCase, Client
from users.models import Customer
from users.forms import CustomerForm
from users.views import register
from django.urls import reverse


# The LoginViewTestCase class tests the login functionality of a Django view using valid credentials.
class LoginViewTestCase(TestCase):
    def setUp(self):
        # Create a test client and a test Customer model instance for setup.
        self.client = Client()
        self.customer = Customer.objects.create_user(
            email='test@example.com',
            password='test',
            username='testuser',
            phone='+12125552368',
            address='123 Main St'
        )
    
    def test_login_valid_credentials(self):
        # Ensure the client is not authenticated by logging out.
        self.client.logout()

        # Create form data to mimic login credentials.
        login_data = {
            'email': 'test@example.com',
            'password': 'test'
        }

        # Make a GET request to a view that requires authentication ('thanks').
        get_response = self.client.get(reverse('thanks'))

        # Assert that the user is redirected to the login page when unauthenticated.
        self.assertRedirects(get_response, reverse('login'))

        # Attempt to log in with the provided credentials.
        login_successful = self.client.login(username=login_data['email'], password=login_data['password'])

        # Assert that the login attempt was successful.
        self.assertTrue(login_successful)

        # Make a POST request to the login view with the login credentials.
        response = self.client.post(reverse('login'), login_data, follow=True)

        # Assert that the user is redirected to the home page after a successful login (status code 302).
        self.assertRedirects(response, reverse('home'))

        # Make another GET request to the 'thanks' view after authentication.
        after_authentication_response = self.client.get(reverse('thanks'))

        # Assert that the response status code is 200, indicating the user is authenticated.
        self.assertEqual(after_authentication_response.status_code, 200)

    def tearDown(self):
        # Clean up by deleting all Customer model instances created for the test.
        Customer.objects.all().delete()