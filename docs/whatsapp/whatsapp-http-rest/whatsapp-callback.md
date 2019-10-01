---
title: "Callback"
excerpt: "Get to know the callbacks that has been sent via WhatsApp."
---
A callback is a HTTP POST request with a notification made by the Sinch WhatsApp API to a URI of your choosing. The Sinch WhatsApp API expects the receiving server to respond with a response code within the `2xx Success` range. If no successful response is received then the API will either schedule a retry if the error is expected to be temporary or discard the callback if the error seems permanent. The first initial retry will happen 5 seconds after the first try. The next attempt is after 10 seconds, then after 20 seconds, after 40 seconds, after 80 seconds and so on, doubling on every attempt. The last retry will be at 81920 seconds (or 22 hours 45 minutes) after the initial failed attempt.

> **Note**
>
> Sinch offers the possibility to store the callbacks for you, allowing you to poll the API at a later time for delivery reports and inbound message callbacks.
> More information on how to poll this information from the API can be found [here](doc:whatsapp-callback-store).


A callback from the Sinch WhatsApp API will always have the following structure:

|Name          | Description                    | JSON Type     |
|--------------|--------------------------------|---------------|
|type          | Will always be `whatsapp`      | String        |
|statuses      | List of delivery reports      | Object array  |
|notifications | List of inbound messages      | Object array  |

### Delivery report callback

A delivery report contains the status and state of each message sent through the Sinch WhatsApp API.
The format of a delivery report is as follows:

|Name       | Description                                                           | JSON Type |
|-----------|-----------------------------------------------------------------------|-----------|
|status     | The status of the message, either `success` or `failure`              | String    |
|state      | The state of the message                                              | String    |
|message_id | The message id of the message to which this delivery report belong to | String    |
|details    | Detailed message containing information.                              | String    |
|recipient  | The recipient of the message that this delivery report belong to      | String    |

Where the states means:

| State          | Description                                                                   |
| -------------- | ----------------------------------------------------------------------------- |
| `queued`       | Message has been received and queued by the Sinch WhatsApp API                |
| `dispatched`   | Message has been dispatched by Sinch WhatsApp API to WhatsApp servers         |
| `sent`         | Message has been sent by WhatsApp to end-user                                 |
| `delivered`    | Message has been successfully delivered to end-user by WhatsApp               |
| `read`         | Message has been read by the end-user in the WhatsApp application             |
| `deleted`      | Message has been deleted or expired in the application                        |
| `failed`       | Message has failed                                                            |
| `no_opt_in`    | Message rejected by Sinch API as recipient is not registered to have opted in |
| `no_capability`| Message rejected by the Sinch API as the recipient lacks WhatsApp capability  |

#### Sample delivery report callback

```json
{
  "type": "whatsapp",
  "statuses":[
    {
      "status":"success",
      "state":"delivered",
      "message_id":"asdbas-7sdf78sd-16237smh",
      "recipient": "+46732001122",
    }
  ]
}
```

### Inbound message callback

An inbound message or MO (Mobile Originated) is a message sent to one of your bots from a WhatsApp user.
The format is as follows:

|Name        | Description                                                                 | JSON Type |
|------------|---------------------------------------------------------------------------- |-----------|
|from        | MSISDN of the user sending the message                                      | String    |
|in_group    | Identifier of a group if this message is sent to one of your owned groups   | String    |
|to          | The identifier of the receiving bot                                         | String    |
|replying_to | A context object, present only if the user is replying to a specific thread | Object    |
|message_id  | Generated message id for the inbound message                                | String    |
|message     | Message object describing the inbound message                               | Object    |

**Context**

|Name        | Description                                                                 | JSON Type |
|------------|---------------------------------------------------------------------------- |-----------|
|message_id  | Message Id of the message which is being replied directly to                | String    |
|from        | MSISDN of the user which sent the message with the above message id         | String    |

**Text message**

|Name       | Description                                                           | JSON Type |
|-----------|---------------------------------------------------------------------- |-----------|
|type       | Fixed value `text`                                                    | String    |
|body       | The text of the text message                                          | String    |

##### Sample inbound text message

```json
{
  "type":"whatsapp",
  "notifications":[
    {
      "from":"0732001122",
      "to":"sinchbot",
      "message_id":"asd89-sdfsdfsdjsd-7as8da9",
      "message":{
        "type":"text",
        "body":"Hello bot I want to know something!"
      }
    }
  ]
}
```

**Location message**

|Name       | Description                                                            | JSON Type |
|-----------|----------------------------------------------------------------------- |-----------|
|type       | Fixed value `location`                                                 | String    |
|latitude   | Latitude of location being sent                                        | Number    |
|longitude  | Longitude of location being sent                                       | Number    |
|address    | Address of the location                                                | String    |
|name       | Name of the location                                                   | String    |
|url        | URL for the website where the user downloaded the location information | String    |

##### Sample inbound location message

```json
{
  "type":"whatsapp",
  "notifications":[
    {
      "from":"0732001122",
      "to":"sinchbot",
      "message_id":"asd89-sdfsdfsdjsd-7as8da9",
      "message":{
        "type":"location",
        "lat":55.7047,
        "lng":13.191,
        "name":"Sinch Ideon Lund",
        "address":"Scheelevägen 17"
      }
    }
  ]
}
```

**Contacts**

|Name       | Description                                                        | JSON Type     |
|-----------|------------------------------------------------------------------- |---------------|
|type       | Fixed value `contacts`                                             | String        |
|contacts   | List of contact cards                                              | Object array  |

**Contact card**

|Name       | Description                                                        | JSON Type     |
|-----------|------------------------------------------------------------------- |---------------|
|addresses  | List of contact address(e)                                         | Object array  |
|birthday   | Contact's birthday, YYYY-MM-DD formatted string                    | String        |
|email      | List of of contact email address(es)                               | Object array  |
|name       | List of contact full name information                              | Object array  |
|org        | List of contact organization information                           | Object array  |
|phones     | List of contact phone number(s)                                    | Object array  |
|urls       | List of contact URL(s)                                             | Object array  |

**Contact address**

|Name         | Description                                                        | JSON Type     |
|-------------|--------------------------------------------------------------------|---------------|
|type         | Type of address, `HOME`, `WORK`                                    | String        |
|street       | Street number and address                                          | String        |
|city         | City name                                                          | String        |
|state        | State abbreviation                                                 | String        |
|zip          | ZIP code                                                           | String        |
|country      | Full country name                                                  | String        |
|country_code | Two-letter country abbreviation                                    | String        |

**Contact email**

|Name         | Description                                                        | JSON Type     |
|-------------|--------------------------------------------------------------------|---------------|
|type         | Type of email address, `HOME`, `WORK`                              | String        |
|email        | Email address                                                      | String        |

**Contact name**

|Name           | Description                                                        | JSON Type     |
|---------------|--------------------------------------------------------------------|---------------|
|formatted_name | Full name as it normally appears                                   | String        |
|first_name     | First name                                                         | String        |
|last_name      | Last name                                                          | String        |
|middle_name    | Middle name                                                        | String        |
|suffix         | Name suffix                                                        | String        |
|prefix         | Name prefix                                                        | String        |

**Contact organization**

|Name           | Description                                                        | JSON Type     |
|---------------|--------------------------------------------------------------------|---------------|
|company        | Name of the contact's company                                      | String        |
|department     | Name of the contact's department                                   | String        |
|title          | Contact's business title                                           | String        |

**Contact phone number**

|Name         | Description                                                           | JSON Type     |
|-------------|-----------------------------------------------------------------------|---------------|
|type         | Type of phone number, `CELL`, `MAIN`, `HOME`, `WORK`, `IPHONE`        | String        |
|phone        | Automatically populated with the WhatsApp phone number of the contact | String        |

**Contact URL**

|Name         | Description                                                           | JSON Type     |
|-------------|-----------------------------------------------------------------------|---------------|
|type         | Type of URL `HOME`,  `WORK`                                           | String        |
|url          | URL                                                                   | String        |

##### Sample inbound contact message

```json
{
  "type":"whatsapp",
  "notifications":[
    {
      "from":"0732001122",
      "to":"sinchbot",
      "message_id":"asd89-sdfsdfsdjsd-7as8fr9",
      "message":{
        "type":"contacts",
        "contacts":[
          {
            "addresses":[
              {
                "city":"Menlo Park",
                "country":"United States",
                "country_code":"us",
                "state":"CA",
                "street":"1 Hacker Way",
                "type":"HOME",
                "zip":"94025"
              }
            ],
            "birthday":"2012-08-18",
            "emails":[
              {
                "email":"test@fb.com",
                "type":"WORK"
              }
            ],
            "name":{
              "first_name":"John",
              "formatted_name":"John Smith",
              "last_name":"Smith"
            },
            "org":{
              "company":"WhatsApp",
              "department":"Design",
              "title":"Manager"
            },
            "phones":[
              {
                "phone":"+1 (650) 555-1234",
                "type":"WORK",
                "wa_id":"16505551234"
              }
            ],
            "urls":[
              {
                "url":"https://www.facebook.com",
                "type":"WORK"
              }
            ]
          }
        ]
      }
    }
  ]
}

```

**Media**

|Name       | Description                                                            | JSON Type |
|-----------|------------------------------------------------------------------------|-----------|
|type       | Fixed value `image`, `document`, `audio`, `video`, `voice`             | String    |
|url        | The public url of the media file                                       | String    |
|mime_type  | Mime type of the media file                                            | String    |
|caption    | Caption of the media file                                              | String    |
|filename   | Optional filename, only valid for audio and document                   | String    |

##### Sample inbound image message

```json
{
  "type":"whatsapp",
  "notifications":[
    {
      "from":"0732001122",
      "to":"sinchbot",
      "message_id":"a0189-7df8df4d129-7as8da9",
      "message":{
        "type":"image",
        "url":"http://www.example.com/img.jpg",
        "mime_type":"image/jpeg",
        "caption":"Fantastic headphones"
      }
    }
  ]
}
```

**Error**

|Name       | Description                                                            | JSON Type |
|-----------|------------------------------------------------------------------------|-----------|
|type       | Fixed value `error`                                                    | String    |
|details    | Detailed string describing the error                                   | String    |

##### Sample inbound Error message

```json
{
  "type":"whatsapp",
  "notifications":[
    {
      "from":"0732001122",
      "to":"sinchbot",
      "message_id":"a0189-7df8df4d129-7as8da9",
      "message":{
        "type":"error",
        "details": "Inbound notification not supported"
      }
    }
  ]
}
```
