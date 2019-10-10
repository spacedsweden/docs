---
title: "Sinch Classic SMS"
excerpt: "This service documentation guide will assist you in setting up standard SMS service which is used for sending regular messages, notifications and marketing campaigns. Please refer to our [Verification documentation](doc:verification-introduction) if you are looking to verify users by SMS using OTP (One-time password) codes."
hidden: "true"
---
This document provides a detailed user guide and reference documentation on the Sinch SMS REST API. For general information on how to use the Sinch APIs including methods, types, errors and authorization, please check the [Using REST](doc:using-rest) page.

## Overview

The SMS Messaging API allows you to send SMS messages to mobile phones and check their status using the Sinch platform. You can also rent SMS-enabled numbers from Sinch to receive inbound SMS messages from your users that are sent to the backend of your app. For more information see [SMS-enabled numbers](doc:sms-classic#section-sms-enabled-numbers).

![image0](images/sms.png)

## API Quick Reference

### SMS Messaging API

    URI: https://messagingapi.sinch.com/v1

|URL|HTTP Verb|Functionality|
|---|---------|-------------|
|/Sms/{number}|POST|[Incoming SMS Event Callback](doc:sms-classic#section-incoming-sms-event-callback)|
|/Sms/{messageId}|GET|[Get status of SMS message](doc:sms-classic#section-check-message-status)|

### SMS Messaging Callback API

|Event|HTTP Verb|Functionality|
|-----|---------|-------------|
|incomingSms|POST|[Incoming SMS Event](doc:sms-classic#section-incoming-sms-event-callback)|

## Supported countries

You can use the Sinch platform to connect with the following countries:

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <tbody>
        <tr class="odd">
          <td align="left">
            <blockquote>
              <p>Afghanistan</p>
            </blockquote>
          </td>
          <td align="left">Algeria</td>
          <td align="left">Argentina</td>
          <td align="left">Armenia</td>
          <td align="left">Australia</td>
        </tr>
        <tr class="even">
          <td align="left">Austria</td>
          <td align="left">Azerbaijan</td>
          <td align="left">Bahamas</td>
          <td align="left">Bahrain</td>
          <td align="left">Bangladesh</td>
        </tr>
        <tr class="odd">
          <td align="left">Belarus</td>
          <td align="left">Belgium</td>
          <td align="left">Bolivia</td>
          <td align="left">Bosnia &amp; Herzegovina</td>
          <td align="left">Brasil</td>
        </tr>
        <tr class="even">
          <td align="left">Bulgaria</td>
          <td align="left">Cambodia</td>
          <td align="left">Canada</td>
          <td align="left">Central African Republic</td>
          <td align="left">Chile</td>
        </tr>
        <tr class="odd">
          <td align="left">China</td>
          <td align="left">Colombia</td>
          <td align="left">Congo</td>
          <td align="left">Congo D.R.</td>
          <td align="left">Costa Rica</td>
        </tr>
        <tr class="even">
          <td align="left">Croatia</td>
          <td align="left">Cuba</td>
          <td align="left">Cyprus</td>
          <td align="left">Czech Republic</td>
          <td align="left">Denmark</td>
        </tr>
        <tr class="odd">
          <td align="left">Ecuador</td>
          <td align="left">Egypt</td>
          <td align="left">Finland</td>
          <td align="left">France</td>
          <td align="left">Gabon</td>
        </tr>
        <tr class="even">
          <td align="left">Gambia</td>
          <td align="left">Georgia</td>
          <td align="left">Germany</td>
          <td align="left">Ghana</td>
          <td align="left">Greece</td>
        </tr>
        <tr class="odd">
          <td align="left">HongKong</td>
          <td align="left">Hungary</td>
          <td align="left">India</td>
          <td align="left">Indonesia</td>
          <td align="left">Iran</td>
        </tr>
        <tr class="even">
          <td align="left">Ireland</td>
          <td align="left">Israel</td>
          <td align="left">Italy</td>
          <td align="left">Jamaica</td>
          <td align="left">Japan</td>
        </tr>
        <tr class="odd">
          <td align="left">Kazakhstan</td>
          <td align="left">Kenya</td>
          <td align="left">Kuwait</td>
          <td align="left">Kyrgyzstan</td>
          <td align="left">Latvia</td>
        </tr>
        <tr class="even">
          <td align="left">Lebanon</td>
          <td align="left">Liberia</td>
          <td align="left">Libya</td>
          <td align="left">Lithuania</td>
          <td align="left">Luxembourg</td>
        </tr>
        <tr class="odd">
          <td align="left">Macedonia</td>
          <td align="left">Malaysia</td>
          <td align="left">Mexico</td>
          <td align="left">Moldova</td>
          <td align="left">Monaco</td>
        </tr>
        <tr class="even">
          <td align="left">Mongolia</td>
          <td align="left">Morocco</td>
          <td align="left">Netherlands</td>
          <td align="left">New Zealand</td>
          <td align="left">Nigeria</td>
        </tr>
        <tr class="odd">
          <td align="left">Norway</td>
          <td align="left">Pakistan</td>
          <td align="left">Panama</td>
          <td align="left">Paraguay</td>
          <td align="left">Peru</td>
        </tr>
        <tr class="even">
          <td align="left">Philippines</td>
          <td align="left">Poland</td>
          <td align="left">Portugal</td>
          <td align="left">PuertoRico</td>
          <td align="left">Qatar</td>
        </tr>
        <tr class="odd">
          <td align="left">Romania</td>
          <td align="left">Russia</td>
          <td align="left">Saudi Arabia</td>
          <td align="left">Senegal</td>
          <td align="left">Singapore</td>
        </tr>
        <tr class="even">
          <td align="left">Slovakia</td>
          <td align="left">Slovenia</td>
          <td align="left">South Africa</td>
          <td align="left">South Korea</td>
          <td align="left">Spain</td>
        </tr>
        <tr class="odd">
          <td align="left">Sudan</td>
          <td align="left">Sweden</td>
          <td align="left">Switzerland</td>
          <td align="left">Syria</td>
          <td align="left">Taiwan</td>
        </tr>
        <tr class="even">
          <td align="left">Thailand</td>
          <td align="left">Tunisia</td>
          <td align="left">Turkey</td>
          <td align="left">Uganda</td>
          <td align="left">United Kingdom</td>
        </tr>
        <tr class="odd">
          <td align="left">Ukraine</td>
          <td align="left">United States</td>
          <td align="left">Uruguay</td>
          <td align="left">Venezuela</td>
          <td align="left">Vietnam</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Two-way SMS

The Sinch platform supports the provisioning of SMS-enabled numbers that can be used for two-way SMS. Through these numbers, you can send SMS messages to users and receive replies when a user replies to the particular SMS number. Messages that originate from a user’s mobile phone to the Sinch platform are called Mobile Originated (MO) SMS. To receive MO SMS messages, you need to rent a dedicated Long Number or Short Code which allows this type of messages. For more information see [SMS-enabled numbers](doc:sms-classic#section-sms-enabled-numbers).

To receive an MO SMS message, you need to configure a callback URL and develop a backend application that can receive the SMS callback event. For more information, see [SMS Messaging Callback API](doc:sms-classic#section-callback-api).

## SMS to US numbers

To send SMS messages to US phone numbers in a production app, you need to rent an SMS-enabled number. SMS-enabled numbers can also be used to receive inbound SMS messages originating from mobile phones (MO). For more information see [SMS-enabled numbers](doc:sms-classic#section-sms-enabled-numbers).

## SMS-enabled numbers

If the expected outbound SMS traffic is low, you can rent one or more Long Numbers. To rent a Long Number, log in to the Sinch portal with your Sinch account and go to the “Numbers” tab. After renting the needed numbers, you should go to your app SMS settings and assign the numbers to your app configuration.

Alternatively, you can rent and configure numbers with REST APIs. For more information please check the [Number Administration documentation](doc:number-administration).

For high-capacity SMS traffic or marketing campaigns, you will need to order a Short Code. To order and configure a Short Code for SMS in the Sinch platform, please contact [our sales team](mailto:sales@sinch.com).

---

## Messaging API


    URI: https://messagingapi.sinch.com/v1

### Overview

The SMS messaging API allows you to send SMS messages and check their status using the Sinch dashboard.

### ErrorCodes

    [Error Codes]
       40001 - Parameter validation
       40002 - Missing parameter
       40003 - Invalid request
       40100 - Illegal authorization header
       40200 - There is not enough funds to send the message
       40300 - Forbidden request
       40301 - Invalid authorization scheme for calling the method
       40303 - No verified phone number on your Sinch account
       40303 - Full Sms access not enabled for App. Can only send Sms to verified numbers.
       50000 - Internal error

### Send SMS

**[POST] /Sms/{number}**

Send an SMS message to the number supplied in the URL, with the contents defined in the body as described below.

**Important:** To use the Sinch SMS API, you will need to have a verified phone number in the Sinch dashboard. To verify your phone number, sign in to the [Sinch dashboard](https://portal.sinch.com/#/login) click Quickstart and follow the instructions. Also check the [recipient number restrictions](doc:sms-classic#section-recipient-number-restrictions).

#### Authorization

This is a protected resource and requires an [application signed request](doc:using-rest#section-application-signed-request) or [basic auth](doc:using-rest#section-basic-authorization).

#### Request

    [Body]
        string? - from
        string - message

**from** shows the number or alphanumeric that will be shown as sender in the SMS. Check also the [“From” field restrictions](doc:sms-classic#section-"from"-field-restrictions).

**message** is the actual message that will be sent in the SMS.

*Example* - without specifying the sender

    URL: [POST] https://messagingapi.sinch.com/v1/sms/+46700000000
    body
    {
        "message":"Hello there"
    }

*Example* - using a sender number

    URL: [POST] https://messagingapi.sinch.com/v1/sms/+46700000000
    body
    {
        "from":"+46701234567",
        "message":"Hello there"
    }

##### Recipient number restrictions

With a Sandbox app you will only be able to send SMS to your verified phone number.

To send SMS to any phone number, you will need a Production app with “Full SMS access” enabled. To request “Full SMS access” for your Production app, go to the SMS settings of your Production app and request full SMS access.

#### “From” field restrictions

The “From” field indicates the phone number or alphanumeric string that will be displayed to the recipient of the SMS message. There are a number of restrictions that should be considered when setting the “From” field:

By default, the outgoing SMS message will show the verified phone number from your account as “From” field.

If you have rented an SMS number from the Sinch dashboard, then you can also set this number as sender in the “From” field.

For SMS to the United States, you always need to rent a Sinch SMS number.

To rent an SMS number and use it as the “From” number, please follow these steps:

> 1.  Rent an SMS number from the [Sinch dashboard](https://portal.sinch.com/#/login/), under the tab “Numbers”.
> 2.  Assign the number to your application. Under the “Apps” tab, select your app and assign the number under the app SMS settings.
> 3.  When calling the SMS API, set the number that you assigned to your app as “From”.
> 4.  If you want to allow your end users to reply to this number, follow the instructions in the section [SMS Messaging Callback API](doc:sms-classic#section-callback-api) to implement the logic to receive the replies in your backend.

Alternatively, you can rent and configure numbers with REST APIs. For more information please check the [Number Administration documentation](doc:number-administration).

If you want to be able to set a custom alphanumeric in the “From” as sender, please contact [our sales team](mailto:sales@sinch.com). Remember that there are country-specific restrictions when setting an alphanumeric senders, so it may not be allowed in specific countries.

#### Response

    int - messageId

**messageId** is the unique id that was assigned to the SMS request. It can be used to later query the status of the SMS.

*Example*

    {
        "messageId": 123
    }

### Check message status

**[GET] /Sms/{messageId}** - Checks the status of a SMS message.

#### Authorization

This is a protected resource and requires an [application signed request](doc:using-rest#section-application-signed-request) or [basic auth](doc:using-rest#section-basic-authorization).

#### Request

*Example*

    URL: [GET] https://messagingapi.sinch.com/v1/message/status/1234

#### Response

    string - status

*Example*

    {
        "status": "Successful"
    }

**status** may have one of the following values:

> -   Unknown - The provided message id is not known
> -   Pending - The message is in the process of being delivered
> -   Successful - The message has been delivered to the recipient
> -   Faulted - The message has not been delivered. This status can be due to an invalid number for example.

### Message size

Max number of characters per SMS depends on which alphabet is used. Default is the [GCM 7-bit alphabet](https://en.wikipedia.org/wiki/GSM_03.38), but characters in languages such as Arabic, Chinese, Korean, Japanese, or Cyrillic alphabet languages (e.g., Ukrainian, Serbian, Bulgarian, etc) must be encoded using the 16-bit UCS-2 character encoding.

An SMS is 140 bytes. Depending on which alphabet is used, this leads to the maximum individual SMS sizes of 160 GCM 7-bit characters or 70 UCS-2 16-bit characters.

When sending concatenated SMS 6 bytes are allocated for segmentation and reassembly, which gives 153 characters per SMS instead of 160 for GCM 7-bit characters and 67 characters instead of 70 for UCS-2 16-bit characters.


---

## Callback API

### Overview

The Sinch dashboard supports notifying your backend application about incoming (MO) SMS through the messaging callback APIs.

To receive MO SMS messages you must have rented and configured an SMS-enabled number. To rent a Long Number, log in to the Sinch portal with your Sinch account and go to the “Numbers” tab. After renting the needed numbers, you should go to your app SMS settings and assign the numbers to your app configuration.

For more information see [SMS-enabled numbers: Long Numbers and Short Codes](doc:sms-classic#section-sms-enabled-numbers).

### Incoming SMS Event Callback

When a MO SMS is received by the Sinch dashboard from a specific SMS-enabled number, the system sends a notification through a callback request to your backend application. The callback is a post request to a specified URL. URLs for callbacks need to be configured in the Sinch portal when creating or configuring an application.

The callback request is signed using the application key and secret. The application should be the one to which the SMS number is configured. You can find more information on callback request signing [here](doc:using-rest#section-callback-request-signing).

#### Request

    [RequestBody]
    {
        string - event
        identity - to
        identity - from
        string - message
        time - timestamp
        int - version
    }

**event** has the value “incomingSms”.

**to** shows the number where the SMS was sent to.

**from** shows the number that the SMS was sent from.

**message** the actual message content.

**timestamp** the timestamp when the SMS was received by the Sinch dashboard.

**version** is the SMS Callback API version

*Example*

```json
{
    "event": "incomingSms",
    "to": {
        "type": "number",
        "endpoint": "+46700000000"
    },
    "from": {
        "type": "number",
        "endpoint": "+46700000001"
    },
    "message": "Hello world",
    "timestamp": "2014-12-01T12:00:00Z",
    "version": 1
}
```

---

## Call Detail Records

CDRs can be downloaded from the Sinch portal. CDRs are in a semicolon-delimited file that contains the following fields

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <thead>
        <tr class="header">
          <th align="left">Field</th>
          <th align="left">Type</th>
          <th align="left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">ApplicationKey</td>
          <td align="left">string</td>
          <td align="left">Application key</td>
        </tr>
        <tr class="even">
          <td align="left">UserSpaceId</td>
          <td align="left">int</td>
          <td align="left">Internal identifier</td>
        </tr>
        <tr class="odd">
          <td align="left">Timestamp</td>
          <td align="left">time</td>
          <td align="left">Time when the SMS request was made</td>
        </tr>
        <tr class="even">
          <td align="left">Result</td>
          <td align="left">string</td>
          <td align="left">Result may have one of the following values &quot;Successful&quot; | &quot;Pending&quot; | &quot;Faulted&quot; | &quot;Unknown&quot;</td>
        </tr>
        <tr class="odd">
          <td align="left">From</td>
          <td align="left">string</td>
          <td align="left">From number</td>
        </tr>
        <tr class="even">
          <td align="left">To</td>
          <td align="left">string</td>
          <td align="left">To number</td>
        </tr>
        <tr class="odd">
          <td align="left">Amount</td>
          <td align="left">decimal</td>
          <td align="left">Cost of SMS message</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

The files are generated once daily and contain the previous days’ CDRs. A day spans from 00:00:00 UTC to 23:59:59 UTC. CDRs are written when the call is ended, though there are some edge cases where an app-app call CDR may be delayed in being written, for example, if there is a network failure before the call is ended.

CDR files can be downloaded from the developer portal. Upon request, the CDR files can also be uploaded to an Amazon S3 bucket that your company provides and to which Sinch has write access.
