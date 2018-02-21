from django import forms


class SearchForm(forms.Form):
    search = forms.CharField(widget=forms.TextInput(attrs={'class': 'autocomplete', 'type': 'search'}),
                             max_length=50,  required=True, label=False)
