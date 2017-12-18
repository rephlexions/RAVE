from django.shortcuts import render, redirect
from django.views.generic import View
from .forms import SearchForm
from .utils.CallAPI import get_wiki_page, get_results

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

    def get(self, request):
        return redirect("/home/")


class CategoryViewer(View):
    template_name = 'viewer.html'

    def post(self, request):
        form = SearchForm()
        q = request.POST
        search_query = q['search']
        data = get_wiki_page(search_query)
        context = {'wikidata': data, "form": form}

        return render(request, self.template_name, context)

    def get(self, request):
        return redirect("/home/")
