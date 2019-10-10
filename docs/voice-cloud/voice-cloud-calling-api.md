---
title: "Calling API"
excerpt: ""
hidden: "true"
---
## Overview

### Methods

This API exposes calling-related functionality in the Sinch platform. The following APIs resources are available through the following URLs:

    https://callingapi.sinch.com/[version]
    or
    https://api.sinch.com/calling/[version]

    Current  version is "v1"

    [GET]       /configuration/numbers/
    [POST]      /configuration/numbers/
    [GET]       /configuration/callbacks/applications/{applicationkey}
    [POST]      /configuration/callbacks/applications/{applicationkey}
    [GET]       /calling/query/number/{number}

Other set of APIs provide information and/or control of the calls handled locally in a region. Therefore, the URL to access these APIs is provided as part of the ICE callback, in the `callResourceUrl` property.

    [GET]       /calls/id/{callId}
    [PATCH]     /calls/id/{callId}
    [GET]       /recording?from=timestamp&to=timestamp&page=int&pageSize=int
    [GET]       /recording/{key}
    [DELETE]    /recording/{key}

### Errors

    [Error Codes]
        40001 - Illegal parameters
        40002 - Missing parameter
        40003 - Invalid request
        40301 - Invalid authorization scheme for calling the method
        40108 - Invalid credentials
        40400 - Unable to get user
        50000 - Internal error

### Get Numbers

**[GET] /configuration/numbers/**

Get information about your numbers. It returns a list of numbers that you own, as well as their capability (voice or SMS). For the ones that are assigned to an app, it returns the application key of the app.

*Example*

    [GET] https://callingapi.sinch.com/v1/configuration/numbers/

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        NumberItem[] numbers

    [NumberItem]
        string - number
        string - applicationkey
        string - capability

**number** The phone number or list of numbers that you own in E.164 format.

**applicationkey** indicates the application where the number(s) are assigned. If the number is not assigned to an app, no application key is returned.

**capability** the capability of the number. It can take these values:

> -   voice
> -   sms

*Example*

    {
      "numbers": [
        {
          "number": "+19160001112222",
          "capability": "voice"
        },
        {
          "number": "+14151112223333",
          "applicationkey": "11983f76-12c8-1111-9515-4785c7b49ca8",
          "capability": "voice"
        }
      ]
    }

### Errors

    50000 - Internal error

## Update Numbers

**[POST] /configuration/numbers/**

Assign a number or a list of numbers to an application.

### Request

    [RequestBody]
        string[] - numbers
        string - applicationkey
        string - capability        

**number** The phone number or list of numbers in E.164 format.

**applicationkey** indicates the application where the number(s) will be assigned. If empty, the application key that is used to sign the request will be used.

**capability** indicates the DID capability that needs to be assigned to the chosen application. Valid values are “voice” and “sms”. Please note that the DID needs to support the selected capability.

*Example*

    [POST] https://callingapi.sinch.com/v1/configuration/numbers/

    {
        "numbers":["+14151112223333"],
        "applicationkey":"11983f76-12c8-1111-9515-4785c7b67ca8"
    }

### Authorization

This is a protected resource and requires an application signedrequest \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        Empty

### Errors

    50000 - Unable to update number
    40001 - Unable to update numbers
    40003 - Invalid Application Key

## Un-assign Number

**[DELETE] /configuration/numbers/**

Un-assign a number from an application.

### Request

    [RequestBody]
        string - number
        string - applicationKey
        string - capability

**number** The phone number in E.164 format.

**applicationKey** indicates the application from which the number will be un-assigned. If empty, the application key that is used to sign the request will be used.

**capability** indicates the DID capability. Valid values are “voice” and “sms”. Please note that the DID needs to support the selected capability.

*Example*

    [DELETE] https://callingapi.sinch.com/v1/configuration/numbers/

    {
        "number":"+14151112223333",
        "applicationKey":"11983f76-12c8-1111-9515-4785c7b67ca8",
        "capability": "voice"
    }

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        Empty

### Errors

    50000 - Unable to update number
    40001 - Unable to update numbers
    40003 - Invalid Application Key

## Get Callbacks

**[GET] /configuration/callbacks/applications/{applicationkey}**

Get callback URLs.

### Request

*Example*

    [GET] https://callingapi.sinch.com/v1/configuration/callbacks/applications/94983f76-1161-6655-9515-4785c7b67ca8

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        UrlItem url

    [UrlItem]
        string - primary
        string - fallback

**primary** is your primary callback URL.

**fallback** is your fallback callback URL. It is used only if Sinch platform gets a timeout or error from your primary callback URL.

*Example*

    {
        "url" : {
                    "primary" : "http://primary.com",
                    "fallback" : "http://fallback.com"
                }
    }

### Errors

    50000 - Unable to get configuration
    40003 - Invalid Application Key

## Update Callbacks

**[POST] /configuration/callbacks/applications/{applicationkey}**

Update callback URLs.

### Request

    [RequestBody]
        UrlItem url

    [UrlItem]
        string - primary
        string - fallback

}

**primary** is your primary callback URL.

**fallback** is your fallback callback URL. It is used only if Sinch platform gets a timeout or error from your primary callback URL.

*Example*

    [POST] https://callingapi.sinch.com/v1/configuration/callbacks/applications/94983f76-1161-6655-9515-4785c7b67ca8

    {
        "url" : {
                    "primary" : "http://primary.com",
                    "fallback" : "http://fallback.com"
                }
    }

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        Empty

### Errors

    50000 - Unable to update configuration
    40003 - Invalid Application Key

## Query Number

**[GET] /calling/query/number/{number}**

Get information about the requested number.

**number** The phone number you want to query.

*Example*

    [GET] https://callingapi.sinch.com/v1/calling/query/number/+46(0)73-017-0101

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        QueryNumberResponse

    [QueryNumberResponse]
        NumberItem - number

    [NumberItem]
        string - countryId
        string - numberType
        string - normalizedNumber
        bool - restricted
        Money - rate

**countryId** ISO 3166-1 formatted country code

**numberType** can be one of the following values:

> -   Unknown
> -   Fixed
> -   Mobile
> -   Other

**normalizedNumber** E.164 normalized number.

**rate** is the cost per minute to call the destination number.

*Example*

    {
        "numberItem": {
            "countryId": "SE",
            "numberType": "Mobile",
            "normalizedNumber": "+46730170101",
            "restricted": false,
            "rate": {
                "currencyId": "USD",
                "amount": 0.0368
            }
        }
    }

### Errors

    40001 - Invalid number specified
    50000 - Internal error

## Get Call Result

**[GET] calling/v1/calls/id/{callId}**

Gets information about a specific call.

*Example*

    [GET] https://callingapi.sinch.com/calling/v1/calls/id/4398599d1ba84ef3bde0a82dfb61abed

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        GetCallResultResponse

    [GetCallResultResponse]
        identity - from
        identity - to
        string - domain
        string - callId
        int - duration
        string - status
        string - result
        string - reason
        time - timestamp
        object - custom
        money - userRate
        money - debit

**from** contains the caller information.

**to** contains the callee information.

**domain** can be either “pstn” for PSTN endpoint or “mxp” for data (app or web) clients.

**callId** is the unique identifier of the call.

**duration** shows the duration of the call in seconds.

**status** contains the status of the call.

    "ONGOING" | "FINAL"

**result** contains the result of a call. It may have one of the following values:

    "N/A" | "ANSWERED" | "BUSY" | "NOANSWER" | "FAILED"

**reason** contains the reason why a call ended. It may have one of the following values:

    "N/A" | "TIMEOUT" | "CALLERHANGUP" | "CALLEEHANGUP" |
    "BLOCKED" | "NOCREDITPARTNER" | "MANAGERHANGUP" |
    "CANCEL" | "GENERALERROR"

### Errors

    40400 - Call not found
    50000 - Internal error

## Manage Call

**[Patch] calling/v1/calls/id/{callId}**

This method can be used to manage ongoing, connected calls or to unpark parked calls.

### Request

    [RequestBody]
        SVAML

    [SVAML]
        Instruction[] - instructions
        Action - action

**Important**: This method can only be used for calls that are originating from or terminating to PSTN or SIP networks.

### Managing Ongoing, Connected Calls

For ongoing, connected calls, you can use this endpoint to play messages and/or optionally hang up the call. There are two instructions available to play messages. The *PlayFiles* instruction can be used to play an IVR message, while the *Say* instruction can be used to play a text-to-speech message. The message, if specified, is played only on the caller side. A caller can, for example, hear a message saying the total minutes have expired and that the call will be disconnected.

For more information on playing messages and performing actions on calls see the [Callback API](doc:voice-cloud-callback-api).

### Managing Parked calls

For a parked call (see [Callback API](doc:voice-cloud-callback-api) on how to park a call), this endpoint can be used to “unpark” the call. Parked calls can be considered calls where the ICE response has been “postponed”. When unparking a parked call, you simply provide the SVML you normally would have responded with in the ICE response if you had not “postponed” it -see the [Callback API](doc:voice-cloud-callback-api).

*Example IVR*

    [PATCH] https://callingapi.sinch.com/calling/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
    {
      "instructions": [
        {
          "name": "playFiles",
          "ids": [
            "welcome"
          ],
          "locale": "en-US"
        }
      ],
      "action": {
        "name": "hangup"
      }
    }

*Example text-to-speech*

    [PATCH] https://callingapi.sinch.com/calling/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
    {
      "instructions": [
        {
          "name": "say",
          "text": "Hello, this is a text to speech message",
          "locale": "en-US"
        }
      ],
      "action": {
        "name": "hangup"
      }
    }

*Example Start Recording*

    [PATCH] https://callingapi.sinch.com/calling/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
    {
      "action": {
        "name": "startRecording",
        "recordingOptions": {
          "destinationUrl": "s3://my-s3-bucket",
          "credentials": "xyz\_access\_key:wrt\_secret\_key:eu-central-1",
          "format": "mp3",
          "notificationEvents": true
        }
      }
    }

*Example Stop Recording*

    [PATCH] https://callingapi.sinch.com/calling/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
    {
      "action": {
        "name": "stopRecording"
      }
    }

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Errors

    40003 - Invalid request
    40400 - Call not found
    50000 - Internal error

## List Recordings

**[GET] calling/v1/recording?from=timestamp&to=timestamp&page=int&pageSize=int**

Lists the stored recordings in the Sinch Drive.

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    [ResponseBody]
        RecordingFileInfo[]

    [RecordingFileInfo]
        string - key
        string - url
        timestamp - createdOn
        timestamp - expiresOn
        object - headers

**key** is a unique identifier for the file. Use this to download or delete the file from the Sinch Drive.

**url** is a direct URL that can be used to download the file

**createdOn** is the date the file has been uploaded to the Sinch Drive

**expiresOn** is the date the platform will automatically delete the file from the Sinch Drive

**headers** additional information about the file stored in as key/value

### Errors

    40001 - 'pageNumber' must be greater than 0
    40001 - 'pageSize' must be a positive integer
    40001 - 'to' must be greater than 'from'
    50000 - Internal error

## Download Recording

**[GET] calling/v1/recording/{key}**

Retrieve the recording file from the Sinch Drive.

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Response

    Binary data

### Errors

    40002 - No key specified
    40400 - Recording not found
    50000 - Internal error

## Delete Recording

**[DELETE] calling/v1/recording/{key}**

Remove a recording file from the Sinch Drive.

### Authorization

This is a protected resource and requires an application signed request \<applicationsignedrequest\> or basic auth \<basicauthorization\>.

### Errors

    40002 - No key specified
    40400 - Recording not found
    50000 - Internal error
