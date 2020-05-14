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

When your backend is successfully updated, verify that `amplifyconfiguration.json` and `awsconfiguration.json` are properly updated inside the `res/raw` directory. Your new configuration file `amplifyconfiguration.json` will contain your default project `region` value as well as any necessary configuration options for each predictions method (i.e. target language and source language for translate, etc).


## Manual Configuration

If you have already created the resources in the cloud and would like to take advantage of those existing resources but still use the Amplify library in Android Studio, please follow the directions below:

Create the file `amplifyconfiguration.json`:
```
touch amplifyconfiguration.json
```

Copy the contents over and update the values for the specific predictions method you are looking to use:
```
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "Predictions": {
        "plugins": {
            "awsPredictionsPlugin": {
                "defaultRegion": "us-west-2",
                 "identify": {
                    "identifyText": {
                        "format": "ALL",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    },
                    "identifyEntities": {
                        "maxEntities": "0",
                        "celebrityDetectionEnabled": "true",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    },
                    "identifyLabels": {
                        "region": "us-west-2",
                        "type": "LABELS",
                        "defaultNetworkPolicy": "auto"
                    }
                },
                "convert": {
                    "translateText": {
                        "targetLang": "zh",
                        "sourceLang": "en",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    },
                    "speechGenerator": {
                        "voice": "Salli",
                        "language": "en-US",
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    }
                },
                "interpret": {
                    "interpretText": {
                        "region": "us-west-2",
                        "defaultNetworkPolicy": "auto"
                    }
                }
            }
        }
    }
}
```
Add both the `amplifyconfiguration.json` and the `awsconfiguration.json` to your project inside the `res/raw` directory.

## Configure your application

Add the following dependencies to your **app**'s' `build.gradle` file and click "Sync Now" when prompted:

```gradle
dependencies {
    implementation 'com.amplifyframework:core:0.10.0'
    implementation 'com.amplifyframework:aws-predictions:0.10.0'
    implementation 'com.amazonaws:aws-android-sdk-mobile-client:2.16.+'
}
```

Add the following compile options in the same file to support the Java 8 features that Amplify uses:

```gradle
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
            Log.i("PredictionsQuickstart", "All set and ready to go!");
        } catch (Exception exception) {
            Log.e("PredictionsQuickstart", exception.getMessage(), exception);
        }
    }

    @Override
    public void onError(Exception exception) {
        Log.e("PredictionsQuickstart", "Initialization error.", exception);
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
        result -> Log.i("PredictionsQuickstart", result.getTranslatedText()),
        error -> Log.e("PredictionsQuickstart", error.toString())
);
```

As a result of executing this code, this you should see the following printed to your console:
```
Me gusta comer espaguetis
```
