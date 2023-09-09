from django import template

register = template.Library()

@register.filter(name='split_word')
def split_word(value, key):
    value = str(value)
    """
        Returns the value turned into a list.
    """
    return value.split(str(key))