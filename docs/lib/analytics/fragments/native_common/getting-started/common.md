The Analytics category enables you to collect analytics data for your App. The Analytics category comes with built-in support for [Amazon Pinpoint](https://aws.amazon.com/pinpoint) and [Amazon Kinesis](https://aws.amazon.com/kinesis) (Kinesis support is currently only available in the Amplify JavaScript library).

## Prerequisites

<inline-fragment platform="ios" src="~/lib/analytics/fragments/ios/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/analytics/fragments/android/getting-started/10_preReq.md"></inline-fragment>

## Set up Analytics backend

Run the following command in your project's root folder. The CLI will prompt configuration options for the Analytics category such as Amazon Pinpoint resource name and analytics event settings.

> The Analytics category utilizes the Authentication category behind the scenes to authorize your app to send analytics events.

```bash
amplify add analytics
```

```console
? Provide your pinpoint resource name: 
    `yourPinpointResourceName`
Adding analytics would add the Auth category to the project if not already added.
? Apps need authorization to send analytics events. Do you want to allow guests and unauthenticated users to send analytics events? (we recommend you allow this when getting started) 
    `Yes`
```

To deploy your backend, run:

```bash
amplify push
```

Upon completion, `amplifyconfiguration.json` should be updated to reference provisioned backend analytics resources.  Note that these files should already be a part of your project if you followed the [Project setup walkthrough](~/lib/project-setup/create-application.md).

## Install Amplify Libraries
<inline-fragment platform="ios" src="~/lib/analytics/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/analytics/fragments/android/getting-started/20_installLib.md"></inline-fragment>

## Initialize Amplify Analytics
<inline-fragment platform="ios" src="~/lib/analytics/fragments/ios/getting-started/30_initAnalytics.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/analytics/fragments/android/getting-started/30_initAnalytics.md"></inline-fragment>

## Next Steps
Congratulations! Now that you have Analytics' backend provisioned and Analytics library installed.  Check out the following links to see Amplify Analytics use cases:

* [Record Events](~/lib/analytics/record.md)
* [Track Sessions](~/lib/analytics/autotrack.md)
* [Identify User](~/lib/analytics/identifyuser.md)