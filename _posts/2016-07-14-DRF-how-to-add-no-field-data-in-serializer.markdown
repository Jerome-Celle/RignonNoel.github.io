---
layout: post
title:  "[DRF] How to add no field data in serializer"
date:   2016-07-14 14:39:00:00 +0400
categories: [Django, Api]
description: ""
---

## Serialization of model method ##

I needed to serialize dynamic field (method) of my models. So here is 
a good way to do that: 

**Model**

Here we need to serialize a model named `Instance` and we want 
serialize the method `have_access()` of the model.

It's very important that the method get only `self` as attribute, in 
this way it's a property of the model.

{% highlight python %}
class Instance(models.Model):
    """
    Instance of server
    """
    class Meta:
        verbose_name_plural = 'Instances'

    ...
    # Here you need to put your fields
    ...

    def have_access(self):
        """
        Check ticket of access
        ie: because user take a new access ticket each time he pay
        """
        # here ticket's model have a foreign key to Instance
        for ticket in self.tickets.all():
            if ticket.is_active():
                return True
        return False
{% endhighlight %}

**Serializer**

Now we have a property on the model, we just need to add them as a field
{% highlight python %}
class InstanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Instance
        fields = (
            'id',
            ...
            'have_access'
        )
        read_only_fields = (
            'id',
            ...
            'have_access',
        )
{% endhighlight %}

## Creation of new field ##

Here we want to add the number of `Flag` (foreign key) of a `Message`:

{% highlight python %}
class MessageSerializer(serializers.ModelSerializer):

    number_of_flag = serializers.IntegerField(
        source='flags.count',
        read_only=True
    )
    
    class Meta:
        model = Message
        fields = (
            'id', 
            ...
            'number_of_flag'
        )

{% endhighlight %}
