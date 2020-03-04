## Update your IAM Policy:

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
If you get the error message: `Exceeded maximum endpoint per user count 10` when updating the endpoints, you can update the Policy with the Action: `mobiletargeting:GetUserEndpoints` which will allow the Analytics module to get the endpoints info and remove unused endpoints automatically.

## Recording Custom Events

To record custom events call the `record` method:

```javascript
Analytics.record({ name: 'albumVisit' });
```

## Record a Custom Event with Attributes

The `record` method lets you add additional attributes to an event. For example, to record *artist* information with an *albumVisit* event:

```javascript
Analytics.record({
    name: 'albumVisit', 
    // Attribute values must be strings
    attributes: { genre: '', artist: '' }
});
```

Attribute values must have the type `String` or be an array of strings.

## Record Engagement Metrics

Data can also be added to an event:

```javascript
Analytics.record({
    name: 'albumVisit', 
    attributes: {}, 
    metrics: { minutesListened: 30 }
});
```

Metric values must be a `Number` type such as a float or integer.

## Disable Analytics

You can also disable or re-enable Analytics:
```javascript
// to disable Analytics
Analytics.disable();

// to enable Analytics
Analytics.enable();
```

## Update Endpoint

An endpoint uniquely identifies your app within Pinpoint. In order to update your <a href="https://docs.aws.amazon.com/pinpoint/latest/apireference/rest-api-endpoints.html" target="_blank">endpoint</a> use the `updateEndpoint()` method:

```javascript
import Analytics from '@aws-amplify/analytics';

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