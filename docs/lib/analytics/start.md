---
title: Setup analytics
description: Description
---

The Analytics category enables you to collect analytics data for your app. The Analytics category comes with built-in support for [Amazon Pinpoint](#using-amazon-pinpoint) and [Amazon Kinesis](#using-amazon-kinesis) (Kinesis support is currently only available in the Amplify JavaScript library).

> Prerequisite:</b> [Install and configure the Amplify CLI](..)

## Set up analytics backend

Run the following command in your project's root folder. The CLI will prompt configuration options for the Analytics category such as Amazon Pinpoint resource name and analytics event settings.

> The Analytics category utilizes the Authentication category behind the scenes to authorize your app to send analytics events.}

```bash
$ amplify add analytics
? Provide your pinpoint resource name: `pinpointResourceName`
Adding analytics would add the Auth category to the project if not already added.
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting 
started) `Yes`
```

To deploy your backend run:

```bash
$ amplify push
```

> If your Analytics resources were created with Amplify CLI version 1.6.4 and below, you will need to manually update your project to avoid Node.js runtime issues with AWS Lambda. [Read more](/cli/lambda-node-version-update)

### View analytics console

From the terminal run the following command. Navigate to the *Analytics* tab, and then choose *View in Pinpoint*.

```
amplify console
```

<inline-fragment platform="js" src="~/lib/analytics/fragments/js/start.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/analytics/fragments/ios/start.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/analytics/fragments/android/start.md"></inline-fragment>
