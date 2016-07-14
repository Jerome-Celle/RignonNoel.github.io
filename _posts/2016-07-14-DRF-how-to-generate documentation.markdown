---
layout: post
title:  "[DRF] Generate documentation with Django Rest Swagger"
date:   2016-07-14 15:12:00:00 +0400
categories: [Django, Api]
---

I have see lot of documentation working with swagger and i needed to 
find how to make that with DRF. I've found with Django Rest Swagger!

If you want more information, always the same things, just go on the [official documentation](http://www.django-rest-framework.org/topics/documenting-your-api/#django-rest-swagger)

## How to install Django Rest Swagger ##

We install the new package

>**Note**: Don't forget to add the new requirements as a required 
> package of your Django project if you have a file for that!
{% highlight bash %}
$ pip install django-rest-swagger
{% endhighlight %}

We add the new package in `INSTALLED_APPS` of the project's settings.
{% highlight python %}
INSTALLED_APPS = [
    ...
    'rest_framework_swagger',
    ...
]
{% endhighlight %}

And just add a new url to consult your documentation

{% highlight python %}
# DOCUMENTATION SWAGGER
url(
    r'^documentation/',
    include('rest_framework_swagger.urls')
),
{% endhighlight %}

## How to use ##

If you go to the url you have defined, you can see an 
autogenerate documentation make with Django Rest Swagger.

Now, you just need to comment your code to upgrade your documentation:

* First line is display all time
* Second line and other are display on the detail of the documentation

{% highlight python %}
class CardDetail(generics.RetrieveAPIView):
    """
    Return detail of a card

    Current user need to be owner of the card
    """

    def get(self, request, *args, **kwargs):
        ...
        # here you code
        ...
        
        return Response(card)
{% endhighlight %}

![Screenshot swagger](https://raw.githubusercontent.com/RignonNoel/RignonNoel.github.io/master/static/img/_posts/DRF-swagger.png?token=ALfs2MlO6pEpGh8gJe1Nq_80wA1pgcn-ks5XkSUfwA%3D%3D  "Screenshot swagger")