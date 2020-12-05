
👋 Welcome! In this tutorial, you will:

- Set up an Android application configured with Amplify
- Create a data model and persist data to Amplify DataStore
- Connect your local data to synchronize to a cloud backend

## Prerequisites

- Install [Android Studio](https://developer.android.com/studio/index.html#downloads) version 4.0 or higher
- Install the [Android SDK](https://developer.android.com/studio/releases/platforms) API level 29 (Android 10)
- Install [Amplify CLI](~/cli/cli.md) version 4.21.0 or later by running:

<amplify-block-switcher>

<amplify-block name="NPM">

```bash
npm install -g @aws-amplify/cli
```

</amplify-block>

<amplify-block name="cURL (Mac and Linux)">

```bash
curl -sL https://aws-amplify.github.io/amplify-cli/install | bash && $SHELL
```

</amplify-block>

<amplify-block name="cURL (Windows)">

```bash
curl -sL https://aws-amplify.github.io/amplify-cli/install-win -o install.cmd && install.cmd
```

</amplify-block>

</amplify-block-switcher>

## Set up your application

### Create a new Android application

1. Open **Android Studio**. Select **+ Start a new Android Studio project**.

    ![](~/images/lib/getting-started/android/set-up-android-studio-welcome.png)

1. In **Select a Project Template**, select **Empty Activity**. Press **Next**.

    ![](~/images/lib/getting-started/android/set-up-android-studio-select-project-template.png)

1. Next, configure your project:

    - Enter *Todo* in the **Name** field
    - Select either *Java* or *Kotlin* from the **Language** dropdown menu
    - Select *API 21: Android 5.0 (Lollipop)* from the **Minimum SDK** dropdown menu
    - Press **Finish**

  ![](~/images/lib/getting-started/android/set-up-android-studio-configure-your-project-todo.png)

Android Studio will open your project with a tab opened to either *MainActivity.java* or *MainActivity.kt* depending upon if you created a Java or Kotlin project respectively.

![](~/images/lib/getting-started/android/set-up-android-studio-successful-setup.png)

### Add Amplify to your application

Amplify for Android is distributed as an Apache Maven package. In this section, you'll add the packages and other required directives to your build configuration.

1. Expand **Gradle Scripts** in the project file viewer and open **build.gradle (Project: Todo)**.

  Make the following additions to the project-level `build.gradle` file:
  - Add the line `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.2'` within the `dependencies` block.
  - Add the line `apply plugin: 'com.amplifyframework.amplifytools'` at the end of the file.

  Your file should look like this:

  ```groovy
  buildscript {
      repositories {
          google()
          jcenter()
      }

      dependencies {
          classpath 'com.android.tools.build:gradle:4.0.1'

          // Add this line into `dependencies` in `buildscript`
          classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.2'
      }
  }

  allprojects {
      repositories {
          google()
          jcenter()
      }
  }

  // Add this line at the end of the file
  apply plugin: 'com.amplifyframework.amplifytools'
  ```

2. Under **Gradle Scripts**, open **build.gradle (Module: app)**.

   Update the `dependencies` block in your file with the following lines:

   ```groovy
   dependencies {
       implementation 'com.amplifyframework:aws-api:1.6.4'
       implementation 'com.amplifyframework:aws-datastore:1.6.4'
   }
   ```

3. Run **Gradle Sync**

    Android Studio requires you to sync your project with your new configuration. To do this, click **Sync Now** in the notification bar above the file editor.

    ![](~/images/lib/getting-started/android/set-up-android-studio-sync-gradle.png)

    When complete, you will see *CONFIGURE SUCCESSFUL* in the output in the *Build* tab at the bottom of your screen.

    ![](~/images/lib/getting-started/android/set-up-android-studio-configure-successful.png)

You are ready to start building with Amplify! 🎉
