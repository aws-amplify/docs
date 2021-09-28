Amplify for Android is distributed as Apache Maven packages. In this section, you'll add the packages and other required directives to your build configuration.

Under **Gradle Scripts**, open **build.gradle (Module: MyAmplifyApp)**.

Add the following lines:

```groovy
android {
    compileOptions {
        // Support for Java 8 features
        coreLibraryDesugaringEnabled true
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    // Amplify core dependency
    implementation 'com.amplifyframework:core:1.27.0'

    // Support for Java 8 features
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```

- Set `coreLibraryDesugaringEnabled`, `sourceCompatibility`, and `targetCompatibility` to allow your application to make use of Java 8 features like Lambda expressions
- Add Amplify Core and Desugaring libraries to the `dependencies` block

<amplify-callout>
Amplify Android supports API levels 16 and higher. If your are supporting a min SDK less than 21, follow <a href="https://developer.android.com/studio/build/multidex#mdex-pre-l">Android's documentation on adding multidex support</a>.
</amplify-callout>

Run **Gradle Sync**

Android Studio requires you to sync your project with your new configuration. To do this, click **Sync Now** in the notification bar above the file editor.

![](~/images/lib/getting-started/android/set-up-android-studio-sync-gradle.png)

When complete, you will see *CONFIGURE SUCCESSFUL* in the output in the *Build* tab at the bottom of your screen.

![](~/images/lib/getting-started/android/set-up-android-studio-configure-successful.png)
