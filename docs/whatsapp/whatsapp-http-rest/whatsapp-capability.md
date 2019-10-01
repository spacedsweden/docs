---
title: "WhatsApp Capability"
excerpt: "Read how to discover if your users are capable of receiving messages via WhatsApp."
---

## Capability endpoint

The Sinch WhatsApp API offers an endpoint where you can request the WhatsApp capability status for a
specific number or numbers.

#### Request

`GET whatsapp/v1/{bot-id}/capability`

JSON object parameters:


| Name    | Description                      | JSON Type    | Default    | Constraints           | Required |
| ------- | -------------------------------- | ------------ | ---------- | --------------------- | :------: |
| numbers | Array of phone numbers (msisdns) | String array | N/A        | Minimum 1, Maximum 20 | Yes      |

#### Responses

`200 OK`

The response body is a JSON object with the following parameters:

|Name        | Description                         | JSON Type    |
|------------|------------------------------------ |--------------|
|capabilities| List of capability statuses         | String array |

**Capability status**

|Name        | Description                         | JSON Type    |
|------------|------------------------------------ |--------------|
|msisdn      | Msisdn                              | String       |
|capable     | WhatsApp capability status          | boolean      |

`400 Bad Request`

There was an error with your request. The body is a JSON object described [here](doc:whatsapp-introduction#section-http-errors)

`401 Unauthorized`

There was an authentication error with your request. Either you're using incorrect credentials or you're attempting to authenticate
in a region where your bot does not reside. The body is a JSON object described [here](doc:whatsapp-introduction#section-http-errors)
