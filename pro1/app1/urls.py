from django.urls import path
from .views import *

card_list = VisitingCardViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

card_detail = VisitingCardViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('cards/', card_list, name='card-list'),
    path('cards/<int:pk>/', card_detail, name='card-detail'),
]