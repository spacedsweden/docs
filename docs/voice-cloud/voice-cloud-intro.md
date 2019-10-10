---
title: "Introduction"
excerpt: "Send messages via WhatsApp with Sinch WhatsApp API."
hidden: "true"
---
This document provides a detailed user guide and reference documentation on the Sinch Voice REST API. For general information on how to use the Sinch APIs including methods, types, errors and authorization, please check the [Using REST](doc:using-rest) page.

## Overview

When using Sinch for voice calling, the Sinch platform can be seen as a big telephony switch. It receives incoming phone calls (also known as *incoming call “legs”*), sets up outgoing phone calls (also known as *outgoing call “legs”*), and bridges the two. The incoming call leg may come in over a data connection (from a smartphone or web application using the Sinch SDKs) or through a local phone number (from the PSTN network).

For most call scenarios, you can use the Sinch SDKs on a smartphone or on web client to establish calls without the need of backend integration. For additional control or flexibility of the calls, you can use the Sinch REST APIs to manage the calls.

Controlling a call from your application backend is done by responding to callbacks from the Sinch platform and/or by calling REST APIs in the Sinch platform from your application backend. For more details on the callbacks triggered from the Sinch platform see the [Callback API](doc:voice-cloud-callback-api).

For more details on the REST APIs to that can be used to manage calls see the [Calling API](doc:voice-cloud-calling-api).

These are the typical call scenarios that you can control with the Sinch Callback and Calling APIs:

> -   App to phone calls
> -   Phone to phone calls
> -   Text-to-speech calls
> -   Conference calls

## API Quick Reference

### Callback API

To use callback events you need to assign a callback URL in the Sinch portal under your app settings.

### Calling API

    https://callingapi.sinch.com/v1

URL to access a region-specific API is provided by the ICE callback, in the `callResourceUrl` property. Use that as a base URL to access the following region-specific resources:

### Reporting API

    https://reportingapi.sinch.com/v1

## App to phone calls

In this scenario, calls are originated from an app using the iOS, Android or Javascript SDK and are terminated to the fixed or mobile phone network\*. For additional call control, you can configure a callback URL under your app’s voice settings in the Sinch dashboard, where Sinch will send call-related events. By capturing and responding to these events from your backend, you can allow or deny calls to go through. Events will also be triggered when the calls will be answered or disconnected.

For more information please check the [Callback API](doc:voice-cloud-callback-api). The callback events that are used in app to phone calls are the Incoming Call Event callback, the Answer Call Event callback and the Disconnect Call Event callback. You can also manage an ongoing call from your backend with the Manage Call API, which is part of the [Calling API](doc:voice-cloud-calling-api).

> **Note**
>
> You may need to be configured specifically for this functionality - please contact [Sinch Support](mailto:support@sinch.com) if you have any questions!


## Phone to phone calls

In this scenario, calls are originated from a voice number and are terminated to the fixed or mobile phone network. You can rent and configure voice numbers from the Sinch [dashboard](https://portal.sinch.com/#/login) by following these steps:

1.  Rent a Voice number from the Sinch [dashboard](https://portal.sinch.com/#/login), under the tab “Numbers”.
2.  Assign the number to your application. Under the “Apps” tab, select your app and assign the number under the app Voice settings. Alternatively, you can rent and configure numbers with REST APIs. For more information please check the[ Number Administration documentation](doc:log-in).
3.  Configure a callback URL under your app’s Voice settings, where Sinch will send call-related events.

When a user calls your configured voice number, the Sinch platform will trigger an Incoming Call Event callback towards your callback URL. The destination number - where the call will be connected to - has to be specified in your response to the Incoming Call Event callback. Similarly to app to phone calls, the Sinch platform will trigger additional events for call control.

For more information please check the [Callback API](doc:voice-cloud-callback-api). The callback events that are used in phone to phone calls are the Incoming Call Event callback, the Answer Call Event callback and the Disconnect Call Event callback. You can also manage an ongoing call from your backend with the Manage Call API, which is part of the [Calling API](doc:voice-cloud-calling-api).

## Conference calls

The Sinch platform supports a variety of different ways of initiating a conference call and connecting participants.

### Calling in a conference from an app

By using the Sinch Voice SDKs, you can allow your users to call in a conference from a mobile or web app. For more information please check the Voice SDKs documentation.

If you have not specified a callback URL under your app settings for voice, the participants will be directly added to the conference that is uniquely identified by the conference Id specified in the SDK client method.

If you have specified a callback URL under your app settings for voice, an Incoming Call Event callback will be triggered towards your URL, containing information on the conference Id that the caller wants to connect to. By responding to this event you can allow or deny the connection to the conference, or even specify a different conference Id.

For more information check the Incoming Call Event callback and the ConnectConf action.

### Calling in a conference from a phone number

You can also allow users to dial in a conference by calling a fixed phone number. To do this, first follow the steps mentioned in Phone to phone calls \<voice-cloud-phonetophonecallingoverview\> to configure a number in your app and set a callback URL. Every time a user calls your configured number, an Incoming Call Event callback will be triggered towards your URL. By responding to this event with the ConnectConf action, you can connect the call to a conference.

For more information check the Incoming Call Event callback and the ConnectConf action.

## Codecs

Sinch currently supports G.711u, G.711a, iLBC and G.729
