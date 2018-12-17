# Setup Options for the SDK

The AWS SDK contains [high level client interfaces](./start) for quickly adding common features and functionality to your app. You can also manually add the generated AWS service interfaces for direct interaction if you have custom or advanced requirements.

## Android Gradle setup

The AWS Mobile SDK for Android is available through Gradle.

If you are using Android Studio, add the dependency for the individual services that your project will use to your `app/build.gradle` file, as shown below.

```groovy
dependencies {
    implementation 'com.amazonaws:aws-android-sdk-ddb:2.9.+'
}
```

A full list of dependencies are listed below. For dependencies ending in "`@aar`" use a compile statement in the following form.

```groovy
implementation ('aws-android-sdk-mobile-client:2.9.+@aar') { transitive = true }
```

Dependency | Build.gradle Value
------------ | -------------
"Amazon API Gateway" | "aws-android-sdk-apigateway-core:2.9.+"
"AWS Auth Core" | "aws-android-sdk-auth-core:2.9.+@aar"
"AWS Facebook SignIn Provider" | "aws-android-sdk-auth-facebook:2.9.+@aar"
"AWS Google SignIn Provider" | "aws-android-sdk-auth-google:2.9.+@aar"
"AWS Auth UI" | "aws-android-sdk-auth-ui:2.9.+@aar"
"AWS Cognito User Pools SignIn Provider" | "aws-android-sdk-auth-userpools:2.9.+@aar"
"Amazon Auto Scaling" | "aws-android-sdk-autoscaling:2.9.+"
"Amazon CloudWatch" | "aws-android-sdk-cloudwatch:2.9.+"
"Amazon Cognito Auth" | "aws-android-sdk-cognitoauth:2.9.+@aar"
"Amazon Cognito Identity Provider" | "aws-android-sdk-cognitoidentityprovider:2.9.+"
"AWS Core" | "aws-android-sdk-core:2.9.+"
"Amazon DynamoDB Document Model" | "aws-android-sdk-ddb-document:2.9.+"
"Amazon DynamoDB Object Mapper" | "aws-android-sdk-ddb-mapper:2.9.+"
"Amazon DynamoDB" | "aws-android-sdk-ddb:2.9.+"
"Amazon Elastic Compute Cloud" | "aws-android-sdk-ec2:2.9.+"
"Amazon Elastic Load Balancing" | "aws-android-sdk-elb:2.9.+"
"AWS IoT" | "aws-android-sdk-iot:2.9.+"
"Amazon Kinesis" | "aws-android-sdk-kinesis:2.9.+"
"Amazon Kinesis Video" | "aws-android-sdk-kinesisvideo:2.9.+@aar"
"Amazon Key Management Service (KMS)" | "aws-android-sdk-kms:2.9.+"
"AWS Lambda" | "aws-android-sdk-lambda:2.9.+"
"Amazon Lex" | "aws-android-sdk-lex:2.9.+@aar"
"Amazon CloudWatch Logs" | "aws-android-sdk-logs:2.9.+"
"Amazon Machine Learning" | "aws-android-sdk-machinelearning:2.9.+"
"AWS Mobile Client" | "aws-android-sdk-mobile-client:2.9.+@aar"
"Amazon Pinpoint" | "aws-android-sdk-pinpoint:2.9.+"
"Amazon Polly" | "aws-android-sdk-polly:2.9.+"
"Amazon Rekognition" | "aws-android-sdk-rekognition:2.9.+"
"Amazon Simple Storage Service (S3)" | "aws-android-sdk-s3:2.9.+"
"Amazon Simple DB (SDB)" | "aws-android-sdk-sdb:2.9.+"
"Amazon SES" | "aws-android-sdk-ses:2.9.+"
"Amazon SNS" | "aws-android-sdk-sns:2.9.+"
"Amazon SQS" | "aws-android-sdk-sqs:2.9.+"

Whenever a new version of the SDK is released you can update by running a Gradle Sync and rebuilding your project to use the new features.

## Set Permissions in Your Manifest

Add the following permission to your `AndroidManifest.xml`::

```xml
<uses-permission android:name="android.permission.INTERNET" />
```

## Direct AWS Service access

You can call AWS service interface objects directly via the generated SDK clients. You can use the client credentials provided by the [AWSMobileClient](./authentication) by calling `AWSMobileClient.getInstance()` and passing it to the service client. This will leverage short term AWS credentials from Cognito Identity. 

To work with service interface objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.
{: .callout .callout--warning}

For example, if you were using [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) in your Android project you would first add `aws-android-sdk-sqs:2.9.+` to your `app/build.gradle` and install the dependencies by running a Gradle Sync. 

Next, import `AmazonSQS` in your Android Studio project and create the client:

```java
import com.amazonaws.services.sqs.AmazonSQSAsyncClient;
import com.amazonaws.services.sqs.model.SendMessageRequest;
import com.amazonaws.services.sqs.model.SendMessageResult;

public void addItemSQS() {
    AmazonSQSAsyncClient sqs = new AmazonSQSAsyncClient(AWSMobileClient.getInstance());
    sqs.setRegion(Region.getRegion("XX-XXXX-X"));
    SendMessageRequest req = new SendMessageRequest("https://sqs.XX-XXXX-X.amazonaws.com/XXXXXXXXXXXX/MyQueue", "hello world");
    sqs.sendMessageAsync(req, new AsyncHandler<SendMessageRequest, SendMessageResult>() {
        @Override
        public void onSuccess(SendMessageRequest request, SendMessageResult sendMessageResult) {
            Log.i(LOG_TAG, "SQS result: " + sendMessageResult.getMessageId());
        }

        @Override
        public void onError(Exception e) {
            Log.e(LOG_TAG, "SQS error: ", e);
        }
    });
}
```

You could then call `this.addItemSQS()` to invoke this action from your app.