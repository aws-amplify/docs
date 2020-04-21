---
title: Getting started
description: The Analytics category enables you to collect analytics data for your app. The Analytics category comes with built-in support for Amazon Pinpoint and Amazon Kinesis (Kinesis support is currently only available in the Amplify JavaScript library).
---

The Analytics category enables you to collect analytics data for your app. The Analytics category comes with built-in support for [Amazon Pinpoint](#using-amazon-pinpoint) and [Amazon Kinesis](#using-amazon-kinesis) (Kinesis support is currently only available in the Amplify JavaScript library).

> **Prerequisite:** [Install and configure the Amplify CLI](~/cli/start/install.md)

## Set up analytics backend

Run the following command in your project's root folder. The CLI will prompt configuration options for the Analytics category such as Amazon Pinpoint resource name and analytics event settings.

> The Analytics category utilizes the Authentication category behind the scenes to authorize your app to send analytics events.

```console
$ amplify add analytics
? Provide your pinpoint resource name: `pinpointResourceName`
Adding analytics would add the Auth category to the project if not already added.
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting 
started) Yes
```

To deploy your backend run:

```console
amplify push
```

<inline-fragment platform="js" src="~/lib/analytics/fragments/js/getting-started.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/analytics/fragments/ios/getting-started.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/analytics/fragments/android/getting-started.md"></inline-fragment>

## View analytics console

From the terminal run the following command. Navigate to the *Analytics* tab, and then choose *View in Pinpoint*.

```console
amplify console
```
