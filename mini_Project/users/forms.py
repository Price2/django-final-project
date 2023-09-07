from django import forms
from django.contrib.auth.forms import AuthenticationForm
from phonenumber_field.modelfields import PhoneNumberField
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field
from .models import Customer


class LoginForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['password' ,'email']
        widgets = {
            'password': forms.PasswordInput(attrs={'id':'password', 'placeholder':'Enter your password', 'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'id':'email', 'placeholder':'Enter your email address', 'class': 'form-control'}),
        }
     

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            Field('email', css_class='form-control'),
            Field('password', css_class='form-control'),
        # Submit('submit', 'Login', css_class='btn btn-primary btn-block fa-lg gradient-custom-2 mb-3')
        )
        self.fields['email'].required = True

  # Import your Customer model

class CustomerForm(forms.ModelForm):
    phone = PhoneNumberField()
    class Meta:
        model = Customer
        fields = ['username', 'password' ,'email', 'phone', 'address']  # Customize this list as needed
        widgets = {
            'username': forms.TextInput(attrs={'maxlength':'150', 'class': 'form-control form-control-lg'}),
            'password':  forms.PasswordInput(attrs={'class':'form-control form-control-lg'}),
            'email': forms.EmailInput(attrs={'class':'form-control form-control-lg'}),
            'phone': forms.TextInput(attrs={'class': 'form-control form-control-lg'}), 
            'address': forms.TextInput(attrs={'class':'form-control form-control-lg'}),         
        }

    def __init__(self, *args, **kwargs):
        super(CustomerForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
          'username', 
          'password' ,
          'email', 
          'phone', 
          'address'
        )
        self.fields['email'].required = True
        
