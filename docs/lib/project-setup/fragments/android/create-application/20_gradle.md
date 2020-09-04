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
        classpath 'com.android.tools.build:gradle:4.0.1'
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
    defaultConfig {
        // Enable multidex support (if supporting min SDK < 21)
        multiDexEnabled true
    }

    compileOptions {
        // Support for Java 8 features
        coreLibraryDesugaringEnabled true
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    // Amplify core dependency
    implementation 'com.amplifyframework:core:1.3.1'

    // Multidex dependency (if supporting min SDK < 21)
    implementation 'androidx.multidex:multidex:2.0.1'

    // Support for Java 8 features
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.0.10'
}
```

- If supporting a min SDK less than 21, add `multiDexEnabled true` to the defaultConfig block to support desugaring
- Set `coreLibraryDesugaringEnabled`, `sourceCompatibility`, and `targetCompatibility` to allow your application to make use of Java 8 features like Lambda expressions
- Add the Amplify Core, Multidex, and Desugaring libraries to the `dependencies` block

Run **Gradle Sync**

Android Studio requires you to sync your project with your new configuration. To do this, click **Sync Now** in the notification bar above the file editor.

![](~/images/lib/getting-started/android/set-up-android-studio-sync-gradle.png)

When complete, you will see *CONFIGURE SUCCESSFUL* in the output in the *Build* tab at the bottom of your screen.

![](~/images/lib/getting-started/android/set-up-android-studio-configure-successful.png)
