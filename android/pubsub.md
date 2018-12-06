---
title: PubSub
---
# PubSub

PubSub provides connectivity with cloud-based message-oriented middleware. You can use PubSub to pass messages between your app instances and your app's backend creating real-time interactive experiences.

PubSub is available with **AWS IoT**. 

When using AWS IoT your PubSub HTTP requests are automatically signed when sending your messages.
{: .callout .callout--info}

## Installation and Configuration

### AWS IoT

In the PubSub category, `AWSIoTMqttManager` establishes a signed connection with AWS IoT according to [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). 

Set up AWS Mobile SDK components by including the following libraries in your `app/build.gradle` dependencies list.

```groovy
dependencies {
  implementation 'com.amazonaws:aws-android-sdk-iot:2.8.+'
  implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.8.+@aar') { transitive = true }
}
```

* `aws-android-sdk-iot` library enables connecting to AWS IoT.
* `aws-android-sdk-mobile-client` library gives access to the AWS credentials provider and configurations.

To use in your app, import the following classes:

```java
import com.amazonaws.mobileconnectors.iot.AWSIotMqttManager;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttNewMessageCallback;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttQos;
```

Define your unique client ID and endpoint (incl. region) in your configuration:

```java
// Initialize the AWSIotMqttManager with the configuration
AWSIotMqttManager mqttManager = new AWSIotMqttManager(
	"<YOUR_CLIENT_ID>", 
	"wss://xxxxxxxxxxxxx.iot.<YOUR-AWS-REGION>.amazonaws.com/mqtt");
```

**Create IAM policies for AWS IoT**

To use PubSub with AWS IoT, you will need to create the necessary IAM policies in the AWS IoT Console, and attach them to your Amazon Cognito Identity. 

Go to IoT Core and choose *Secure* from the left navigation pane. Then navigate to *Create Policy*. The following `myIOTPolicy` policy will allow full access to all the topics.

![Alt text]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/images/iot_attach_policy.png?raw=true "Title")


**Attach your policy to your Amazon Cognito Identity**

To attach the policy to your *Cognito Identity*, begin by retrieving the `Cognito Identity Id` from `AWSMobileClient`.

```java
AWSMobileClient.getInstance().getIdentityId();
```

Then, you need to attach the `myIOTPolicy` policy to the user's *Cognito Identity Id* with the following [AWS CLI](https://aws.amazon.com/cli/) command:

```bash
aws iot attach-principal-policy --policy-name 'myIOTPolicy' --principal '<YOUR_COGNITO_IDENTITY_ID>'
```

You can also programmatically attach the `myIOTPolicy` policy to the user's *Cognito Identity Id* as follows :

```
AttachPolicyRequest attachPolicyReq = new AttachPolicyRequest();
attachPolicyReq.setPolicyName("myIOTPolicy"); // name of your IOTAWS policy
attachPolicyReq.setTarget(AWSMobileClient.getInstance().getIdentityId());
AWSIotClient mIotAndroidClient = new AWSIotClient(AWSMobileClient.getInstance());
mIotAndroidClient.setRegion(Region.getRegion(MY_REGION));
mIotAndroidClient.attachPolicy(attachPolicyReq);
```

## Working with the API

### Establish Connection

Before you can subscribe to a topic, you need to establish a connection as follows:

```java
try {
    mqttManager.connect(AWSMobileClient.getInstance(), new AWSIotMqttClientStatusCallback() {
        @Override
        public void onStatusChanged(final AWSIotMqttClientStatus status, final Throwable throwable) {
            Log.d(LOG_TAG, "Connection Status: " + String.valueOf(status));
        }
    });
} catch (final Exception e) {
    Log.e(LOG_TAG, "Connection error: ", e);
}
```

### Subscribe to a topic

In order to start receiving messages from your provider, you need to subscribe to a topic as follows;

```java
try {
	mqttManager.subscribeToTopic("myTopic", AWSIotMqttQos.QOS0 /* Quality of Service */,
	    new AWSIotMqttNewMessageCallback() {
	        @Override
	        public void onMessageArrived(final String topic, final byte[] data) {
	        	try {
                    String message = new String(data, "UTF-8");
                    Log.d(LOG_TAG, "Message received: " + message);
                } catch (UnsupportedEncodingException e) {
                    Log.e(LOG_TAG, "Message encoding error: ", e);
                }
	        }
	    });
} catch (Exception e) {
    Log.e(LOG_TAG, "Subscription error: ", e);
}
```

### Subscribe to multiple topics

To subscribe for multiple topics, just call `subscribeToTopic()` for each topic you wish to subscribe. 

### Publish to a topic

To send a message to a topic, use `publishString()` method with your topic name and the message:

```java
try {
    mqttManager.publishString("Hello to all subscribers!", "myTopic", AWSIotMqttQos.QOS0);
} catch (Exception e) {
    Log.e(LOG_TAG, "Publish error: ", e);
}
```

### Unsubscribe from a topic

To stop receiving messages from a topic, you can use `unsubscribeTopic()` method:

```java
try {
    mqttManager.unsubscribeTopic("myTopic");
} catch (Exception e) {
    Log.e(LOG_TAG, "Unsubscription error: ", e);
}

// You will no longer get messages for "myTopic"
```

### Close Connection

In order to disconnect, you need to close the connection as follows:

```java
try {
    mqttManager.disconnect();
} catch (Exception e) {
    Log.e(LOG_TAG, "Disconnect error: ", e);
}
```

### API Reference

For the complete API documentation for AWS IoT, visit our [API reference](https://aws-amplify.github.io/aws-sdk-android/docs/reference/com/amazonaws/mobileconnectors/iot/package-frame.html)
{: .callout .callout--info}
