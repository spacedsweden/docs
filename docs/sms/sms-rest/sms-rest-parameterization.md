---
title: Parameterization
excerpt: Provide content that varies depending on recipient with message parameters.
hidden: 'true'
next:
  pages:
    - sms-rest-delivery-reports
---
Parameterization enables you to customize parts of a message for each recipient.

This is done by defining a *parameter key* and placing it in the message body. For each *parameter key*, a recipient and parameter value must be provided. The position of a parameter in a message is defined by specifying placeholders in the format `${parameter_key}` in the message body, where `parameter_key` is the name of the parameter to replace with its corresponding value.

For example the message body `Hi ${name}! How are you?` contains the parameter `name` and will be replaced according to the rules specified in the `parameters` field in the [Send a batch message](doc:sms-rest-batches-endpoint#section-send-a-batch-message) operation.

A default parameter value can be specified that will be used when an MSISDN is not listed for a particular parameter. To set this, identify a recipient as default for each *parameter key*.

If a target MSISDN is missing in the parameters object and no default value has been defined for that parameter the message will fail for that MSISDN but not for other recipients.

Parameter keys are case sensitive.
