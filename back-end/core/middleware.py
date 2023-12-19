import logging
import json
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist, PermissionDenied, ValidationError
from django.http import Http404
from django.http import JsonResponse

logger = logging.getLogger(__name__)

class JsonErrorResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        if isinstance(exception, status=404):
            error_message = str(exception)
            response_data = {"error": error_message}
            status_code = getattr(exception, 'status_code', 404)
            return JsonResponse(response_data, status=status_code)

        if isinstance(exception, (ObjectDoesNotExist, PermissionDenied, ValidationError)):
            # Customize response for specific Django exceptions
            error_message = str(exception)
            response_data = {"error": error_message}
            status_code = getattr(exception, 'status_code', 500)
            return JsonResponse(response_data, status=status_code)

        # Customize response for other exceptions (generic 500 errors)
        error_message = "Internal Server Error"
        response_data = {"error": error_message}
        return JsonResponse(response_data, status=500)
