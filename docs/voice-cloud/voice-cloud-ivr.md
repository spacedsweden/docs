---
title: "Interactive Voice Response"
excerpt: ""
hidden: "true"
---
The Sinch platform supports playing audio recordings during a call.

## External media support

Access to external media is supported by providing a valid URL in a SVAML action/instruction. Currently we support HTTP and HTTPS schemes. Please consider that when a media file is downloaded for the first time, some delays may be experienced by the users, which is directly affected by the file size and the upload speed of the file provider.

### Downloaded content caching

The platform will store a local copy of the downloaded media file after it successfully downloads it. This is to prevent constant traffic between Sinch and partner backend, as well as to decrease the time it takes for the file to be played during the call.

The following rules apply to caching: - if a Cache-Control header is included in the HTTP/HTTPS response, the platform will use the max-age directive’s value to calculate how long the file will be cached for. The minimum supported value is 24 hours, i.e. smaller max-age value will result in the file being cached for the minimum value of 24 hours. The value provided is absolute and will expire after exactly the time specified after it was downloaded. - if the response message does not contain a Cache-Control header, the file is cached for 24 hours since it was last accessed. Note that this is different from the previous case: The expiration time will be constantly extended after each usage of the media resource.

### Limits

Consider the following limitations when providing an external media reference: - the file size is by default limited to 1MB - the number of download attempts is limited to 50 downloads per hour - the size of the total downloaded content is limited to 50MB per hour

If you want to play bigger files or need to extend the total download content length per hour, please contact Sinch support.

### Supported Content-Type headers

When the platform is accessing an external media resource, it requires a Content-Type header in the response. The following values are supported:
