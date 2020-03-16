---
title: Capability Check Endpoint
excerpt: 'Check whether a MSISDN is using an RCS-capable handset and network'
---


The capability check endpoint allows you to check the specific RCS capabilities for a given MSISDN.

> **Important**
>
> The RCS capability check is in beta and may return incorrect results under certain circumstances. For further information, please contact your Sinch account manager.


### Request

**`GET`** `/rcs/v1/{agent_id}/capabilities?msisdn={msisdn}`

#### Path parameters

| Field     | Type   | Description                          | Default | Constraints                   | Required |
| --------- | ------ | -------------------------------------| ------- | ----------------------------- | -------- |
| agent\_id | string | ID of the agent to be used           | No      | No                            | Yes      |
| msisdn    | string | MSISDN of the handset to be checked  | No      | Must be a valid E.164 number * | Yes      |

\* See [https://en.wikipedia.org/wiki/E.164](https://en.wikipedia.org/wiki/E.164)

#### Request Body

Empty

##### Request example

```curl
$ curl -X GET https://us.api.sinch.com/rcs/v1/my-agent-id/capabilities?msisdn=447556884545 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer zIMEJGfwD4oJ4qObPPjwZxwiP5cKARXRJpt9Kf6GSv7uOesvRV"
```

### Response
Returns a capabilites object on success, or an error description on failure

#### Response examples

##### 200 Success

```json
{
    "at": "2020-03-03T10:55:10.624+0000",
    "msisdn": "447391992064",
    "capabilities": [
        "callComposer",
        "videoCall",
        "chatBotCommunication",
        "fileTransfer",
        "geolocationPush",
        "chat"
    ],
    "rcs_enabled": true
}
```

##### Error (404 example)

```json
{
    "ref_id": "0170a009-eafe-0dea-995f-61cdcdd1b50e",
    "error": "Subscriber not found",
    "error_code": 1014,
    "field_errors": [
        {
            "field": "msisdn",
            "errors": [
                "46702948803 could not be reached by any provisioned supplier"
            ]
        }
    ]
}
```
#### Response Details

| Capability            | Description                                       |
| --------------------- | ------------------------------------------------- |
| callComposer          | Enrich calling pre-call setup                     |
| videoCall             | Video calling                                     |
| chatBotCommunication  | Rich Card and Suggested Chip List                 |
| fileTransfer          | Standalone file transfer and AMR audio message    |
| geolocationPush       | Geolocation information                           |
| chat                  | Text message                                      |

#### Response Codes

| Code      | Response          | Description                                                                           |
| --------- | ----------------- | ------------------------------------------------------------------------------------- |
| 200       | OK                | The request was successful                                                            |
| 403       | Forbidden         | The agent failed to authenticate with the underlying supplier                         |
| 404       | Not Found         | Subscriber not found                                                                  |
| 502       | Bad Gateway       | Unable to send request due to an issue with service provider / operator, please retry |
| 504       | Gateway Timeout   | The underlying supplier did not respond in a timely manner                            |