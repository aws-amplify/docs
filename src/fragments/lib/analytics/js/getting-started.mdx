The Analytics category enables you to collect analytics data for your App. The Analytics category comes with built-in support for [Amazon Pinpoint](https://aws.amazon.com/pinpoint) and [Amazon Kinesis](https://aws.amazon.com/kinesis) (Kinesis support is currently only available in the Amplify JavaScript library).

## Goal

To setup and configure your application with Amplify Analytics and record an analytics event.

## Prerequisites
* [Install and configure Amplify CLI](https://docs.amplify.aws/cli/start/install)

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

A configuration file called `aws-exports.js` will be copied to your configured source directory, for example `./src`. The CLI will also print the URL for Amazon Pinpoint console to track your app events.  

## Configure Your App

Import and load the configuration file in your app. It's recommended you add the Amplify configuration step to your app's root entry point. For example `App.js` in React or `main.ts` in Angular.

```javascript
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

User session data is automatically collected unless you disabled analytics. To see the results visit the [Amazon Pinpoint console](https://console.aws.amazon.com/pinpoint/home/).

## Recording an event

To record custom events call the `record` method:

```javascript
import Amplify, { Analytics } from 'aws-amplify';

Analytics.record({ name: 'albumVisit' });
```

## API Reference

For a complete API reference visit the [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/analyticsclass.html)

## Set up existing analytics backend

The manual setup enables you to use your existing Amazon Pinpoint resource in your app.

```javascript
import Amplify from 'aws-amplify';

Amplify.configure({
    // To get the AWS Credentials, you need to configure 
    // the Auth module with your Cognito Federated Identity Pool
    Auth: {
        identityPoolId: 'us-east-1:xxx-xxx-xxx-xxx-xxx',
        region: 'us-east-1'
    },
    Analytics: {
        // OPTIONAL - disable Analytics if true
        disabled: false,
        // OPTIONAL - Allow recording session events. Default is true.
        autoSessionRecord: true,

        AWSPinpoint: {
            // OPTIONAL -  Amazon Pinpoint App Client ID
            appId: 'XXXXXXXXXXabcdefghij1234567890ab',
            // OPTIONAL -  Amazon service region
            region: 'XX-XXXX-X',
            // OPTIONAL -  Customized endpoint
            endpointId: 'XXXXXXXXXXXX',
            // OPTIONAL - Default Endpoint Information
            endpoint: {
                address: 'xxxxxxx', // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
                attributes: {
                    // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
                    hobbies: ['piano', 'hiking'],
                },
                channelType: 'APNS', // The channel type. Valid values: APNS, GCM
                demographic: {
                    appVersion: 'xxxxxxx', // The version of the application associated with the endpoint.
                    locale: 'xxxxxx', // The endpoint locale in the following format: The ISO 639-1 alpha-2 code, followed by an underscore, followed by an ISO 3166-1 alpha-2 value
                    make: 'xxxxxx', // The manufacturer of the endpoint device, such as Apple or Samsung.
                    model: 'xxxxxx', // The model name or number of the endpoint device, such as iPhone.
                    modelVersion: 'xxxxxx', // The model version of the endpoint device.
                    platform: 'xxxxxx', // The platform of the endpoint device, such as iOS or Android.
                    platformVersion: 'xxxxxx', // The platform version of the endpoint device.
                    timezone: 'xxxxxx' // The timezone of the endpoint. Specified as a tz database value, such as Americas/Los_Angeles.
                },
                location: {
                    city: 'xxxxxx', // The city where the endpoint is located.
                    country: 'xxxxxx', // The two-letter code for the country or region of the endpoint. Specified as an ISO 3166-1 alpha-2 code, such as "US" for the United States.
                    latitude: 0, // The latitude of the endpoint location, rounded to one decimal place.
                    longitude: 0, // The longitude of the endpoint location, rounded to one decimal place.
                    postalCode: 'xxxxxx', // The postal code or zip code of the endpoint.
                    region: 'xxxxxx' // The region of the endpoint location. For example, in the United States, this corresponds to a state.
                },
                metrics: {
                    // Custom metrics that your app reports to Amazon Pinpoint.
                },
                /** Indicates whether a user has opted out of receiving messages with one of the following values:
                 * ALL - User has opted out of all messages.
                 * NONE - Users has not opted out and receives all messages.
                 */
                optOut: 'ALL',
                // Customized userId
                userId: 'XXXXXXXXXXXX',
                // User attributes
                userAttributes: {
                    interests: ['football', 'basketball', 'AWS']
                    // ...
                }
            },

            // Buffer settings used for reporting analytics events.
            // OPTIONAL - The buffer size for events in number of items.
            bufferSize: 1000,

            // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
            flushInterval: 5000, // 5s 

            // OPTIONAL - The number of events to be deleted from the buffer when flushed.
            flushSize: 100,

            // OPTIONAL - The limit for failed recording retries.
            resendLimit: 5
        }
    }
});
```

### Update your IAM Policy:

Amazon Pinpoint service requires an IAM policy in order to use the `record` API:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "mobiletargeting:UpdateEndpoint",
                "mobiletargeting:PutEvents"
            ],
            "Resource": [
                "arn:aws:mobiletargeting:*:${accountID}:apps/${appId}*"
            ]
        }
    ]
}
```

## Update Endpoint

An endpoint uniquely identifies your app within Pinpoint. In order to update your <a href="https://docs.aws.amazon.com/pinpoint/latest/apireference/rest-api-endpoints.html" target="_blank">endpoint</a> use the `updateEndpoint()` method:

```javascript
import { Analytics } from 'aws-amplify';

Analytics.updateEndpoint({
    address: 'xxxxxxx', // The unique identifier for the recipient. For example, an address could be a device token, email address, or mobile phone number.
    attributes: {
        // Custom attributes that your app reports to Amazon Pinpoint. You can use these attributes as selection criteria when you create a segment.
        hobbies: ['piano', 'hiking'],
    },
    channelType: 'APNS', // The channel type. Valid values: APNS, GCM
    demographic: {
        appVersion: 'xxxxxxx', // The version of the application associated with the endpoint.
        locale: 'xxxxxx', // The endpoint locale in the following format: The ISO 639-1 alpha-2 code, followed by an underscore, followed by an ISO 3166-1 alpha-2 value
        make: 'xxxxxx', // The manufacturer of the endpoint device, such as Apple or Samsung.
        model: 'xxxxxx', // The model name or number of the endpoint device, such as iPhone.
        modelVersion: 'xxxxxx', // The model version of the endpoint device.
        platform: 'xxxxxx', // The platform of the endpoint device, such as iOS or Android.
        platformVersion: 'xxxxxx', // The platform version of the endpoint device.
        timezone: 'xxxxxx' // The timezone of the endpoint. Specified as a tz database value, such as Americas/Los_Angeles.
    },
    location: {
        city: 'xxxxxx', // The city where the endpoint is located.
        country: 'xxxxxx', // The two-letter code for the country or region of the endpoint. Specified as an ISO 3166-1 alpha-2 code, such as "US" for the United States.
        latitude: 0, // The latitude of the endpoint location, rounded to one decimal place.
        longitude: 0, // The longitude of the endpoint location, rounded to one decimal place.
        postalCode: 'xxxxxx', // The postal code or zip code of the endpoint.
        region: 'xxxxxx' // The region of the endpoint location. For example, in the United States, this corresponds to a state.
    },
    metrics: {
        // Custom metrics that your app reports to Amazon Pinpoint.
    },
    /** Indicates whether a user has opted out of receiving messages with one of the following values:
        * ALL - User has opted out of all messages.
        * NONE - Users has not opted out and receives all messages.
        */
    optOut: 'ALL',
    // Customized userId
    userId: 'XXXXXXXXXXXX',
    // User attributes
    userAttributes: {
        interests: ['football', 'basketball', 'AWS']
        // ...
    }
}).then(() => {
});
```

<a href="https://docs.aws.amazon.com/pinpoint/latest/developerguide/audience-define-user.html" target="_blank">Learn more</a> about Amazon Pinpoint and Endpoints.

## Using a Custom Plugin

You can create your custom pluggable for Analytics. This may be helpful if you want to integrate your app with a custom analytics backend.

To create a plugin implement the `AnalyticsProvider` interface:

```typescript
import { Analytics, AnalyticsProvider } from 'aws-amplify';

export default class MyAnalyticsProvider implements AnalyticsProvider {
    // category and provider name
    static category = 'Analytics';
    static providerName = 'MyAnalytics';

    // you need to implement these four methods
    // configure your provider
    configure(config: object): object;

    // record events and returns true if succeeds
    record(params: object): Promise<boolean>;

    // return 'Analytics';
    getCategory(): string;

    // return the name of you provider
    getProviderName(): string;
}
```

You can now register your pluggable:

```javascript
// add the plugin
Analytics.addPluggable(new MyAnalyticsProvider());

// get the plugin
Analytics.getPluggable(MyAnalyticsProvider.providerName);

// remove the plugin
Analytics.removePluggable(MyAnalyticsProvider.providerName);

// send configuration into Amplify
Analytics.configure({
    MyAnalyticsProvider: { 
        // My Analytics provider configuration 
    }
});

```

The default provider (Amazon Pinpoint) is in use when you call `Analytics.record()` unless you specify a different provider: `Analytics.record({..},'MyAnalyticsProvider')`.

## View Analytics Console

From the terminal run the following command. Navigate to the Analytics tab, and then choose View in Pinpoint.
```console
amplify console analytics
```