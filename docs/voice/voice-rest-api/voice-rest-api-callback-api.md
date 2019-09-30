---
title: "Callback API"
excerpt: ""
---
Controlling a call from your application backend is done by responding to callbacks from the Sinch dashboard and/or by calling REST APIs in the Sinch dashboard from your application’s backend. The figure that follows illustrates the lifecycle of a call and shows where both callbacks and REST API calls are located or can be made.
![callbackevents.png](images/3124073-callbackevents.png)

The **Incoming Call Event (ICE)**, is triggered when the Sinch dashboard receives an incoming call. The event can trigger a REST request to your application backend. Your reply instructs the Sinch dashboard how to act. The response can include an object written in the **Sinch Voice Application Markup Language (SVAML)** and it can, for instance, instruct Sinch to play a number of IVRs and then connect the call to the PSTN. The **Answered Call Event (ACE)** is triggered when the call is answered and can render an additional REST call to your platform. SVAML instructions can again be provided in the response to the ACE event. Finally, the **Disconnected Call Event (DiCE)** is triggered when the call is disconnected. Between ACE and DiCE, it is legal to call the **ManageCall** REST API which is part of the Calling API, to instruct the call to be hung up and/or to play an Interactive Voice Response (IVR) during the conversation.

## Sinch Voice Application Markup Language (SVAML)

SVAML is a call control markup language developed by Sinch. When your backend receives callback event from the Sinch dashboard, it can respond with a *SVAML object* to control the voice call. The SVAML object type is defined like this:
```text
    [SVAML]
        Instruction[] - instructions
        Action - action

    [Instruction]
    {
        string - name
        ... // instruction-specific properties
    }

    [Action]
    {
        string - name
        ... // action-specific properties
    }
```


### SVAML Quick Reference

#### Instructions

| Instruction | Functionality                                |
| ----------- | -------------------------------------------- |
| PlayFiles   | Plays Interactive Voice Response (IVR) files |
| Say         | Plays a text-to-speech message               |

#### Actions

| Action                                 | Functionality                                        | Allowed in          |
| -------------------------------------- | ---------------------------------------------------- | ------------------- |
| [Hangup](#section-hangup)              | Instructs to hangup the call                         | ICE or ACE response |
| [Continue](#section-continue)          | Instructs to continue with the call                  | ACE response        |
| [ConnectPSTN](#section-connectpstn)    | Instructs how the PSTN call will be connected        | ICE response        |
| [ConnectMXP](#section-connectmxp)      | Instructs whether the app-app call will be connected | ICE response        |
| [ConnectConf](#section-connectconf)    | Instructs to connect the call to a conference        | ICE response        |
| [ConnectSIP](#section-connectsip-beta) | Instructs to connect the call to a SIP server        | ICE response        |
| [RunMenu](#section-runmenu)            | Instructs to play a menu to the user                 | ICE or ACE response |


### Instructions

Instructions allow your application to play a message to participants given a particular locale. For example, if the locale is set to en-US, messages recorded in English are used. Not all callbacks support playing back messages; see the documentation for each callback for more details. The following instructions are currently supported:

#### PlayFiles
```json
{
    "name" : "playFiles",
    "ids" : [ "welcome" ],
    "locale" : "en-US"
}
```


**playFiles** plays Interactive Voice Response (IVR) files for the supported locale at the Sinch backend. An IVR message is played only on the caller’s side.

**ids** are the ids of the files that will be played out. Files for that locale must be provided to Sinch before they can be used.

**locale** is specified with a language code according to ISO 639, a dash and a country code according to ISO 3166-1 alpha-2.

#### Say
```text
{
    "name" : "say",
    "text" : "Hello, this is a text to speech message",
    "locale" : "en-US"
}
```


**say** instruction is used to play a text-to-speech message to the end user. The message is provided in the *text* field.

**text** is a string that contains the message to be played. The default maximum length is 600 characters. To change this limit, please contact support.

**locale** is specified with a language code according to ISO 639, a dash and a country code according to ISO 3166-1 alpha-2.

### Actions

Actions allow your Sinch application to control individual calls. The following actions are currently available:

#### Hangup
```json
{
    "name" : "hangup"
}
```


**hangup** is the action of either an incoming call event callback or an answered call event callback to hangup the call.

#### Continue
```json
{
    "name" : "continue",
    "record" : true
}
```


**continue** is the action of an answered call event callback to continue setting up the call.

**record** is an optional parameter that allows call recording. Recording files are stored in your own Amazon S3 bucket. The file name generated has this format:

[\[callid\]]()\[applicationkey\].wav

Example:
```text
9ab69740-c024-4e35-8428-712009467480_ff67123-c024-4e35-8428-712009467480.wav
```


#### ConnectPSTN
```json
{
    "name" : "connectPSTN",
    "number" : "+461234567890",
    "locale" : "en-US",
    "maxDuration" : 3000,
    "cli" : "private",
    "record": true,
    "suppressCallbacks" : false
}
```


**connectPSTN** is the action of an incoming call event. It instructs how the PSTN call will be connected.

**maxDuration** is the max duration for the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected

**locale** is specified with a language code according to ISO 639, a dash and a country code according to ISO 3166-1 alpha-2. If not specified, the default Locale is used (en-US)

**number** is used to override where the PSTN call is connected. If not specified, the extension that the client has called is used.

**cli** is used to override the CLI of the client - if “private”, the CLI will be hidden. If not specified, the CLI that the client has set is used. In case of a PSTN-originated call, the phone number of the person that initiated the call will be shown as the CLI. To use CLI, your Sinch account must have CLI capabilities enabled.

**record** is an optional parameter that allows call recording. Recording files are stored in your own Amazon S3 bucket. The file name generated has this format:

[\[callid\]]()\[applicationkey\].wav

Example:
```text
9ab69740-c024-4e35-8428-712009467480_ff67123-c024-4e35-8428-712009467480.wav
```


**suppressCallbacks** if set to true, you are opting out of the callbacks for ACE and DiCE for this call.

> **Note**    
>
> You do not need to set *cli* or *number* if the values supplied by the client suffice.

#### ConnectMXP
```json
{
    "name" : "connectMXP",
    "record" : true,
    "destination":
        {
            "type":"username",
            "endpoint":"hello"
        }
}
```


**connectMXP** is the action of an incoming call event. It allows an app-to-app call to connect.

**record** is an optional parameter that allows call recording. Recording files are stored in your own Amazon S3 bucket. The file name generated has this format:

[\[callid\]]()\[applicationkey\].wav

Example:
```text
9ab69740-c024-4e35-8428-712009467480_ff67123-c024-4e35-8428-712009467480.wav
```


**destination** is an optional parameter that allows you to specify or override the final call destination.

> **Note**    
>
> If you don’t dial the final destination, e.g. if you call another clinet and want a PSTN number to be called, then you need to specify the ‘destination’ parameter.

#### ConnectConf
```json
{
    "name" : "connectConf",
    "conferenceId" : "myConference",
    "moh" : "ring",
    "record" : true
}
```


**connectConf** is the action of an incoming call event. It allows the incoming call to be connected to a conference.

**conferenceId** is the unique identifier of the conference. It should not exceed 64 characters.

**moh** stands for “music-on-hold”. It is an optional parameter that specifies what the first participant should listen to while he/she is alone in the conference, waiting for other participants to join. It can take one of these pre-defined values:

  - “ring” (progress tone)
  - “music1” (music file)
  - “music2” (music file)
  - “music3” (music file)

If no “music-on-hold” is specified, the user will only hear silence.

**record** is an optional parameter that allows conference call recording. Recording files are stored in your own Amazon S3 bucket. The file name generated has this format:

\[ConferenceId\].\[UserspaceId\].\[TimeStarted-YMDHMS\].wav

Example:
```text
myConference.1234.20151027120655.wav
```


By default, conference recording is disabled. To enable it, please contact Sinch support.

#### ConnectSIP - beta
```json
{
    "name" : "connectSIP",
    "destination" : { "endpoint":"46708000000@sip.foo.com" },
    "maxDuration" : 3000,
    "cli" : "private",
    "record": true,
    "suppressCallbacks" : false
}
```


**connectSIP** is the action of an incoming call event. It instructs to route a call to your SIP server.

**destination** specifies where to route the SIP call to.

**maxDuration** is the max duration for the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected.

**cli** is used to override the CLI of the client - if “private”, the CLI will be hidden. If not specified, the CLI that the client has set is used. In case of a PSTN-originated call, the phone number of the person that initiated the call will be shown as the CLI. To use CLI, your Sinch account must have CLI capabilities enabled.

**record** is an optional parameter that allows call recording. Recording files are stored in your own Amazon S3 bucket. The file name generated has this format:

[\[callid\]]()\[applicationkey\].wav

Example:
```text
9ab69740-c024-4e35-8428-712009467480_ff67123-c024-4e35-8428-712009467480.wav
```


**suppressCallbacks** if set to true, you are opting out of the callbacks for ACE and DiCE for this call

The SIP traffic will be routed to your SIP server from the IP address, so make sure it is registered in your SIP server:

> 213.242.88.200

#### RunMenu

With the *runMenu* action, the user will start listening to an IVR menu. This menu can play pre-recorded or text-to-speech messages, collect DTMF tones and trigger the [PIE Callback Event](#section-prompt-input-event-callback-pie-) towards your backend, notifying of the actions that the user took.

*Example of runMenu action*
```json
{
    "name"   :"runMenu",
    "menus"  :
    [
        {
            "id"         : "main",
            "mainPrompt" : "#tts[Welcome to the main menu. Press 1 for support or 2 to continue.]",
            "options"    :
            [
                {
                    "dtmf"   : "1",
                    "action" : "return(support)"
                },
                {
                    "dtmf"   : "2",
                    "action" : "menu(sub)"
                }
            ]
        },
        {
            "id"         : "sub",
            "mainPrompt" : "#tts[Welcome to the sub menu. Enter your 4-digit PIN.]",
            "repeatPrompt" : "#tts[Enter your 4-digit PIN.]",
            "repeats"   : 3,
            "maxDigits" : 4
        }
    ]
}
```


**runMenu** is a valid response action to an [Incoming Call Event (ICE)](#section-incoming-call-event-callback-ice-) or [answered call event (ACE)](#section-answered-call-event-callback-ace-). It instructs what menu to play to the user and what actions to take based on the user’s input. It can also be used in combination with the [manageCall API](doc:voice-rest-api-calling-api#section-manage-call), for conference calls.

**menus** is a list of menus that are available. The menu with “id” : “main” will always play first, otherwise an error will be returned.

**id** is the identifier of a menu. One menu must always have the id “main”.

**mainPrompt** is the main prompt that the user will hear upon entering this menu. It can be a text-to-speech or a pre-recorded message. The maximum length for the text-to-speech messages of applications length is by default 600 characters. To change this limit, please contact support.

**options** show a set of different options that the user can trigger.

**dtmf** indicates a DTMF digit that a user can press.

**action** indicates the action that will be taken if the user presses the pre-defined “dtmf” digit. It can either trigger a [PIE Event](#section-prompt-input-event-callback-pie-) with the “return” action, or it can navigate to another menu with the “menu” action.

**repeatPrompt** is the prompt that will be repeatedly played for the user while waiting for a correct DTMF digit to be pressed. The maximum length for every applications text-to-speech length is by default 600 characters. To change this limit, please contact support.

**repeats** is the number of times that the repeatPrompt will be played.

**maxDigits** is the maximum number of digits that is expected from a user to press. Once these digits are collected, a [PIE Event](#section-prompt-input-event-callback-pie-) will be triggered containing these digits. The digits are collected when either the maximum number of digits are entered, the user presses “\#” or the user waits 5 seconds after the last entered digit.

> **WARNING: Important Notice**    
>
> Not all Actions are supported by all events. Each event lists the supported actions.
>
> URLs for the callbacks described in the section that follows are configured in the Sinch dashboard. If no URL is configured, the callback will not be invoked.

## Incoming Call Event Callback (ICE)

When a call reaches the Sinch dashboard, the system makes a POST request to the specified calling callback URL.

This event, called the “ICE” event, can be triggered by either an incoming data call or an incoming PSTN call. It supports the instruction [PlayFiles](#section-playfiles) to play a prompt and [Say](#section-say) to play a text-to-speech message and the [ConnectPSTN](#section-connectpstn), [ConnectMXP](#section-connectmxp), and [Hangup](#section-hangup) actions.

If there is no response to the callback within the timeout period, an error message is played, and the call is disconnected.

### Authorization

You can find more information on callback request signing [here](doc:authorization#section-callback-request-signing).

### Request
```json
[RequestBody]
{
    string - event
    string - callid
    time - timestamp
    int - version
    string - custom
    string - user
    money - userRate
    string - cli
    identity - to
    string - domain
    string - applicationKey
    string - originationType
    int - duration
}
```


**event** has the value “ice”

**callId** shows the unique Id assigned to this call

**timestamp** shows the timestamp of the call

**version** shows the current API version

**custom** is a string that can be used to pass custom information related to the call from the SDK clients.

**user** shows the user Id that initiated the call

**userRate** contains the rate that will be charged for the call established to the original destination. If the SVAML response specifies another destination, the same rate may not apply.

**cli** shows the number that will be displayed to the recipient of the call. By default it is set to “private”. If you want to be able to set your own CLI when making PSTN calls, please contact Sinch support.

**to** is an object containing information on the recipient of the call.

**domain** shows where the call is supposed to be terminated. It can have the following values:

  - “pstn”: If the call should be terminated in the PSTN network
  - “mxp”: If the call should be terminated in an app (SDK client)
  - “conference”: If the call should be connected to a conference\*\*.

**applicationKey** is the unique application key. You can find it in the Sinch dashboard, under your app credentials.

**originationType** may have one of the following values:

  - “pstn”: If the incoming call comes from the PSTN network (a local
    phone number mapped to your application
  - “mxp”: If the incoming call comes from one of the Sinch SDKs (iOS,
    Android, Javascript) though the data connection.

**duration** shows the duration of the current call.

> **Note**    
>
> There is currently a known issue, which prevents*domain\* to display “conference”, when the call is coming from a SDK client. It will display *pstn* instead. This will be fixed in a future release. You can still detect that this is a conference call originating a SDK client by looking into the “to” identity, which will look like this:
>
> *example of “to” field for a conference call*
>
> ```json
> {
>     "type":"conference",
>     "endpoint":"myCoolConference"
> }
> ```

### Response
```text
[Svaml]
```


*Example app-phone call response*
```json
{
    "instructions":
    [{
        "name" : "playFiles",
        "ids" : [ "welcome" ],
        "locale" : "en-US"
    }],
    "action":
    {
        "name" : "connectPSTN",
        "maxDuration" : 600,
        "number" : "+46555000111",
        "cli" : "+46555000222",
        "suppressCallbacks" : false
    }
}
```


*Example app-app call response*
```json
{
    "action":
    {
        "name" : "connectMXP",
        "destination":
            {
                "type":"username",
                "endpoint":"hello"
            }
    }
}
```


*Example conference call response*
```text
{
    "action":
    {
        "name" : "connectConf",
        "conferenceId" : "myConference123"
    }
}
```


## Answered Call Event Callback (ACE)

This callback is made when the call is picked up by the callee (person receiving the call). It is a POST request to the specified calling callback URL. This event does not support instructions and ignores any instructions passed. It only supports the actions [Continue](#section-continue) and [Hangup](#section-hangup).

If there is no response to the callback within the timeout period, the call is connected.

Please note that the Answered Call Event is only triggered for app-phone calls, not for app-app calls.

### Authorization

You can find more information on callback request signing [here](doc:authorization#section-callback-request-signing).

### Request
```json
[RequestBody]
{
    string - event
    string - callid
    time - timestamp
    int - version
    string - custom
    string - user
}
```


**event** has the value “ace”

**callId** shows the unique Id assigned to this call

**timestamp** shows the timestamp of the call

**version** shows the current API version

**custom** is a string that can be used to pass custom information related to the call from the SDK clients.

**user** shows the user Id that initiated the call

### Response
```text
[Svaml]
```


*Example*
```json
{
    "action":
    {
        "name" : "continue"
    }
}
```


## Disconnect Call Event Callback (DiCE)

This callback is made when the call is disconnected. It is a POST request to the specified calling callback URL. This event does not support instructions and only supports the [hangup](#section-hangup) action.

This callback is a notification. No response is needed.

Please note that the Disconnect Call Event is only triggered for app-phone calls, not for app-app calls.

### Authorization

You can find more information on callback request signing [here](doc:authorization#section-callback-request-signing).

### Request
```json
[RequestBody]
{
    string - event
    string - callid
    time - timestamp
    string - reason
    string - result
    int - version
    string - custom
    string - user
    money - debit
    money - userRate
    identity - to
    int - duration
    string - from
}
```


**event** has the value “dice”

**callId** shows the unique Id assigned to this call

**timestamp** shows the timestamp of the call

**reason** may have one of the following values:

  - “N/A”
  - “TIMEOUT”
  - “CALLERHANGUP”
  - “CALLEEHANGUP”
  - “BLOCKED”
  - “MANAGERHANGUP”
  - “NOCREDITPARTNER”
  - “GENERALERROR”
  - “CANCEL”

**result** may have one of the following values:

  - “ANSWERED”
  - “BUSY”
  - “NOANSWER”
  - “FAILED”

**version** shows the current API version.

**custom** is a string that can be used to pass custom information related to the call from the SDK clients.

**user** shows the user Id that initiated the call.

**debit** contains the amount that was charged for the call.

**userRate** contains the rate per minute that applied for the call.

**to** is an object containing information on the recipient of the call.

**duration** shows the duration of the call.

**from** shows information of the initiator of the call.

### Response
```text
200 OK
```

## Prompt Input Event Callback (PIE)

This callback is triggered as a result of a [runMenu](#section-runmenu) action. It can be triggered from either a user pressing a number of DTMF digits, or by the “return” command.

It is a POST request to the specified calling callback URL. Your application can respond with SVAML logic.

### Authorization

You can find more information on callback request signing [here](doc:authorization#section-callback-request-signing).

### Request
```json
[RequestBody]
{
    string - event
    string - callid
    time - timestamp
    int - version
    MenuResult - menuResult
}

[MenuResult]
{
    string - menuId
    string - type
    string - value
}
```


**event** has the value “pie”.

**callId** shows the unique Id assigned to this call.

**timestamp** shows the timestamp of the call.

**version** is the API version.

**menuId** is the id of the menu that triggered the PIE event.

**type** is the type of information that is returned. It can take the
values:

  - Error
  - Return
  - Sequence
  - Timeout
  - Hangup
  - InvalidInput

When the PIE event has been triggered from a “return” command, then the type will be “Return”.

When the PIE event has been triggered from collecting DTMF digits, then the type will be “Sequence”.

**value** contains the value of the information.

### Response
```text
[Svaml]
```


## Notify Event Callback (Notify)

This is the general callback used to send notifications. It is a POST request to the specified calling callback URL.

If there is no response to the callback within the timeout period, the notification is discarded.

### Authorization

You can find more information on callback request signing [here](doc:authorization#section-callback-request-signing).

### Request
```json
[RequestBody]
{
    string - event
    int - version
    string - type
    string - custom (if applicable)
    // ... notification-specific properties
}
```


**event** has the value “notify”.

**version** is the API version.

**type** is the type of information that is communicated in the notification.

**custom** is an optional parameter that contains notification specific information.

### Response
```text
200 OK
```


### Call-related error notification
```json
[RequestBody]
{
    string - event
    int - version
    string - type
    string - callid
    int - errorCode
    string - errorMsg
    string - user
    string - custom
}
```


**errCode** may have one of the following values:

>    ``40001`` - Illegal SVAML
>    ``50000`` - Internal error

### Tagging calls

In ICE and ACE callback responses, the Action model supports adding tags for the call. These tags will be included in the CDR that is produced.
```json
Response with tags
{
"Action": {
"name": "ConnectPstn",
"number": "+46700000000",
"tags": [
          { "key": "tag1", "value": "value1" },
          { "key": "tag2", "value": "value2" }
    ]
    }
}

CDR
{
...
    "Result": "ANSWERED",
    "CallTags": { "tag1": "value1", "tag2": "value2" }
...
}
```


Since tags are accepted on both ICE and ACE callback responses, the values defined in the ACE response are concatenated to the tags list defined in the ICE response. Clashing key values are overridden by the latest value specified for the key. Tag keys are case-sensitive.

Size limits for keys and values are 32 characters.

Only ASCII characters are allowed.

Spaces before and after the key and values will be removed/trimmed.
