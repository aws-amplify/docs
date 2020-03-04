
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

* If you had previously installed Amplify CLI (< 4.5.0), update to the latest version by running:

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
        classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'
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
  implementation 'com.amplifyframework:core:0.9.1'
  implementation 'com.amplifyframework:aws-api:0.9.1'
}
```

c. Run 'Make Project'

When the build is successful, it will add two gradle tasks to you project - `modelgen` and `amplifyPush` (these can be found in the dropdown menu which currently would display app if it's a new project, up where you would run your project)

**Note**
If you get the following error message: "ERROR: Process 'command 'npx'' finished with non-zero exit value 1”, this may be due to the logged in user on your machine having insufficient permissions to access the node_modules folder on your machine. Follow the steps [at this link](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to resolve it.
{: .callout .callout--warning}