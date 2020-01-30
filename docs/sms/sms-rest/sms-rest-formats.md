---
title: SMS REST Formats
excerpt: >-
  This section will take a brief look at some of the formats used in the REST
  API.
hidden: 'true'
next:
  pages:
    - sms-rest-http-status-codes
  description: Learn about the HTTP statuses and codes that the REST API returns
---
### JSON

JSON (`application/json`) is the content type of both requests and responses if not otherwise specified.

Requests with invalid JSON will be rejected.

Null values can be omitted in requests and will be omitted in responses. In some cases explicitly setting `null` will overwrite a previously set value with `null`. See [Update a group](doc:sms-rest-groups-endpoint#section-update-a-group) for an example.

> **Note**    
>
> New features might result in additional request and response
> parameters. New request parameters will either have a default value or
> considered optional to retain backwards compatibility. It is highly
> recommended to ignore any unexpected parameters when reading JSON in API responses and in callback handlers.

### MSISDN

Only MSISDNs in international format are accepted by the API.

MSISDNs can be sent in with or without a leading `+` (i.e. `+123456789` or `123456789`) or with a leading `00`. Any space, dash or bracket will also be ignored by the API.

All MSISDNs returned by the REST API will be without a `+` or `00` prefix, even if they were sent in with one.

### Timestamp

Timestamps are used for expressing a moment in time. They are represented using the [ISO-8601 standard](https://en.wikipedia.org/wiki/ISO_8601). Examples of those are the fields `send_at` and `expire_at` in the [Send a batch message](doc:sms-rest-batches-endpoint#section-send-a-batch-message) operation.

A time offset can be specified in accordance with [ISO-8601 time offsets from UTC](http://en.wikipedia.org/wiki/ISO_8601#Time_offsets_from_UTC). If no time offset is specified (_local time_ in ISO-8601) then UTC will be used.

All timestamps returned by the API will be represented in UTC time, with millisecond precision.
