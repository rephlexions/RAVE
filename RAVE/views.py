from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.generic import View
from .forms import SearchForm
from .utils.api_utils import get_wiki_page, get_search_results

# Create your views here.


class HomeView(View):
    template_name = 'home.html'

    def get(self, request):
        form = SearchForm()
        if form.is_valid():
            return redirect(SearchView)

        context = {'form': form}
        return render(request, self.template_name, context)

    def post(self):
        return redirect(HomeView)


class SearchView(View):
    template_name = 'results.html'

    def get(self, request):
        form = SearchForm()
        search_query = request.GET['search']
        data = get_search_results(search_query)
        context = {'form': form}
        #'results': data,
        return render(request, self.template_name, context)


class CategoryViewer(View):
    template_name = 'viewer.html'

# TODO Rework this function
    def get(self, request):
        form = SearchForm()
        query = request.GET.get('page')
        data = get_wiki_page(query)

        context = {'wiki_data': data, 'form': form}

        return render(request, self.template_name, context)


def get_data(request):
    if request.method == 'GET':
        page = request.GET['page']
        data = get_wiki_page(page)

        return JsonResponse(data, safe=False)


def get_results(request):
    if request.method == 'GET':
        search_query = request.GET['search']
        search_results = get_search_results(search_query)

        return JsonResponse(search_results, safe=False)
