The AWS Amplify PubSub category provides connectivity with cloud-based message-oriented middleware. You can use PubSub to pass messages between your app instances and your app's backend creating real-time interactive experiences.

PubSub is available with **AWS IoT** and **Generic MQTT Over WebSocket Providers**. 

With AWS IoT, AWS Amplify's PubSub automatically signs your HTTP requests when sending your messages.
{: .callout .callout--info}

## Installation and Configuration

### AWS IoT

When used with `AWSIoTProvider`, PubSub is capable of signing request according to [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). 

To use in your app, import `AWSIoTProvider`:

```javascript
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
```

Define your endpoint and region in your configuration:

```javascript
// Apply plugin with configuration
Amplify.addPluggable(new AWSIoTProvider({
     aws_pubsub_region: '<YOUR-IOT-REGION>',
     aws_pubsub_endpoint: 'wss://xxxxxxxxxxxxx.iot.<YOUR-IOT-REGION>.amazonaws.com/mqtt',
   }));
```

Find your `aws_pubsub_endpoint` by logging onto your **AWS Console**, choose **IoT Core** from the list of services, then choose *Settings* from the left navigation pane.

**Create IAM policies for AWS IoT**

To use PubSub with AWS IoT, you will need to create the necessary IAM policies in the AWS IoT Console, and attach them to your Amazon Cognito Identity. 

Go to IoT Core and choose *Secure* from the left navigation pane. Then navigate to *Create Policy*. The following `myIoTPolicy` policy will allow full access to all the topics.

![Alt text](/images/create-iot-policy.png)


**Attach your policy to your Amazon Cognito Identity**

The next step is attaching the policy to your *Cognito Identity*. 

You can retrieve the `Cognito Identity Id` of a logged in user with Auth Module:
```javascript
    Auth.currentCredentials().then((info) => {
      const cognitoIdentityId = info.data.IdentityId;
    });
```

Then, you need to send your *Cognito Identity Id* to the AWS backend and attach `myIoTPolicy`. You can do this with the following [AWS CLI](https://aws.amazon.com/cli/) command:

```bash
aws iot attach-principal-policy --policy-name 'myIoTPolicy' --principal '<YOUR_COGNITO_IDENTITY_ID>'
```

**Allowing your Amazon Cognito Authenticated Role to access IoT Services**

For your Cognito Authenticated Role to be able to interact with **AWS IoT** it may be necessary to update its permissions, if you haven't done this before.  
One way of doing this is to log to your **AWS Console**, select **CloudFormation** from the available services. Locate the parent stack of your solution: it is usually named `<SERVICE-NAME>-<CREATION_TIMESTAMP>`.  
Select the **Resources** tab and tap on `AuthRole` **Physical ID**.  
The IAM console will be opened in a new tab. Once there, tap on the button **Attach Policies**, then search `AWSIoTDataAccess` and `AWSIoTConfigAccess`, select them and tap on **Attach policy**.  
  
> Failing to grant IoT related permissions to the Cognito Authenticated Role will result in errors similar to the following in your browser console: `errorCode: 8, errorMessage: AMQJS0008I Socket closed.`

## Third Party MQTT Providers

Import PubSub module and related service provider plugin to your app:

```javascript
import { PubSub } from 'aws-amplify';
import { MqttOverWSProvider } from "@aws-amplify/pubsub/lib/Providers";
```

To configure your service provider with a service endpoint, add following code:
```javascript
// Apply plugin with configuration
Amplify.addPluggable(new MqttOverWSProvider({
    aws_pubsub_endpoint: 'wss://iot.eclipse.org:443/mqtt',
}));
```

You can integrate any MQTT Over WebSocket provider with your app. Click [here](https://docs.aws.amazon.com/iot/latest/developerguide/protocols.html#mqtt-ws) to learn more about MQTT Over WebSocket.
{: .callout .callout--info}

## Working with the API

### Subscribe to a topic

In order to start receiving messages from your provider, you need to subscribe to a topic as follows;
```javascript
PubSub.subscribe('myTopic').subscribe({
    next: data => console.log('Message received', data),
    error: error => console.error(error),
    close: () => console.log('Done'),
});
```

If multiple providers are defined in your app you can include the specific provider you would like to subscribe to:
```javascript
PubSub.subscribe('myTopic', { provider: 'AWSIoTProvider' }).subscribe({
    //...
});

PubSub.subscribe('myTopic', { provider: 'MqttOverWSProvider' }).subscribe({
    //...
});
```

Note: If you do not include a specific provider it will subscribe to all of the configured PubSub providers in your app.
{: .callout .callout--info}

Following events will be triggered with `subscribe()`

Event | Description 
`next` | Triggered every time a message is successfully received for the topic
`error` | Triggered when subscription attempt fails 
`close` | Triggered when you unsubscribe from the topic

### Subscribe to multiple topics

To subscribe for multiple topics, just pass a String array including the topic names:
```javascript
PubSub.subscribe(['myTopic1','myTopic1']).subscribe({
    //...
});
```

### Publish to a topic

To send a message to a topic, use `publish()` method with your topic name and the message:
```javascript
await PubSub.publish('myTopic1', { msg: 'Hello to all subscribers!' });
```

If multiple providers are defined in your app you can pass the message to a specific provider:
```javascript
await PubSub.publish('myTopic1', { msg: 'Hello to all subscribers!' }, { provider: 'AWSIoTProvider' });
```

You can also publish a message to multiple topics:
```javascript
await PubSub.publish(['myTopic1','myTopic2'], { msg: 'Hello to all subscribers!' });
```

Note: If you do not include a specific provider it will publish a message to all of the configured PubSub providers in your app.
{: .callout .callout--info}

### Unsubscribe from a topic

To stop receiving messages from a topic, you can use `unsubscribe()` method:
```javascript
const sub1 = PubSub.subscribe('myTopicA').subscribe({
    next: data => console.log('Message received', data),
    error: error => console.error(error),
    close: () => console.log('Done'),
});

sub1.unsubscribe();
// You will no longer get messages for 'myTopicA'
```

### API Reference

For the complete API documentation for PubSub module, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/pubsub.html)
{: .callout .callout--info}

## Using Modular Imports

If you only need to use PubSub, you can do: `npm install @aws-amplify/pubsub` which will only install the PubSub module for you.
Note: if you're using Cognito Federated Identity Pool to get AWS credentials, please also install `@aws-amplify/auth`.

Then in your code, you can import the PubSub module by:
```javascript
import PubSub from '@aws-amplify/pubsub';

PubSub.configure();

```