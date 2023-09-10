from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Product
from .models import Customer, Order, OrderDetails
from django.utils import timezone
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
    if request.user.is_authenticated:
        return render(request, 'products/thanks.html')
    else:
        return redirect('login')



def place_order(request):
    if request.user.is_authenticated and request.method == 'POST':
        print("request order? ", request.user.id)
        try:
            customer = Customer.objects.get(id=request.user.id)
            data = json.loads(request.body)
            print(f"order: {data} ")
            cart_data = data.get('cartData', [])
            print(f"cart data: {cart_data}, cart_data_type: {type(cart_data)} ")
            product_names = [item['name'] for item in cart_data]
            print(f"product names : {product_names} ")
            products = Product.objects.filter(name_en__in=product_names)
            print(f"Products queryset: {products}")

        except Customer.DoesNotExist:
            customer = None

        if products.exists():
            print("creating order now")
            try:
                order = Order.objects.create(
                    createDate=timezone.now(),
                    total_price=data.get('total_price', None),
                    customer=customer,
                    status='P',
                )
                print(f"Order created: {order}")

                print(f"Products queryset: {products}")

                # order.products.set(products)
                print("Added products to order")

                order_details_list = []  # To store OrderDetails instances
                for item in cart_data:
                    try:
                        print(f"==========getting product for orderDetails============ : {item}")
                        product = Product.objects.get(name_en=item['name'])
                    except:
                        product = None

                    if product is None:
                        continue
                    unit_price = product.unit_price
                    print(f"============orderDetails unit price=========== : {unit_price}")

                    try:
                        ordered_count = item['quantity']
                    except KeyError:
                        ordered_count = 0
                    print(f"==========orderDetails quantity============ : {ordered_count}")
                    # Create OrderDetails instance and set the attributes
                    print("Creating OrderDetails instance...")

                    order_detail = OrderDetails(
                        order=order,
                        product=product,
                        unit_price=unit_price,
                        ordered_count=ordered_count,
                    )
                    print("created order details successfully...")
                    order_details_list.append(order_detail)
                print("Adding bulk create...")
                try:
                    OrderDetails.objects.bulk_create(order_details_list)
                except Exception as e:
                    print(f"failed bulk create... {e}")
                print(f"success bulk create...")
                order.products.set(products)
                print("added order products...")

                print("ENd of view")
                return redirect('thanks')
            except Exception as e:
                response_data = {'message': f'Error: {str(e)}'}
                return HttpResponse(request, status=500)
        else:
            response_data = {'message': 'No products selected for the order.'}
            return HttpResponse(request, status=400)



def page_404(request, exception):
    print("am i even called?")
    data = {"exception": "404 Error"}
    return render(request,'404.html', data)
