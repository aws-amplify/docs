
👋 Welcome! In this tutorial, you will:

- Set up an Android application configured with Amplify
- Create a data model and perist data to Amplify DataStore
- Connect your local data to synchronize to a cloud backend

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 10 or higher
- Install [Android Studio](https://developer.android.com/studio/index.html#downloads) version 3.6 or higher
- Install the [Android SDK](https://developer.android.com/studio/releases/platforms) API level 16 (Jelly Bean) or higher
- Install the latest version of the [Amplify CLI](~/cli/cli.md) by running:

    ```bash
    npm install -g @aws-amplify/cli
    ```

## Set up your application

### Create a new Android application

1. Open **Android Studio**. Select **+ Start a new Android Studio project**.

    ![](~/images/lib/getting-started/android/set-up-android-studio-welcome.png)

1. In **Select a Project Template**, select **Empty Activity**. Press **Next**.

    ![](~/images/lib/getting-started/android/set-up-android-studio-select-project-template.png)

1. Next, configure your project:

    - Enter *Todo* in the **Name** field
    - Select either *Java* or *Kotlin* from the **Language** dropdown menu
    - Select *API 16: Android 4.1 (Jelly Bean)* from the **Minimum SDK** dropdown menu
    - Press **Finish**

  ![](~/images/lib/getting-started/android/set-up-android-studio-configure-your-project.png)

Android Studio will open your project with a tab opened to either *MainActivity.java* or *MainActivity.kt* depending upon if you created a Java or Kotlin project respectively.

![](~/images/lib/getting-started/android/set-up-android-studio-successful-setup.png)

### Add Amplify to your application

Amplify for Android is distribued as an Apache Maven package. In this section, you'll add the packages and other required directives to your build configuration.

1. Expand **Gradle Scripts** and open **build.gradle (Project: Todo)**. Add the following lines:

    - Add the line `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.0'` within the `dependencies` block
    - Add the line  `plugin 'com.amplifyframework.amplifytools'` at the end of the file 
    - Add the line `mavenCentral()` within the `repositories` block which is within the `allprojects` block

    ```groovy
    buildscript {
        ...

        dependencies {
            classpath 'com.android.tools.build:gradle:3.6.3'
            classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.0'
        }
    }

    allprojects {
        repositories {
            google()
            jcenter()
            mavenCentral()
        }
    }

    apply plugin: 'com.amplifyframework.amplifytools'
    ```

    This configuration adds helpers to your IDE to allow easy generation and deployment of Amplify files and resources.

1. Under **Gradle Scripts**, open **build.gradle (Module: app)**. Add the following lines:

    - `sourceCompatibility` and `targetCompatibility` to Java 1.8 which allows your application to make use of Java 8 features like Lambda expressions
    - Add Amplify Core, API, and DataStore libraries in the `dependencies` block

    ```groovy
    android {
        ...

        compileOptions {
            sourceCompatibility JavaVersion.VERSION_1_8
            targetCompatibility JavaVersion.VERSION_1_8
        }
    }

    dependencies {
        ...

        implementation 'com.amplifyframework:core:1.0.0'
        implementation 'com.amplifyframework:aws-datastore:1.0.0'
        implementation 'com.amplifyframework:aws-api:1.0.0'
    }
    ```

1. Run **Gradle Sync**

    Android Studio requires you to sync your project with your new configuration. To do this, click **Sync Now** in the notification bar above the file editor.

    ![](~/images/lib/getting-started/android/set-up-android-studio-sync-gradle.png)

    When complete, you will see *CONFIGURE SUCCESSFUL* in the output in the *Build* tab at the bottom of your screen.
    
    ![](~/images/lib/getting-started/android/set-up-android-studio-configure-successful.png)
    
You are ready to start building with Amplify! 🎉