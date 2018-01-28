from django import forms


class SearchForm(forms.Form):
    # TODO Resolve autocomplete
    search = forms.CharField(widget=forms.TextInput(attrs={'class':'autocomplete'}),
                             label='Search', max_length=50,  required=True, )
