---
title: Send SMS in PHP
excerpt: >-
  Sending SMS from applications is more popular than ever, and this small script will enable you to send SMS in PHP. Find out more and sign up with Sinch today.
---


## Prerequisites

> 1. You have created your Sinch account, if you don't have one, create one [here](https://www.sinch.com/sign-up/) and get some free credits to try the API out :fire:
> 2. You have php installed. If you don't, you can read about how to do it on your system [here](https://www.php.net/manual/en/install.php).

All steps above are availible in detail on the [PHP Getting Started](doc:tutorials-php) page.

### Credentials

If you don't already have an API configured, go to your API Overview and click on the *Add new REST API* button. Your credentials will be generated and shown within seconds!

> 1. [Login](https://dashboard.sinch.com/login) to the dashboard.
> 2. Go to your [API Overview](https://dashboard.sinch.com/sms/api/rest) and find your *Service Plan ID* and *API Token*. We'll need these in our script below.

## Plugin your credentials!

Firstly, we need to create a file `send_sms.php` to save our code in. You can find the finished code [here](doc:send-sms-php#section-code).

Let's start with plugging in our credentials found in the [API Overview](https://dashboard.sinch.com/sms/api/rest).

```php
$service_plan_id = "your_service_plan_id";
$bearer_token = "your_api_token";
```

We might want to send a message to a number aswell! So we setup the content for our JSONs `to` field.

```php
$recipient_phone_numbers = "recipient_phone_numbers"; //May be several, separate with a comma `,`.
```
> **Note**
>
> If you're using a trial account your message will be sent from an *random* number with a *generic test message*. However, we *still* need to add a number in the JSON objects `from` field.

```php
$send_from = "your_assigned_number";
```

Write a message that you want to send!

```php
$message = "This test message will be sent to {$recipient_phone_numbers} from {$assigned_phone_number}";
```

That's it! Just copy the rest of the script and you'll be sending messages in no time.

## Code

```php
<?php
$service_plan_id = "your_service_plan_id";
$bearer_token = "your_api_token";

$send_from = "your_assigned_number";
$recipient_phone_numbers = "recipient_phone_numbers"; //May be several, separate with a comma `,`.
$message = "This test message will be sent to {$recipient_phone_numbers} from {$assigned_phone_number}";

// Check recipient_phone_numbers for multiple numbers and make it an array.
if(stristr($recipient_phone_numbers, ',')){
  $recipient_phone_numbers = explode(',', $recipient_phone_numbers);
}else{
  $recipient_phone_numbers = [$recipient_phone_numbers];
}

// Set necessary fields to be JSON encoded
$content = [
  'to' => array_values($recipient_phone_numbers),
  'from' => $send_from,
  'body' => $message
];

$data = json_encode($content);

$ch = curl_init("https://us.sms.api.sinch.com/xms/v1/{$service_plan_id}/batches");
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BEARER);
curl_setopt($ch, CURLOPT_XOAUTH2_BEARER, $bearer_token);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$result = curl_exec($ch);

if(curl_errno($ch)) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    echo $result;
}
curl_close($ch);
?>
```

### Run the code

```bash
php send_sms.php
```

It's really simple as that!
