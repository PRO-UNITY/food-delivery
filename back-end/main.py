import json

json_data = '''
[
    {
        "id": 2,
        "name": "1",
        "description": "asas",
        "logo": "/media/logo_kitchen/IMG_0978.png",
        "user": 1,
        "is_active": true,
        "deliveryman_user": [
            {
                "id": 1,
                "username": "admin",
                "first_name": "fdasasfd",
                "last_name": "",
                "email": ""
            }
        ],
        "open_time": null,
        "close_time": null,
        "latitude": "asas",
        "longitude": "asas",
        "create_at": "2023-12-14T05:34:24.305703Z",
        "updated_at": "2023-12-15T06:51:06.098815Z"
    }
]
'''

# Convert JSON data to Python object
python_object = json.loads(json_data)

# Now, python_object is a list containing a dictionary
print(python_object)