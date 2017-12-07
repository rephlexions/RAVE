from django.shortcuts import render, redirect
from django.views.generic import View
from .forms import SearchForm
from .utils.CallAPI import getData

# Create your views here.

"""
def home(request):
    if request.method == 'POST':
        myForm = SearchForm(request.POST)
        if myForm.is_valid():
            print(request.POST)
    else:
        myForm = SearchForm()
    context = {'formfields': myForm,}
    return render(request, "home.html", context)

def Search(request):
    if request.method == 'POST':
        myForm = SearchForm(request.POST)
        if myForm.is_valid():
            print(request.POST)
    else:
        myForm = SearchForm()

    return HttpResponseRedirect('/viewer/')
"""
"""
def home(request):
    context = []
    render(request,"home.html")
"""


class HomeView(View):
    template_name = 'home.html'

    def get(self, request):
        form = SearchForm()
        if form.is_valid():

            return redirect(CategoryViewer)

        context = {'form': form}
        return render(request, self.template_name, context)


class CategoryViewer(View):
    template_name = 'viewer.html'

    def post(self, request):
        q = request.POST
        search_query = q['search']
        data = getData(search_query)
        context = {'wikidata': data}
        return render(request, self.template_name, context)

    def get(self, request):
        return render(request, self.template_name)