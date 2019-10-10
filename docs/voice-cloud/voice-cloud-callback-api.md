---
title: "Callback API"
excerpt: ""
hidden: "true"
---
## Overview

Controlling a call from your application backend is done by responding to callbacks from the Sinch platform and/or by calling REST APIs in the Sinch platform from your application’s backend. The figure that follows illustrates the lifecycle of a call and shows where both callbacks and REST API calls are located or can be made.

![image0](images/callbackevents.png)

The **Incoming Call Event (ICE)**, is triggered when the Sinch platform receives an incoming call. The event can trigger a REST request to your application backend. Your reply instructs the Sinch platform how to act. The response can include an object written in the **Sinch Voice Application Markup Language (SVAML)** and it can, for instance, instruct Sinch to play a number of IVRs and then connect the call to the PSTN. The **Answered Call Event (ACE)** is triggered when the call is answered and can render an additional REST call to your platform. SVAML instructions can again be provided in the response to the ACE event. Finally, the **Disconnected Call Event (DiCE)** is triggered when the call is disconnected. Between ACE and DiCE, it is legal to call the **ManageCall** REST API which is part of the Calling API, to instruct the call to be hung up and/or to play an Interactive Voice Response (IVR) during the conversation.

## Sinch Voice Application Markup Language (SVAML)

SVAML is a call control markup language developed by Sinch. When your backend receives callback event from the Sinch platform, it can respond with a *SVAML object* to control the voice call. The SVAML object type is defined like this:

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

SVAML Quick Reference
---------------------

### Instructions

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <thead>
        <tr class="header">
          <th align="left">Instruction</th>
          <th align="left">Functionality</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">PlayFiles</td>
          <td align="left">Plays Interactive Voice Response (IVR) files</td>
        </tr>
        <tr class="even">
          <td align="left">Say</td>
          <td align="left">Plays a text-to-speech message</td>
        </tr>
        <tr class="odd">
          <td align="left">SetCookie</td>
          <td align="left">Sets a key/value pair session cookie that can be access in events throughout the call</td>
        </tr>
        <tr class="even">
          <td align="left">Answer</td>
          <td align="left">Explicitly answers an incoming call (not normally required)</td>
        </tr>
        <tr class="odd">
          <td align="left">StartRecording</td>
          <td align="left">Starts call recording</td>
        </tr>
        <tr class="even">
          <td align="left">StopRecording</td>
          <td align="left">Stops call recording</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Actions

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <thead>
        <tr class="header">
          <th align="left">Action</th>
          <th align="left">Functionality</th>
          <th align="left">Allowed in</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">Hangup</td>
          <td align="left">Instructs to hangup the call</td>
          <td align="left">ICE or ACE response</td>
        </tr>
        <tr class="even">
          <td align="left">Continue</td>
          <td align="left">Instructs to continue with the call</td>
          <td align="left">ACE response</td>
        </tr>
        <tr class="odd">
          <td align="left">ConnectPstn</td>
          <td align="left">Instructs how the PSTN call will be connected</td>
          <td align="left">ICE response</td>
        </tr>
        <tr class="even">
          <td align="left">ConnectConf</td>
          <td align="left">Instructs to connect the call to a conference</td>
          <td align="left">ICE response</td>
        </tr>
        <tr class="odd">
          <td align="left">RunMenu</td>
          <td align="left">Instructs to play a menu to the user</td>
          <td align="left">ICE or ACE response</td>
        </tr>
        <tr class="even">
          <td align="left">Park</td>
          <td align="left">Puts an incoming call on hold</td>
          <td align="left">ICE response</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Instructions

Instructions allow your application to play a message to participants given a particular locale. For example, if the locale is set to en-US, messages recorded in English are used. Not all callbacks support playing back messages; see the documentation for each callback for more details. The following instructions are currently supported:

### PlayFiles

    {
        "name" : "playFiles",
        "ids" : [ "welcome" ],
        "locale" : "en-US"
    }

**playFiles** plays Interactive Voice Response (IVR) files for the supported locale at the Sinch backend. An IVR message is played only on the caller’s side.

**ids** are the ids of the files that will be played out. These can be either a URL or a local file path for media provided by Sinch partners. The provided media files will be played in the order they are specified, without any pauses between playbacks. Check the IVR section for more information.

**locale** is specified with a language code according to ISO 639, a dash and a country code according to ISO 3166-1 alpha-2.

### Say

    {
        "name" : "Say",
        "text" : "Hello, this is a text to speech message",
        "locale" : "en-US"
    }

**say** instruction is used to play a text-to-speech message to the end user. The message is provided in the *text* field.

**text** is a string that contains the message to be played. Note that the text cannot be longer than 200 characters and that currently only English “en-US” is supported.

**locale** is specified with a language code according to ISO 639, a dash and a country code according to ISO 3166-1 alpha-2.

Supported languages / locales:

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <thead>
        <tr class="header">
          <th align="left">Locale</th>
          <th align="left">Language</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">da-DK</td>
          <td align="left">Danish</td>
        </tr>
        <tr class="even">
          <td align="left">nl-NL</td>
          <td align="left">Dutch</td>
        </tr>
        <tr class="odd">
          <td align="left">en-AU</td>
          <td align="left">English (Australian)</td>
        </tr>
        <tr class="even">
          <td align="left">en-GB</td>
          <td align="left">English (British)</td>
        </tr>
        <tr class="odd">
          <td align="left">en-IN</td>
          <td align="left">English (Indian)</td>
        </tr>
        <tr class="even">
          <td align="left">en-US</td>
          <td align="left">English (US)</td>
        </tr>
        <tr class="odd">
          <td align="left">en-GB-WLS</td>
          <td align="left">English (Welsh)</td>
        </tr>
        <tr class="even">
          <td align="left">fr-FR</td>
          <td align="left">French</td>
        </tr>
        <tr class="odd">
          <td align="left">fr-CA</td>
          <td align="left">French (Canadian)</td>
        </tr>
        <tr class="even">
          <td align="left">de-DE</td>
          <td align="left">German</td>
        </tr>
        <tr class="odd">
          <td align="left">is-IS</td>
          <td align="left">Icelandic</td>
        </tr>
        <tr class="even">
          <td align="left">it-IT</td>
          <td align="left">Italian</td>
        </tr>
        <tr class="odd">
          <td align="left">ja-JP</td>
          <td align="left">Japanese</td>
        </tr>
        <tr class="even">
          <td align="left">ko-KR</td>
          <td align="left">Korean</td>
        </tr>
        <tr class="odd">
          <td align="left">nb-NO</td>
          <td align="left">Norwegian</td>
        </tr>
        <tr class="even">
          <td align="left">pl-PL</td>
          <td align="left">Polish</td>
        </tr>
        <tr class="odd">
          <td align="left">pt-BR</td>
          <td align="left">Portuguese (Brazilian)</td>
        </tr>
        <tr class="even">
          <td align="left">pt-PT</td>
          <td align="left">Portuguese (European)</td>
        </tr>
        <tr class="odd">
          <td align="left">ro-RO</td>
          <td align="left">Romanian</td>
        </tr>
        <tr class="even">
          <td align="left">ru-RU</td>
          <td align="left">Russian</td>
        </tr>
        <tr class="odd">
          <td align="left">es-ES</td>
          <td align="left">Spanish (European)</td>
        </tr>
        <tr class="even">
          <td align="left">es-US</td>
          <td align="left">Spanish (Latin American)</td>
        </tr>
        <tr class="odd">
          <td align="left">sv-SE</td>
          <td align="left">Swedish</td>
        </tr>
        <tr class="even">
          <td align="left">tr-TR</td>
          <td align="left">Turkish</td>
        </tr>
        <tr class="odd">
          <td align="left">cy-GB</td>
          <td align="left">Welsh</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### SetCookie

    {
        "name" : "SetCookie",
        "key" : "cookiename",
        "value" : "cookievalue"
    }

**key** the name of the cookie you want to set.

**value** the value of the cookie you want to set.

If you set a cookie in the response to an event (like “ice” or “ace”), it will be sent along in subsequent events in the session (like for instance “dice”). This can be used to keep simple application state during a call.

Limitations: The total size of cookie data (keys and values) may not exceed 1024 bytes.

### Answer

    {
        "name" : "Answer"
    }

Normally, an call is “answered” when a callee picks up a call from a caller (for instance, when the callee picks up when doing a “connectPstn” action for an incoming call, see connectPstn \<voice-cloud-connectPstn\>). This normally means that the call duration starts “ticking” on the caller’s phone and that sound can flow in both directions.

This is normally handled automatically, but by adding the “answer” instruction, you can force the incoming call to be answered before the call is connected and a callee picks up. For instance, if you add the “answer” instruction in an ICE response with the “connectPstn” action, the caller’s phone will pick up and its call duration will start ticking immediately (and not wait until the callee answers the call).

### StartRecording

Starts recording the call.

    {
        "name": "StartRecording",
        "options": {
            "destination": "s3://my-bucket/",
            "credentials": "AKIAIOSFODNN7EXAMPLE:wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY:eu-central-1",
            "notificationEvents": true
        }
    }

**options** is a RecordingOptions object that specifies details about the recording. See RecordingOptions for more details.

### StopRecording

Stops an ogoing recording for the current call.

    {
        "name": "StopRecording"
    }

Actions
-------

Actions allow your Sinch application to control individual calls. The following actions are currently available:

### Hangup

    {
        "name" : "Hangup"
    }

**hangup** is the action of either an incoming call event callback or an answered call event callback to hangup the call.

### Continue

    {
        "name" : "Continue",
        "record": false,
        "recordingOptions": [RecordingOptionsObject]
    }

**continue** is the action of an answered call event callback to continue setting up the call.

**record** is an optional parameter that instructs the system to record the call. Check the recording section for more information.

**recordingOptions** is sent when record is set to true and specifies the details about the recording. See RecordingOptions for more details.

### ConnectPstn

    {
        "name" : "ConnectPstn",
        "number" : "+461234567890",
        "locale" : "en-US",
        "maxDuration" : 3000,
        "cli" : "private",
        "suppressCallbacks" : false,
        "record": false,
        "indications": "se"
    }

**ConnectPstn** is the action of an incoming call event. It instructs how the PSTN call will be connected.

**number** is used to override where the PSTN call is connected. If not specified, the extension that the client has called is used.

**locale** is specified with a language code according to ISO 639, a dash and a country code according to ISO 3166-1 alpha-2. If not specified, the default Locale is used (en-US)

**maxDuration** is the max duration for the call in seconds (max 14400 seconds). If the call is still connected at that time, it will be automatically disconnected

**cli** is used to override the CLI of the client - if “private”, the CLI will be hidden. If not specified, the CLI that the client has set is used. In case of a PSTN-originated call, the phone number of the person that initiated the call will be shown as the CLI. To use CLI, your Sinch account must have CLI capabilities enabled.

**suppressCallbacks** if set to true, you are opting out of the callbacks for ACE and DiCE for this call.

**record** is an optional parameter that instructs the system to record the call. Check the recording section for more information.

**recordingOptions** is sent when record is set to true and specifies the details about the recording. See RecordingOptions for more details.

**indications** the tone to play while ringing. Available values:

<div class="magic-block-html">
  <div class="marked-table">
    <table>
      <thead>
        <tr class="header">
          <th align="left">Indication</th>
          <th align="left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd">
          <td align="left">at</td>
          <td align="left">Austria</td>
        </tr>
        <tr class="even">
          <td align="left">au</td>
          <td align="left">Australia</td>
        </tr>
        <tr class="odd">
          <td align="left">bg</td>
          <td align="left">Bulgaria</td>
        </tr>
        <tr class="even">
          <td align="left">br</td>
          <td align="left">Brazil</td>
        </tr>
        <tr class="odd">
          <td align="left">be</td>
          <td align="left">Belgium</td>
        </tr>
        <tr class="even">
          <td align="left">ch</td>
          <td align="left">Switzerland</td>
        </tr>
        <tr class="odd">
          <td align="left">cl</td>
          <td align="left">Chile</td>
        </tr>
        <tr class="even">
          <td align="left">cn</td>
          <td align="left">China</td>
        </tr>
        <tr class="odd">
          <td align="left">cz</td>
          <td align="left">Czech Republic</td>
        </tr>
        <tr class="even">
          <td align="left">de</td>
          <td align="left">Germany</td>
        </tr>
        <tr class="odd">
          <td align="left">dk</td>
          <td align="left">Denmark</td>
        </tr>
        <tr class="even">
          <td align="left">ee</td>
          <td align="left">Estonia</td>
        </tr>
        <tr class="odd">
          <td align="left">es</td>
          <td align="left">Spain</td>
        </tr>
        <tr class="even">
          <td align="left">fi</td>
          <td align="left">Finland</td>
        </tr>
        <tr class="odd">
          <td align="left">fr</td>
          <td align="left">France</td>
        </tr>
        <tr class="even">
          <td align="left">gr</td>
          <td align="left">Greece</td>
        </tr>
        <tr class="odd">
          <td align="left">hu</td>
          <td align="left">Hungary</td>
        </tr>
        <tr class="even">
          <td align="left">il</td>
          <td align="left">Israel</td>
        </tr>
        <tr class="odd">
          <td align="left">in</td>
          <td align="left">India</td>
        </tr>
        <tr class="even">
          <td align="left">it</td>
          <td align="left">Italy</td>
        </tr>
        <tr class="odd">
          <td align="left">lt</td>
          <td align="left">Lithuania</td>
        </tr>
        <tr class="even">
          <td align="left">jp</td>
          <td align="left">Japan</td>
        </tr>
        <tr class="odd">
          <td align="left">mx</td>
          <td align="left">Mexico</td>
        </tr>
        <tr class="even">
          <td align="left">my</td>
          <td align="left">Malaysia</td>
        </tr>
        <tr class="odd">
          <td align="left">nl</td>
          <td align="left">Netherlands</td>
        </tr>
        <tr class="even">
          <td align="left">no</td>
          <td align="left">Norway</td>
        </tr>
        <tr class="odd">
          <td align="left">nz</td>
          <td align="left">New Zealand</td>
        </tr>
        <tr class="even">
          <td align="left">ph</td>
          <td align="left">Philippines</td>
        </tr>
        <tr class="odd">
          <td align="left">pl</td>
          <td align="left">Poland</td>
        </tr>
        <tr class="even">
          <td align="left">pt</td>
          <td align="left">Portugal</td>
        </tr>
        <tr class="odd">
          <td align="left">ru</td>
          <td align="left">Russia</td>
        </tr>
        <tr class="even">
          <td align="left">se</td>
          <td align="left">Sweden</td>
        </tr>
        <tr class="odd">
          <td align="left">sg</td>
          <td align="left">Singapore</td>
        </tr>
        <tr class="even">
          <td align="left">th</td>
          <td align="left">Thailand</td>
        </tr>
        <tr class="odd">
          <td align="left">uk</td>
          <td align="left">United Kingdom</td>
        </tr>
        <tr class="even">
          <td align="left">us</td>
          <td align="left">United States</td>
        </tr>
        <tr class="odd">
          <td align="left">tw</td>
          <td align="left">Taiwan</td>
        </tr>
        <tr class="even">
          <td align="left">ve</td>
          <td align="left">Venezuela</td>
        </tr>
        <tr class="odd">
          <td align="left">za</td>
          <td align="left">South Africa</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**Notice**: You do not need to set *cli* or *number* if the values supplied by the client suffice.

### ConnectConf

    {
        "name" : "ConnectConf",
        "conferenceId" : "myConference",
        "moh" : "ring",
        "record": false
    }

**connectConf** is the action of an incoming call event. It allows the incoming call to be connected to a conference.

**conferenceId** is the unique identifier of the conference. It should not exceed 64 characters.

**moh** stands for “music-on-hold”. It is an optional parameter that specifies what the first participant should listen to while he/she is alone in the conference, waiting for other participants to join. It can take one of these pre-defined values:

> -   “ring” (progress tone)
> -   “music1” (music file)
> -   “music2” (music file)
> -   “music3” (music file)

If no “music-on-hold” is specified, the user will only hear silence.

**record** is an optional parameter that instructs the system to record the conference. Check the recording section for more information.

**recordingOptions** is sent when record is set to true and specifies the details about the recording. See RecordingOptions for more details.

### RunMenu

With the *runMenu* action, the user will start listening to an IVR menu. This menu can play pre-recorded or text-to-speech messages, collect DTMF tones and trigger the PIE Callback Event \<voice-cloud-PIE\> towards your backend, notifying of the actions that the user took.

*Example of runMenu action*

    {
        "name"   :"RunMenu",
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
                "mainPrompt" : "#tts[Welcome to the sub menu. Enter your 4-digit PIN.];#href[http://your.host.com/media_file.mp3]",
                "repeatPrompt" : "#tts[Enter your 4-digit PIN.];http://your.host.com/media_file.mp3",
                "repeats"   : 3,
                "maxDigits" : 4
            }
        ]
    }

**runMenu** is a valid response action to an incoming call event (ICE) \<voice-cloud-ICE\> or answered call event (ACE) \<voice-cloud-ACE\>. It instructs what menu to play to the user and what actions to take based on the user’s input. It can also be used in combination with the manageCall API \<voice-cloud-managecall\>, for conference calls.

**menus** is a list of menus that are available. The menu with “id” : “main” will always play first, otherwise an error will be returned.

**id** is the identifier of a menu. One menu must always have the id “main”.

**mainPrompt** is the main prompt that the user will hear upon entering the menu. The available alternatives are: text-to-speech, pre-recorded messages or a URL reference to an external media file. Multiple prompts are supported - and are used through separation using semi-colons (;). If multiple prompts are used, the prompts will be played in the order they are specified, without any pauses between playbacks. For external media resources, provided by a URL, both using a \#href[…] and directly specifying the URL are supported. Check the IVR section for more information.

**options** show a set of different options that the user can trigger.

**dtmf** indicates a DTMF digit that a user can press.

**action** indicates the action that will be taken if the user presses the pre-defined “dtmf” digit. It can either trigger a PIE Event \<voice-cloud-PIE\> with the “return” action, or it can navigate to another menu with the “menu” action.

**repeatPrompt** is the prompt that will be repeatedly play to the user if the correct DTMF digit is not pressed. The same rules as the mainPrompt apply.

**repeats** is the number of times that the repeatPrompt will be played.

**maxDigits** is the maximum number of digits that is expected from a user to press. Once these digits are collected, a PIE Event \<voice-cloud-PIE\> will be triggered containing these digits. The digits are collected when either the maximum number of digits are entered, the user presses “\#” or the user waits 5 seconds after the last entered digit.

### Park

With the *park* action, the caller will be “parked” - put into a loop, listening to an IVR (pre-recorded or generated by text to speech).

*Example of park action*

    {
        "name"   :"Park",
        "introPrompt" : "#tts[Welcome]",
        "holdPrompt" : "#tts[Please wait, you are put on hold]",
        "maxDuration" : 180
    }

**introPrompt** specifies the prompt that will be played as the first prompt. After that, the **holdPrompt** will be played repeatably until the call is unparked or until **maxDuration** seconds have passed. If the call is unparked, prompts will stop playing immediately. However, if the max duration is reached, the last prompt will be fully played until the call is hung up.

Unparking a call is done by using the manageCall API \<voice-cloud-managecall\>.

Limitation: The maxDuration value can be set to maximum 600 seconds (10 minutes).

### Important Notice

Not all Actions are supported by all events. Each event lists the supported actions.

URLs for the callbacks described in the section that follows are configured in the Sinch dashboard. If no URL is configured, the callback will not be invoked.

## Incoming Call Event Callback (ICE)

When a call reaches the Sinch platform, the system makes a POST request to the specified calling callback URL.

This event, called the “ICE” event, can be triggered by either an incoming data call or an incoming PSTN call. It supports the instruction PlayFiles \<voice-cloud-playfiles\> to play a prompt and Say \<voice-cloud-say\> to play a text-to-speech message and the connectPstn \<voice-cloud-connectPstn\>, ConnectConf \<voice-cloud-ConnectConfAction\>, and Hangup \<voice-cloud-HangupAction\> actions.

If there is no response to the callback within the timeout period, an error message is played, and the call is disconnected.

### Authorization

You can find more information on callback request signing here \<callbackrequestsigning\>.

### Request

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

> -   “pstn”: If the call should be terminated in the PSTN network
> -   “conference”: If the call should be connected to a conference\*\*.

**applicationKey** is the unique application key. You can find it in the Sinch dashboard, under your app credentials.

**originationType** may have one of the following values:

> -   “pstn”: If the incoming call comes from the PSTN network (a local phone number mapped to your application
> -   “mxp”: If the incoming call comes from one of the Sinch SDKs (iOS, Android, Javascript) though the data connection.

**duration** shows the duration of the current call.

> **Note**
>
> There is currently a known issue, which prevents\*domain\*  
> to display “conference”, when the call is coming from a SDK client. It will display *pstn* instead. This will be fixed in a future release. You can still detect that this is a conference call originating a SDK client by looking into the “to” identity, which will look like this:
>
> *example of “to” field for a conference call*
>
>     {
>         "type":"conference",
>         "endpoint":"myCoolConference"
>     }

### Response

    [Svaml]

*Example app-phone call response*

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

*Example conference call response*

    {
        "action":
        {
            "name" : "ConnectConf",
            "conferenceId" : "myConference123"
        }
    }

## Answered Call Event Callback (ACE)

This callback is made when the call is picked up by the callee (person receiving the call). It is a POST request to the specified calling callback URL. This event does not support instructions and ignores any instructions passed. It only supports the actions Continue \<voice-cloud-ContinueAction\> and Hangup \<voice-cloud-HangupAction\>.

If there is no response to the callback within the timeout period, the call is connected.

### Authorization

You can find more information on callback request signing here \<callbackrequestsigning\>.

### Request

    [RequestBody]
    {
        string - event
        string - callid
        time - timestamp
        int - version
        string - custom
        string - user
    }

**event** has the value “ace”

**callId** shows the unique Id assigned to this call

**timestamp** shows the timestamp of the call

**version** shows the current API version

**custom** is a string that can be used to pass custom information related to the call from the SDK clients.

**user** shows the user Id that initiated the call

### Response

    [Svaml]

*Example*

    {
        "action":
        {
            "name" : "Continue"
        }
    }

## Disconnect Call Event Callback (DiCE)

This callback is made when the call is disconnected. It is a POST request to the specified calling callback URL. This event does not support instructions and only supports the hangup \<voice-cloud-HangupAction\> action.

This callback is a notification. No response is needed.

### Authorization

You can find more information on callback request signing here \<callbackrequestsigning\>.

### Request

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

**event** has the value “dice”

**callId** shows the unique Id assigned to this call

**timestamp** shows the timestamp of the call

**reason** may have one of the following values:

> -   “N/A”
> -   “TIMEOUT”
> -   “CALLERHANGUP”
> -   “CALLEEHANGUP”
> -   “BLOCKED”
> -   “MANAGERHANGUP”
> -   “NOCREDITPARTNER”
> -   “GENERALERROR”
> -   “CANCEL”

**result** may have one of the following values:

> -   “ANSWERED”
> -   “BUSY”
> -   “NOANSWER”
> -   “FAILED”

**version** shows the current API version.

**custom** is a string that can be used to pass custom information related to the call from the SDK clients.

**user** shows the user Id that initiated the call.

**debit** contains the amount that was charged for the call.

**userRate** contains the rate per minute that applied for the call.

**to** is an object containing information on the recipient of the call.

**duration** shows the duration of the call.

**from** shows information of the initiator of the call.

### Response

    200 OK

## Prompt Input Event Callback (PIE)

This callback is triggered as a result of a runMenu \<voice-cloud-runmenuaction\> action. It can be triggered from either a user pressing a number of DTMF digits, or by the “return” command.

It is a POST request to the specified calling callback URL. Your application can respond with SVAML logic.

### Authorization

You can find more information on callback request signing here \<callbackrequestsigning\>.

### Request

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

**event** has the value “pie”.

**callId** shows the unique Id assigned to this call.

**timestamp** shows the timestamp of the call.

**version** is the API version.

**menuId** is the id of the menu that triggered the PIE event.

**type** is the type of information that is returned. It can take the values:

> -   Error
> -   Return
> -   Sequence
> -   Timeout
> -   Hangup
> -   InvalidInput

When the PIE event has been triggered from a “return” command, then the type will be “Return”.

When the PIE event has been triggered from collecting DTMF digits, then the type will be “Sequence”.

**value** contains the value of the information.

### Response

    [Svaml]

## Notify Event Callback (Notify)

This is the general callback used to send notifications. It is a POST request to the specified calling callback URL.

If there is no response to the callback within the timeout period, the notification is discarded.

### Authorization

You can find more information on callback request signing here \<callbackrequestsigning\>.

### Request

    [RequestBody]
    {
        string - event
        int - version
        string - type
        string - custom (if applicable)
        // ... notification-specific properties
    }

**event** has the value “notify”.

**version** is the API version.

**type** is the type of information that is communicated in the notification.

**custom** is an optional parameter that contains notification specific information.

### Response

    200 OK

### Call-related error notification

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

**event** has the value “notify”.

**version** is the API version.

**type** has the value “callingerror”.

**errCode** may have one of the following values:

    40001 - Illegal SVAML
    50000 - Internal error
