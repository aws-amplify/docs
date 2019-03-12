---
title: PubSub
---

# PubSub

PubSub provides connectivity with cloud-based message-oriented middleware. You can use PubSub to pass messages between your app instances and your app's backend creating real-time interactive experiences.

PubSub is available with **AWS IoT**. 

Starting with version `12.1.1`, iOS requires that publicly-trusted Transport Layer Security (TLS) server authentication certificates issued after October 15, 2018 meet the Certificate Transparency policy to be evaluated as trusted on Apple platforms. Any existing customer endpoint you have is most likely a VeriSign endpoint. If your endpoint has `-ats` at the end of the first subdomain, then it is an Amazon Trust Services endpoint. You can get an updated endpoint from the AWS console (AWS Console->IoT Core ->Settings page). For more details read: https://aws.amazon.com/blogs/iot/aws-iot-core-ats-endpoints/
{: .callout .callout--info}

## Installation and Configuration

### AWS IoT

When used with `AWSIoTDataManager`, PubSub is capable of signing request according to [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). 

The `Podfile` that you configure to install the AWS Mobile SDK must contain the `AWSIoT` pod:

```ruby
    platform :ios, '9.0'

    target :'YOUR-APP-NAME' do
      use_frameworks!

        pod  'AWSIoT', '~> 2.9.0'
        # other pods

    end
```

Run `pod install --repo-update` before you continue.

To use in your app, import the following:

```swift
import AWSIoT
```

Define your unique client ID and endpoint (incl. region) in your configuration:

```swift
// Initialize the AWSIoTDataManager with the configuration
let iotEndPoint = AWSEndpoint(
    urlString: "wss://xxxxxxxxxxxxx-ats.iot.<YOUR-AWS-REGION>.amazonaws.com/mqtt")
let iotDataConfiguration = AWSServiceConfiguration(
    region: AWSRegionType.<YOUR-AWS-REGION>,
    endpoint: iotEndPoint,
    credentialsProvider: AWSMobileClient.sharedInstance()
)

AWSIoTDataManager.register(with: iotDataConfiguration!, forKey: ASWIoTDataManager)
AWSIoTDataManager iotDataManager = AWSIoTDataManager(forKey: ASWIoTDataManager)                                               
```

You can get the endpoint information from the IoT Core -> Settings page on the AWS Console.  
{: .callout .callout--info}

**Create IAM policies for AWS IoT**

To use PubSub with AWS IoT, you will need to create the necessary IAM policies in the AWS IoT Console, and attach them to your Amazon Cognito Identity. 

Go to IoT Core and choose *Secure* from the left navigation pane. Then navigate to *Create Policy*. The following `myIOTPolicy` policy will allow full access to all the topics.

![Alt text]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/images/iot_attach_policy.png?raw=true "Title")


**Attach your policy to your Amazon Cognito Identity**

To attach the policy to your *Cognito Identity*, begin by retrieving the `Cognito Identity Id` from `AWSMobileClient`.

```swift
AWSMobileClient.sharedInstance().getIdentityId();
```

Then, you need to attach the `myIOTPolicy` policy to the user's *Cognito Identity Id* with the following [AWS CLI](https://aws.amazon.com/cli/) command:

```bash
aws iot attach-principal-policy --policy-name 'myIOTPolicy' --principal '<YOUR_COGNITO_IDENTITY_ID>'
```

## Working with the API

### Establish Connection

Before you can publish/subscribe to a topic, you need to establish a connection. You can do that using one of the following methods provided by the SDK.

#### Certificate based mutual authentication

To connect with the AWS IoT Core service on the standard MQTT port 8883, you can use the `connect` API as shown below.

```swift
func mqttEventCallback(_ status: AWSIoTMQTTStatus ) {
    print("connection status = \(status.rawValue)")
}

iotDataManager.connect(withClientId: "<YOUR_CLIENT_ID>",
                       cleanSession: true,
                       certificateId: "<YOUR_CERTIFICATE_ID>",
                       statusCallback: mqttEventCallback
```

The AWS IoT Core service also allows you to connect devices using MQTT with certificate based mutual authentication on port 443. You can do this using the `connectUsingALPN` API as shown below. See [MQTT with TLS client authentication on port 443](https://aws.amazon.com/blogs/iot/mqtt-with-tls-client-authentication-on-port-443-why-it-is-useful-and-how-it-works/) for more information.

```swift
func mqttEventCallback(_ status: AWSIoTMQTTStatus ) {
    print("connection status = \(status.rawValue)")
}

iotDataManager.connectUsingALPN(withClientId: "<YOUR_CLIENT_ID>",
                       cleanSession: true,
                       certificateId: "<YOUR_CERTIFICATE_ID>",
                       statusCallback: mqttEventCallback
```

You can take a look at the [API Reference](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/Classes/AWSIoTDataManager.html#//api/name/connectWithClientId:cleanSession:certificateId:statusCallback:
) to get more information.

#### AWS Credentials based Authentication

This method uses AWS Signature Version 4 Credentials to sign the request to connect to the AWS IoT endpoint.

```swift
func mqttEventCallback(_ status: AWSIoTMQTTStatus ) {
    print("connection status = \(status.rawValue)")
}

iotDataManager.connectUsingWebSocket(withClientId: "<YOUR_CLIENT_ID>",
                                     cleanSession: true,
                                     statusCallback: mqttEventCallback)
```

You can take a look at the [API Reference](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/Classes/AWSIoTDataManager.html#//api/name/connectUsingWebSocketWithClientId:cleanSession:statusCallback:) to know more information.

#### Custom Authentication

AWS IoT allows you to define custom authorizers that allow you to manage your own authentication and authorization strategy using a custom authentication service and a Lambda function. Custom authorizers allow AWS IoT to authenticate your devices and authorize operations using bearer token authentication and authorization strategies. See [AWS IoT Custom Authentication](https://docs.aws.amazon.com/iot/latest/developerguide/iot-custom-authentication.html) for more details.

Please follow the steps outlined in [Setting up Custom Authentication](https://aws.amazon.com/blogs/security/how-to-use-your-own-identity-and-access-management-systems-to-control-access-to-aws-iot-resources/) to create the custom authorizer and configure the workflow with AWS IoT.

Once the custom authorizer workflow is configured, you can establish a connection as follows:

```swift
func mqttEventCallback(_ status: AWSIoTMQTTStatus ) {
    print("connection status = \(status.rawValue)")
}

iotDataManager.connectUsingWebSocket(withClientId: uuid,
                                     cleanSession: true,
                                     customAuthorizerName: "<name-of-the-custom-authorizer>",
                                     tokenKeyName: "<key-name-for-the-token>",
                                     tokenValue: "<token>",
                                     tokenSignature: "<signature-of-the-token>",
                                     statusCallback: mqttEventCallback)
```

You can take a look at the [API Reference](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/Classes/AWSIoTDataManager.html#//api/name/connectUsingWebSocketWithClientId:cleanSession:customAuthorizerName:tokenKeyName:tokenValue:tokenSignature:statusCallback:) to know more information. This feature is available in the AWS SDK for iOS starting from `2.8.4` version. See [AWSIoT - 2.8.4](https://github.com/aws-amplify/aws-sdk-ios/blob/master/CHANGELOG.md#284) for more details.

### Subscribe to a topic

In order to start receiving messages from your provider, you need to subscribe to a topic as follows;

```swift
iotDataManager.subscribe(
    toTopic: "myTopic",
    qoS: .messageDeliveryAttemptedAtMostOnce, /* Quality of Service */
    messageCallback: {
        (payload) ->Void in
        let stringValue = NSString(data: payload, encoding: String.Encoding.utf8.rawValue)!

        print("Message received: \(stringValue)")
} )
```

### Subscribe to multiple topics

To subscribe for multiple topics, just call `subscribe()` for each topic you wish to subscribe. 

### Publish to a topic

To send a message to a topic, use `publishString()` method with your topic name and the message:

```swift
iotDataManager.publishString(
    "Hello to all subscribers!",
    onTopic: "myTopic", 
    qoS:.messageDeliveryAttemptedAtMostOnce)
```

### Unsubscribe from a topic

To stop receiving messages from a topic, you can use `unsubscribeTopic()` method:

```swift
iotDataManager.unsubscribeTopic("myTopic")

// You will no longer get messages for "myTopic"
```

### Close Connection

In order to disconnect, you need to close the connection as follows:

```swift
iotDataManager.disconnect()
```

### API Reference

For the complete API documentation for AWS IoT, visit our [API reference](https://aws-amplify.github.io/aws-sdk-ios/docs/reference/Classes/AWSIoTDataManager.html)
{: .callout .callout--info}
