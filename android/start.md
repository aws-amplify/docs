---
title: Getting Started
---

<br />

**Note**
Amplify Android is in preview mode and not intended for production usage at this time. We welcome feedback to improve your experience in using Amplify Android.
[Click here](../sdk/android/start) to access the Getting Started guide for Android SDK 2.0 docs.
{: .callout .callout--warning}

# Getting Started

Build an Android app using the Amplify Framework which contains:

- Amplify Tools - CLI toolchain for creating and managing your serverless backend.
- Android, iOS, and JavaScript libraries to access your resources using a category based programming model.
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue.

This page guides you through setting up a backend and integration into your Android app. You will create a "Note app" with a GraphQL API to store and retrieve items in a cloud database, as well as receive updates over a realtime subscription.

[GraphQL](http://graphql.org) is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites

* These steps currently only work on Mac. If you have a Windows machine, follow the steps on one of our categories such as [API here](./api).

* [Install Node](https://nodejs.org/en/)

* [Install Android Studio](https://developer.android.com/studio/index.html#downloads) version 3.1 or higher.

* [Install Android SDK with a minimum API level of 15 (Ice Cream Sandwich).](https://developer.android.com/studio/releases/platforms)

* This guide assumes that you are familiar with Android development and tools. If you are new to Android development, you can follow [these steps](https://developer.android.com/training/basics/firstapp/creating-project) to create your first Android application using Java.

* If you had previously installed Amplify CLI, update to the latest version by running:

```terminal
$ npm install -g @aws-amplify/cli
```

## Step 1: Configure your app
You can use an existing Android app or create a new Android app in Java as per the steps in prerequisite section.

a. Open your **project** `build.gradle` and add the following:
* `mavenCentral()` as a repository
* `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.0'` as a dependency
* A plugin `'com.amplifyframework.amplifytools'` as shown in the example below:

```gradle
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
        classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.1.0'
    }
}

apply plugin: 'com.amplifyframework.amplifytools'
```

b. Next, add the following dependencies to your **app** `build.gradle` and `compileOptions` to work with the Java 8 features used:

```gradle
android {
  compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}

dependencies {
  implementation 'com.amplifyframework:core:0.9.0'
  implementation 'com.amplifyframework:aws-api:0.9.0'
}
```

**Note**
If you get the following error message, "ERROR: Process 'command 'npx'' finished with non-zero exit value 1” this may be due to your user not having permissions to the node_modules folder on your machine. Follow the steps [at this link](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to resolve it.
{: .callout .callout--warning}

c. Run 'Make Project'

When the build is successful, it will add two gradle tasks to you project - `modelgen` and `amplifyPush` (these can be found in the dropdown menu which currently would display app if it's a new project, up where you would run your project)

## Step 2: Generate your Model files

a. Switch to **Project** view in Android Studio and open the schema file at `amplify/backend/api/amplifyDatasource/schema.graphql`.  
[Learn more](https://aws-amplify.github.io/docs/cli-toolchain/graphql) about annotating GraphQL schemas and data modeling.

In this guide, use the default schema included:

```
type Task @model {
    id: ID!
    title: String!
    description: String
    status: String
}
type Note @model {
    id: ID!
    content: String!
}
```

b. To generate the Java classes for these models, click the Gradle Task dropdown in the toolbar and select **modelgen** and run the task. Once it completes you should have generated Java classes under `app/src/main/java/com/amplifyframework.datastore.generated.model`.

## Step 3: Add API and Database

a. Run `amplify configure` in Terminal from the root of your application folder to set up Amplify with your AWS account.

    - Browser will pop up prompting you to sign in / create new account
    - Once done, return to terminal and press Enter
    - Choose a region
    - Choose a username (can use default)
    - Browser will popup again to finish creating that user - you can use all default properties.
    - Leave the page open on the finish step and return to Terminal
    - Press Enter
    - It will then ask you to enter the access key ID from the finish page of the browser. Make sure to backspace the default <ACCESS KEY ID> and paste in the key from the browser
    - Do the same for <YOUR SECRET ACCESS KEY> in the next step, pressing the “Show” link in the browser to reveal it
    - Hit Enter to go with default as the profile name

b. Click the Gradle Task dropdown in your Android Studio toolbar, select **amplifyPush**, and run the task.

Once this is successful, you will see three generated files:

* **amplifyconfiguration.json** and **awsconfiguration.json** under `src/main/res/raw`

Rather than configuring each service through a constructor or constants file, the Amplify Framework for Android supports configuration through centralized files called amplifyconfiguration.json and awsconfiguration.json which define all the regions and service endpoints to communicate. On Android projects these two files will be placed into the root directory.

You can also manually update them if you have existing AWS resources which you manage outside of the Amplify deployment process. Additionally, if you ever decide to run Amplify CLI commands from a terminal inside your Android Studio project these configurations will be automatically updated.

* **amplify-gradle-config.json** under the root directory: This file is used to configure modelgen and push to cloud actions.

c. After the deployment has completed you can open the `amplifyconfiguration.json` and you should see the `api` section containing your backend like the following:
```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "amplifyDatasource": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://<YOUR-GRAPHQL-ENDPOINT>.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "<YOUR API KEY>"
                }
            }
        }
    }
}
```

## Step 4: Integrate into your app

a. Initialize Amplify in your app's entry point, such as in the `onCreate` method of MainActivity:

```java
try {
    Amplify.addPlugin(new AWSApiPlugin());
    Amplify.configure(getApplicationContext());
    Log.i("AmplifyGetStarted", "Amplify is all setup and ready to go!");
} catch (AmplifyException exception) {
    Log.e("AmplifyGetStarted", exception.getMessage());
}
```

b. First add some data to your backend:

```java
Task task = Task.builder().title("My first task").description("Get started with Amplify").build();

Amplify.API.mutate(task, MutationType.CREATE, new ResultListener<GraphQLResponse<Task>>() {
    @Override
    public void onResult(GraphQLResponse<Task> taskGraphQLResponse) {
        Log.i("AmplifyGetStarted", "Added task with id: " + taskGraphQLResponse.getData().getId());
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e("AmplifyGetStarted", throwable.toString());
    }
});
```

c. Next query the results from your API:

```java
Amplify.API.query(Task.class, new ResultListener<GraphQLResponse<Iterable<Task>>>() {
    @Override
    public void onResult(GraphQLResponse<Iterable<Task>> iterableGraphQLResponse) {
        for(Task task : iterableGraphQLResponse.getData()) {
            Log.i("AmplifyGetStarted", "Task : " + task.getTitle());
        }
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e("AmplifyGetStarted", throwable.toString());
    }
});
```

d. Finally, you can listen to the Subscription with a `StreamListener` using the `onNext` callback:

```java
Amplify.API.subscribe(
    Task.class,
    SubscriptionType.ON_CREATE,
    new StreamListener<GraphQLResponse<Task>>() {
        @Override
        public void onNext(GraphQLResponse<Task> taskGraphQLResponse) {
            Log.i("AmplifyGetStarted", "Subscription detected a create: " +
                    taskGraphQLResponse.getData().getTitle());
        }

        @Override
        public void onComplete() {
            // Whatever you want it to do on completing
        }

        @Override
        public void onError(Throwable throwable) {
            Log.e("AmplifyGetStarted", throwable.toString());
        }
    }
);
```

**Testing your API**
You can open the AWS console for you to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

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
* [API](./api)
* [Analytics](./analytics)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `amplifyconfiguration.json` file in your code.

```json
{
  "UserAgent": "aws-amplify-cli/2.0",
  "Version": "1.0",
  "storage": {
    "plugins": {
      "awsS3StoragePlugin": {
         "bucket": "my-s3-bucket",
         "region": "us-west-2",
         "defaultAccessLevel": "guest"
      }
    }
  },
  "analytics": {
    "plugins": {
      "awsPinpointAnalyticsPlugin": {
        "pinpointAnalytics": {
          "appId": "xxxx123xxxx23423bf24234",
          "region": "us-east-1"
        },
        "pinpointTargeting": {
           "region": "us-east-1",
        }
      }
    }
  },
  "api": {
    "plugins": {
      "awsAPIPlugin": {
        "uniqueApiname123": {
          "endpoint": "http://api-gw-endpoint-1",
          "region": "us-east-1"
          "authorizationType": "AWS_IAM",
          "endpointType": "REST"
        },
        "graphqlEndpoint123UserPools": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AMAZON_COGNITO_USER_POOLS",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint234APIKEy": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "API_KEY",
          "apiKey": "apikey12sudksjdfnskjd",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint345IAM": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AWS_IAM",
          "endpointType": "GraphQL"
        }

      }
    }
  },
"predictions":{
  "plugins": {
     "awsPredictionsPlugin": {
        "identify": {
           "collectionId": "TestCollection",
           "region": "us-east-1",
           "maxEntities": 50
         },
        "convert": {
           "voiceId": "Ivy",
           "region": "us-east-1"
        }
      }
    }
  }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.
