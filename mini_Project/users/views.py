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
    print("LOGIN PAGE")
    if request.method == "POST":
        form = LoginForm(request.POST)
        print(f"is form valid?")
        if form.is_valid():
            print('is valid?')
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']

            user = authenticate(request, username=email, password=password)
            if user is not None:
                # Login the user
                login(request, user)
                print("Login? ", request.user.username, " email: ", request.user.email)
                print("logged in successfully? ", request.user.is_authenticated)
                print("any errors ? ", form.errors)
                return redirect("home")
            else:
                error_message = "Invalid email/password"
                messages.error(request, error_message)
                # return render(request, 'users/login.html')
    else:
        form = LoginForm()
        print("i reached here ")
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



def check_login_status(request):
    print(f'logged in? {request.user.is_authenticated}')
    if request.user.is_authenticated:
        print("is user authenticated?")
        return JsonResponse({'is_authenticated': True})
    else:
        return JsonResponse({'is_authenticated': False})

@csrf_exempt
def logout_user(request):
    logout(request)
    return redirect('products') 