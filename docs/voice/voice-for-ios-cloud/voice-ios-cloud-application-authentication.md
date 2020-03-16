---
title: Application Authentication
excerpt: 'Application Authentication with the Sinch SDK.'
hidden: 'true'
next:
  pages:
    - voice-ios-cloud-miscellaneous
---

A user identity must be provided when initiating a Sinch client. The first time the application instance and the Sinch client are running on behalf of a particular user, it is required to register against the Sinch service. The step of registering a user identity against the Sinch service requires the application instance to provide a token that authenticates the _Application_ and grants permission (authorizes) the user to register. Once the application instance has successfully registered the user identity, the client will have obtained the necessary credentials to perform further authorized requests on behalf of the _Application_ and for that specific user to make and receive calls.

## Token-based User Registration - Overview

To authorize the registration of a user, the application must provide a registration token to the `SINClient`. This token should be in the form of a [JSON Web Token (JWT)](https://jwt.io/) signed with a signing key derived from the _Application Secret_.

The recommended way to implement this authentication scheme is that the _Application Secret_ should be kept securely on your server-side backend, and the signed token should be created and signed on your server, then passed via a secure channel to the application instance and Sinch client running on a device.

![Token-based User Registration](images/20200221-token_based_user_registration.png)

The following sections describes in detail how to create and sign the _JWT_, and how to provide it to the `SINClient`.

## Creating a Registration Token

### JWT Header

A registration token is a _JWT_ with the following JWT header parameters:

| Header Parameter | Value           | Note                                               |
| ---------------- | :-------------- | :------------------------------------------------- |
| `alg`            | `HS256`         |
| `kid`            | `hkdfv1-{DATE}` | Where `{DATE}` is date in UTC on format `YYYYMMDD` |

Example of JWT header:

```
{
  "alg": "HS256",
  "kid": "hkdfv1-20200102"
}
```

### JWT Claims

The JWT must contain the following _claims_:

| Claim   | Value / Description                                                                 | Note |
| :------ | :---------------------------------------------------------------------------------- | ---- |
| `iss`   | `//rtc.sinch.com/applications/{APPLICATION_KEY}`                                    |
| `sub`   | `//rtc.sinch.com/applications/{APPLICATION_KEY}/users/{USER_ID}`                    |
| `iat`   | See [JWT RFC 7519 section-4.1.1](https://tools.ietf.org/html/rfc7519#section-4.1.1) |
| `exp`   | See [JWT RFC 7519 section-4.1.4](https://tools.ietf.org/html/rfc7519#section-4.1.4) |
| `nonce` | A unique cryptographic [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce)   |

**IMPORTANT**: The expiration time for the token itself (`exp`) should be set so that the _Time-to-Live_ of the token is not less than 1 minute.

### Signing the JWT

The _JWT_ should be signed using a _signing key_ derived from the _Sinch Application Secret_ as follows. Given:

- A function `HMAC256(key, message)`.
- A date-formatting function `FormatDate(date, format)`.
- The current date as variable `now`.
- _Sinch Application Secret_ as variable `applicationSecret`, holding the secret as a _base64_ encoded string.

, derive the signing key as follows:

```
signingKey = HMAC256(BASE64-DECODE(applicationSecret), UTF8-ENCODE(FormatDate(now, "YYYYMMDD")))
```

Also see `SINJWT.m` in the Sinch SDK sample apps for a detailed example of constructing the token.

For additional information about _JWT_, along with a list of available libraries for generating signed _JWTs_, see [https://jwt.io](https://jwt.io). For detailed information about the _JWT_ specification, see [https://tools.ietf.org/html/rfc7519](https://tools.ietf.org/html/rfc7519).

## Providing a Registration Token to `SINClient`

When starting the client (`-[SINClient start]`) the client will ask for a token via `-[SINClientDelegate client:requiresRegistrationCredentials:]`.

```objectivec
id<SINClient> client = [Sinch clientWithApplicationKey:@"<application key>"
                                       environmentHost:@"ocra.api.sinch.com"
                                                userId:@"<user id>"];

client.delegate = ...;

[client start];
```

```
- (void)client:(id<SINClient>)client
    requiresRegistrationCredentials:(id<SINClientRegistration>) registrationCallback {

  [yourAuthServer getRegistrationToken: [client userId]
    onSuccess:(NSString* token)^{
      [registrationCallback registerWithJWT:token];
  }
  onFailure:^(NSError* error) {
    // Notify Sinch client of failure (e.g. if your backend auth server rejects the
    // user, but also if the request to the auth server fails due to temporary
    // network connectivity issues.
    [registrationCallback registerDidFail:error];
  }];
}
```

> **Note**
> The client _MAY_ also ask for a registration token on subsequent starts.
