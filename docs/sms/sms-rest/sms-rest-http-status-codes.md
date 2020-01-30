---
title: HTTP Status Codes
excerpt: The REST API returns an HTTP status and code each time a request is made.
hidden: 'true'
next:
  pages:
    - sms-rest-callback
  description: Learn about the REST API callbacks
---
### HTTP Statuses

The following HTTP status codes are used by the API. Additional codes might be added in the future and if you encounter a code not in this list please consult the [HTTP specification](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10/) for a definition.

| Status                                    | Description                                                                                                                 |
|-- -                                       | ---                                                                                                                       --|
| 200&nbsp;OK                               | The request was successful.                                                                                                 |
| 201&nbsp;Created                          | The `POST` request was successful and a new resource was created.                                                           |
| 400&nbsp;Bad&nbsp;Request                 | The request does not conform to the API. The response body should provide more information.                                 |
| 401&nbsp;Unauthorized                     | Authentication token is invalid for this service plan.                                                                      |
| 403&nbsp;Forbidden                        | The request syntax is valid but cannot be performed. This could for example be because a referenced resource doesn't exist. |
| 404&nbsp;Not&nbsp;Found                   | The path is invalid or no resource exists with the given ID.                                                                |
| 405&nbsp;Method&nbsp;Not&nbsp;Allowed     | The path is valid but not for this method.                                                                                  |
| 415&nbsp;Unsupported&nbsp;Media&nbsp;Type | The `Content-Type` header is missing or unsupported. Most operations expect `application/json`.                             |
| 429&nbsp;Too&nbsp;Many&nbsp;Requests      | The user or path has too many outstanding requests.                                                                         |
| 500&nbsp;Internal&nbsp;Server&nbsp;Error  | An unexpected internal error occurred and the request was not processed.                                                    |
| 503&nbsp;Service&nbsp;Unavailable         | The service is unable to perform the request at this point. Most likely due to a required subsystem being unavailable.      |


### HTTP Errors

Responses with status `400 Bad Request` and `403 Forbidden` will present a JSON object in the body explaining the error. It has the following structure:

| Name   | Description                                                                                                             | JSON Type |
|-- -    | ---                                                                                                                     | ---     --|
| `code` | A code that can be used to programmatically recognize the error. See [below](#section-error-codes) for possible values. | `String`  |
| `text` | Human readable description of the error. Can be used for debugging.                                                     | `String`  |

### Error codes

The following error codes can be returned as values for the `code` field:

| HTTP Status | Code                              | Description                                                                                                         |
|-- -         | ---                               | ---                                                                                                               --|
| 400         | `syntax_invalid_json`             | The JSON in the request is invalid or does not conform to the API specification.                                    |
| 400         | `syntax_invalid_parameter_format` | The format of a field value is invalid. For example if a MSISDN is not correctly formatted.                         |
| 400         | `syntax_constraint_violation`     | The request body doesn't fulfill all of the constraints set by the API. For example if a required field is missing. |
| 403         | `unknown_group`                   | A referenced group ID is unknown. This could happen if the ID is invalid or if the group has been deleted.          |
| 403         | `unknown_campaign`                | The campaign ID does not match the specified originator.                                                            |
| 403         | `missing_callback_url`            | Callback has been requested but no URL is provided.                                                                 |
