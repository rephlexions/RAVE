from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.views.generic import View
from .forms import SearchForm
from .utils.CallAPI import get_wiki_page, get_results, get_wiki_page_two

# Create your views here.


class HomeView(View):
    template_name = 'home.html'

    def get(self, request):
        form = SearchForm()
        if form.is_valid():
            return redirect(SearchView)

        context = {'form': form}
        return render(request, self.template_name, context)

    def post(self, request):
        form = SearchForm()
        context = {'form': form}
        return render(request, self.template_name, context)


class SearchView(View):
    template_name = 'results.html'

    def post(self, request):
        form = SearchForm()
        q = request.POST
        search_query = q['search']
        data = get_results(search_query)
        context = {'results': data, 'form': form}
        return render(request, self.template_name, context)
"""
    def get(self, request):
        return redirect("/home/")
"""


class CategoryViewer(View):
    template_name = 'viewer.html'

    def post(self, request):
        form = SearchForm()
        q = request.POST
        search_query = q['search']
        data = get_wiki_page(search_query)
        context = {'wiki_data': data, "form": form}

        return render(request, self.template_name, context)

    def get(self, request):
        print(request.GET)
        return render(request, self.template_name,)


def validate_query(request):
    if request.method == "GET":
        page = request.GET['page']
        data = get_wiki_page_two(page)

        return JsonResponse(data, safe=False)
