from django import template

register = template.Library()

@register.filter(name='split_word')
def split_word(value, key):
    value = str(value)
    print(f"got here value: ?{type(str(value))}, key: {type(key)}")
    """
        Returns the value turned into a list.
    """
    return value.split(str(key))