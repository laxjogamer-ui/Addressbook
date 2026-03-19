from django.shortcuts import render
from rest_framework import viewsets
from .models import VisitingCard
from .serializers import VisitingCardSerializer
from rest_framework.parsers import MultiPartParser, FormParser




class VisitingCardViewSet(viewsets.ModelViewSet):
    queryset = VisitingCard.objects.all().order_by('-created_at')
    serializer_class = VisitingCardSerializer
    parser_classes = (MultiPartParser, FormParser) 

    
