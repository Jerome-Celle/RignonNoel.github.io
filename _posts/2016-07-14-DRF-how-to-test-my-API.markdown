---
layout: post
title:  "[DRF] How to test my API"
date:   2016-07-14 14:50:00:00 +0400
categories: [Django, Api]
---

## Introduction to test in Django Rest Framework##

I always work with factory class to test my code in Django, but if you 
don't know how to use factory you can just replace all factory call by 
a basic creation of object

If you want more information, always the same things, just go on the [official documentation](http://www.django-rest-framework.org/api-guide/testing/)

**Here is my process of test:**

* Make a class for each view i want test
* Make a method for each test case

{% highlight python %}
from rest_framework.test import APITestCase, APIClient
from django.core.urlresolvers import reverse

from customers.factories import UserFactory
from customers.factories import StaffUserFactory

from products.factories import InstanceFactory
from products.factories import ProductFactory
from products.factories import TicketFactory
from products.factories import ServiceFactory

# Settings for test
USERNAME = "root"
PASSWORD = "toto"
BASIC_CREDENTIAL = "Basic cm9vdDp0b3Rv"


class ListInstanceTests(APITestCase):

    def setUp(self):
        self.user = UserFactory(username=USERNAME, password=PASSWORD)

    def test_get_instance_no_data(self):
        ...
    
    def test_get_instance_no_owner(self):
        ...
        
    def test_get_lot_of_instance(self):
        ...
        
    def test_get_instance_without_auth(self):
        ...
        
    def test_get_instance(self):
        """
        the current have two instance
        """
        # I create all my data
        product = ProductFactory()
        instance_1 = InstanceFactory(product=product, owner=self.user)
        instance_2 = InstanceFactory(product=product, owner=self.user)
        
        # I configure the client
        client = APIClient()
        client.credentials(HTTP_AUTHORIZATION=BASIC_CREDENTIAL)
        
        # I make my test
        response = client.get(reverse('api:instance_list_api'), format='json')
        
        # I control my status code
        self.assertEqual(response.status_code, 200)

        # I control my data response
        self.assertEqual(response.data['count'], 2)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['id'], instance_1.id)
        self.assertEqual(response.data['results'][0]['product'], product.id)
        self.assertEqual(response.data['results'][1]['id'], instance_2.id)
        self.assertEqual(response.data['results'][1]['product'], product.id)
{% endhighlight %}

**Here a little example of JSON return to understand**
{% highlight json %}
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "description": "My first instance",
      "product": 1,
      "is_active": true,
      "creation_date": "2016-07-13T18:19:00.635273Z",
      "have_access": true
    }
    {
      "id": 2,
      "description": "My second instance",
      "product": 1,
      "is_active": true,
      "creation_date": "2016-07-13T18:19:00.635273Z",
      "have_access": true
    }
  ]
}
{% endhighlight %}