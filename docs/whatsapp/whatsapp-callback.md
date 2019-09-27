---
title: "Callback"
excerpt: "Get to know the callbacks that has been sent via WhatsApp."
---
A callback is a HTTP POST request with a notification made by the Sinch WhatsApp API to a URI of your choosing. The Sinch WhatsApp API expects the receiving server to respond with a response code within the `2xx Success` range. If no successful response is received then the API will either schedule a retry if the error is expected to be temporary or discard the callback if the error seems permanent. The first initial retry will happen 5 seconds after the first try. The next attempt is after 10 seconds, then after 20 seconds, after 40 seconds, after 80 seconds and so on, doubling on every attempt. The last retry will be at 81920 seconds (or 22 hours 45 minutes) after the initial failed attempt.

### Delivery report callback

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

### Inbound message callback

*Request Body Schema*  
- application/json

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
    <tr>
    <th>Name</th>
    <th>Description</th>
    </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>type</td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"whatsapp"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>notifications*</td>
          <td><span class="type-grey">Array of object (Notification)</span>
            Array of notification objects. These are responses that the users send back which the bot can act upon.</td>
        </tr>
        <tr class="row-odd">
          <td>statuses*</td>
          <td><span class="type-grey">Array of object (Status)</span>
            Array of status updates. Such as delivered/read events.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### notifications

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>from</td>
          <td><span class="type-grey">string</span> <br> The originator of this message</td>
        </tr>
        <tr class="row-even">
          <td>message_id</td>
          <td><span class="type-grey">string</span> <br> Generated message id for this notification</td>
        </tr>
        <tr class="row-odd">
          <td>message*</td>
          <td><span class="type-grey">NotificationTextMessage (object) or</span>
            <span class="type-grey">NotificationLocationMessage (object) or</span>
            <span class="type-grey">NotificationContactsMessage (object) or</span>
            <span class="type-grey">NotificationMediaMessage (object)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

The message key can be one of the following:

##### message

###### NotificationTextMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>type</td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"text"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>body</td>
          <td><span class="type-grey">string</span> <br> The text of the text message</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### NotificationLocationMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>type</td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"location"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>latitude</td>
          <td><span class="type-grey">number</span> [-90..90]</td>
        </tr>
        <tr class="row-odd">
          <td>longitude</td>
          <td><span class="type-grey">number</span> [-180..180]</td>
        </tr>
        <tr class="row-even">
          <td>name</td>
          <td><span class="type-grey">string</span> <br> The name for the location. Will be displayed in the message.</td>
        </tr>
        <tr class="row-odd">
          <td>address</td>
          <td><span class="type-grey">string</span> <br> The address for the location. Will be displayed in the message.</td>
        </tr>
        <tr class="row-even">
          <td>url</td>
          <td><span class="type-grey">string</span> <br> Optional url for the location.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### NotificationContactsMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"contacts"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>contacts* <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of object (ContactCard)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### NotificationMediaMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            Enum: <code class="docutils literal notranslate"><span class="pre">"image"</span></code> <code class="docutils literal notranslate"><span class="pre">"document"</span></code> <code class="docutils literal notranslate"><span
                class="pre">"audio"</span></code> <code class="docutils literal notranslate"><span class="pre">"video"</span></code> <code class="docutils literal notranslate"><span class="pre">"voice"</span></code>
            What type of media this object is.</td>
        </tr>
        <tr class="row-even">
          <td>url <br>
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The url where to download the media file from.</td>
        </tr>
        <tr class="row-odd">
          <td>mime_type <br>
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The mime type of this file.</td>
        </tr>
        <tr class="row-even">
          <td>caption</td>
          <td><span class="type-grey">string</span>
            Optional description of this resource.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### statuses

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
    </thead>
      <tbody>
        <tr class="row-odd">
          <td>message_id</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>recipient</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>status</td>
          <td><span class="type-grey">string</span> <br> Enum: <code class="docutils literal notranslate"><span class="pre">"success"</span></code> <code class="docutils literal notranslate"><span class="pre">"failure"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>state</td>
          <td><span class="type-grey">string</span> <br> Enum: <code class="docutils literal notranslate"><span class="pre">"queued"</span></code> <code class="docutils literal notranslate"><span class="pre">"dispatched"</span></code> <code
              class="docutils literal notranslate"><span class="pre">"sent"</span></code> <code class="docutils literal notranslate"><span class="pre">"delivered"</span></code> <code class="docutils literal notranslate"><span
                class="pre">"read"</span></code> <code class="docutils literal notranslate"><span class="pre">"deleted"</span></code> <code class="docutils literal notranslate"><span class="pre">"no_capability"</span></code> <code
              class="docutils literal notranslate"><span class="pre">"no_opt_in"</span></code> <code class="docutils literal notranslate"><span class="pre">"failed"</span></code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Responses

**202 Your server implementation should return this HTTP status code if the data was received successfully.**
*Response schema: application/json*

### Request samples

**POST**
```text
/pre-registered-callback-url
```

Notification messages can be of one of the following Text, Location, Contacts or Media.

#### Sample notification messages

##### Text

```json
{
  "statuses":[
    {
      "message_id":"asdbas-7sdf78sd-16237smh",
      "recipient": "+46732001122",
      "status":"success",
      "state":"delivered"
    }
  ],
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

##### Media

```json
{
  "statuses":[
    {
      "message_id":"aa001-7sdf78ac-16567fef",
      "recipient":"+46732001122",
      "status":"success",
      "state":"delivered"
    }
  ],
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

##### Contacts

```json
{
  "statuses":[
    {
      "message_id":"asdbas-7sdf78sd-16237gtf",
      "recipient":"+46732001122",
      "status":"success",
      "state":"delivered"
    }
  ],
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

##### Location

```json
{
  "statuses":[
    {
      "message_id":"asdbas-7sdf78sd-16237tyf",
      "recipient":"+46732001122",
      "status":"success",
      "state":"delivered"
    }
  ],
  "notifications":[
    {
      "from":"0732001122",
      "to":"sinchbot",
      "message_id":"asd89-sdfsdfsdjsd-7as8fr9",
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
