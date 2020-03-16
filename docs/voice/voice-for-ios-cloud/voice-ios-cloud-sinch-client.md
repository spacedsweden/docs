---
title: Sinch Client
excerpt: ''
hidden: 'true'
next:
  pages:
    - voice-ios-cloud-calling
---

The _SINClient_ is the Sinch SDK entry point. It is used to configure the user’s and device’s capabilities, as well as providing access to feature classes such as the _SINCallClient_, and _SINAudioController_.

## Creating the _SINClient_

Set up the client and its delegate (_SINClientDelegate_, see [Reference](reference/html/Protocols/SINClientDelegate.html) documentation).

```objectivec
#import <Sinch/Sinch.h>

// Instantiate a Sinch client
id<SINClient> sinchClient = [Sinch clientWithApplicationKey:@"<application key>"
                                            environmentHost:@"ocra.api.sinch.com"
                                                     userId:@"<user id>"];
```

The _Application Key_ is obtained from the _Sinch Developer Dashboard_. The User ID should uniquely identify the user on the particular device.

## Specifying Capabilities

The _SINClient_ can be configured to enable / disable certain functionality. To enable _push notifications_ the method `-[SINClient enableManagedPushNotifications]` should be called. See [push notifications](doc:voice-ios-cloud-local-and-remote-push-notifications) for details.

```objectivec
[sinchClient enableManagedPushNotifications];
```

## Starting the _SINClient_

Before starting the client, make sure to assign a _SINClientDelegate_. It is required to implement `-[SINClientDelegate requiresRegistrationCredentials:]` to authenticate the client / _User_ (see following section for details on authorization).

```objectivec
// Assign as SINClientDelegate
sinchClient.delegate = ... ;

// Start the Sinch Client
[sinchClient start];

```

> **Note**
>
> If the application is meant to only make outgoing calls but not receive incoming calls, the client will be ready to make calls after the delegate has received the callback `clientDidStart:`.

> **Note**
>
> If the application is meant to receive incoming calls while not running in foreground, [push notifications](doc:voice-ios-cloud-local-and-remote-push-notifications) are required.

### Authorizing the Client / User

When the _SINClient_ is started with a given _User ID_ it is required to provide a registration token to register as towards the _Sinch backend_.

To authorize a client, implement `-[SINClientDelegate requiresRegistrationCredentials:]` and provide a token (a [JSON Web Token](https://jwt.io/)) that is cryptographically signed with the _Application Secret_.
How to form and sign this token is described in detail in [Creating a Registration Token](doc:voice-ios-cloud-application-authentication)

The sample applications included in the Sinch SDK includes a class `SINJWT` that describes how to create the _JWT_ and sign it with the _Application Secret_.

```objectivec
- (void) client:(id<SINClient>)client requiresRegistrationCredentials:(id<SINClientRegistration>)registrationCallback
{
  NSString *jwt = [SINJWT jwtForUserRegistrationWithApplicationKey:@"<application key>"
                                                 applicationSecret:@"<application secret>"
                                                            userId:client.userId];

  [registrationCallback registerWithJWT:jwt];
}
```

> **warning**
>
> When deploying your application to production, do NOT embed the _Appliation Secret_ in the application. The example above is only meant to show how to provide a signed JWT to the SINClient.

### Lifecycle Management of a _SINClient_-instance

We recommend that you initiate the _Sinch client_, start it, but not terminate it, during the lifetime of the running application. That also implies that the _SINClient_-instance should be _retained_ by the application code.

It is best to keep the client instance alive and started unless there are reasons specific to your application. It should _not_ be necessary to dispose of the client instance if memory warnings are received from iOS, because once the client is started it does not use much memory in comparison to view layers, view controllers etc. For the same reasons, if support for push notifications is enabled, the preferred method of temporarily stopping incoming calls is to [Unregister a Push Device Token](doc:voice-ios-cloud-local-and-remote-push-notifications).

The Sinch client can of course be completely stopped and also disposed. To do so, call `-[SINClient terminateGracefully]` before the application code releases its last reference to the client object.

The following example shows how to dispose the Sinch client:

```objectivec
[sinchClient terminateGracefully];
sinchClient = nil;
```
