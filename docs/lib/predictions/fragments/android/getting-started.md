## Prerequisites

* [Install and configure the Amplify CLI](~/cli/start/install.md)

```bash
npm install -g @aws-amplify/cli
amplify configure
```

## Automated Configuration

The Amplify CLI helps you to create the appropriate IAM permissions to hit the AWS machine learning APIs. As part of the automated setup, the CLI helps you provision resources that leverage AWS AI/ML services.

To create a project with the Predictions category, run the following command:

1. Run `amplify init` command as shown:

```console
$ amplify init
? Enter a name for the project: AmplifyPredictions
? Enter a name for the environment: dev
? Choose your default editor: IntelliJ IDEA
? Choose the type of app that you're building: android
? Where is your Res directory: app/src/main/res
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use: default
```

2. Add auth `amplify add auth` and choose `Default configuration`, allow users to sign in with `Email` and do not configure `advanced settings`

3. Add predictions `amplify add predictions`
    * Choose `Convert`
    * Choose `Translate text into a different language`
    * Provide a friendly name for your resource: `transTextSample`
    * What is the source language? `English`
    * What is the target language? `Italian`
    * Who should have access? `Auth and Guest users`

4. Run `amplify push` to create the resources in the cloud.

When your backend is successfully updated, verify that `amplifyconfiguration.json` is properly updated inside the `res/raw` directory. Your new configuration file `amplifyconfiguration.json` will contain your default project `region` value as well as any necessary configuration options for each predictions method (i.e. target language and source language for translate, etc).

## Configure your application

Add the following dependencies to your **app**'s' `build.gradle` file and click "Sync Now" when prompted:

```groovy
dependencies {
    implementation 'com.amplifyframework:core:1.0.0'
    implementation 'com.amplifyframework:aws-predictions:1.0.0'
    implementation 'com.amazonaws:aws-android-sdk-mobile-client:2.16.+'
}
```

Add the following compile options in the same file to support the Java 8 features that Amplify uses:

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```

## Initialize Amplify

Add the following code to your `MainActivity#onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
    @Override
    public void onResult(UserStateDetails userStateDetails) {
        try {
            Amplify.addPlugin(new AWSPredictionsPlugin());
            Amplify.configure(getApplicationContext());
            Log.i("AmplifyQuickstart", "All set and ready to go!");
        } catch (Exception exception) {
            Log.e("AmplifyQuickstart", exception.getMessage(), exception);
        }
    }

    @Override
    public void onError(Exception exception) {
        Log.e(TAG, "Initialization error.", exception);
    }
});
```

## Working with the API

Here is an example of translating text. In order to override any choices you made in regards to target or source languages while adding this resource using the Amplify CLI, you can pass in them in directly as parameters as shown below.

```java
Amplify.Predictions.translateText(
        "I like to eat spaghetti",
        LanguageType.ENGLISH,
        LanguageType.SPANISH,
        result -> Log.i("AmplifyQuickstart", result.getTranslatedText()),
        error -> Log.e("AmplifyQuickstart", error.toString())
);
```

As a result of executing this code, you will see the following line printed to your console:

```
Me gusta comer espaguetis
```
