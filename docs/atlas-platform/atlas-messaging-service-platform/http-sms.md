---
title: "HTTP SMS"
excerpt: ""
hidden: "true"
---
## Introduction

This document describes the Sinch HTTP SMS API for the purpose of integrating SMS into applications and web systems. Sending SMS via this interface is simple and easy to integrate into applications written in almost any programming language because most languages have built-in support for making HTTP requests. The SMS is sent to our server in the same way as submitting a form on a website (POST) or typing a URL into a web browser (GET). To make things easier, we provide several `api_packages` to help with your integration.

The interface supports both HTTP GET and HTTP POST requests for submitting messages as well as two methods for retrieving delivery receipts and incoming SMS messages. HTTP persistent connections can be used to reduce connection overhead for increased message throughput. All input should be fully `url_encoding`.

Multiple failover servers are available to offer increased redundancy in case of Internet or system Multiple failover servers are available to offer increased redundancy in case of Internet or system problems. They are accessed by changing the hostname in the `request_url`.

Additionally, secure HTTPS is available by changing the protocol and port number in the `request_url`.

## Submitting Messages

This section describe the request URL, all of its associated input parameters and their corresponding values, and the expected server response for the process of submitting an SMS.

### Hosts

You can connect to any of the following hosts with your given username and password.

| Host                                          | Location           |
| --------------------------------------------- | ------------------ |
| <span class="title-ref">sms1.mblox.com</span> | London, UK         |
| <span class="title-ref">sms2.mblox.com</span> | Virginia, US       |
| <span class="title-ref">sms3.mblox.com</span> | Dallas, US         |
| <span class="title-ref">sms5.mblox.com</span> | Frankfurt, Germany |

### Request URL

Any of the available hosts may be used with in the request URL, as
follows:

`http://sms#.mblox.com:9001/HTTPSMS?`

Where *#* is replaced with *1*, *2*, *3* or *5*, according to the host being used.

### Secure Request URL

HTTPS is available on all server hostnames by changing both the protocol type to "https", and changing the port number to "9444". It is recommended that HTTPS is only used for messages that specifically require encryption over the Internet.

`https://sms#.mblox.com:9444/HTTPSMS?`

### Input Parameters

This table lists each parameter that can be submitted with the request URL. Parameters are case sensitive.

#### Mandatory Parameters

| Parameter | Name                | Description                                                                                                                         |
| --------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| S         | System Type         | Must be set to value: H                                                                                                             |
| UN        | Username            | Account username (case sensitive)                                                                                                   |
| P         | Password            | Account password (case sensitive)                                                                                                   |
| DA        | Destination Address | Destination mobile number in international format without + prefix. Up to 10 different numbers can be supplied separated by commas. |
| SA        | Source Address      | Originator address (sender id). Up to 16 numeric or 11 alphanumeric characters.                                                     |
| M         | Message Body        | The SMS text for plain messages or UCS2 hex for Unicode. For binary, hex encoded 8-bit data.                                        |

#### Optional Parameters

<div class="magic-block-html">
    <div class="marked-table">
   <table>
   <thead>
   <tr class="header">
   <th>Parameter</th>
   <th>Name</th>
   <th>Description</th>
   </tr>
   </thead>
   <tbody>
   <tr class="odd">
   <td><p>ST</p></td>
   <td><p>Source Address Type (TON)</p></td>
   <td><dl>
   <dt>Controls the type of originator where:</dt>
   <dd><div class="line-block">1 = International numeric<br />
   0 = National numeric<br />
   5 = Alphanumeric</div>
   </dd>
   </dl></td>
   </tr>
   <tr class="even">
   <td><p>DC</p></td>
   <td><p>Data Coding Type</p></td>
   <td><dl>
   <dt>Controls the type of message content where:</dt>
   <dd><div class="line-block">0 = Flash<br />
   1 = Normal (default)<br />
   2 = Binary<br />
   4 = UCS2<br />
   5 = Flash UCS2<br />
   6 = Normal GSM encoded</div>
   </dd>
   </dl></td>
   </tr>
   <tr class="odd">
   <td><p>DR</p></td>
   <td><p>Delivery Receipt Request</p></td>
   <td><dl>
   <dt>Controls whether a delivery receipt is requested for the message where:</dt>
   <dd><div class="line-block">0 = No (default)<br />
   1 = Yes<br />
   2 = Record Only<br />
   7 = Flash Normal GSM encoded</div>
   </dd>
   </dl></td>
   </tr>
   <tr class="even">
   <td>UR</td>
   <td>User Reference</td>
   <td>Unique reference supplied by user to aid with matching delivery receipts. Maximum 16 alphanumeric characters including _ and -</td>
   </tr>
   <tr class="odd">
   <td>V</td>
   <td>Validity Period</td>
   <td>The number of minutes to attempt delivery before the message expires. Maximum 10080.</td>
   </tr>
   <tr class="even">
   <td>UD</td>
   <td>User Data Header</td>
   <td>Hex encoded UDH to be used with binary messages.</td>
   </tr>
   </tbody>
   </table>
   </div>
</div>

### Server Response

The server forms a HTTP response based on the outcome of the following processes:

>   - **Request syntax check** - Ensures all mandatory parameters are present
>   - **Input parameter validation** - Ensures parameter values do not contain invalid characters and that they are of the correct length
>   - **Authentication check** - Username and password validation
>   - **Destination address coverage check** - Confirms the destination mobile number(s) are valid and can be reached using your account routing configuration
>   - **Credit balance check** - Ensures there is sufficient credit on your account to send the message
>   - **Message sent check** - Confirms the message was successfully accepted and assigned a unique message ID

A response consists of two parts:

>   - HTTP header status code
>   - HTTP content containing a plain text string

It is only necessary to check the HTTP content. The HTTP header status code can be useful for integrating with systems that are only capable of determining success based on a 200 OK header status.

The syntax of the possible responses is described below where:

>   - **Italics** - Represents variable content such as message ID’s
>   - **\[optional\]** - Anything within a square bracket is optional. The brackets are not printed.

#### Successful Response

HTTP Header: *200 OK* Content: *OK messageid \[messageidn\] \[UR:userreference\]*

If all of the above checks are successful for at least 1 of the destination numbers and there is enough credit to send to all of the destination numbers, a response will be returned with a HTTP header status code of 200 OK. The response content will contain the word OK followed by one or more numeric message ID’s (e.g. *1000000123456789*) and the User Reference if one was supplied in the request.

#### Unsuccessful Response

<div class="magic-block-html">
    <div class="marked-table">
   <table>
   <thead>
   <tr class="header">
   <th>Error</th>
   <th>HTTP Header</th>
   <th>HTTP Content</th>
   <th>Description</th>
   </tr>
   </thead>
   <tbody>
   <tr class="odd">
   <td><blockquote>
   <p><span class="title-ref">-5</span></p>
   </blockquote></td>
   <td><span class="title-ref">402 Payment Required</span></td>
   <td><span class="title-ref">ERR -5</span></td>
   <td>Insufficient credit</td>
   </tr>
   <tr class="even">
   <td><blockquote>
   <p><span class="title-ref">-10</span></p>
   </blockquote></td>
   <td><span class="title-ref">401 Unauthorized</span></td>
   <td><span class="title-ref">ERR -10</span></td>
   <td>Invalid username or password</td>
   </tr>
   <tr class="odd">
   <td><blockquote>
   <p><span class="title-ref">-15</span></p>
   </blockquote></td>
   <td><span class="title-ref">503 Service Unavailable</span></td>
   <td><span class="title-ref">ERR -15</span></td>
   <td>Invalid destination or destination not covered</td>
   </tr>
   <tr class="even">
   <td><blockquote>
   <p><span class="title-ref">-20</span></p>
   </blockquote></td>
   <td><span class="title-ref">500 Internal Server Error</span></td>
   <td><span class="title-ref">ERR -20</span></td>
   <td>System error, please retry</td>
   </tr>
   <tr class="odd">
   <td><blockquote>
   <p><span class="title-ref">-25</span></p>
   </blockquote></td>
   <td><span class="title-ref">400 Bad Request</span></td>
   <td><span class="title-ref">ERR -25</span></td>
   <td>Bad request; check parameters</td>
   </tr>
   <tr class="even">
   <td><blockquote>
   <p><span class="title-ref">-30</span></p>
   </blockquote></td>
   <td><span class="title-ref">429 Service Unavailable</span></td>
   <td><span class="title-ref">ERR -30</span></td>
   <td>Throughput exceeded</td>
   </tr>
   </tbody>
   </table>
   </div>
</div>

Message ID’s are displayed in the order that destination numbers are provided in, in the request. If a message is successfully sent to a destination number, a positive numeric message ID will be returned. It is possible that some destination numbers are successful and some are unsuccessful. In the later case, a negative numeric value of -15 (Invalid destination or destination not covered) or -20 (System error, please retry) will be returned as the message ID.

If a User Reference was supplied in the request, it will be appended to the end of the response, prefixed with <span class="title-ref">UR:</span> A single white space separates all message ID’s and the User Reference. There will never be a white space at the end of the content.

#### Example Responses

| Response                                                               | HTTP Header                                    | Content                                                             |
| ---------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| Successful                                                             | <span class="title-ref">200 OK</span>          | <span class="title-ref">OK 1000000123456789</span>                  |
| Successful with a user reference                                       | <span class="title-ref">200 OK</span>          | <span class="title-ref">OK 1000000123456789 UR:JBD829SSA</span>     |
| Success to one MSISDN, unsuccessful to one MSISDN and a user reference | <span class="title-ref">200 OK</span>          | <span class="title-ref">OK 1000000123456789 -15 UR:JBD829SSA</span> |
| Unsuccessful request                                                   | <span class="title-ref">400 Bad Request</span> | <span class="title-ref">ERR -25</span>                              |

### Message Types & Encoding

<div class="magic-block-html">
    <div class="marked-table">
   <table>
   <thead>
   <tr class="header">
   <th>Type of SMS</th>
   <th>DC Value</th>
   <th>Description</th>
   </tr>
   </thead>
   <tbody>
   <tr class="odd">
   <td>Plain (7-bit)</td>
   <td><span class="title-ref">1</span> (default)</td>
   <td>Plain SMS text such as English encoded as ISO-8859-1 (latin1)</td>
   </tr>
   <tr class="even">
   <td>Flash Plain (7-bit)</td>
   <td><span class="title-ref">0</span></td>
   <td>Same as the above but pops up on screen without the user have to select to read the message</td>
   </tr>
   <tr class="odd">
   <td><p>Binary (8-bit)</p></td>
   <td><p><span class="title-ref">2</span></p></td>
   <td><div class="line-block">Hex encoded binary data, accompanied with a User Data Header<br />
   and is used for the transmission of WAP Push, monophonic ringtones,<br />
   operator logos, v-cards, and other smart message formats</div></td>
   </tr>
   <tr class="even">
   <td>Unicode (UCS2)</td>
   <td><span class="title-ref">4</span></td>
   <td>UCS2 hex used for representing characters not in the GSM alphabet, such as Arabic, Chinese or Russian</td>
   </tr>
   <tr class="odd">
   <td>Flash Unicode (UCS2)</td>
   <td><span class="title-ref">5</span></td>
   <td>Same as above but delivered as a flash (pop up) message</td>
   </tr>
   <tr class="even">
   <td>Plain (7-bit) GSM encoded</td>
   <td><span class="title-ref">6</span></td>
   <td>Plain SMS text such as English, encoded in the GSM alphabet</td>
   </tr>
   <tr class="odd">
   <td>Flash plain (7-bit) GSM encoded</td>
   <td><span class="title-ref">7</span></td>
   <td>Same as above but delivered as a flash (pop up) message</td>
   </tr>
   </tbody>
   </table>
   </div>
</div>

When a DC value is not specified in a request, it is assumed to be a plain 7-bit latin1 text message. The HTTPSMS server will automatically convert plain latin1 text to the GSM alphabet so you do not have to do this yourself. If a character is supplied that is outside of the GSM alphabet, it will be converted into a white space.

If the message body you wish to send is already GSM encoded then you must set the DC parameter to a value of 6, or 7 if it is a flash message. A separate document is available outlining the GSM alphabet and its mapping to ISO-8859-1.

> **Note**    
>
> Note that all characters regardless of the message encoding type should conform to the URL encoding guidelines. For example, a latin1 space character is URL encoded to
> >    - Latin1 spacecharacter is URL encoded to *%20*
> >    - Latin1 *@* symbol is URL encoded to *%40*
> >    - A GSM space character is also *%20*
> >    - However, a GSM *@* symbol is URL encoded to *%00*



> **Note**    
>
> The *€* (Euro) symbol is outside of the standard ISO-8859-1 (latin1) character set, however the HTTPSMS system supports both the Windows-1252 (winlatin1), and ISO-8859-15 (latin9) representations as hex *80*, and *A4* respectively. If using the GSM alphabet, the Euro symbol is represented as 2 characters; hex *1B65*. These hex values are [url_encoding by preceding them with a *%* as
> >    - *%80*,
> >    - *%A4*, and
> >    - *%1B%65* respectively.

### Special GSM Characters

There are 9 special characters that are counted as 2 individual
characters when GSM encoded. This could result in a message becoming
longer and therefore being [concatenated](#section-concatenated-messages). 

| Symbol | Name         |
| ------ | ------------ |
| \[     | Open square  |
| \]     | Close square |
| \\     | Backslash    |
| ^      | Caret        |
| {      | Left brace   |
| }      | Right brace  |
| <code>&#124;</code>      | Vertical bar |
| \~     | Tilde        |
| €      | Euro         |

### Concatenated Messages

Also referred to as a long message, multipart message or extended message, a concatenated message is formed from several standard SMS containing a 7 byte concatenation header at the beginning of each one. Since this 7 byte header is within the message, it reduces the total size of each SMS to 153 characters each. The table below shows the maximum message length per number of SMS used for plain 7-bit messages.

<div class="magic-block-html">
    <div class="marked-table">
   <table>
   <thead>
   <tr class="header">
   <th>Number of SMS</th>
   <th>Maximum Message Length</th>
   </tr>
   </thead>
   <tbody>
   <tr class="odd">
   <td><blockquote>
   <p>1</p>
   </blockquote></td>
   <td>160</td>
   </tr>
   <tr class="even">
   <td><blockquote>
   <p>2</p>
   </blockquote></td>
   <td>306</td>
   </tr>
   <tr class="odd">
   <td><blockquote>
   <p>3</p>
   </blockquote></td>
   <td>459</td>
   </tr>
   </tbody>
   </table>
   </div>
</div>

In theory it is possible to utilise 255 messages (39,015 characters) for a concatenated SMS. However, 3 SMS (or 459 characters), is generally considered to be the longest length message that will be displayed on the majority of mobile handsets.

The HTTP SMS server will automatically concatenate up to three SMS messages; longer messages need to be submitted individually with an appropriate User Data Header.

> **Note**    
>
> Concatenated SMS are billed by the number of individual SMS messages used. If you send a 459 character message, you will be charged for 3 SMS.



> **Note**    
>
> Sending a special character that is listed in section 5.2.2 could result in the message length exceeding the maximum per SMS and therefore using an extra SMS which you will be charged for.

Binary and Unicode SMS are concatenated in the same way but in terms of hex encoded bytes. The below table shows the maximum hex encoded lengths per number of SMS.

<div class="magic-block-html">
    <div class="marked-table">
   <table>
   <thead>
   <tr class="header">
   <th>Number of SMS</th>
   <th>Binary data including UDH maximum length hex</th>
   <th>UCS2 maximum length hex</th>
   </tr>
   </thead>
   <tbody>
   <tr class="odd">
   <td><blockquote>
   <p>1</p>
   </blockquote></td>
   <td>266</td>
   <td>280</td>
   </tr>
   <tr class="even">
   <td><blockquote>
   <p>2</p>
   </blockquote></td>
   <td>512</td>
   <td>536</td>
   </tr>
   <tr class="odd">
   <td><blockquote>
   <p>3</p>
   </blockquote></td>
   <td>768</td>
   <td>804</td>
   </tr>
   </tbody>
   </table>
   </div>
</div>

Both a User Data Header and concatenation header are required for multipart binary data. The table above takes this into account and uses the hex encoded lengths as this data should be submitted to the HTTPSMS system in hex encoded format.

### Sender ID (Originator)

Use one of the TON values listed below for the ST parameter to give more
control over the originator address type.

<div class="magic-block-html">
    <div class="marked-table">
   <table>
   <thead>
   <tr class="header">
   <th>Source TON</th>
   <th>Sender ID type</th>
   <th>Description</th>
   <th>Examples</th>
   </tr>
   </thead>
   <tbody>
   <tr class="odd">
   <td><blockquote>
   <p>1</p>
   </blockquote></td>
   <td>International Numeric</td>
   <td>Adds a + to the beginning of a number to produce international formatting. Up to 16 digits.</td>
   <td>"<strong>+447987651234</strong>"</td>
   </tr>
   <tr class="even">
   <td><blockquote>
   <p>0</p>
   </blockquote></td>
   <td><p>Local numeric and shortcode</p></td>
   <td><p>Allows for national numeric format or shortcode. Up to 16 digits.</p></td>
   <td><div class="line-block">"<strong>07943215678</strong>"<br />
   "<strong>34567</strong>"</div></td>
   </tr>
   <tr class="odd">
   <td><blockquote>
   <p>5</p>
   </blockquote></td>
   <td><p>Alphanumeric</p></td>
   <td><p>Supports up to 11 alphanumeric characters</p></td>
   <td><div class="line-block">"<strong>Alert</strong>"<br />
   "<strong>CompanyName</strong>"</div></td>
   </tr>
   </tbody>
   </table>
   </div>
</div>

### Flash Messages

A flash message is an SMS that automatically pops up on the handset screen without the user having to manually open the message. Note that it is not possible to save a flash message on some handsets.

It is possible to send both plain text flash messages, and Unicode flash messages, by setting the DC parameter to 0 (7 for GSM encoded), or 5 respectively.

### Binary Messages

In order to send special messages and content including:

  - Ringtones
  - Operator Logos
  - WAP Push
  - VCards

You must construct a binary message, and its corresponding User Data Header.

All binary content must be submitted in hex encoded form via the M parameter. The User Data Header (usually 14 hex characters in length) must also be supplied via the UD parameter. Finally, the DC parameter must be set to 2 to indicate a binary content message.

### Unicode Messages

In order to send characters that are outside of the GSM 7-bit alphabet (see Appendix C), Unicode must be used. This is an alphabet using up to 16 bits to represent each character and allows languages including the following:

Afrikaans, Arabic, Croatian, Czech, Danish, Dutch, Esperanto, Finnish, French, Georgian, German, Greek, Hebrew, Hindi, Icelandic, Interlingua, Italian, Japanese, Korean, Lithuanian, Macedonian, Maltese, Persian, Polish, Portuguese, Romanian, Russian, Slovenian, Spanish, Swedish, Thai, Tigrigna, Turkish, Uyghur, Vietnamese and Welsh.

Due to the fact that 2 bytes are used per character, the maximum size of a single SMS is reduced to 70 Unicode characters. The Unicode standard that must be used is UCS2 hex, and should be submitted via the M parameter. The DC parameter must also be set to 4, or 5 in the case of a flash Unicode SMS.

## Delivery Reports & Incoming SMS

Delivery receipts and incoming SMS can be received in one of two ways, `http_callback` or `client_polling`. Your preferred method can be configured on your account by logging into [manage.mblox.com](https://manage.mblox.com) and navigating to the "Manage" page for the service.

Both methods provide the delivery receipt and incoming SMS data in the same format. The syntax is described below where:

  - **Italics** - Represents variable content such as message ID’s
  - **\[optional\]** - Anything within a square bracket is optional. The brackets are not printed.

### Format

*N\#\[MessagePart1\]\[\#MessagePartX\]*

| Field                                           | Description                                                           |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| *N*                | Count of delivery receipts and inbound SMS. Range: 0-100.             |
| *\#*               | Message separator. Always present.                                    |
| *\[MessagePart1\]* | First delivery report or incoming SMS.                                |
| *\#MessagePartX\]* | Message separator followed by another delivery report or inbound SMS. |

The number of message parts is limited to 100 at a time. A message part will be either a delivery report or an inbound SMS. The format for both is described below.

#### Message Part Format - Delivery Report

*MSGID:\[SOURCE\]:DESTINATION:STATUS:\[ERRORCODE\]:DATETIME:\[USERREF\]:*

| Field                                        | Description                                                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| *:*             | Field separator. There will always be exactly 7 colons per delivery report.                                         |
| *MSGID*         | Positive numeric message ID matching the one returned in the SMS request response.                                  |
| *\[SOURCE\]*    | Optional source address (originator).                                                                               |
| *DESTINATION*   | A single destination number.                                                                                        |
| *STATUS*        | Positive numeric delivery receipt status code.                                                                      |
| *\[ERRORCODE\]* | Optional GSM error code consisting of up to 6 hexadecimal characters. Most routes do not return the GSM error code. |
| *DATETIME*      | A 10 digit UTC timestamp representing the date and time that the delivery receipt was received, in GMT              |
| *\[USERREF\]*   | If a User Reference was supplied with the SMS request, it will be displayed here.                                   |

A delivery receipt will always have the first field *MSGID* \> 0.

#### Message Part Format - Inbound SMS

*-1:\[SOURCE\]:DESTINATION:DCS::DATETIME:\[UDH\]:\[MESSAGE\]*

| Field                                      | Description                                                                                                     |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| *:*          | Field separator. There will always be 7 colons per message part.                                                |
| *-1*          | If this field is -1 then the message part is an incoming SMS.                                                   |
| *DESTINATION* | Optional source address (originator).                                                                           |
| *\[SOURCE\]*  | A single destination number.                                                                                    |
| *DCS*         | The Data Coding Scheme. Default 1.                                                                              |
| *DATETIME*    | A 10 digit UTC timestamp representing the date and time that the incoming SMS was received, in GMT.             |
| *\[UDH\]*     | User Data Header hex value, if the message is a binary message.                                                 |
| *MESSAGE*     | The message text in hex encoded form. Binary will also be hex encoded. Unicode will be represented in UCS2 hex. |

An incoming SMS will always have the first field equal to *-1*.

### HTTP Callback

One method of receiving delivery receipts and incoming SMS is for our server to make a HTTP POST request to your web server. A Callback URL must be configured on your HTTPSMS account first.

As soon as we receive a delivery receipt or incoming SMS, a HTTP request will be made to your Callback URL with a single input parameter and with a value as described in here: `format`.

The HTTP Callback Input Parameter is *INCOMING* and the callback script should respond to the HTTP POST with *200 OK* to acknowledge receipt of the delivery reports and inbound SMS. Any other status code will be regarded as an error and the request will be attempted at 30 minutes intervals for six hours.

### Client Polling

Another method of retrieving delivery receipts and incoming SMS is to make a HTTP request to the following URL:
*http://sms1.mblox.com:9001/ClientDR/ClientDR?UN=USER\&P=PASS*

*USER* Should be replaced with your given account username. *PASS* Should be replaced with your given account password.

`hosts` and `secure_request_url` may also be used for client polled retrieval.


> **Note**    
>
> Delivery reports must be retrieved from the same host that the original SMS was submitted to. For example, if you submit messages to *sms2.mblox.com*, delivery reports for these messages are only available from *sms2.mblox.com*. - Incoming SMS can only be retrieved from *sms1.mblox.com*

### Delivery Report Status Codes

A delivery receipt will contain a status code with one of the following values:

 | Status Code | Name      | Description                                                                                   |
 | ----------- | --------- | --------------------------------------------------------------------------------------------- |
 | 1           | DELIVERED | Message delivered to the handset                                                              |
 | 2           | BUFFERED  | Message buffered, usually because it failed first time and is now being retried               |
 | 3           | FAILED    | The message failed to deliver. The GSM error code may give more information                   |
 | 5           | EXPIRED   | Message expired as it could not be delivered within the validity period                       |
 | 6           | REJECTED  | Message rejected by SMSC                                                                      |
 | 7           | ERROR     | SMSC error, message could not be processed                                                    |
 | 11          | UNKNOWN   | Unknown status, usually generated after 24 hours if no status has been returned from the SMSC |
 | 12          | UNKNOWN   | Unknown status, SMSC returned a non standard status code                                      |

### Delivery Report Error Codes

Sinch has a record of providing high quality and reliable reporting. Should your message not be delivered, an error code will be returned in the deliver\_sm with a reason why.

These are defined here: `delivery_error_codes`.

## API Packages

These are all the individual HTTP SMS API packages available. Each package includes documentation and code examples.

Download:

 - [Sinch HTTPSMS Net.zip](../files/CLX HTTPSMS Net.zip)
 - [Sinch HTTPSMS PHP.zip](../files/CLX HTTPSMS PHP.zip)
 - [Sinch HTTPSMS Perl.zip](../files/CLX HTTPSMS Perl.zip)
 - [Sinch HTTPSMS Java.zip](../files/CLX HTTPSMS Java.zip)
 - [Sinch HTTPSMS Python.zip](../files/CLX HTTPSMS Python.zip)

## Additional Info

### URL Encoding

When sending data to the servers, it is important that any information sent using GET or POST delivery is URL encoded. Please note that URL encoding is not the same as HTML encoding, for example & (Ampersand) is URL encoded as %24 but HTML encoded to . Here is a table of URL encoded values and the characters they describe:

| Character | URL Encoded |
| --------- | ----------- |
| ;         | %3B         |
| /         | %2F         |
| :         | %3A         |
| \#        | %23         |
| &         | %24         |
| \=        | %3D         |
| \+        | %2B         |
| $         | %26         |
| ,         | %2C         |
| SPACE     | %20or +     |
| %         | %25         |
| \<        | %3C         |
| \>        | %3E         |
| @         | %40         |
| \~        | %7E         |

### Greek Characters

The HTTP SMS library allows you to send upper case Greek characters. In order to send a Greek character you must set the data coding (DC) option of the HTTP SMS request to 6 (or 7 for a flash message).

If you are not sending a GSM encoded message then you will need to set the message data coding scheme appropriately (2 for a binary message, 4 for a Unicode (UCS2) message or 5 for a flash UCS2 message) and then just use the correct code in your message for the symbol you want.

For example, if you are sending the Greek letter Π (Pi) in a GSM message you would set the DC option to 6 (or 7 for a flash message) and then include the GSM code for Π in your message: 16

