---
title: Java
excerpt: Tutorials for our Java SDK
next:
  pages:
    - tutorial-java-send-sms
    - tutorial-java-send-sms-group
    - tutorial-java-spring-boot-delivery-reports
    - maven-jenkins-artifactory-integration
  description: Check out our Java tutorials here
---
## Sinch ❤ Java

In this section you'll find tutorials specific to using the Sinch REST API from the Java platform.

## Getting Started

Before you start the tutorials in this section, please make sure you review the following steps:

### Create Your Free Sinch Account

Before starting, first make sure you have a Sinch account. You can create an account with free credits using the [Sinch Dashboard](https://dashboard.sinch.com/signup) to start sending messages in minutes.

Once your account is created and you're logged into the dashboard, you can obtain your credentials to the REST API (Service Plan ID and API Token) in the [APIs](https://dashboard.sinch.com/sms/api/rest) section. You'll use these credentials in the next steps below.

> **Information about trial mode limitations**
>
> When your account is in trial mode (such as when you've just created it), sending messages has the following limitations:
>
>  - The body of each message will be replaced by a generic message to prevent malicious uses of our API.
>  - Your messages will also be sent from a random phone number and the `sender` value will be ignored (although the API still requires a value so you must provide some value for the sender).

### Check Your Java JDK Version

Although the Sinch Java SDK is compatible with Java 6 and above, our tutorials will assume you are running **Java 8 or later**.

You will need to make sure the Java Development Kit (JDK) is installed on your computer. You can verify if you have the right version of the JDK installed by running this command in the terminal:

```shell
javac -version
```

If the command fails or the displayed version is smaller than `1.8`, you should download and install a more recent version of the JDK, available on the [Java SE Downloads](https://www.oracle.com/technetwork/java/javase/downloads/index.html) page.

### Get the Sinch Java SDK Library

The Java SDK is published on the [Maven Central](https://repo1.maven.org/maven2/com/clxcommunications/sdk-xms) repository which means it can easily be added to your project if you're using Gradle, Maven or another dependency management tool for the Java language. Instructions for most of the tools are
available on [mvnrepository](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms).

You can also manually download the JAR file from [Maven Central](https://repo1.maven.org/maven2/com/clxcommunications/sdk-xms) but you'll also need to add all of the other dependencies listed on [mvnrepository](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms).


The SDK is published on the [Maven Central](https://mvnrepository.com/artifact/com.clxcommunications/sdk-xms/1.0.2) repository.

