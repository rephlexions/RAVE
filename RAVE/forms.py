from django import forms


class SearchForm(forms.Form):
    search = forms.CharField(widget=forms.TextInput(attrs={'class':'autocomplete'}),
                             label='Search', max_length=50,  required=True, )
