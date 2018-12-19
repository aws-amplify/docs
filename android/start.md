---
title: Getting Started
---
# Getting Started

Build an Android app using the AWS Amplify CLI and the AWS SDK for Android. The Amplify CLI lets you quickly add backend features to your application so that you can focus on your application code. This page guides you through setting up an initial backend and integration into your app. 

## Prerequisites

[Install and configure the Amplify CLI](..)

[Install Android Studio](https://developer.android.com/studio/index.html#downloads) version 3.1 or higher. Install Android SDK for API level 28 (Android 9.0).


## Step 1: Create a new app

Follow [these steps](https://developer.android.com/training/basics/firstapp/creating-project) to create an Android Studio application using Java. Modify your `project/build.gradle` with the following build dependency:

```groovy
classpath 'com.amazonaws:aws-android-sdk-appsync-gradle-plugin:2.6.+'
```

Next, add dependencies to your `app/build.gradle`, and then choose Sync Now on the upper-right side of Android Studio.

```groovy
apply plugin: 'com.amazonaws.appsync'

dependencies {
    //Base SDK
    implementation 'com.amazonaws:aws-android-sdk-core:2.9.+'
    //AppSync SDK
    implementation 'com.amazonaws:aws-android-sdk-appsync:2.6.+'
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

**Build your Android Studio project**.

## Step 2: Set Up Your Backend

Create new AWS backend resources and pull the AWS services configuration into the app. In a terminal window, navigate to your project folder (the folder that typically contains your project level `build.gradle`), and run the following command (for this app, accepting all defaults is OK):

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify init        #accept defaults
$ amplify push        #creates configuration file
```

An `awsconfiguration.json` file will be created with your configuration and updated as features get added to your project by the Amplify CLI. The file is placed in the `./app/src/main/res/raw` directory of your Android Studio project and automatically used by the SDKs at runtime.

## Step 3: How it Works

Rather than configuring each service through a constructor or constants file, the AWS SDKs for Android support configuration through a centralized file called `awsconfiguration.json` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your application code. On Android projects the `awsconfiguration.json` will be placed into the `./app/src/main/res/raw` directory.

To verify that the CLI is set up for your app, run the following command.

```bash
  $ amplify status
  | Category | Resource name | Operation | Provider plugin |
  | -------- | ------------- | --------- | --------------- |
```

The CLI displays a status table with no resources listed. As you add feature categories to your app and run `amplify push`, backend resources created for your app are listed in this table.

## Step 4: Add API and Database

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow above will ask you some questions, like if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. Later on you can always change it. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database.

Since you added an API the `amplify push` process will automatically enter the codegen process and prompt you for configuration. Accept the defaults which generate a `./app/src/main/graphql` folder structure with your statements. Run a **Gradle Sync** and **Build** your app, at which point the generated packages are automatically added to your project.

## Step 5: Integrate into your app

Initialize the AppSync client inside your application code, such as the `onCreate()` lifecycle method of your activity class:

```java
private AWSAppSyncClient mAWSAppSyncClient;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mAWSAppSyncClient = AWSAppSyncClient.builder()
        .context(getApplicationContext())
        .awsConfiguration(new AWSConfiguration(getApplicationContext()))
        .build();
}
```

You can now add data to your database with a mutation:

```java
    public void runMutation(){
        CreateTodoInput createTodoInput = CreateTodoInput.builder().
            name("Use AppSync").
            description("Realtime and Offline").
            build();

        mAWSAppSyncClient.mutate(CreateTodoMutation.builder().input(createTodoInput).build())
            .enqueue(mutationCallback);
    }

    private GraphQLCall.Callback<CreateTodoMutation.Data> mutationCallback = new GraphQLCall.Callback<CreateTodoMutation.Data>() {
        @Override
        public void onResponse(@Nonnull Response<CreateTodoMutation.Data> response) {
            Log.i("Results", "Added Todo");
        }

        @Override
        public void onFailure(@Nonnull ApolloException e) {
            Log.e("Error", e.toString());
        }
    };
```

Next, query the data:

```java
    public void runQuery(){
        mAWSAppSyncClient.query(ListTodosQuery.builder().build())
                .responseFetcher(AppSyncResponseFetchers.CACHE_AND_NETWORK)
                .enqueue(todosCallback);
    }

    private GraphQLCall.Callback<ListTodosQuery.Data> todosCallback = new GraphQLCall.Callback<ListTodosQuery.Data>() {
        @Override
        public void onResponse(@Nonnull Response<ListTodosQuery.Data> response) {
            Log.i("Results", response.data().listTodos().items().toString());
        }

        @Override
        public void onFailure(@Nonnull ApolloException e) {
            Log.e("ERROR", e.toString());
        }
    };
```

You can also setup realtime subscriptions to data:

```java
    private AppSyncSubscriptionCall subscriptionWatcher;

    private void subscribe(){
        OnCreateTodoSubscription subscription = OnCreateTodoSubscription.builder().build();
        subscriptionWatcher = mAWSAppSyncClient.subscribe(subscription);
        subscriptionWatcher.execute(subCallback);
    }

    private AppSyncSubscriptionCall.Callback subCallback = new AppSyncSubscriptionCall.Callback() {
        @Override
        public void onResponse(@Nonnull Response response) {
            Log.i("Response", response.data().toString());
        }

        @Override
        public void onFailure(@Nonnull ApolloException e) {
            Log.e("Error", e.toString());
        }

        @Override
        public void onCompleted() {
            Log.i("Completed", "Subscription completed");
        }
    };
```

Call the `runMutation()`, `runQuery()`, and `subscribe()` methods from your app code, such as from a button click or when your app starts in `onCreate()`. You will see data being stored and retrieved in your backend from the Android Studio console. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Next Steps

🎉 Congratulations! Your app is built, with a realtime backend using AWS AppSync.

What next? Here are some things to add to your app:


* [Authentication](./authentication)
* [Storage](./storage)
* [Serverless APIs](./api)
* [Analytics](./analytics)
* [Push Notification](./push-notifications)
* [Messaging](./messaging)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `awsconfiguration.json` file in your code. For example, if you were using Amazon Cognito Identity, Cognito User Pools, AWS AppSync, or Amazon S3:

```xml
{
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",
                "Region": "XX-XXXX-X"
            }
        }
    },
    "CognitoUserPool": {
        "Default": {
            "PoolId": "XX-XXXX-X_abcd1234",
            "AppClientId": "XXXXXXXX",
            "AppClientSecret": "XXXXXXXXX",
            "Region": "XX-XXXX-X"
        }
    },
    "AppSync": {
        "Default": {
            "ApiUrl": "https://XXXXXX.appsync-api.XX-XXXX-X.amazonaws.com/graphql",
            "Region": "XX-XXXX-X",
            "AuthMode": "AMAZON_COGNITO_USER_POOLS"
        }
    },
    "S3TransferUtility": {
        "Default": {
            "Bucket": "BUCKET_NAME",
            "Region": "XX-XXXX-X"
        }
    }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.

**AWS SDK Interfaces**

For working with other AWS services you can use service interface objects directly via the generated SDK clients. 

To work with service interface objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.
{: .callout .callout--warning}

You can call methods on any AWS Service interface object supported by the AWS Android SDK by passing your credentials from the AWSMobileClient to the service call constructor. See [Manual SDK Setup](./manualsetup) for more information.
