from rest_framework import serializers
from .models import VisitingCard
import json


# class VisitingCardSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = VisitingCard
#         fields = '__all__'

#     def to_internal_value(self, data):
#         # 1. QueryDict ને સાદા Python Dictionary માં ફેરવો
#         if hasattr(data, 'dict'):
#             resource_data = data.dict()
#         else:
#             resource_data = data.copy()

#         # 2. JSON String ને Python List માં ફેરવો
#         # જો ડેટા '["val1"]' જેવો હશે તો તેને json.loads લિસ્ટ બનાવી દેશે
#         for field in ['mobile_numbers', 'addresses']:
#             value = resource_data.get(field)
#             if value and isinstance(value, str):
#                 try:
#                     resource_data[field] = json.loads(value)
#                 except (ValueError, TypeError):
#                     # જો JSON લોડ ના થાય, તો તેને લિસ્ટ તરીકે જ રાખવાનો પ્રયત્ન કરો
#                     resource_data[field] = []

#         return super().to_internal_value(resource_data)





class VisitingCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitingCard
        fields = '__all__'

    def to_internal_value(self, data):
        # 1. QueryDict ને સાદા Python Dictionary માં ફેરવો
        if hasattr(data, 'dict'):
            resource_data = data.dict()
        else:
            resource_data = data.copy()

        # 2. JSON List ને String માં ફેરવો (કારણ કે મોડેલ હવે TextField છે)
        for field in ['mobile_numbers', 'addresses']:
            value = resource_data.get(field)
            if value:
                # જો React માંથી JSON string આવે તો તેને સીધી જ રહેવા દો
                # અથવા જો તે લિસ્ટ હોય તો તેને string માં ફેરવો
                if not isinstance(value, str):
                    resource_data[field] = json.dumps(value)
                # જો તે પહેલેથી જ string છે પણ valid JSON જેવી દેખાય છે, તો તેને એમનેમ રહેવા દો.

        return super().to_internal_value(resource_data)