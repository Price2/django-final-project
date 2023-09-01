from django.db import models
from users.models import Customer

class Category(models.Model):
    name = models.CharField(max_length=255)


class Product(models.Model):
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)


class Order(models.Model):
    ORDER_STATUS = (
    ('P', 'Pending'),
    ('A', 'Approved'),
    ('DEC', 'Declined'),
    ('SH', 'Shipped'),
    ('DD', "Delivered")
)
    createDate = models.DateTimeField(null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=5,
        choices=ORDER_STATUS,
        default='P'
    )
    products = models.ManyToManyField(Product, through='OrderDetails')



class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    ordered_count = models.IntegerField(default=0)
