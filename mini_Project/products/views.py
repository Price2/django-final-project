from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import Product
from .models import Customer, Order, OrderDetails
from django.utils import timezone
import json
from django.http import JsonResponse


def home(request):
    """
    The `home` function retrieves all products and renders the `home.html` template with the products as
    context.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    user. It contains information about the request, such as the user's browser, the requested URL, any
    submitted form data, and more. It is typically passed to view functions in Django
    :return: a rendered HTML template called 'home.html' with a context variable 'products' that
    contains all the Product objects.
    """

    products = Product.objects.all()
    print("authenticated home? ", request.user)
    return render(request, 'products/home.html', {'products': products})

def products(request):
    """
    The function retrieves all products from the database and renders them in a template called
    'products.html', along with information about whether the user is authenticated or not.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    user. It contains information about the request, such as the user making the request, the method
    used (GET, POST, etc.), and any data sent with the request
    :return: a rendered HTML template called 'products/products.html' with a context variable 'products'
    that contains all the products from the Product model.
    """
    
    products = Product.objects.all()
    print("am i authenticated products? ", request.user.is_authenticated)
    return render(request, 'products/products.html', {'products': products})

def checkout(request):
    """
    The function checks if the user is authenticated and returns the checkout page if they are,
    otherwise it redirects them to the login page.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    user. It contains information about the request, such as the user making the request, the URL being
    accessed, and any data sent with the request. In this case, the `checkout` function is expecting a
    `request
    :return: either a rendered HTML template for the checkout page if the user is authenticated, or it
    is redirecting the user to the login page if they are not authenticated.
    """
   
    print("checkout?")
    if request.user.is_authenticated:
        return render(request, 'products/checkout.html')
    else:
        print("checkout unauthenticated?")
        return redirect('login')



def thanks(request):
    """
    The function checks if the user is authenticated and returns a rendered template if they are,
    otherwise it redirects to the login page.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    user. It contains information about the user, the requested URL, any submitted data, and other
    metadata related to the request
    :return: a rendered HTML template called 'thanks.html' if the user is authenticated. If the user is
    not authenticated, it will redirect them to the login page.
    """
    
    if request.user.is_authenticated:
        return render(request, 'products/thanks.html')
    else:
        return redirect('login')


   
def place_order(request):
    """
    The `place_order` function handles the process of placing an order by creating an order instance,
    creating order details instances, and associating products with the order.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    user. It contains information such as the user making the request, the method used (GET, POST,
    etc.), and any data sent with the request
    :return: a redirect to the 'thanks' URL if the order is successfully created. If there is an error
    or the products are not found, it returns an HttpResponse with the corresponding status code (500
    for error, 400 for products not found).
    """
   
    if request.user.is_authenticated and request.method == 'POST':
        # Check if the user is authenticated and the request method is POST
        try:
            # Retrieve the customer associated with the authenticated user
            customer = Customer.objects.get(id=request.user.id)
            data = json.loads(request.body)
            # Extract cart data from the request
            cart_data = data.get('cartData', [])
            product_names = [item['name'] for item in cart_data]

            # Retrieve products based on their names
            products = Product.objects.filter(name_en__in=product_names)

        except Customer.DoesNotExist:
            customer = None

        if products.exists():
            # If products are found, create an order
            try:
                order = Order.objects.create(
                    createDate=timezone.now(),
                    total_price=data.get('total_price', None),
                    customer=customer,
                    status='P',
                )


                # Create a list to store OrderDetails instances
                order_details_list = [] 
                for item in cart_data:
                    try:
                        product = Product.objects.get(name_en=item['name'])
                    except:
                        product = None

                    if product is None:
                        continue
                    unit_price = product.unit_price

                    try:
                        ordered_count = item['quantity']
                    except KeyError:
                        ordered_count = 0
                    # Create an OrderDetails instance and set its attributes
                    order_detail = OrderDetails(
                        order=order,
                        product=product,
                        unit_price=unit_price,
                        ordered_count=ordered_count,
                    )
                    order_details_list.append(order_detail)
                try:
                    # Use bulk_create to create multiple OrderDetails instances efficiently
                    OrderDetails.objects.bulk_create(order_details_list)
                except Exception as e:
                    print(f"failed bulk create... {e}")

                # Set the products associated with the order
                order.products.set(products)

                return redirect('thanks')
            except Exception as e:
                return HttpResponse(request, status=500)
        else:
            return HttpResponse(request, status=400)


def order_history(request):
    """
    The function `order_history` retrieves the order history of a user and renders it in a template.
    
    :param request: The `request` parameter is an object that represents the HTTP request made by the
    user. It contains information about the request, such as the user making the request, the method
    used (GET, POST, etc.), and any data sent with the request
    :return: a rendered HTML template with the order history data. If the user is authenticated, it will
    return the 'products/order_history.html' template with the order history data for the authenticated
    user. If the user is not authenticated, it will return the same template with an empty list of
    orders.
    """
    if request.user.is_authenticated:
            order_hist = Order.objects.filter(customer_id=request.user.id)
            if not order_hist:
                return render(request, 'products/history.html', {'orders': []})
            return render(request, 'products/order_history.html', {'orders': order_hist})
    return render(request, 'products/order_history.html', {'orders': []})

def page_404(request, exception):
    print("am i even called?")
    data = {"exception": "404 Error"}
    return render(request,'404.html', data)
