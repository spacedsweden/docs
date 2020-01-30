---
title: Getting Started
excerpt: >-
  The most feature-rich API Sinch offers. It allows for single messages,
  scheduled batch send-outs using message templates and more.
hidden: 'true'
next:
  pages:
    - sms-rest-formats
  description: Learn about the formats used in the REST API
---
## Service plan

To use the REST API you first need to create an HTTP REST Service using the [web dashboard](https://dashboard.sinch.com/#/signup). You can have multiple service plans and each one will see their messages, groups or other resources isolated from each other.

## Authentication

You will be provided with an authentication token for each service plan.

The token is sent in the `Authorization` header preceded by `Bearer`. It is required for all requests made to the REST API.

**Example request with token to send a SMS**

``` shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "from": "12345",
          "to": [
              "123456789"
          ],
          "body": "Hi there! How are you?"
      }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches"
```

## Base URL

The following URLs can be used by the REST API. We have servers in the US and EU. By default your account will be created in the US environment. If you'd like access to the European environment, please contact our support team.  


| Server        |  URL                                   |
|---------------|----------------------------------------|
| General API | https://us.sms.api.sinch.com     |
| Geographical APIs | If you want to set one up, contact your account manager     |
| US Production | https://us.sms.api.sinch.com     |
| EU Production | https://eu.sms.api.sinch.com     |

## Rate Limits

Each service plan comes with a rate limit which sets the maximum number of messages that can be sent per second. The rate limit is calculated from all messages sent via the API, so a batch with 10 recipients will count as 10 messages for rate limiting purposes.

Each service plan gets it's own message queue served in First-In-First-Out order. This means that new batches will be accepted immediately but might be delayed if earlier batches are still on queue.
