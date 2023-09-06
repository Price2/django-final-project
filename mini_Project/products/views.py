from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Product
import json

def home(request):
    products = Product.objects.all()
    return render(request, 'products/home.html', {'products': products})

def checkout(request):
    # post_data = json.loads(request.body)
    # print("Received data: ", post_data['cartData'], type(post_data))
    return render(request, 'products/checkout.html')



def thanks(request):
    # post_data = json.loads(request.body)
    # print("Received data: ", post_data['cartData'], type(post_data))
    response = HttpResponseRedirect("/thankyou")
    print("Response status code:", response.status_code)
    print("Redirect URL:", response.url)
    return response

def thankyou(request):
    print("thanks")
    return render(request, 'products/thanks.html')