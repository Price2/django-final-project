from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Product
import json
from django.http import JsonResponse


def home(request):
    products = Product.objects.all()
    print("authenticated home? ", request.user)
    return render(request, 'products/home.html', {'products': products})

def products(request):
    products = Product.objects.all()
    print("am i authenticated products? ", request.user.is_authenticated)
    return render(request, 'products/products.html', {'products': products})

def checkout(request):
    print("checkout?")
    if request.user.is_authenticated:
        return render(request, 'products/checkout.html')
    else:
        print("checkout unauthenticated?")
        return redirect('login')



def thanks(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            print(f"post request success: {request.user.is_authenticated} ")
            return redirect('thanks')
        else:
            print(f"post request failure: {request.user.is_authenticated} ")
            return redirect('login')
    else:
        print("get request")
        return render(request, 'products/thanks.html')