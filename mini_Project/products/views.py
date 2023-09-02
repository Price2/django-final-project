from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from .models import Product

def home(request):
    products = Product.objects.all()
    return render(request, 'products/home.html', {'products': products})