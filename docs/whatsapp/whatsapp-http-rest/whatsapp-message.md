---
title: "Message"
excerpt: "Send messages via WhatsApp with Sinch WhatsApp API."
---
The message endpoint is used as the primary endpoint of the API and this is where all the messages are sent through.

**WhatsApp message flow**

![image](images/whatsapp-msg-flow.png)

1.  Customer opt-in is essential before sending any messages.
2.  Businesses can only start a conversation with a defined message template.
3.  Once you get a reply from your customer, a *customer care session* starts. You can then send “session” rich content messages for 24 hours.
4.  Every time a customer replies to one of your messages, a new 24-hour cycle starts.
5.  If a “session” expires, you’ll need to re-initiate a conversation, starting with a defined message template again.
6.  Customers can start a rich content conversation with a business at any time  
    -   this opens up a new 24-hour session.

## Supported Content-Types

The Sinch WhatsApp API supports several media types. In the table below you can find what content-types are supported by the API.

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Message type</th>
        <th>Supported Content-Types</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-even">
          <td>Image</td>
          <td>image/jpeg, image/png</td>
        </tr>
        <tr class="row-odd">
          <td>Video</td>
          <td>video/mp4 <br> <strong>Note:</strong> Only H.264 video codec and AAC audio codec is supported.</td>
        </tr>
        <tr class="row-even">
          <td>Document</td>
          <td>application/pdf, application/msword, application/vnd.ms-powerpoint, application/vnd.ms-excel, text/plain</td>
        </tr>
        <tr class="row-odd">
          <td>Audio</td>
          <td>audio/acc, audio/mp4, audio/amr, audio/mpeg, audio/ogg, codecs=opus</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

## Send a WhatsApp message

*Authorizations*  
-   [BearerAuth](doc:whatsapp-introduction#section-bearerauth)

*Request Body Schema*  
- application/json

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>to
            <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of string [1..20] items</span>
            Array of phone numbers (msisdns) or group ids.</td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-message-types">message</a>
            <span class="req-red">required</span></td>
          <td><span class="type-grey">TextMessage (object) or</span>
            <span class="type-grey">ImageMessage (object) or</span>
            <span class="type-grey">VideoMessage (object) or</span>
            <span class="type-grey">DocumentMessage (object) or</span>
            <span class="type-grey">AudioMessage (object) or</span>
            <span class="type-grey">TemplateMessage (object) or</span>
            <span class="type-grey">LocationMessage (object) or</span>
            <span class="type-grey">ContactsMessage (object)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Message types

The types of messages that can be sent are one of the following:

#### TextMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"text"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>preview_url</td>
          <td><span class="type-grey">boolean</span> <br> A preview of a link will show in the message. <br>
            Value: <code class="docutils literal notranslate"><span class="pre">true</span></code> or <code class="docutils literal notranslate"><span class="pre">false</span></code> <br> Default <code class="docutils literal notranslate"><span
                class="pre">false</span></code></td>
        </tr>
        <tr class="row-odd">
          <td>text <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> The actual text body. Required.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### ImageMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"image"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>url <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> The url to the image (jpg | jpeg | png).</td>
        </tr>
        <tr class="row-odd">
          <td>caption</td>
          <td><span class="type-grey">string</span> <br> Optional caption that will be displayed underneath the image.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### VideoMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"video"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>url <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> The url to the video (mp4).</td>
        </tr>
        <tr class="row-odd">
          <td>caption</td>
          <td><span class="type-grey">string</span> <br> Optional caption that will be displayed underneath the video.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### DocumentMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"document"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>url <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> The url to the document (pdf).</td>
        </tr>
        <tr class="row-odd">
          <td>caption</td>
          <td><span class="type-grey">string</span> <br> Optional caption that will be displayed as the document title.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### AudioMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"audio"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>url <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> The url to the audio file (mp3).</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### TemplateMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"template"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>template_name <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Name of the template. This has to be registered before hand.</td>
        </tr>
        <tr class="row-odd">
          <td>language</td>
          <td>Fallback language if the template message is not available in the user’s language/locale setting on the device. Accepts both language and language_locale formats (e.g., en and en_US)
          </td>
        </tr>
        <tr class="row-even">
          <td>params</td>
          <td><span class="type-grey">Array of string</span>
          An array holding each string parameter that will be injected into the specified template. Required if the referred template contains variables.</td>
        </tr>
        <tr class="row-odd">
          <td>ttl</td>
          <td><span class="type-grey">string</span>
          Time to live of the template message. If the receiver has not opened the <br> template message before the time to live expires, the message will be deleted <br> and a failed callback will be sent. The time to live can be specified <br> in <a class="reference external" href="https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r_iso_8601_duration_format.htm">ISO-8601 Duration</a> format or in seconds as a string.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### LocationMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"location"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>lat <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">number [-90 .. 90]</span> <br> The latitude position as a float number.</td>
        </tr>
        <tr class="row-odd">
          <td>lng <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">number [-180 .. 180]</span> <br> The longitude position as a float number.</td>
        </tr>
        <tr class="row-even">
          <td>name</td>
          <td><span class="type-grey">string</span> <br> The name for the location. Will be displayed in the message.</td>
        </tr>
        <tr class="row-odd">
          <td>address</td>
          <td><span class="type-grey">string</span> <br> The address for the location. Will be displayed in the message.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### ContactsMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table class="docutils" border="1">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"contacts"</span></code></td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-contacts">contacts</a> <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of object (ContactCard)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

##### contacts

Where the array of contacts contains ContactCard objects. They have the following parameters:

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td><a href="./whatsapp-message#section-addresses">addresses*</a></td>
          <td><span class="type-grey">Array of object (ContactCardAddress)</span></td>
        </tr>
        <tr class="row-even">
          <td>birthday</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td><a href="./whatsapp-message#section-emails">emails*</a></td>
          <td><span class="type-grey">Array of object (ContactCardEmail)</span></td>
        </tr>
        <tr class="row-odd">
          <td><a href="./whatsapp-message#section-name">name*</a>
            <span class="req-red">required</span>
          </td>
          <td><span class="type-grey">object (ContactCardName)</span></td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-org">org*</a></td>
          <td><span class="type-grey">object (ContactCardOrganization)</span></td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-phones">phones*</a></td>
          <td><span class="type-grey">Array of object (ContactCardPhone)</span></td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-urls">urls*</a></td>
          <td><span class="type-grey">Array of object (ContactCardUrl)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### addresses

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>city <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>country</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>country_code</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>state</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>street</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>type</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>zip</td>
          <td><span class="type-grey">string</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### emails

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>email <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>type</td>
          <td><span class="type-grey">string</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>


###### name

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>first_name</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>last_name</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>formatted_name <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### org

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>company <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>department</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>title</td>
          <td><span class="type-grey">string</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### phones

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>phone <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>type</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>wa_id</td>
          <td><span class="type-grey">string</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

###### urls

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>url <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>type</td>
          <td><span class="type-grey">string</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Responses

**201 Expected result to a valid request**
*Response schema: application/json*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"whatsapp"</span></code></td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-statuses">statuses</a></td>
          <td><span class="type-grey">object (Status)</span></td>
        </tr>
        <tr class="row-odd">
          <td><a href="./whatsapp-message#section-notifications">notifications</a></td>
          <td><span class="type-grey">object (Notification)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### statuses

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>message_id</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-even">
          <td>recipient</td>
          <td><span class="type-grey">string</span></td>
        </tr>
        <tr class="row-odd">
          <td>status</td>
          <td><span class="type-grey">string</span> <br> Enum: <code class="docutils literal notranslate"><span class="pre">"success"</span></code> <code class="docutils literal notranslate"><span class="pre">"failure"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>state</td>
          <td><span class="type-grey">string</span> <br> Enum: <code class="docutils literal notranslate"><span class="pre">"queued"</span></code> <code class="docutils literal notranslate"><span class="pre">"dispatched"</span></code> <code
              class="docutils literal notranslate"><span class="pre">"sent"</span></code> <code class="docutils literal notranslate"><span class="pre">"delivered"</span></code> <code class="docutils literal notranslate"><span
                class="pre">"read"</span></code> <code class="docutils literal notranslate"><span class="pre">"deleted"</span></code> <code class="docutils literal notranslate"><span class="pre">"no_capability"</span></code> <code
              class="docutils literal notranslate"><span class="pre">"no_opt_in"</span></code> <code class="docutils literal notranslate"><span class="pre">"failed"</span></code></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

#### notifications

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>from</td>
          <td><span class="type-grey">string</span> <br> The originator of this message</td>
        </tr>
        <tr class="row-even">
          <td>message_id</td>
          <td><span class="type-grey">string</span> <br> Generated message id for this notification</td>
        </tr>
        <tr class="row-odd">
          <td><a href="./whatsapp-message#section-notificationtextmessage">message</a></td>
          <td><span class="type-grey">NotificationTextMessage (object) or</span> <br>
            <span class="type-grey">NotificationLocationMessage (object) or</span> <br>
            <span class="type-grey">NotificationContactsMessage (object) or</span> <br>
            <span class="type-grey">NotificationMediaMessage (object)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

The message key can be one of the following:

##### NotificationTextMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type</td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"text"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>body</td>
          <td><span class="type-grey">string</span> <br> The text of the text message</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

##### NotificationLocationMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type</td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"location"</span></code></td>
        </tr>
        <tr class="row-even">
          <td>latitude</td>
          <td><span class="type-grey">number</span> [-90..90]</td>
        </tr>
        <tr class="row-odd">
          <td>longitude</td>
          <td><span class="type-grey">number</span> [-180..180]</td>
        </tr>
        <tr class="row-even">
          <td>name</td>
          <td><span class="type-grey">string</span> <br> The name for the location. Will be displayed in the message.</td>
        </tr>
        <tr class="row-odd">
          <td>address</td>
          <td><span class="type-grey">string</span> <br> The address for the location. Will be displayed in the message.</td>
        </tr>
        <tr class="row-even">
          <td>url</td>
          <td><span class="type-grey">string</span> <br> Optional url for the location.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

##### NotificationContactsMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span> <br> Value: <code class="docutils literal notranslate"><span class="pre">"contacts"</span></code></td>
        </tr>
        <tr class="row-even">
          <td><a href="./whatsapp-message#section-contacts">contacts</a> <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">Array of object (ContactCard)</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

##### NotificationMediaMessage

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>type <br> <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            Enum: <code class="docutils literal notranslate"><span class="pre">"image"</span></code> <code class="docutils literal notranslate"><span class="pre">"document"</span></code> <code class="docutils literal notranslate"><span
                class="pre">"audio"</span></code> <code class="docutils literal notranslate"><span class="pre">"video"</span></code> <code class="docutils literal notranslate"><span class="pre">"voice"</span></code>
            What type of media this object is.</td>
        </tr>
        <tr class="row-even">
          <td>url
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The url where to download the media file from.</td>
        </tr>
        <tr class="row-odd">
          <td>mime_type
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The mime type of this file.</td>
        </tr>
        <tr class="row-even">
          <td>caption</td>
          <td><span class="type-grey">string</span>
            Optional description of this resource.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

**400 Bad request**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**401 Unauthorized bot**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |

**503 Service unavailable**
*Response schema: application/json*

| Name   | JSON type |
| ------ | :-------: |
| title  |   string  |
| reason |   string  |


*Path Parameters*

<div class="magic-block-html">
  <div class="marked-table">
    <table>
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row-odd">
          <td>bot-id
            <span class="req-red">required</span></td>
          <td><span class="type-grey">string</span>
            The identifier of the bot that wishes to send messages.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

### Request samples

**POST**

```text
/whatsapp/v1/{bot-id}/messages
```

#### Payload

##### Text Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "text",
    "preview_url": false,
    "text": "Greetings from Sinch"
  }
}
```

##### Image Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "image",
    "url": "https://example.com/image.jpg",
    "caption": "Example Image"
  }
}
```

##### Video Message

```json
{
  "to":[
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message":{
    "type": "video",
    "url": "https://example.com/video.mp4",
    "caption": "Example Video"
  }
}
```

##### Document Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "document",
    "url": "https://example.com",
    "caption": "Example study",
    "filename": "document.pdf"
  }
}
```

##### Audio Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "audio",
    "url": "https://example.com/song.mp3"
  }
}
```

##### Template Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "template",
    "template_name": "sinch_test_greeting",
    "language": "en",
    "params": [
      "Nick"
    ],
    "ttl": "P1D"
  }
}
```

##### Location Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "location",
    "lat": 55.7047,
    "lng": 13.191,
    "name": "Sinch Ideon Lund",
    "address": "Scheelevägen 17"
  }
}
```

##### Contact Cards Message

```json
{
  "to": [
    "46732001122",
    "group:447506616260-1565342732"
  ],
  "message": {
    "type": "contacts",
    "contacts": [
      {
        "addresses": [
          {
            "city": "Menlo Park",
            "country": "United States",
            "country_code": "us",
            "state": "CA",
            "street": "1 Hacker Way",
            "type": "HOME",
            "zip": "94025"
          }
        ],
        "birthday": "2012-08-18",
        "emails": [
          {
            "email": "test@fb.com",
            "type": "WORK"
          }
        ],
        "name": {
          "first_name": "John",
          "formatted_name": "John Smith",
          "last_name": "Smith"
        },
        "org": {
          "company": "WhatsApp",
          "department": "Design",
          "title": "Manager"
        },
        "phones": [
          {
            "phone": "+1 (650) 555-1234",
            "type": "WORK",
            "wa_id": "16505551234"
          }
        ],
        "urls": [
          {
            "url": "https://www.facebook.com",
            "type": "WORK"
          }
        ]
      }
    ]
  }
}
```

### Response samples

#### 201

```json
{
  "type":"whatsapp",
  "statuses":[
    {
      "message_id":"f1690238-9c72-49c3-b1c6-b701f8765732",
      "recipient":"+46732001122",
      "status":"success",
      "state":"queued"
    },
    {
      "message_id":"f1690238-9c72-49c3-b1c6-b701f8765732",
      "recipient":"group:447506616260-1565342732",
      "status":"success",
      "state":"queued"
    }
  ]
}
```

#### 400

```json
{
  "message": "Validation error",
  "reason": "Field [to] can not be empty."
}
```

#### 401

```json
{
  "message": "401",
  "reason": "Unauthorized bot"
}
```

#### 503

```json
{
  "message": "503",
  "reason": "Internal service not available, request could not be handled"
}
```