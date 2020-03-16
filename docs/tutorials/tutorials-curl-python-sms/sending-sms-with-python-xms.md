---
title: Sending SMS With Python
hidden: 'true'
excerpt: >-
  In this tutorial, you will use the Sinch SMS Pyton module to send SMS messages and to template your messages. Learn more here...
---

## Introduction

In this tutorial we're going to utilize our HTTP REST Messaging API. Wow that's a beautiful name, right? Let us just call it *XMS API*, that feels a lot better!

## Prerequisites

> 1. You have created your Sinch account, if you don't have one, create one [here](https://www.sinch.com/sign-up/) and get some free credits to try the API out :fire:
> 2. You have `python` and `pip` installed. If you don't, you can read about how to do it on your system [here](https://www.python.org/downloads/) and for `pip` [here](https://pip.pypa.io/en/stable/installing/).
> 3. Install the [Sinch Library](https://pypi.org/project/clx-sdk-xms/) (clx-sdk-sms, it's a legacy name :cocktail:).
      `pip install clx-sdk-xms`

### Credentials

If you don't already have an API configured, go to your API Overview and click on the *Add new REST API* button. Your credentials will be generated and shown within seconds!

> 1. [Login](https://dashboard.sinch.com/login) to the dashboard.
> 2. Go to your [API Overview](https://dashboard.sinch.com/sms/api/rest) and find your *Service Plan ID* and *API Token*. Keep them close, we'll need them later.

## Time to code!

Let us first set up our imports, we'll need two modules from the `clx-sdk-xms` package. The finished code can be found [here](doc:sending-sms-with-python-xms#section-code).

```python
import clx.xms.client as sinchClient
import clx.xms.api as api
```

Next we want to set up our credentials, endpoint and a timeout:

```python
service_plan_id = '{service_plan_id}'
api_token = '{api_token}'
endpoint = 'https://us.sms.api.sinch.com/xms' # URL to XMS endpoint
timeout = 30 # Connection and read timeout, in seconds
```

In the next step we'll need to initiate the `sinchCLient`. The client uses the [Requests](https://requests.readthedocs.io/en/master/) library to communicate with the XMS endpoints. It's intended to be a long lived object and can handle several requests.

Lets initiate the client!

```python
client = sinchClient.Client(service_plan_id, api_token, endpoint, timeout)
```

Now to the fun part, sending a message! For clarity we'll just set up the parameters for the requestbody in variables.


> **Note**
>
> If you're using a trial account your message will be sent from an *random* number with a *generic test message*. However, we *still* need to add a number in the `sender_phonenumber` variable.

We'll also make use of the parameterization of the message body, so we can send a personalized message to our recipients. Read more about parameterization [here](doc:sms-rest#section-parameterization).

```python
# Variables for the requestbody
sender_phonenumber = '24321432'
recipients_phonenumbers = ['213353455','+4623454645']
body = 'Hello, ${name}!'
parameters = {
    'name': {
        '213353455' : 'John',
        'default' : 'valued customer'
    }
}
```

The user of the phonenumber `213353455` will recieve the message `Hello, John!` while our other recipient, `+4623454645` will recieve the default message `Hello, valued customer!`. Beautiful!

Now, lets send those messages!

```python
try:
    message_params = api.MtBatchTextSmsCreate()
    message_params.sender = sender_phonenumber
    message_params.recipients = recipients_phonenumbers
    message_params.parameters = parameters
    message_params.body = body
    batch = client.create_batch(message_params)
    print('The batch was given ID %s' % batch.batch_id)
except Exception as ex:
    print('Error creating batch: %s' % str(ex))
```

`MtBatchTextSmsCreate` is a class that describes the fields of the SMS batch and `client.create_batch` creates the batch and returns the *sent* batch, but also adds some [parameters](doc:sms-rest#section-response). In our case we're only interested in the `batch_id`. The ID can for example be used later to [update a batch](doc:sms-rest#section-update-a-batch-message) or to [replace a batch](doc:sms-rest#section-replace-a-batch).

## Further reading

We have an in-depth tutorial for our XMS Library [here](https://clxcommunications.github.io/sdk-xms-python/tutorial.html). It's great for getting to know what our XMS API can do!

Also feel free to read more about the XMS API in general at the [documentation site](doc:sms-rest), it contains up-to-date information about, for example, [status](doc:sms-rest#section-http-statuses) and [error](doc:sms-rest#section-error-codes) codes.


## Code

```python
import clx.xms.client as sinchClient
import clx.xms.api as api

# Set up the credentials
service_plan_id = '{service_plan_id}'
api_token = '{api_token}'
endpoint = 'https://us.sms.api.sinch.com/xms'
timeout = 30

client = sinchClient.Client(service_plan_id, api_token, endpoint, timeout)

# Variables for the requestbody
sender_phonenumber = '24321432'
recipients_phonenumbers = ['213353455','+4623454645']
body = 'Hello, ${name}!'
parameters = {
    'name': {
        '+46722324894' : 'John',
        'default' : 'valued customer'
    }
}

try:
    message_params = api.MtBatchTextSmsCreate()
    message_params.sender = sender_phonenumber
    message_params.recipients = recipients_phonenumbers
    message_params.parameters = parameters
    message_params.body = body
    batch = client.create_batch(message_params)
    print('The batch was given ID %s' % batch.batch_id)
except Exception as ex:
    print('Error creating batch: %s' % str(ex))
```
