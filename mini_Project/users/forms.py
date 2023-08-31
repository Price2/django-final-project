from django import forms
from django.contrib.auth.forms import AuthenticationForm

from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Row, Column, Submit, Div
from .models import Customer


class LoginForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['password' ,'email']

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.fields['password'].widget = forms.PasswordInput()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            'email',
            'password',
            Submit('submit', 'Login', css_class='btn btn-primary')
        )

  # Import your Customer model

class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['username', 'password' ,'email', 'phone', 'address']  # Customize this list as needed

    def __init__(self, *args, **kwargs):
        super(CustomerForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.fields['password'].widget = forms.PasswordInput()
        self.helper.layout = Layout(
            Row(
                Column('username', css_class='form-group col-md-6 mb-0'),
                Column('email', css_class='form-group col-md-6 mb-0'),
                css_class='form-row'
            ),
            'password',
            'phone',
            'address',
            
            Div(
                Submit('submit', 'Submit', css_class='btn btn-primary'),
                css_class='text-center'
            ),
        )