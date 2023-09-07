from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Product
import json
from django.http import JsonResponse


def home(request):
    products = Product.objects.all()
    return render(request, 'products/home.html', {'products': products})

def checkout(request):
    return render(request, 'products/checkout.html')



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