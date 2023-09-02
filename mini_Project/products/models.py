from django.db import models
from users.models import Customer

class Category(models.Model):
    class Meta:
        verbose_name_plural = "Category"
    name = models.CharField(max_length=255)

    def __str__ (self):
        return self.name




class Product(models.Model):
    name_en = models.CharField(max_length=255)
    name_ar = models.CharField(max_length=255, blank=True)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock_quantity = models.IntegerField(default=0)
    image = models.ImageField(upload_to='product_images/')
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name_en

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

    def __str__(self) -> str:
        return f"Order Date: {self.createDate}, order status: {self.status}"


class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    ordered_count = models.IntegerField(default=0)

    def __str__(self) -> str:
        return f"Order : {self.order}, order count: {self.ordered_count}"