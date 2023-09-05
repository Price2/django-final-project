from django.forms import modelform_factory
from .models import Customer
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import LoginForm, CustomerForm
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
import logging


"""
The function `logIn` is a view function in Django that handles the login functionality, including
form validation and authentication.

:param request: The `request` parameter is an object that represents the HTTP request made by the
user. It contains information about the request, such as the method used (GET or POST), the headers,
the user's IP address, and any data sent with the request
:return: a rendered HTML template called 'users/login.html' with the form variable passed as
context.
"""
def login_user(request):
    print(f"authenticated? {request.user.is_authenticated}", flush=True)
    if request.method == "POST":
        form = LoginForm(request.POST)
        print(f"is form valid?")
        if form.is_valid():
            print('is valid?')
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                print("Login? ", request.user.username, " email: ", request.user.email)
                print("logged in successfully? ", request.user.is_authenticated)
                print("any errors ? ", form.errors)
                return redirect("home")
            else:
                error_message = "Invalid email/password"
                messages.error(request, error_message)
    else:
        form = LoginForm()
        print("i reached here ")
    return render(request, 'users/login.html', {'form': form})




def register(request):
    """
    The function "register" handles the registration process for a customer, creating a new user with
    the provided form data and displaying a success message.
    
    :param request: The request object represents the HTTP request made by the user. It contains
    information such as the user's browser details, the requested URL, and any data sent with the
    request
    :return: a rendered HTML template called "users/register.html" with the form as a context variable.
    """

    if request.method == 'POST':
        form = CustomerForm(request.POST)
        if form.is_valid():
            customer = Customer.objects.create_user(
                  username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                email=form.cleaned_data['email'],
                phone=form.cleaned_data['phone'],
                address=form.cleaned_data['address']
            )
            form = CustomerForm()
            messages.success(request, 'Your registration was successful, please Login to proceed!')
            return render(request, "users/register.html", {'form': form})
    else:
        form = CustomerForm()
    return render(request, "users/register.html", {'form': form})



def check_login_status(request):
    """
    The function checks the login status of a user and returns a JSON response indicating whether the
    user is authenticated or not.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    client. It contains information about the request, such as the user making the request, the
    requested URL, and any data sent with the request. In this case, the `request` object is used to
    check if the
    :return: a JSON response indicating whether the user is authenticated or not. If the user is
    authenticated, the response will contain {'is_authenticated': True}. If the user is not
    authenticated, the response will contain {'is_authenticated': False}.
    """
    if request.user.is_authenticated:
        return JsonResponse({'is_authenticated': True})
    else:
        return JsonResponse({'is_authenticated': False})

@csrf_exempt
def logout_user(request):
    logout(request)
    return redirect('products') 