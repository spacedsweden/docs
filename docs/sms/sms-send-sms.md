---
title: REST API
excerpt: >-
  The most feature rich API that Sinch offers is the SMS REST API. Single messages,
  scheduled batch send-outs, using message templates and more.
next:
  pages:
  description: Get started with the REST API
---

## Quickstart Send your first SMS!

In a few lines of code you are able to send SMS messages with the Sinch API. 
In this quick start we will learn how to:

1. Create an account and get your free test number (US only)
2. Send your first SMS

### Sign up for a Sinch account

Before you can send an SMS you will need an [Sinch account](https://dashboard.sinch.com/signup) and in United states you will also need a [free test phone number](https://dashboard.sinch.com/numbers/your-numbers/numbers). 

Atta, you have some good screen shots here?

### Send your first SMS

Now that you have your account, create a new node app and paste this in to app.js

```nodejs
var request = require("request");

var options = {
  method: 'POST',
  url: 'https://us.sms.api.sinch.com/xms/v1/{service_plan_id}/batches',
  headers: {accept: 'application/json', 'content-type': 'application/json', "Authentication: Bearer {your token}"},
  body: '{"to":"{To Number}","from":"{your free test number}","body":"This is a test message"}'
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

The above code creates and sends an SMS message but before you can run the code you need to edit it a little bit. 

#### Replace the token values

Replace the values `{service_plan_id}`, `{your token}`, `{your free test number}` and `{To number}` with your values, you can find service plan and token in your dashboard. Go to   https://dashboard.sinch.com/sms/api/rest and login. On this page you will see service_plan_id and and api token. Click on the show to reveal your token. 

![Screen shot of dashboard](images/sms-quickstart_apikeys.png)

To find your From number click on the service plan id link and scroll to the bottom to find your phone number.

Last change the `{To number}` to your own phone number.

Thas all that is needed, run your app and in a few moments you should recieve an SMS message. If you are using a test number the body of the message will be replaced with sample text. To upgrade your account [contact](https://dashboard.sinch.com/sms/overview) your account manager.

Read more about the [batches endpoint](https://developers.sinch.com/reference/#sendsms)
