---
title: "Call Detail Records"
excerpt: ""
hidden: "true"
---
CDRs can be downloaded from the Sinch portal. CDRs are in a semicolon separated file that contains the following fields:

## Phone-terminated calls

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
          <td align="left">CallId</td>
          <td align="left">string</td>
          <td align="left">A unique identifier for a call</td>
        </tr>
        <tr class="even">
          <td align="left">UserSpaceId</td>
          <td align="left">int</td>
          <td align="left">Internal identifier</td>
        </tr>
        <tr class="odd">
          <td align="left">CallTime</td>
          <td align="left">time</td>
          <td align="left">Time when call was made</td>
        </tr>
        <tr class="even">
          <td align="left">Result</td>
          <td align="left">string</td>
          <td align="left">Result may have one of the following values &quot;ANSWERED&quot; | &quot;BUSY&quot; | &quot;NOANSWER&quot; | &quot;FAILED&quot;</td>
        </tr>
        <tr class="odd">
          <td align="left">Reason</td>
          <td align="left">string</td>
          <td align="left">Reason may have one of the following values &quot;N/A&quot; | &quot;TIMEOUT&quot; | &quot;CALLERHANGUP&quot; | &quot;CALLEEHANGUP&quot; | &quot;BLOCKED&quot; | &quot;MANAGERHANGUP&quot; | &quot;NOCREDITPARTNER&quot; |
            &quot;GENERALERROR&quot; | &quot;CANCEL&quot;</td>
        </tr>
        <tr class="even">
          <td align="left">Duration</td>
          <td align="left">int</td>
          <td align="left">Call time in seconds</td>
        </tr>
        <tr class="odd">
          <td align="left">AnswerTime</td>
          <td align="left">time</td>
          <td align="left">Time when call was answered</td>
        </tr>
        <tr class="even">
          <td align="left">From</td>
          <td align="left">string</td>
          <td align="left">CLI displayed on terminating side</td>
        </tr>
        <tr class="odd">
          <td align="left">To</td>
          <td align="left">string</td>
          <td align="left">Terminating side phone number</td>
        </tr>
        <tr class="even">
          <td align="left">Amount</td>
          <td align="left">decimal</td>
          <td align="left">Cost of call</td>
        </tr>
        <tr class="odd">
          <td align="left">Currency</td>
          <td align="left">string</td>
          <td align="left">Currency</td>
        </tr>
        <tr class="even">
          <td align="left">Custom</td>
          <td align="left">object</td>
          <td align="left">Free field for partners to use as custom headers</td>
        </tr>
        <tr class="odd">
          <td align="left">ApplicationKey</td>
          <td align="left">string</td>
          <td align="left">Application key</td>
        </tr>
        <tr class="even">
          <td align="left">UserId</td>
          <td align="left">string</td>
          <td align="left">User Id of the user that initiated the call</td>
        </tr>
        <tr class="odd">
          <td align="left">ToCountryId</td>
          <td align="left">string</td>
          <td align="left">Country Id of the &quot;To&quot; number</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Phone-originated calls

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
          <td align="left">CallId</td>
          <td align="left">string</td>
          <td align="left">A unique identifier for a call</td>
        </tr>
        <tr class="even">
          <td align="left">UserSpaceId</td>
          <td align="left">int</td>
          <td align="left">Internal identifier</td>
        </tr>
        <tr class="odd">
          <td align="left">CallTime</td>
          <td align="left">time</td>
          <td align="left">Time when call was made</td>
        </tr>
        <tr class="even">
          <td align="left">Result</td>
          <td align="left">string</td>
          <td align="left">Result may have one of the following values &quot;ANSWERED&quot; | &quot;NOANSWER&quot; | &quot;FAILED&quot;</td>
        </tr>
        <tr class="odd">
          <td align="left">Reason</td>
          <td align="left">string</td>
          <td align="left">Reason may have one of the following values |br| &quot;N/A&quot; | &quot;CANCEL&quot; | &quot;CALLERHANGUP&quot; | &quot;CALLEEHANGUP&quot; | &quot;NOCREDITPARTNER&quot; | &quot;GENERALERROR&quot;</td>
        </tr>
        <tr class="even">
          <td align="left">Duration</td>
          <td align="left">int</td>
          <td align="left">Call time in seconds</td>
        </tr>
        <tr class="odd">
          <td align="left">From</td>
          <td align="left">string</td>
          <td align="left">Phone number of the caller</td>
        </tr>
        <tr class="even">
          <td align="left">To</td>
          <td align="left">string</td>
          <td align="left">Number that the caller has called (Voice DID)</td>
        </tr>
        <tr class="odd">
          <td align="left">Amount</td>
          <td align="left">decimal</td>
          <td align="left">Cost of call</td>
        </tr>
        <tr class="even">
          <td align="left">Currency</td>
          <td align="left">string</td>
          <td align="left">Currency</td>
        </tr>
        <tr class="odd">
          <td align="left">Custom</td>
          <td align="left">object</td>
          <td align="left">Free field for partners to use as custom headers</td>
        </tr>
        <tr class="even">
          <td align="left">ApplicationKey</td>
          <td align="left">string</td>
          <td align="left">Application key</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## App-app calls

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
          <td align="left">CallId</td>
          <td align="left">string</td>
          <td align="left">A unique identifier for a call</td>
        </tr>
        <tr class="even">
          <td align="left">UserSpaceId</td>
          <td align="left">int</td>
          <td align="left">Internal identifier</td>
        </tr>
        <tr class="odd">
          <td align="left">CallTime</td>
          <td align="left">time</td>
          <td align="left">Time when the call was made</td>
        </tr>
        <tr class="even">
          <td align="left">Result</td>
          <td align="left">string</td>
          <td align="left">Result may be one of the following values &quot;ANSWERED&quot; | &quot;BUSY&quot; | &quot;NOANSWER&quot; | &quot;FAILED&quot;</td>
        </tr>
        <tr class="odd">
          <td align="left">Reason</td>
          <td align="left">string</td>
          <td align="left">Reason may be one of the following values &quot;N/A&quot; | &quot;TIMEOUT&quot; | &quot;HANGUP&quot; | &quot;CANCEL&quot;</td>
        </tr>
        <tr class="even">
          <td align="left">Duration</td>
          <td align="left">int</td>
          <td align="left">Call duration in seconds</td>
        </tr>
        <tr class="odd">
          <td align="left">FromUserId</td>
          <td align="left">string</td>
          <td align="left">UserId of the caller</td>
        </tr>
        <tr class="even">
          <td align="left">ToUserId</td>
          <td align="left">string</td>
          <td align="left">UserId of the callee</td>
        </tr>
        <tr class="odd">
          <td align="left">Custom</td>
          <td align="left">object</td>
          <td align="left">Free field for partners to use as custom header</td>
        </tr>
        <tr class="even">
          <td align="left">ApplicationKey</td>
          <td align="left">string</td>
          <td align="left">Application key</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## SIP-terminated calls

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
          <td align="left">CallId</td>
          <td align="left">string</td>
          <td align="left">A unique identifier for a call</td>
        </tr>
        <tr class="even">
          <td align="left">UserSpaceId</td>
          <td align="left">int</td>
          <td align="left">Internal identifier</td>
        </tr>
        <tr class="odd">
          <td align="left">CallTime</td>
          <td align="left">time</td>
          <td align="left">Time when the call was made</td>
        </tr>
        <tr class="even">
          <td align="left">Result</td>
          <td align="left">string</td>
          <td align="left">Result may be one of the following values &quot;ANSWERED&quot; | &quot;BUSY&quot; | &quot;NOANSWER&quot; | &quot;FAILED&quot;</td>
        </tr>
        <tr class="odd">
          <td align="left">Reason</td>
          <td align="left">string</td>
          <td align="left">Reason why the call ended</td>
        </tr>
        <tr class="even">
          <td align="left">Duration</td>
          <td align="left">int</td>
          <td align="left">Call duration in seconds</td>
        </tr>
        <tr class="odd">
          <td align="left">From</td>
          <td align="left">string</td>
          <td align="left">Endpoint that originated the call or CLI to be displayed</td>
        </tr>
        <tr class="even">
          <td align="left">To</td>
          <td align="left">string</td>
          <td align="left">Endpoint where the call is terminated</td>
        </tr>
        <tr class="odd">
          <td align="left">Custom</td>
          <td align="left">object</td>
          <td align="left">Custom header that was passed in the call</td>
        </tr>
        <tr class="even">
          <td align="left">ApplicationKey</td>
          <td align="left">string</td>
          <td align="left">Application key</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

The files are generated once every day and will contain the previous days’ CDRs. A day spans from 00:00:00 UTC to 23:59:59 UTC. CDRs are written when the call is ended, though there are some edge cases where an app-app call CDR may be delayed in being written, for example, if there is a network failure before the call is ended.

CDR files can be downloaded from the developer portal. Upon request, the CDR files can also be uploaded to an Amazon S3 bucket that your company provides and to which Sinch has write access.
