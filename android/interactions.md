
# Interactions

## Overview

Amazon Lex is an AWS service for building voice and text conversational interfaces into applications. With Amazon Lex, the same natural language understanding engine that powers Amazon Alexa is now available to any
developer, enabling you to build sophisticated, natural language chatbots into your new and existing
applications.

The AWS Mobile SDK for Android provides an optimized client for interacting with Amazon Lex runtime APIs,
which support both voice and text input and can return either voice or text. Amazon Lex has built-in
integration with AWS Lambda to allow insertion of custom business logic into your Amazon Lex processing flow, including all of the extension to other services that Lambda makes possible.

For information on Amazon Lex concepts and service configuration, see
[How it Works](http://docs.aws.amazon.com/lex/latest/dg/how-it-works.html) in the *Lex Developer Guide*.

For information about  Region availability, see [AWS Service Region Availability](http://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

To get started using the Amazon Lex mobile client, integrate the SDK for Android
into your app, set the appropriate permissions, and import the necessary libraries.


## Setting Up

### Include the SDK in Your Project

Follow the instructions at `setup-legacy` to include the JAR files for this service and set the appropriate
permissions.


#### Set Permissions in Your Android Manifest

  In your `AndroidManifest.xml` file, add the following permission:

  ```xml
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  ```

#### Declare Amazon Lex as a Gradle dependency

  Make sure the following Gradle build dependency is declared in the `app/build.gradle` file.

  ```groovy
  implementation 'com.amazonaws:aws-android-sdk-lex:2.3.8@aar'
  ```

### Set IAM Permissions for Amazon Lex

To use Amazon Lex in an application, create a role and attach policies as described in Step 1 of
[Getting Started](http://docs.aws.amazon.com/lex/latest/dg/gs-bp-prep.html) in the *Lex Developer Guide*.

To learn more about IAM policies, see [Using IAM](http://docs.aws.amazon.com/IAM/latest/UserGuide/IAM_Introduction.html).

### Configure a Bot

Use the [Amazon Lex console](https://console.aws.amazon.com/lex/) console to configure a bot that interacts with your mobile app features. To learn more, see [Amazon Lex Developer Guide](https://docs.aws.amazon.com/lex/latest/dg/what-is.html). For a quickstart, see [Getting Started](https://alpha-docs-aws.amazon.com/lex/latest/dg/getting-started.html).

Amazon Lex also supports model building APIs, which allow creation of bots, intents, and slots at runtime. This SDK does not currently offer additional support for interacting with Amazon Lex model building APIs.

## Implement Text and Voice Interaction with Amazon Lex

### Get AWS User Credentials

Both text and voice API calls require validated AWS credentials. To establish Amazon Cognito as the credentials provider,
include the following code in the function where you initialize your Amazon Lex interaction objects.
<div class="nav-tab create" data-group='create'>
<ul class="tabs">
    <li class="tab-link java current" data-tab="java">Java</li>
    <li class="tab-link kotlin" data-tab="kotlin">Kotlin</li>
</ul>
<div id="java" class="tab-content current">
```java
CognitoCredentialsProvider credentialsProvider =
  new CognitoCredentialsProvider(
      appContext.getResources().getString(R.string.identity_id_test),
      Regions.fromName(appContext.getResources().getString(R.string.aws_region))
  );
```
</div>
<div id="kotlin" class="tab-content" >
```kotlin
val region = applicationContext.resources.getString(R.string.aws_region)
val credentialsProvider = CognitoCredentialsProvider
      applicationContext.resources.getString(R.string.identity_id_test),
      Regions.fromName(region))
```
</div>
### Integrate Lex Interaction Client

Perform the following tasks to implement interaction with Lex in your Android app.

#### Initialize Your Lex Interaction Client

  Instantiate an `InteractionClient`, providing the following parameters.

    - The application context, credentials provider, and AWS Region
    - `bot_name` - name of the bot as it appears in the Amazon Lex console
    - `bot_alias` - the name associated with selected version of your bot
    - `InteractionListener` - your app's receiver for text responses from Amazon Lex
    - `AudioPlaybackListener`  - your app's receiver for voice responses from Amazon Lex

  ```java
  // Create Lex interaction client.
  lexInteractionClient = new InteractionClient(getApplicationContext(),
        credentialsProvider,
        Regions.US_EAST_1,
        <your_bot_name>,
        <your_bot_alias>);
  lexInteractionClient.setAudioPlaybackListener(audioPlaybackListener);
  lexInteractionClient.setInteractionListener(interactionListener);
  ```

  ```kotlin
  // Create Lex interaction client.
  val lexInteractionClient = InteractionClient(applicationContext,
        credentialsProvider,
        Regions.US_EAST_1,
        <your_bot_name>,
        <your_bot_alias>)
  lexInteractionClient.audioPlaybackListener = audioPlaybackListener
  lexInteractionClient.interactionListener = interactionListener
  ```
#### Begin or Continue a Conversation

To begin a new conversation with Amazon Lex, we recommend that you clear any history of previous text interactions, and that
you maintain a `inConversation` flag to make your app aware of when a conversation is in progress.

If `inConversation` is false when user input is ready to be sent as Amazon Lex input,  then make a call using the
`textInForTextOut`, `textInForAudioOut`, `audioInForTextOut`, or `audioInForAudioOut` method
of an `InteractionClient` instance. These calls are in the form of:

```java
lexInteractionClient.textInForTextOut(
  String text,
  Map<String, String> sessionAttributes)
```

```kotlin
lexInteractionClient.textInForTextOut(
  text: String,
  sessionAttributes: Map<String,String>)
```

If `inConversation` is true, then the input should be passed to an instance of `LexServiceContinuation`
using the `continueWithTextInForTextOut`, `continueWithTextInForAudioOut`, `continueWithAudioInForTextOut`,
`continueWithAudioInForAudioOut` method. Continuation enables Amazon Lex to persist the state and metadata of an ongoing conversation across multiple interactions.

#### Interaction Response Events

  `InteractionListener` captures a set of Amazon Lex response events that include:

  - `onReadyForFulfillment(final Response response)`

    This response means that Lex has the information it needs to co fulfill the intent of the user and considers the
    transaction complete. Typically, your app would set your `inConversation` flag to false when this response arrives.

  - `promptUserToRespond(final Response response, final LexServiceContinuation continuation)`

    This response means that Amazon Lex is providing the next piece of information needed in the conversation flow. Typically
    your app would pass the received continuation on to your Amazon Lex client.

  - `onInteractionError(final Response response, final Exception e)`

    This response means that Amazon Lex is providing an identifier for the exception that has occurred.

#### Microphone Events

  `MicrophoneListener` captures events related to the microphone used for interaction with Amazon Lex that include:

  - `startedRecording()`

    This event occurs when the user has started recording their voice input to Amazon Lex.

  - `onRecordingEnd()`

    This event occurs when the user has finished recording their voice input to Amazon Lex.

  - `onSoundLevelChanged(double soundLevel)`

    This event occurs when the volume level of audio being recorded changes.

  - `onMicrophoneError(Exception e)`

    The event returns an exception when an error occurs while recording sound through the microphone.

#### Audio Playback Events

  `AudioPlaybackListener` captures a set of events related to Amazon Lex voice responses that include:

  - `onAudioPlaybackStarted()`

    This event occurs when playback of a Amazon Lex voice response starts.

  - `onAudioPlayBackCompleted()`

    This event occurs when playback of a Amazon Lex voice response finishes.

  - `onAudioPlaybackError(Exception e)`

    This event returns an exception when an error occurs during playback of an Amazon Lex voice response.


### Add Voice Interactions

Perform the following tasks to implement voice interaction with Amazon Lex in your Android app.

`InteractiveVoiceView` simplifies the acts of receiving and playing voice responses from Lex by internally
using the `InteractionClient` methods and both `MicrophoneListener` and Amazon Lex`AudioPlaybackListener` events
described in the preceding sections. You can use those interfaces directly instead of instantiating
`InteractiveVoiceView`.

#### Add a `voice-component` Layout Element to Your Activity

  In the layout for your activity class that contains the voice interface for your app, include the following element.

  ```xml
   <include
      android:id="@+id/voiceInterface"
      layout="@layout/voice_component"
      android:layout_width="200dp"
      android:layout_height="200dp"
       />
  ```
#### Initialize Your Voice Activity

  In your activity class that contains the voice interface for your app, have the base class implement
  `InteractiveVoiceView.InteractiveVoiceListener`.

  The following code shows initialization of `InteractiveVoiceView`.

  ```java
  private void init() {
     appContext = getApplicationContext();
     voiceView = (InteractiveVoiceView) findViewById(R.id.voiceInterface);
     voiceView.setInteractiveVoiceListener(this);
     CognitoCredentialsProvider credentialsProvider = new CognitoCredentialsProvider(
          <your_conginto_identity_pool_id>,
          Regions.fromName(<your_aws_region>)));
     voiceView.getViewAdapter().setCredentialProvider(credentialsProvider);
     voiceView.getViewAdapter().setInteractionConfig(
         new InteractionConfig(<your_bot_name>),  <your_bot_alias>));
     voiceView.getViewAdapter().setAwsRegion(<your_aws_region>));
  }
  ```

  ```kotlin
  private fun init() {
    val voiceView = voiceInterface as InteractiveVoiceView
    val cp = CognitoCredentialsProvider(IDENTITY_POOL_ID, REGION)
    with (voiceView.viewAdapter) {
      credentialsProvider = cp
      setInteractionConfig(InteractionConfig(<your_bot_name>), <your_bot_alias>)
      setAwsRegion(REGION)
    }
  }
  ```
