from django.forms import modelform_factory
from .models import Customer
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import login
from django.contrib import messages

from django.shortcuts import render
from .forms import LoginForm, CustomerForm
from django.contrib.auth.hashers import make_password


"""
The function `logIn` is a view function in Django that handles the login functionality, including
form validation and authentication.

:param request: The `request` parameter is an object that represents the HTTP request made by the
user. It contains information about the request, such as the method used (GET or POST), the headers,
the user's IP address, and any data sent with the request
:return: a rendered HTML template called 'users/login.html' with the form variable passed as
context.
"""
def logIn(request):
    # CustomerForm = modelform_factory(Customer, fields=['username', 'password', 'email', 'phone', 'address'])

    if request.method == "POST":
        form = LoginForm(request.POST)
        print("testing before valid")
        if form.is_valid():
            print("testing after valid")
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            try:
                customer = Customer.objects.get(email__exact=email, is_active=True)
            except Customer.DoesNotExist:
                customer = None
            print(f"checking customer {customer}")
            if customer and customer.check_password(password):
                login(request, customer)
                print("Login? ", request.user.username, " email: ", request.user.email)
                return HttpResponse("Thanks for logging in")
            else:
                error_message = "Invalid email/password"
                messages.error(request, error_message)
               
                # return render(request, 'users/login.html')
    else:
        form = LoginForm()
    return render(request, 'users/login.html', {'form': form})



def register(request):
    # CustomerForm = modelform_factory(Customer, fields=['username', 'password' ,'email', 'phone', 'address'])
    print("authenticated? ", request.user.is_authenticated)
    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            # Hash the password
            print("success saving customer")
            password = form.cleaned_data['password']
            hashed_password = make_password(password)

            # Create a new Customer instance with the hashed password
            customer = Customer(
                username=form.cleaned_data['username'],
                password=hashed_password,
                email=form.cleaned_data['email'],
                phone=form.cleaned_data['phone'],
                address=form.cleaned_data['address']
            )
            # Save the user
            customer.save()
            form = CustomerForm()
            print("success saving customer")
            messages.success(request, 'Your registration was successful, please Login to proceed!')
            return render(request, "users/register.html", {'form': form})
    else:
        form = CustomerForm()
    return render(request, "users/register.html", {'form': form})