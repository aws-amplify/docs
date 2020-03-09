## Step 1: Configure your app

You can use an existing Android app or create a new Android app using Java as per the steps in prerequisite section.

Modify your `project/build.gradle` with the following build dependency:

```groovy
classpath 'com.amazonaws:aws-android-sdk-appsync-gradle-plugin:2.9.+'
```

Next, add dependencies to your `app/build.gradle`, and then choose Sync Now on the upper-right side of Android Studio.

```groovy
apply plugin: 'com.amazonaws.appsync'

dependencies {
    //Base SDK
    implementation 'com.amazonaws:aws-android-sdk-core:2.15.+'
    //AppSync SDK
    implementation 'com.amazonaws:aws-android-sdk-appsync:2.8.+'
    implementation 'org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.2.0'
    implementation 'org.eclipse.paho:org.eclipse.paho.android.service:1.1.1'
}
```

Finally, update your AndroidManifest.xml with the following:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

        <!--other code-->

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">

        <service android:name="org.eclipse.paho.android.service.MqttService" />

        <!--other code-->
    </application>
```

**Build** your Android Studio project.

## Step 2: Initialize your project

In a terminal window, navigate to your project folder (the folder that typically contains your project level `build.gradle`) and run the following command (for this app, accepting all defaults is OK):

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify init        #accept defaults
```
An `awsconfiguration.json` file will be created with your configuration and updated as features get added to your project by the Amplify CLI. The file is placed in the `./app/src/main/res/raw` directory of your Android Studio project and automatically used by the SDKs at runtime.

**What is awsconfiguration.json?**

Rather than configuring each service through a constructor or constants file, the AWS SDKs for Android support configuration through a centralized file called `awsconfiguration.json` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your application code. On Android projects, the `awsconfiguration.json` will be placed into the `./app/src/main/res/raw` directory.

## Step 3: Add API and Database

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow  will ask you simple questions. If this is your first time using the CLI select **No** for the question "Do you have an annotated GraphQL schema". The CLI then guides you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. You can always change the schema as needed. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database. The CLI flow will look like below:

```bash
$ amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: todo
? Choose the default authorization type for the API: API key
? Enter a description for the API key: ToDo description
? After how many days from now the API key should expire (1-365): 180
? Do you want to configure advanced settings for the GraphQL API: No, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? No
```

## Step 4: Push changes

Create required backend resources for your configured API with the following command:

```bash
$ amplify push
```

Since you added an API the `amplify push` process will automatically enter the codegen process and prompt you for configuration. Accept the defaults which generate a `./app/src/main/graphql` folder structure with your statements.

Run a **Gradle Sync** and **Build** your app. The generated packages are automatically added to your project.
