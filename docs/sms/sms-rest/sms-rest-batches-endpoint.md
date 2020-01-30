---
title: Batches Endpoint
excerpt: >-
  The most feature rich API Sinch offers. It allows for single messages,
  scheduled batch send-outs using message templates and more.
hidden: 'true'
next:
  pages:
    - sms-rest-inbounds-endpoint
    - sms-rest-groups-endpoint
    - sms-rest-automatic-default-originator
    - sms-rest-limiting-message-parts
    - sms-rest-url-link-previews
---
### Send a batch message

The following operation will send a batch message.

Depending on the length of the *body* one message might be [split into multiple parts](doc:sms-rest-message-body#section-long-messages) and charged accordingly.

Any groups targeted in a scheduled batch will be evaluated at the time of sending. If a group is deleted between batch creation and scheduled date it will be considered empty.

#### Request

`POST /xms/v1/{service_plan_id}/batches`

JSON body fields:

|Name                               |Description                                                                                                        |JSON Type         |Default             |Constraints                                                                    |Required                                      |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------|:----------------:|--------------------|:-----------------------------------------------------------------------------:|:--------------------------------------------:|
|to                                 |List of MSISDNs and group IDs that will receive the batch                                                          |   String array   |N/A                 |                               1 to 1000 elements                               |                     Yes                      |
|from                               |Sender number                                                                                                      |      String      |N/A                 |               Must be valid MSISDN, short code or alphanumeric.               |If Automatic Default Originator not configured|
|type                               |Identifies the type of batch message                                                                               |      String      |mt_text             |                     Valid types are mt_text and mt_binary                     |                     Yes                      |
|body                               |The message content. Normal text string for mt_text and Base64 encoded for mt_binary                               |      String      |N/A                 | Max 1600 chars for mt_text and max 140 bytes together with udh for mt_binary  |                     Yes                      |
|udh                                |The UDH header of a binary message                                                                                 |HEX encoded string|N/A                 |                       Max 140 bytes together with body                        |             If type is mt_binary             |
|campaign_id                        |The campaign/service ID this message belongs to. US only.                                                          |      String      |N/A                 |                                     None                                      |                      No                      |
|delivery_report                    |Request delivery report callback. Note that delivery reports can be fetched from the API regardless of this setting|      String      |none                |             Valid types are none, summary, full and per_recipient             |                     Yes                      |
|send_at                            |If set in the future the message will be delayed until send_at occurs                                              | ISO-8601 string  |Now                 |Must be before expire_at. If set in the past messages will be sent immediately.|                      No                      |
|expire_at                          |If set the system will stop trying to deliver the message at this point                                            | ISO-8601 string  |3 days after send_at|                             Must be after send_at                             |                      No                      |
|callback_url                       |Override the default callback URL for this batch                                                                   |    URL string    |N/A                 |                  Must be valid URL. Max 2048 characters long                  |                      No                      |
|flash_message                      |Shows message on screen without user interaction while not saving the message to the inbox                         |     Boolean      |false               |                                 true or false                                 |                                              |
|parameters                         |Contains the parameters that will be used for customizing the message for each recipient                           |      Object      |N/A                 |                    Not applicable to if type is mt_binary                     |                      No                      |
|parameters.{parameter_key}         |The name of the parameter that will be replaced in the message body                                                |      String      |N/A                 |    Letters A-Z and a-z, digits 0-9 and .-_ allowed. Max 16 characters long    |                      No                      |
|parameters.{parameter_key}.{msisdn}|The recipient that should get this value                                                                           |      String      |N/A                 |                            Max 160 characters long                            |                      No                      |
|parameters.{parameter_key}.default |The fall back value for omitted recipient MSISDNs                                                                  |      String      |None                |                            Max 160 characters long                            |                      No                      |
|client_reference                   |The client identifier of batch message. If set, it will be added in the delivery report/callback of this batch     |      String      |N/A                 |                            Max 128 characters long                            |                      No                      |
|max_number_of_message_parts        |Message will be dispatched only if it is not split to more parts than Max Number of Message Parts                  |      String      |N/A                 |                           Must be higher or equal 1                           |                      No                      |

**Send message to one recipient**
```shell
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


**Send message to two recipients**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "from": "12345",
          "to": [
              "123456789",
              "987654321"
          ],
          "body": "Hi there! How are you?"
      }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches"
```


#### Response

`201 Created`

The batch was successfully created. The JSON response object contains the request parameters as well as the following additional parameters:

|Name       |Description                                     |JSON Type      |
|-----------|------------------------------------------------|:-------------:|
|id         |Unique identifier for batch                     |    String     |
|created_at |Timestamp for when batch was created.           |ISO-8601 String|
|modified_at|Timestamp for when batch was last updated.      |ISO-8601 String|
|canceled   |Indicates if the batch has been canceled or not.|    Boolean    |

`400 Bad Request`

There was an error with your request. The body is a JSON object described in rest\_http\_errors. Possible error codes include `syntax_invalid_json`, `syntax_invalid_parameter_format` and `syntax_constraint_violation`.

`403 Forbidden`

The system was not able to fulfill your request. The body is a JSON object described in rest\_http\_errors. Possible error codes include `unknown_group`, `unknown_campaign` and `missing_callback_url`.

Response for a successfully created batch message.

**JSON**
```json
{
    "from": "12345",
    "to": [
        "123456789",
        "987654321"
    ],
    "body": "Hi there! How are you?",
    "id": "{batch_id}",
    "created_at": "2014-10-02T09:34:28.542Z",
    "modified_at": "2014-10-02T09:34:28.542Z",
    "canceled": "False"
}
```


Send scheduled batch message with expiry.

**Scheduled batch message**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "from": "12345",
          "to": [
              "123456789",
              "987654321"
          ],
          "body": "Hi there! How are you?",
          "send_at": "2014-10-02T09:30Z",
          "expire_at": "2014-10-02T12:30Z"
      }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches"
```


**Batch message with custom delivery report URL**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
          "from": "12345",
          "to": [
              "123456789",
              "987654321"
          ],
          "body": "Hi there! How are you?",
          "delivery_report": "summary",
          "callback_url": "http://www.example.com"
      }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches"
```


**Parameterized message**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
      "from": "12345",
      "to": [
          "123456789",
          "987654321"
       ],
      "body": "Hi ${name}! How are you?",
      "parameters": {
          "name": {
              "123456789": "Joe",
              "default": "there"
           }
      }
  }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches"
```


### Cancel batch message

A batch can be canceled at any point. If a batch is canceled while it's currently being delivered some messages currently being processed might still be delivered. The delivery report will indicate which messages were canceled and which weren't.

Canceling a batch scheduled in the future will result in an empty delivery report while canceling an already sent batch would result in no change to the completed delivery report.

#### Request

`DELETE /xms/v1/{service_plan_id}/batches/{batch_id}`

#### Response

`200 OK`

The response is a JSON object described in send\_batch\_msg.

**Cancel a batch message**
```shell
curl-X DELETE \
   -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{batch_id}"
```


### List batch messages

With the list operation you can list batch messages created in the last 14 days that you have created. This operation supports pagination.

Batches are returned in reverse chronological order.

#### Request

`GET /xms/v1/{service_plan_id}/batches`

Query parameters:

|Name                |Description                                                                                                                 |Type                                                                   |Default|Constraints                  |Required|
|--------------------|----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------:|:-----:|-----------------------------|:------:|
|page                |The page number starting from 0                                                                                             |                                Integer                                |   0   |0 or larger                  |   No   |
|page_size           |Determines the size of a page                                                                                               |                                Integer                                |  30   |Max 100                      |   No   |
|to                  |Only list messages set to this destination. Multiple destinations can be comma separated.                                   |                         MSISDN or short code                          |  No   |No                           |   No   |
|start_date          |Only list messages received at or after this date time.                                                                     |                               ISO-8601                                |Now-24 |Must be valid ISO-8601 string|   No   |
|end_date            |Only list messages received before this date time.                                                                          |                               ISO-8601                                |  No   |Must be valid ISO-8601 string|   No   |

#### Response

`200 OK`

|Name                |Description                                                                                                                 |JSON Type                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------:|
|page                |The requested page                                                                                                          |                                Integer                                |
|page_size           |The number of batches returned in this request                                                                              |                                Integer                                |
|count               |The total number of batches matching the given filters                                                                      |                                Integer                                |
|batches             |The page of batches matching the given filters                                                                              |Array of objects described in [Send a batch message](#send-a-batch-mess|

### Dry run a batch

This operation will perform a dry run of a batch which calculates the bodies and number of parts for all messages in the batch without actually sending any messages.

#### Request

`POST /xms/v1/{service_plan_id}/batches/dry_run`

The request body is a JSON object described in send\_batch\_msg request.

Query parameters:

| Name                   | Description                                                                   | Type    | Default | Constraints | Required |
|-- -                    | ---                                                                           | ---     | ---     | ---         | ---    --|
| per\_recipient         | Whether to include per recipient details in the response                      | Boolean | false   |             | No       |
| number\_of\_recipients | Max number of recipients to include per recipient details for in the response | Integer | 100     | Max 1000    | No       |


#### Response

`200 OK`

The number of recipients in the batch, the number of messages in the batch and an array containing detail for each recipient:

|Name                |Description                                                                                                                 |JSON Type                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------:|
|number_of_recipients|The number of recipents in the batch                                                                                        |                                integer                                |
|number_of_messages  |The total number of SMS message parts to be sent in the batch                                                               |                                integer                                |
|per_recipient       |The recipient, the number of message parts to this recipient, the body of the message, and the encoding type of each message|Array of message objects containing fields with the aforementioned data|

`400 Bad request`

There was an error with your request. The body is a JSON object described in rest\_http\_errors. Possible error codes include **syntax\_invalid\_json**, **syntax\_invalid\_parameter\_format** and **syntax\_constraint\_violation**.

**Dry run a batch**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
      "from": "12345",
      "to": [
          "123456789",
          "987654321"
       ],
      "body": "Hi ${name}! How are you?",
      "parameters": {
          "name": {
              "123456789": "Joe",
              "default": "there"
           }
      }
  }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/dry_run"
```


### Retrieve a batch message

This operation retrieves a specific batch with the provided batch ID.

#### Request

`GET /xms/v1/{service_plan_id}/batches/{batch_id}`

#### Response

`200 OK`

The response is a JSON object described in send\_batch\_msg response.

`404 Not Found`

If the batch ID is unknown to the system.



**Retrieve a batch**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{batch_id}"
```


**Retrieve the first 30 batches from the last 24 hours**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches"
```


**Retrieve the third page of batches with a page size of 50 from the last 24 hours**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches?page=2&page_size=50"
```


**Retrieve batches created on June 23rd, 2014 UTC**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches?start_date=2014-06-23&end_date=2014-06-24"
```


**Retrieve the batches sent from 12345 or 54321**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches?from=12345,54321"
```


### Update a batch message

This operation will update all provided parameters of a batch for the given batch ID.

#### Request

`POST /xms/v1/{service_plan_id}/batches/{id}`

JSON body fields:

|Name                |Description                                                                                                                 |Type                                                                   |Default             |Constraints                                                                    |Required|
|--------------------|----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------:|:------------------:|-------------------------------------------------------------------------------|:------:|
|toAdd               |List of MSISDNs and group IDs to add to the batch.                                                                          |                             String array                              |                    |1 to 100 elements.                                                             |   No   |
|toRemove            |List of MSISDNs and group IDs to remove from the batch.                                                                     |                             String array                              |                    |1 to 100 elements.                                                             |   No   |
|from                |Sender number                                                                                                               |                                String                                 |                    |Must be valid MSISDN, short code or alphanumeric.                              |   No   |
|body                |The message content. Normal text string for mt_text and Base64 encoded for mt_binary.                                       |                                String                                 |                    |Max 1600 chars for mt_text and max 140 bytes together with udh for mt_binary   |   No   |
|campaign_id         |The campaign/service ID this message belongs to. US only.                                                                   |                                String                                 |                    |                                                                               |   No   |
|delivery_report     |Request delivery report callback. Note that delivery reports can be fetched from the API regardless of this setting.        |                                String                                 |        none        |Valid types are none, summary, full and per_recipient                          |   No   |
|send_at             |If set in the future the message will be delayed until send_at occurs.                                                      |                            ISO-8601 string                            |        Now         |Must be before expire_at. If set in the past messages will be sent immediately.|   No   |
|expire_at           |If set the system will stop trying to deliver the message at this point                                                     |                            ISO-8601 string                            |3 days after send_at|Must be after send_at                                                          |   No   |
|callback_url        |Override the default callback URL for this batch                                                                            |                              URL string                               |                    |Must be valid URL. Max 2048 characters long.                                   |   No   |

#### Response

`200 OK`

The response is a JSON object described in send\_batch\_msg response.

`400 Bad request`

There was an error with your request. The body is a JSON object described in rest\_http\_errors. Possible error codes include **syntax\_invalid\_json**, **syntax\_invalid\_parameter\_format** and **syntax\_constraint\_violation**.

`403 Forbidden`

+The system was not able to fulfill your request. The body is a JSON object described in rest\_http\_errors. +Possible error codes include **batch\_already\_dispatched**.

**Update batch**
```shell
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
      "from": "12345",
      "toAdd": [
          "123456789",
          "987654321"
       ],
      "toRemove": [
          "111111111",
          "999999999"
       ],
      "body": "Hi ${name}! How are you?"

  }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{id}"
```


### Replace a batch

This operation will replace all the parameters of a batch with the provided values. Effectively the same as cancelling then batch and sending a new one instead.

#### Request

`PUT /xms/v1/{service_plan_id}/batches/{id}`

The request body is a JSON object described in send\_batch\_msg request.

#### Response

`200 OK`

The response is a JSON object described in send\_batch\_msg response.

`400 Bad request`

There was an error with your request. The body is a JSON object described in rest\_http\_errors. Possible error codes include **syntax\_invalid\_json**, **syntax\_invalid\_parameter\_format** and **syntax\_constraint\_violation**.

**Replace batch**
```shell
curl -X PUT \
     -H "Authorization: Bearer {token}" \
     -H "Content-Type: application/json"  -d '
      {
      "from": "12345",
      "to": [
          "123456789",
          "987654321"
       ],
      "body": "Hi ${name}! How are you?",
      "parameters": {
          "name": {
              "123456789": "Joe",
              "default": "there"
           }
      }
  }' \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{id}"
```


### Retrieve a delivery report

Delivery reports can be retrieved even if no callback was requested. The difference between a summary and a full report is only that the full report contains the actual MSISDNs for each status code.

#### Request

`GET /xms/v1/{service_plan_id}/batches/{batch_id}/delivery_report`

Query parameters:

| Name   | Description                                                        | Type   | Default | Constraints             | Required |
|-- -    | ---                                                                | ---    | ---     | ---                     | ---    --|
| type   | The type of delivery report                                        | String | summary | Must be summary or full | Yes      |
| status | Comma separated list of delivery\_report\_statuses to include      | String | N/A     | N/A                     | No       |
| code   | Comma separated list of delivery\_receipt\_error\_codes to include | String | N/A     | N/A                     | No       |

#### Response

`200 OK`

The response is a JSON object with the following fields:

|Name                |Description                                                                                                                 |JSON Type                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------:|
|type                |The object type. Will always be delivery_report_sms                                                                         |                                String                                 |
|batch_id            |The ID of the batch this delivery report belongs to                                                                         |                                String                                 |
|total_message_count |The total number of messages for the batch                                                                                  |                                String                                 |
|statuses            |Array with status objects. Only status codes with at least one recipient will be listed.                                    |                                Object                                 |
|statuses.code       |The detailed status code. See Error Codes                                                                                   |                                Integer                                |
|statuses.status     |The simplified status as described in Delivery Report Statuses                                                              |                                String                                 |
|statuses.count      |The number of messages that currently has this code. Will always be at least 1                                              |                                Integer                                |
|statuses.recipients |Only for full report. A list of the MSISDN recipients which messages has this status code.                                  |                             String array                              |
|client_reference    |The client identifier of the batch this delivery report belongs to, if set when submitting batch.                           |                                String                                 |

`404 Not Found`

The batch ID is not known to the system or the delivery report type is not recognized.

**Request summary report**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{batch_id}/delivery_report"
```


**Summary report response**
```json
{
    "type": "delivery_report_sms",
    "batch_id": "{batch_id}",
    "total_message_count": 3,
    "statuses": [
        {
            "code": 400,
            "status": "Queued",
            "count": 1
        },
        {
            "code": 0,
            "status": "Delivered",
            "count": 2
        }
    ]
}
```




**Request full report**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{batch_id}/delivery_report?type=full"
```


**Full report response**
```json
{
    "type": "delivery_report_sms",
    "batch_id": "{batch_id}",
    "total_message_count": 3,
    "statuses": [
        {
            "code": 400,
            "status": "Queued",
            "count": 1,
            "recipients": [
                "123456789"
            ]
        },
        {
            "code": 0,
            "status": "Delivered",
            "count": 2,
            "recipients": [
                "987654321",
                "123459876"
            ]
        }
    ]
}
```


### Retrieve a recipient delivery report

A recipient delivery report contains the message status for a single recipient MSISDN.

#### Request

`GET /xms/v1/{service_plan_id}/batches/{batch_id}/delivery_report/{recipient_msisdn}`

**Request report for 123456789**
```shell
curl -H "Authorization: Bearer {token}" \
  "https://eu.sms.api.sinch.com/xms/v1/{service_plan_id}/batches/{batch_id}/delivery_report/123456789"
```


#### Response

**Recipient delivery report for 123456789**
```json
{
    "type": "recipient_delivery_report_sms",
    "batch_id": "{batch_id}",
    "recipient": "123456789",
    "code": "0",
    "status": "Delivered",
    "at": "2016-10-02T09:34:18.542Z",
    "operator_status_at": "2016-10-02T09:34:18.101Z"
}
```


`200 OK`

The response is a JSON object with the following fields:

|Name                |Description                                                                                                                 |JSON Type                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------------------------|:---------------------------------------------------------------------:|
|type                |The object type. Will always be _recipient_delivery_report_sms                                                              |                                String                                 |
|batch_id            |The ID of the batch this delivery report belongs to                                                                         |                                String                                 |
|recipient           |The recipient MSISDN                                                                                                        |                                String                                 |
|code                |The detailed status code. See Error Codes                                                                                   |                                Integer                                |
|status              |The simplified status as described in Delivery Report Statuses                                                              |                                String                                 |
|status_message      |A description of the status, if available.                                                                                  |                                String                                 |
|at                  |A timestamp of when the Delivery Report was created in the Sinch service                                                    |                            ISO-8601 String                            |
|operator_status_at  |A timestamp extracted from the Delivery Receipt from the originating SMSC                                                   |                            ISO-8601 String                            |
|client_reference    |The client identifier of the batch this delivery report belongs to, if set when submitting batch.                           |                                String                                 |
|applied_originator  |The default originator used for the recipient this delivery report belongs to, if default originator pool configured and no originator set when submitting batch.|                                String                                 |
|number_of_message_parts|The number of parts the message was split into. Present only if `max_number_of_message_parts` parameter was set.              |                                Integer                                |

`404 Not Found`

The batch ID is not known to the system or the recipient is not a target of this batch.

### Receiving delivery report callbacks

Delivery report callbacks will be received for batches where *delivery\_report* parameter is set to *summary*, *full* or *per\_recipient*.

If no *callback\_url* was specified for the batch then the default callback URL for the given service plan will be used.

#### Summary and full

If a batch was created with a request for *full* or *summary* *delivery report* then one callback will be made to the specified callback URL when all messages in the batch (which may be one message) are either delivered, failed or expired. If you want to know the delivery status for a message before all messages are completed then you can always use retrieve\_delivery\_report at any time.

The format for summary and full reports is the same as the retrieve\_delivery\_report response. The difference being that when *full* is requested a list of phone numbers / recipients per delivery status is provided.

#### Per recipient

If a batch was created with a request for *per\_recipient* *delivery\_report* then a callback will be made for each status change of a message. This could result in a lot of callbacks and should be **used with caution for larger batches**. These delivery reports also include a timestamp of when the Delivery Report originated from the SMSC.
