from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.http import Http404

def custom_exception_handler(exc, context):
    # Call the default exception handler first
    response = exception_handler(exc, context)

    # Check if the exception is a 404 Not Found
    if isinstance(exc, Http404):
        response_data = {"detail": "Not found."}

        # Customize the JSON response for 404 errors
        response = Response(response_data, status=404)

    return response
