---
title: Callback
excerpt: ''
hidden: 'true'
next:
  pages:
    - sms-rest-message-body
  description: 'Learn about supported characters, message length and parameterization'
---
A callback is a HTTP POST request with a notification made by the Sinch SMS REST API to a URI of your choosing. The REST API expects the receiving server to respond with a response code within the `2xx` Success range. If no successful response is received then the REST API will either schedule a retry if the error is expected to be temporary or discard the callback if the error seems permanent. The first initial retry will happen 5 seconds after the first try. The next attempt is after 10 seconds, then after 20 seconds, after 40 seconds, after 80 seconds and so on, doubling on every attempt. The last retry will be at 81920 seconds (or 22 hours 45 minutes) after the initial failed attempt.

The REST API offers the following callback options which can be configured for your account upon request to your account manager.

 * Callback with mutual authentication over TLS (HTTPS) connection by provisioning the callback URL with client keystore and password.
 * Callback with basic authentication by provisioning the callback URL with username and password.
 * Callback with OAuth 2.0 by provisioning the callback URL with username, password and the URL to fetch OAuth access token.
 * Callback using AWS SNS by provisioning the callback URL with an Access Key ID, Secret Key and Region.

### Delivery report callback

A delivery report contains the status and status code for each recipient of a batch. To get a delivery report callback for a message or batch of messages you need to set the `delivery_report` field accordingly when [creating a batch](doc:sms-rest-batches-endpoint#section-send-a-batch-message). The formats of the different types of delivery reports are described in [Retrieve a delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-delivery-report) and in [Retrieve a recipient delivery report](doc:sms-rest-batches-endpoint#section-retrieve-a-recipient-delivery-report).

The callback URL can either be provided for each batch in the [Send a batch message](doc:sms-rest-batches-endpoint#section-send-a-batch-message) operation or provisioned globally for your account.

### Inbound message callback

An inbound message or MO (*Mobile Originated*) is a message sent to one of your shortcodes or long numbers from a mobile phone. The format of an inbound callback is described in [Inbounds Endpoint](doc:sms-rest-inbounds-endpoint).

To receive inbound message callbacks, a URL needs to be provisioned for your account. This URL can be specified in the Sinch Dashboard.
