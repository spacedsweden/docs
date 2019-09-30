---
title: "Calling API"
excerpt: ""
---
```text
URI:
https://callingapi.sinch.com/[version]
or
https://api.sinch.com/calling/[version]

Current  version is "v1"
```


## Overview

This API exposes calling-related functionality in the Sinch dashboard.

### Methods
```text
[GET]       /configuration/numbers/
[POST]      /configuration/numbers/
[GET]       /configuration/callbacks/applications/{applicationkey}
[POST]      /configuration/callbacks/applications/{applicationkey}
[GET]       /calling/query/number/{number}
[PATCH]     /calls/id/{callId}
[GET]       /calls/id/{callId}
[GET]       /conferences/id/{conferenceId}
[PATCH]     /conferences/id/{conferenceId}/{callId}
[DELETE]    /conferences/id/{conferenceId}
[DELETE]    /conferences/id/{conferenceId}/{callId}
[POST]      /callouts
```


### Errors
```text
[Error Codes]
    40001 - Illegal parameters
    40002 - Missing parameter
    40003 - Invalid request
    40301 - Invalid authorization scheme for calling the method
    40108 - Invalid credentials
    40400 - Unable to get user
    50000 - Internal error
```


## Get Numbers

**\[GET\] /configuration/numbers/**

Get information about your numbers. It returns a list of numbers that you own, as well as their capability (voice or SMS). For the ones that are assigned to an app, it returns the application key of the app.

*Example*
```text
[GET] https://callingapi.sinch.com/v1/configuration/numbers/
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
[ResponseBody]
    NumberItem[] numbers

[NumberItem]
    string - number
    string - applicationkey
    string - capability
```


**number** The phone number or list of numbers that you own in E.164 format.

**applicationkey** indicates the application where the number(s) are assigned. If the number is not assigned to an app, no application key is returned.

**capability** the capability of the number. It can take these values:

- voice
- sms

*Example*
```json
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
```


### Errors

    ``50000`` - Internal error

## Update Numbers

**\[POST\] /configuration/numbers/**

Assign a number or a list of numbers to an application.

### Request
```json
[RequestBody]
    string[] - numbers
    string - applicationkey
    string - capability   
```


**number** The phone number or list of numbers in E.164 format.

**applicationkey** indicates the application where the number(s) will be assigned. If empty, the application key that is used to sign the request will be used.

**capability** indicates the DID capability that needs to be assigned to the chosen application. Valid values are “voice” and “sms”. Please note that the DID needs to support the selected capability.

*Example*
```text
[POST] https://callingapi.sinch.com/v1/configuration/numbers/
```



```json
{
    "numbers":["+14151112223333"],
    "applicationkey":"11983f76-12c8-1111-9515-4785c7b67ca8"
}
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
[ResponseBody]
    Empty
```


### Errors

    ``50000`` - Unable to update number
    ``40001`` - Unable to update numbers
    ``40003`` - Invalid Application Key

## Un-assign Number

**\[DELETE\] /configuration/numbers/**

Un-assign a number from an application.

### Request
```json
[RequestBody]
    string - number
    string - applicationKey
    string - capability
```


**number** The phone number in E.164 format.

**applicationKey** indicates the application from which the number will be un-assigned. If empty, the application key that is used to sign the
request will be used.

**capability** indicates the DID capability. Valid values are “voice” and “sms”. Please note that the DID needs to support the selected capability.

*Example*
```text
[DELETE] https://callingapi.sinch.com/v1/configuration/numbers/
```



```json
{
    "number":"+14151112223333",
    "applicationKey":"11983f76-12c8-1111-9515-4785c7b67ca8",
    "capability": "voice"
}
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
[ResponseBody]
    Empty
```


### Errors

    ``50000`` - Unable to update number
    ``40001`` - Unable to update numbers
    ``40003`` - Invalid Application Key

## Get Callbacks

**\[GET\] /configuration/callbacks/applications/{applicationkey}**

Get callback URLs.

### Request

*Example*
```text
[GET] https://callingapi.sinch.com/v1/configuration/callbacks/applications/94983f76-1161-6655-9515-4785c7b67ca8
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
[ResponseBody]
    UrlItem url

[UrlItem]
    string - primary
    string - fallback
```


**primary** is your primary callback URL.

**fallback** is your fallback callback URL. It is used only if Sinch platform gets a timeout or error from your primary callback URL.

*Example*
```json
{
  "url" : {
    "primary" : "http://primary.com",
      "fallback" : "http://fallback.com"
  }
}
```


### Errors

    ``50000`` - Unable to get configuration
    ``40003`` - Invalid Application Key

## Update Callbacks

**\[POST\] /configuration/callbacks/applications/{applicationkey}**

Update callback URLs.

### Request
```json
[RequestBody]
    UrlItem url

[UrlItem]
    string - primary
    string - fallback
```


**primary** is your primary callback URL.

**fallback** is your fallback callback URL. It is used only if Sinch platform gets a timeout or error from your primary callback URL.

*Example*
```text
[POST] https://callingapi.sinch.com/v1/configuration/callbacks/applications/94983f76-1161-6655-9515-4785c7b67ca8
```



```json
{
  "url" : {
    "primary" : "http://primary.com",
      "fallback" : "http://fallback.com"
  }
}
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
[ResponseBody]
    Empty
```


### Errors

    ``50000`` - Unable to update configuration
    ``40003`` - Invalid Application Key

## Query Number

**\[GET\] /calling/query/number/{number}**

Get information about the requested number.

**number** The phone number you want to query.

*Example*
```text
[GET] https://callingapi.sinch.com/v1/calling/query/number/+46(0)73-017-0101
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
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
```


**countryId** ISO 3166-1 formatted country code

**numberType** can be one of the following values:

>   - Unknown
>   - Fixed
>   - Mobile
>   - Other

**normalizedNumber** E.164 normalized number.

**rate** is the cost per minute to call the destination number.

*Example*
```json
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
```


### Errors

    ``40001`` - Invalid number specified
    ``50000`` - Internal error

## Manage Call

**\[Patch\] /calls/id/{callId}**

Plays messages in an ongoing call and optionally hangs up the call.

### Request
```json
[RequestBody]
    SVAML

[SVAML]
    Instruction[] - instructions
    Action - action
```


This method can be used to play messages in an ongoing call and potentially perform an action, such as hanging up the call. There are two instructions available to play a message. The *PlayFiles* instruction can be used to play an IVR message, while the *Say* instruction can be used to play a text-to-speech message. The message, if specified, is played only on the caller side. A caller can, for example, hear a message saying the total minutes have expired and that the call will be disconnected.

> **WARNING: Important**    
>
> This method can only be used for calls that are originating from or terminating to the PSTN network.

For more information on playing messages and performing actions on calls see the [Callback API](doc:voice-rest-api-callback-api).

*Example IVR*
```text
[PATCH] https://callingapi.sinch.com/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
```



```json
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
```


*Example text-to-speech*
```text
[PATCH] https://callingapi.sinch.com/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
```



```json
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
```


*Example start-recording*
```text
[PATCH] https://callingapi.sinch.com/v1/call/id/4398599d1ba84ef3bde0a82dfb61abed
```



```json
{
  "action": {
    "name": "continue",
      "record": true
  }
}

```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Errors

    ``40003`` - Invalid request
    ``40400`` - Call not found
    ``50000`` - Internal error

## Get Call Result

**\[GET\] /calls/id/{callId}**

Gets information about a specific call.

*Example*
```text
[GET] https://callingapi.sinch.com/v1/calls/id/4398599d1ba84ef3bde0a82dfb61abed
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
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
    decimal - debitMinutes
```


**from** contains the caller information.

**to** contains the callee information.

**domain** can be either “pstn” for PSTN endpoint or “mxp” for data (app or web) clients.

**callId** is the unique identifier of the call.

**duration** shows the duration of the call in seconds.

**status** contains the status of the call.

**result** contains the result of a call. It may have one of the following values:

    ``"N/A"`` | ``"ANSWERED"`` | ``"BUSY"`` | ``"NOANSWER"`` | ``"FAILED"``

**reason** contains the reason why a call ended. It may have one of the following values:

> ``"N/A"`` | ``"TIMEOUT"`` | ``"CALLERHANGUP"`` | ``"CALLEEHANGUP"`` | ``"BLOCKED"`` | ``"NOCREDITPARTNER"`` | ``"MANAGERHANGUP"`` |``"CANCEL"`` | ``"GENERALERROR"``

> **WARNING: Important**    
>
> This method can only be used for calls that are originating from or terminating to the PSTN network.

## Get Conference Info

**\[GET\] /conferences/id/{conferenceId}**

Gets information about an ongoing conference

*Example*
```text
[GET] https://callingapi.sinch.com/v1/conferences/id/myConference
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Response
```json
[ResponseBody]
    GetConfrenceInfoResponse

[GetConferenceInfoResponse]
    Participant[] - participants

[Participant]
    string - cli
    string - id
    int - duration
    bool - muted
```


**cli** shows the phone number of the PSTN participant that was connected in the conference, or whatever was passed as CLI for data originated/terminated calls.

**callId** is the callId of the call leg that the participant joined the conference.

**duration** shows the number of seconds that this participant was connected in the conference.

**muted** shows if the participant is muted currently.

*Example*
```json
{
  "participants": [
    {
      "cli": "+46708168731",
      "id": "abcabcabcabca",
      "duration": 14,
      "muted": false
    },
    {
      "cli": "+46708425201",
      "id": "cdecdecdecde",
      "duration": 12,
      "muted": false
    }
  ]
}
```


### Errors

    ``40400`` - Conference not found

## Mute/Unmute Conference Participant

**\[PATCH\] /conferences/id/{conferenceId}/{callId}**

Mutes or unmutes a participant in an ongoing conference

*Example*
```text
[PATCH] https://callingapi.sinch.com/v1/conferences/id/myConference/abcdef01234
```


### Request
```text
[RequestBody]
    ConferenceCommand

[ConferenceCommand]
    string - command
```


**command** can be either “mute” or “unmute”

*Example*
```json
{
  "command": "mute"
}
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Errors

    ``40400`` - Conference not found

## Kick Conference Participant

**\[DELETE\] /conferences/id/{conferenceId}/{callId}**

Kicks a participant from an ongoing conference

### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

## Kick All Conference Participants

**\[DELETE\] /conferences/id/{conferenceId}** - Kicks all participants from an ongoing conference

### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

## Conference and Text-To-Speech Callouts
R
**\[POST\] /callouts**

Requests a call to be initiated from the server

### Request
```text
[RequestBody]
    CalloutRequest

[CalloutRequest]
    string - method
    TtsCalloutRequest? - ttsCallout
    ConferenceCalloutRequest? - conferenceCallout
```


There are currently two types of callouts that are supported: conference callouts and text-to-speech callouts.

### Conference callout

With conference callout, the server initiates call to a phone number and when the call is answered, it is connected to a conference room. The same API can be used multiple times to connect multiple phone numbers in the same conference room.

### Request
```json
[ConferenceCalloutRequest]
    string - cli
    Identity - destination
    int - maxDuration
    bool - enableAce
    bool - enableDice
    bool - enablePie
    string - custom
    string - locale
    string - conferenceId
    string - greeting
    string - mohClass
```


**cli** is the number that will be displayed as caller

**destination** identifies the endpoint that should be called.

**type** can be “number” for PSTN endpoints, or “username” for data endpoints (app or web clients).

**endpoint** is either the number of a PSTN endpoint, or the username for a data endpoint.

**domain** can be either “pstn” for PSTN endpoint or “mxp” for data (app or web) clients.

**custom** can be used to input custom data.

**locale** specifies the language for the Text-to-speech message. Supported languages: \* en-US: English, United States \* en-AU: English, Australia \* en-CA: English, Canada \* en-GB: English, United Kingdom \* en-IN: English, India \* es-ES: Spanish, Spain \* es-MX: Spanish, Mexico \* es-CA : Spanish, Catalunya \* fr-FR: French, France \* fr-CA: French, Canada \* ja-JP: Japanese \* ko-KR: Korean \* pt-BR: Portuguese, Brazil \* pt-PT: Portuguese \* zn-CN: Chinese, China \* zh-HK: Chinese, Hong
Kong \* zh-TW: Chinese, Taiwan \* da-DK: Danish \* de-DE: German \* fi-FI: Finish \* it-IT: Italian \* nb-NO: Norwegian \* nl-NL: Dutch \* pl-PL: Polish \* ru-RU: Russian \* sv-SE: Swedish

**greeting** is the text that will be spoken as a greeting.

**conferenceId** shows the Id of the conference to which the participant will be connected.

If **enableAce** is set to true and the application has a callback URL specified, you will receive an ACE callback when the call is answered. When the callback is received, your platform must respond with a svamlet, containing the “connectconf” action in order to add the call to a conference or create the conference if it’s the first call. If it is set to false, no ACE event will be sent to your backend.

*Example ACE response when* `enableAce` *set to true*
```json
{
  "instructions": [],
    "action": {
      "name": "connectConf",
        "conferenceId": "myConference"
    }
}
```


If **enableDice** is set to true and the application has a callback URL specified, you will receive a DiCE callback when the call is disconnected. If it is set to false, no DiCE event will be sent to your backend.

If **enablePie** is set to true and the application has a callback URL specified, you will receive a PIE callback after a runMenu action, with the information of the action that the user took. If it is set to false, no PIE event will be sent to your backend.

*Example of conference callout*
```text
[POST] https://callingapi.sinch.com/v1/callouts
```



```json
{
  "method" : "conferenceCallout",
    "conferenceCallout" :
    {
      "cli" : "46000000000",
        "destination" : { "type" : "number", "endpoint" : "46000000001" },
          "domain" : "pstn",
            "custom" : "customData",
              "locale" : "en-US",
                "greeting" : "Welcome to my conference",
                  "conferenceId" : "my_conference_room_id",
                    "enableAce": false,
                      "enableDice" : false
    }
}
```


### Text-to-speech

With the text-to-speech callout, the server initiates a call to a phone number and plays a synthesized text messages or pre-recorded sound files.

### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).

### Request
```json
[TtsCalloutRequest]
    string - cli
    Identity - destination
    string - domain
    string - custom
    string - locale
    string - text
    string - prompts
    bool - enableAce
    bool - enableDice
```


**cli** is the number that will be displayed as caller

**destination** identifies the endpoint that should be called.

**type** is a parameter inside the “destination” object. It can be “number” for PSTN endpoints, or “username” for data endpoints (app or web clients).

**endpoint** is a parameter inside the “destination” object. It is either the number of a PSTN endpoint, or the username for a data endpoint.

**domain** can be either “pstn” for PSTN endpoint or “mxp” for data (app or web) clients.

**custom** can be used to input custom data.

If **enableAce** is set to true and the application has a callback URL specified, you will receive an ACE callback when the call is answered. When the callback is received, your platform must respond with a svamlet, typically containing a “playFiles” instruction and a “hangup” action. If it is set to false, no ACE event will be sent to your backend.

*Example ACE response when \`\`enableAce\`\` set to true*
```json
{
  "instructions": [
    {
      "name": "playFiles",
      "ids": [
        "#tts[hello world]"
      ]
    }
  ],
    "action": {
      "name": "hangup"
    }
}
```


*Example ACE response when \`\`enableAce\`\` set to true*. In this example, the result will be the same as it would with the enableAce set to false - the message specified in the `TtsCalloutRequest` will be played
```json
{
  "instructions": [],
    "action": {
      "name": "continue"
    }
}
```


If **enableDice** is set to true and the application has a callback URL specified, you will receive a DiCE callback when the call is disconnected. If it is set to false, no DiCE event will be sent to your backend.

**locale** specifies the language for the Text-to-speech message. Supported languages: \* en-US: English, United States \* en-AU: English, Australia \* en-CA: English, Canada \* en-GB: English, United Kingdom \* en-IN: English, India \* es-ES: Spanish, Spain \* es-MX: Spanish, Mexico \* es-CA : Spanish, Catalunya \* fr-FR: French, France \* fr-CA: French, Canada \* ja-JP: Japanese \* ko-KR: Korean \* pt-BR: Portuguese, Brazil \* pt-PT: Portuguese \* zn-CN: Chinese, China \* zh-HK: Chinese, Hong Kong \* zh-TW: Chinese, Taiwan \* da-DK: Danish \* de-DE: German \* fi-FI: Finish \* it-IT: Italian \* nb-NO: Norwegian \* nl-NL: Dutch \* pl-PL: Polish \* ru-RU: Russian \* sv-SE: Swedish

**text** is the text that will be spoken in the text-to-speech message. Every applications default maximum characters allowed in text-to-speech  is 600 characters. Contact support if you wish this limit to be changed.


**prompts** is an advanced alternative to using “text”. You can then supply a “;”-separated list of prompts. Either prompt can be the name of a pre-recorded file or a text-to-speech string specified as “\#tts\[my text\]”. To upload and use pre-recorded files, you need to contact Sinch for support. Every applications default maximum characters allowed per 'prompts'-command text-to-speech is 600 characters. Contact support if you wish this limit to be changed.

*Example of text-to-speech callout*
```text
[POST] https://callingapi.sinch.com/v1/callouts
```



```json
{
  "method" : "ttsCallout",
    "ttsCallout" :
    {
      "cli" : "46000000000",
        "destination" : { "type" : "number", "endpoint" : "46000000001" },
          "domain" : "pstn",
            "custom" : "customData",
              "locale" : "en-US",
                "text" : "Hello, this is a synthesized message."
    }
}
```


*Example of text-to-speech callout*
```text
[POST] https://callingapi.sinch.com/v1/callouts
```



```json
{
  "method" : "ttsCallout",
    "ttsCallout" :
    {
      "cli" : "46000000000",
        "destination" : { "type" : "number", "endpoint" : "46000000001" },
          "domain" : "pstn",
            "custom" : "customData",
              "locale" : "en-US",
              "prompts" : "#tts[Hello, we will now play a pre-recorded file.];myprerecordedfile;#tts[We hope you liked listening to the file.]",
                  "enabledice" : true
    }
}
```


### Authorization

This is a protected resource and requires an [application signed request](doc:authorization#section-application-signed-request) or [basic auth](doc:authorization#section-basic-authorization).
