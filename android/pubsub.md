---
---
# PubSub

PubSub provides connectivity with cloud-based message-oriented middleware. You can use PubSub to pass messages between your app instances and your app's backend creating real-time interactive experiences.

PubSub is available with **AWS IoT**. 

When using AWS IoT your PubSub HTTP requests are automatically signed when sending your messages.
{: .callout .callout--info}

## Installation and Configuration

### AWS IoT

When used with `AWSIotMqttManager`, PubSub is capable of signing request according to [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html). 

To use in your app, import the following classes:

```java
import com.amazonaws.mobileconnectors.iot.AWSIotMqttManager;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttNewMessageCallback;
import com.amazonaws.mobileconnectors.iot.AWSIotMqttQos;
```

Define your unique client ID and endpoint (incl. region) in your configuration:

```java
// Initialize the MQTTManager with the configuration
AWSIotMqttManager mqttManager = new AWSIotMqttManager(
	"<YOUR_CLIENT_ID>", 
	"wss://xxxxxxxxxxxxx.iot.<YOUR-AWS-REGION>.amazonaws.com/mqtt");
```

**Create IAM policies for AWS IoT**

To use PubSub with AWS IoT, you will need to create the necessary IAM policies in the AWS IoT Console, and attach them to your Amazon Cognito Identity. 

Go to IoT Core and choose *Secure* from the left navigation pane. Then navigate to *Create Policy*. The following `myIOTPolicy` policy will allow full access to all the topics.

![Alt text]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/images/iot_attach_policy.png?raw=true "Title")


**Attach your policy to your Amazon Cognito Identity**

The next step is attaching the policy to your *Cognito Identity*. 

You can retrieve the `Cognito Identity Id` of a logged in user with AWSMobileClient:

```java
AWSMobileClient.getInstance().getIdentityId();
```

Then, you need to send your *Cognito Identity Id* to the AWS backend and attach `myIOTPolicy`. You can do this with the following [AWS CLI](https://aws.amazon.com/cli/) command:

```bash
aws iot attach-principal-policy --policy-name 'myIOTPolicy' --principal '<YOUR_COGNITO_IDENTITY_ID>'
```

## Working with the API

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

To subscribe for multiple topics, just call subscribeToTopic for each topic you wish to subscribe. 

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

### API Reference

For the complete API documentation for AWS IoT, visit our [API reference](https://aws.github.io/aws-sdk-android/docs/reference/com/amazonaws/mobileconnectors/iot/package-frame.html)
{: .callout .callout--info}
