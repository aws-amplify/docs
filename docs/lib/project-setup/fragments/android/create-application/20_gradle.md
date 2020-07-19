Amplify for Android is distributed as Apache Maven packages. In this section, you'll add the packages and other required directives to your build configuration.

Expand **Gradle Scripts** and open **build.gradle (Project: MyAmplifyApp)**.

Add the following lines:

```groovy
buildscript {
    repositories {
        google()
        jcenter()

        // Add this line into `repositories` in `buildscript`
        mavenCentral()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:4.0.0'
    }
}

allprojects {
    repositories {
        google()
        jcenter()

        // Add this line into `repositories` in `allprojects`
        mavenCentral()
    }
}
```

- Add the line `mavenCentral()` within the `repositories` block in the `buildscript` and `allprojects` blocks

This configuration adds helpers to your IDE to allow easy generation and deployment of Amplify files and resources.

Under **Gradle Scripts**, open **build.gradle (Module: MyAmplifyApp)**.

Add the following lines:

```groovy
android {
    // Add these lines in `android`
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    // Add line in `dependencies`
    implementation 'com.amplifyframework:core:1.0.0'
}
```

- Set `sourceCompatibility` and `targetCompatibility` to Java 1.8 which allows your application to make use of Java 8 features like Lambda expressions
- Add the Amplify Core library in the `dependencies` block

Run **Gradle Sync**

Android Studio requires you to sync your project with your new configuration. To do this, click **Sync Now** in the notification bar above the file editor.

![](~/images/lib/getting-started/android/set-up-android-studio-sync-gradle.png)

When complete, you will see *CONFIGURE SUCCESSFUL* in the output in the *Build* tab at the bottom of your screen.

![](~/images/lib/getting-started/android/set-up-android-studio-configure-successful.png)
