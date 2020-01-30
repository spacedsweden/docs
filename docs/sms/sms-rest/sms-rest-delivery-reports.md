---
title: Delivery Reports
excerpt: ''
hidden: 'true'
next:
  pages:
    - sms-rest-batches-endpoint
    - sms-rest-inbounds-endpoint
    - sms-rest-groups-endpoint
  description: Learn about the REST API endpoints
---
The REST API uses message statuses and error codes in delivery reports, which refer to the state of the SMS batch and can be present in either [Retrieve a delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-delivery-report) or sent to a [callback](doc:sms-rest-callback).

This section describes the statuses and codes returned in those delivery reports.

### Delivery Report Statuses

The status field describes which state a particular message is in. Please note that statuses of type Intermediate will only be reported if you request a status per recipient ([Retrieve a recipient delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-recipient-delivery-report)), no callback will be made to report them. The following statuses are available when using the REST API:

| Status     | Type         | Description       |
|------------|--------------|-------------------|
| Queued     | Intermediate | Message is queued within REST API system and will be dispatched according to the rate of the account.                                         |
| Dispatched | Intermediate | Message has been dispatched and accepted for delivery by the SMSC.                                                                            |
| Aborted    | Final        | Message was aborted before reaching the SMSC.                                                                                                 |
| Rejected   | Final        | Message was rejected by the SMSC.                                                                                                             |
| Delivered  | Final        | Message has been delivered.                                                                                                                   |
| Failed     | Final        | Message failed to be delivered.                                                                                                               |
| Expired    | Final        | Message expired before delivery to the SMSC. This may happen if the expiry time for the message was very short.                               |
| Unknown    | Final        | Message was delivered to the SMSC but no Delivery Receipt has been received or a Delivery Receipt that could not be interpreted was received. |

### Delivery Report Error Codes

The delivery report status code provides a more detailed view of what happened with a message. The REST API shares most of its error codes with other SMS services.

These are defined [here](doc:sms-other-cloud-smpp#section-error-codes).

In addition to these standard error codes, the REST API provides an additional set of error codes, all within the 4xx range (vendor specific errors in the range of 0x400 to 0x4FF as referenced in the SMPP specification). These are listed below:

| Status Code (Hex) | Name                         | Status     | Description                                                                                                                         |
| ----------------- | ---------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 400               | Queued                       | Queued     | Message is queued within REST API system and will be dispatched according to the rate of the account.                               |
| 401               | Dispatched                   | Dispatched | Message has been dispatched to SMSC.                                                                                                |
| 402               | Message unroutable           | Aborted    | SMSC rejected message. Retrying is likely to cause the same error.                                                                  |
| 403               | Internal error               | Aborted    | An unexpected error caused the message to fail.                                                                                     |
| 404               | Temporary delivery failure   | Aborted    | Message failed because of temporary delivery failure. Message can be retried.                                                       |
| 405               | Unmatched Parameter          | Aborted    | One or more parameters in the message body has no mapping for this recipient. See [Parameterization](doc:sms-rest-parameterization) |
| 406               | Internal Expiry              | Aborted    | Message was expired before reaching SMSC. This may happen if the expiry time for the message was very short.                        |
| 407               | Canceled                     | Aborted    | Message was canceled by user before reaching SMSC.                                                                                  |
| 408               | Internal Reject              | Aborted    | SMSC rejected the message. Retrying is likely to cause the same error.                                                              |
| 410               | Unmatched default originator | Aborted    | No default originator exists/configured for this recipient when sending message without originator.                                 |
| 411               | Exceeded parts limit         | Aborted    | Message failed as the number of message parts exceeds the defined max number of message parts.                                      |
| 412               | Unprovisioned region         | Aborted    | SMSC rejected the message. The account has not been provisioned for this region.                                                    |

> **Note**    
>
> New error codes may be added over time.
