from django.shortcuts import render
from django.views.generic import TemplateView, View
from .forms import SearchForm

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
        return render(request, self.template_name, {'form': form})


class MashUpView(View):
    template_name = 'mashup.html'

    def post(self, request):
        print(request.POST)
        #if form.isa_valid:
        return render(request, self.template_name)

    def get(self, request):
        return render(request,self.template_name)