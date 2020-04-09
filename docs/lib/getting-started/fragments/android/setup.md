Build an Android app using the Amplify Framework. The Amplify Framework includes:

- Amplify Tools - CLI toolchain for creating and managing your serverless backend.
- Android, iOS, and JavaScript libraries to access your resources using a category based programming model.
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue.  

<br />

This page guides you through setting up a backend and integrating Amplify into your Android app. You will create a "Note app" with a GraphQL API to store and retrieve items in a cloud database. The app will also receive updates over a realtime subscription.

[GraphQL](http://graphql.org) is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites

* These steps currently only work on Mac. If you have a Windows machine, follow the steps on one of our categories such as [API here](~/lib/graphqlapi/getting-started.md).

* [Install Node](https://nodejs.org/en/)

* [Install Android Studio](https://developer.android.com/studio/index.html#downloads) version 3.6 or higher.

* [Install Android SDK with a minimum API level of 16 (Jelly Bean).](https://developer.android.com/studio/releases/platforms)

* This guide assumes that you are familiar with Android development and tools. If you are new to Android development, you can follow [these steps](https://developer.android.com/training/basics/firstapp/creating-project) to create your first Android application using Java.

* Install the latest version of the Amplify CLI by running:

```terminal
$ npm install -g @aws-amplify/cli
```

## Step 1: Configure your app
You can use an existing Android app or create a new one by following [these steps](https://developer.android.com/training/basics/firstapp/creating-project).

a. Open your **project** `build.gradle` and add the following:
* `mavenCentral()` as a repository
* `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'` as a dependency
* A plugin `'com.amplifyframework.amplifytools'` as shown in the example below:

```gradle
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.6.1'
        classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'
    }
}

apply plugin: 'com.amplifyframework.amplifytools'
```

b. Next, add the following dependencies to your **app** `build.gradle`. Note the declaration of `compileOptions`, to make use of Java 8 features like Lambda Expressions.

```gradle
android {
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}

dependencies {
    implementation 'com.amplifyframework:core:0.10.0'
    implementation 'com.amplifyframework:aws-api:0.10.0'
}
```

c. Run 'Make Project'

When the build is successful, it will add two Gradle tasks to you project - `modelgen` and `amplifyPush`. (In the Android Studio UI, these tasks can be found in the top bar, up where you would run your project. Look for a drop-down menu displaying the word "app", if it's a new project.)

<amplify-callout warning>

**Note:**
If you get the following error message: "ERROR: Process 'command 'npx'' finished with non-zero exit value 1”, this may be due to the logged in user on your machine having insufficient permissions to access the node_modules folder on your machine. Follow the steps [at this link](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) to resolve it.

</amplify-callout>
