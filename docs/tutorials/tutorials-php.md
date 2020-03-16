---
title: PHP
excerpt: >-
  Learn how to use Sinch APIs with PHP. Authentication and SMS tutorials.
next:
  pages:
    - authenticate-to-the-sinch-javascript-sdk-from-your-php-backend
  description: Check out our PHP tutorials here
---



## Getting Started

Before you go blasting through the tutorials, please make sure that you have:

### Create Your Free Sinch Account

First we'll need to do is to make sure we have an Sinch account. We can create an account pre-loaded with some free credits using the [Sinch Dashboard](https://dashboard.sinch.com/signup), and we'll be ready to send messages in minutes.

> **Information about trial mode limitations**
>
> When your account is in trial mode (such as when you've just created it), sending messages has the following limitations:
>
>  - The body of each message will be replaced by a generic message to prevent malicious uses of our API.
>  - Your messages will also be sent from a random phone number and the `sender` value will be ignored (although the API still requires a value so you must provide some value for the sender).


### Obtain Your Credentials

We'll have to go to the [APIs](https://dashboard.sinch.com/sms/api/rest) section to obtain our **Service Plan ID** and our **API Token**. We'll use these in the tutorials.

### Check Your PHP Version

For these tutorials we're using php version `7.4.3`, you can find out witch version you're running with the command:

```bash
php -v
```

If you don't already have php installed, you can read about how to do it on your system [here](https://www.php.net/manual/en/install.php).

Lets get going!
