from django import urls
from django.urls import path
from django.urls.resolvers import URLPattern
from . import views 

urlpatterns = [
    path('amazon/',views.amazon_price_tracker),
    path('',views.home_view)
]