class: center, middle

# Django Rest Framework
## Introduction to RESTful APIs with Django
### Noël Rignon

<a href="https://github.com/RignonNoel/workshops"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>

[![Creative Commons License](https://i.creativecommons.org/l/by-sa/4.0/88x31.png)](http://creativecommons.org/licenses/by-sa/4.0/)

---

## Summary of the meetup

1. REST API Quick Tips
 1. HTTP Verbs
 2. HTTP Response Codes
 3. Resource Names

2. Django Rest Framework
 1. Serializers
 2. Views (Generics CBVs)

3. Essentials
 1. Authentication (Basic & Token)
 2. Swagger
 3. Development tools

---

# 1 - REST API Quick Tips

1. HTTP Verbs
2. HTTP Response Codes
3. Resource Names
 
To having a RESTful services, we need to nembrace the HTTP specification

---

## 1.1 - HTTP Verbs

We use principally 4 HTTP verbs as follows:

#### - GET
Read a specific resource (by an identifier) or a collection of resources.

#### - PUT
Update a specific resource (by an identifier) or a collection of resources.

#### - DELETE
Remove/delete a specific resource by an identifier.

#### - POST
Create a new resource.

---

## 1.1 - HTTP Verbs

#### Note

* GET requests must not change any underlying resource data. 

* PUT Can also be used to create a specific resource if the resource identifier is know before-hand.

* POST is also a catch-all verb for operations that don't fit into the other categories.

---

## 1.2 - HTTP Response Codes

* Response status codes are part of the HTTP specification. 

* HTTP Response Code address the most common situations.

* Our Web APIs should return relevant HTTP status codes. 

---

## 1.2 - HTTP Response Codes

#### 2xx Success
The client's request was successfully received, understood, and accepted.

#### 3xx Redirection
Further action needs to be taken by the user agent in order to fulfill the request.

#### 4xx Client Error
The client seems to have erred.

#### 5xx Server Error
The server is aware that it has erred or is incapable of performing the request. 

---

## 1.2 - HTTP Response Codes

###Example of commons HTTP Response Codes:

#### 200 - OK
The request has succeeded.

#### 201 - CREATED
The request has been fulfilled and resulted in a new resource being created.

#### 202 - ACCEPTED
If the action cannot be carried out immediately, the server SHOULD respond with 202 (Accepted) response instead.


---

## 1.3 - Resource Names

 - Resource naming is the most important concept in Web service API.
  - Big difference of understanding

  - Little effort to setup

 - We need to create an URL hierarchy representing sensible resources.

 - Ressources need to be in plural 


---


## 1.3 - Resource Names

### Example :

#### `GET http://www.example.com/customers/123/orders/`

--

 - List orders of customer id 123

--

#### `GET http://www.example.com/customers/123/orders/456`

--

 - Get order 456 of customer 123

--

#### `POST http://www.example.com/customers/123/orders/`

--

 - Create a new order for customer 123


---


# 2 - Django Rest Framework

1. Serializers
2. Views (Generics CBVs)
 
--


 - Customizable all the way down - just use regular function-based views if you don't need the more powerful features.

--
	
 - Extensive documentation, and great community support.

--

Link of official project : http://www.django-rest-framework.org/

---

## 2.1 - Serializer

```python
class CreateUserSerializer(serializers.ModelSerializer):


   ...
```

Basically you can :

 - Define a custom serializer : serializers.Serializer
 - Use a model serializer : serializers.ModelSerializer
---

## 2.1 - Serializer


```python
class CreateUserSerializer(serializers.ModelSerializer):
    


    class Meta:
        model = User
        fields = ('id', 'is_staff', 'email', 'username', 'password')
```

First need it's to to define the list of fields you want.

---

## 2.1 - Serializer

```python
class CreateUserSerializer(serializers.ModelSerializer):
   


    class Meta:
        model = User
        fields = ('id', 'is_staff', 'email', 'username', 'password')
        read_only_fields = ('id', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}
```

In some case you need restricted access on a data: 

 - In read-only (ex: identifier)
 - In write-only (ex: password)

---

## 2.1 - Serializer

```python
class CreateUserSerializer(serializers.ModelSerializer):
 
    url = serializers.CharField(source='get_absolute_url', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'is_staff', 'email', 'username', 'password', 'url')
        read_only_fields = ('id', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}
```

Sometime, you need to add a new field on your serializer or just change the default field.

---

## 2.1 - Serializer

```python
class CreateUserSerializer(serializers.ModelSerializer):
 
    url = serializers.CharField(source='get_absolute_url', read_only=True)

    class Meta:
        model = User
        fields = ('id', 'is_staff', 'email', 'username', 'password', 'url')
        read_only_fields = ('id', 'is_staff')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
```

Finally, you can overwrite default behaviours for each action of your serializer.

---

## 2.2 - Views (Class Based View)

Basically you need two class for each set of ressources.

```python
url(
    r'^users/$',
    views.Users.as_view(),
    name='users'
),
url(
    r'^users/(?P<pk>\d+)$',
    views.UsersDetail.as_view(),
    name='users_detail'
),
```

---


## 2.2 - Views (Class Based View)

The first to list and/or create (GET/POST)

```python
class Users(generics.ListCreateAPIView):
    # To list ressources
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    # To create a new ressource
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
```

---

## 2.2 - Views (Class Based View)

The second to retrieve, update and/or delete (GET/PUT/DELETE)

```python
class UsersDetail(generics.RetrieveUpdateDestroyAPIView):
    # To get/retrieve a ressource
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    # To update/modify a ressource
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    # To delete/remove a ressource
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
```

---


## 2.2 - Views (Class Based View)

Django Rest Framework give you two set of generic CBV (Class Based View)

 - ListAPIView
 - CreateAPIView


 - RetrieveAPIView
 - UpdateAPIView
 - DestroyAPIView

--

You can use views created from these lists. (Only with the same list)

--

#### Example:

 - ListCreateAPIView
 - RetrieveDestroyAPIView
 - RetrieveUpdateAPIView
 - RetrieveUpdateDestroyAPIView

--

**Note :** You need to list names in the same order as the list

---

## 2.2 - Views (Class Based View)

If generics view are too complicated for your needs, you can just use `'APIView'`

```python
from snippets.models import Snippet
from snippets.serializers import SnippetSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        snippets = Snippet.objects.all()
        serializer = SnippetSerializer(snippets, many=True)
        return Response(serializer.data)
```
---

## 2.2 - Views (Class Based View)

You can also just return JSON response if you need. 

**Note :** A good API always take an action about a ressource, so basically you must work with serializer all time.


```python
from django.http import JsonResponse

class Users(...):

    def get(self, request, *args, **kwargs):

        data = {
            'username': 'RignonNoel',
            'password': '******************'
        }

        return JsonResponse(data)
```
---

# 3 - Essentials

1. Authorization (Basic & Token)
2. Swagger
3. Development tools
 
--

An API is use by lot of people, in some system and need to be robust. 

You need to be prepared!

---

## 3.1 - Authentication

#### HTTP Basic Authentication

Basic authentication use a tuple username/password

If you use Basic Authentication in production you must ensure that your API is only available over https.

--

#### Token Authentication

Token Authentication use a token/key to identify and allow access to the user.

Token Authentication is appropriate for client-server setups, such as native desktop and mobile clients.

**Note :** You need to write a view to GET the token with a basic authentication, so you can get and store the token of the user who use the service.

---

## 3.1 - Swagger

**OpenAPI Specification** 
(originally known as the Swagger Specification)

Specification for machine-readable interface files for describing, producing, consuming, and visualizing RESTful web services.

 - Automatically generate documentation
 - Helps keep the documentation, client libraries, and source code in sync.


`http://swagger.io/`

--

#### With Django Rest Framework : 
You can use `'Django REST Swagger'` or `'DRF Docs'`

`http://www.django-rest-framework.org/topics/documenting-your-api/`

---

## 3.1 - Development tools

#### POSTMAN [Chrome]

`https://www.getpostman.com/`

Use in lot of company and project. 

 - Exportation of request/project to work with other people
 - Manage environnement variable to easily setup your environnement
 - Manage account to save project on cloud
 - Allow team works/projects

--

#### RESTClient [Firefox]

`http://restclient.net/`

A little alternative to POSTMAN

---

## Remember your community !

Community project need our help to survive! 

If you use some projects in your work, remember to donate to help our future.

#### Django Rest Framework

`https://fund.django-rest-framework.org/topics/funding/`


#### Django

`https://www.djangoproject.com/fundraising/`

---

# Ressources

#### REST API Tutorial (Website)

`http://www.restapitutorial.com/`

#### Django Rest Framework

`http://www.django-rest-framework.org/`

#### Swagger.io

`http://swagger.io/`

#### System of slide from markdowm used

`https://github.com/gnab/remark`


