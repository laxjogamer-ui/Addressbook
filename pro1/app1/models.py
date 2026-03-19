# from django.db import models
# import json

# # Create your models here.

# class VisitingCard(models.Model):
#     # --- Category Options ---
#     CATEGORY_CHOICES = [
#         ('Hardware', 'Hardware'),
#         ('Software', 'Software'),
#         ('AI', 'AI'),
#         ('Accounting', 'Accounting'),
#         ('Office Automation', 'Office Automation'),
#         ('AutoCAD', 'AutoCAD'),
#         ('Multimedia', 'Multimedia'),
#         ('Other', 'Other'),
#     ]

#     company_name = models.CharField(max_length=255)
    
#     # --- સુધારો: અહીં કેટેગરી ફીલ્ડ ઉમેર્યું ---
#     category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Software')
#     # ----------------------------------------

#     owner_name = models.CharField(max_length=255, blank=True, null=True)
#     manager_name = models.CharField(max_length=255, blank=True, null=True)
#     email = models.EmailField(blank=True, null=True)
#     website = models.URLField(blank=True, null=True)
#     notes = models.TextField(blank=True, null=True)
    
#     # Social Media Links
#     facebook = models.URLField(blank=True, null=True)
#     instagram = models.URLField(blank=True, null=True)
#     whatsapp = models.CharField(max_length=225, blank=True, null=True)
#     linkedin = models.URLField(blank=True, null=True)
#     twitter = models.URLField(blank=True, null=True)

#     # Images
#     card_front = models.ImageField(upload_to='cards/front/', blank=True, null=True)
#     card_back = models.ImageField(upload_to='cards/back/', blank=True, null=True)
#     qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)

#     # JSON Data
#     mobile_numbers = models.JSONField(default=list) 
#     addresses = models.JSONField(default=list)

#     created_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.company_name} - {self.category}"




from django.db import models
import json

# Create your models here.

class VisitingCard(models.Model):
    # --- Category Options ---
    CATEGORY_CHOICES = [
        ('Hardware', 'Hardware'),
        ('Software', 'Software'),
        ('AI', 'AI'),
        ('Accounting', 'Accounting'),
        ('Office Automation', 'Office Automation'),
        ('AutoCAD', 'AutoCAD'),
        ('Multimedia', 'Multimedia'),
        ('Other', 'Other'),
    ]

    company_name = models.CharField(max_length=255)
    
    # Category field
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Software')

    owner_name = models.CharField(max_length=255, blank=True, null=True)
    manager_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    
    # Social Media Links
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    whatsapp = models.CharField(max_length=225, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)

    # Images
    card_front = models.ImageField(upload_to='cards/front/', blank=True, null=True)
    card_back = models.ImageField(upload_to='cards/back/', blank=True, null=True)
    qr_code = models.ImageField(upload_to='qrcodes/', blank=True, null=True)

    # --- સુધારો: SQL Server JSONField સપોર્ટ નથી કરતું એટલે TextField વાપર્યું છે ---
    # Default તરીકે '[]' (ખાલી લિસ્ટની સ્ટ્રિંગ) રાખી છે
    mobile_numbers = models.TextField(default="[]", blank=True, null=True) 
    addresses = models.TextField(default="[]", blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} - {self.category}"