### Step 2: Install Amplify Libraries via Gradle

Amplify for Android is distribued as an Apache Maven package. In this section, you'll add the packages and other required directives to your build configuration.

Expand **Gradle Scripts** and open **build.gradle (Project: Todo)**. Add the following lines:

 - Add the line `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'` within the `dependencies` block
 - Add the line  `plugin 'com.amplifyframework.amplifytools'` at the end of the file 

```groovy
buildscript {
    ...
    dependencies {
        classpath 'com.android.tools.build:gradle:3.6.3'
        classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'
    }
}

apply plugin: 'com.amplifyframework.amplifytools'
```

This configuration adds helpers to your IDE to allow easy generation and deployment of Amplify files and resources.

Under **Gradle Scripts**, open **build.gradle (Module: app)**. Add the following lines:

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

Run **Gradle Sync**

Android Studio requires you to sync your project with your new configuration. To do this, click **Sync Now** in the notification bar above the file editor.

[TODO: Add image]

When complete, you will see *CONFIGURE SUCCESSFUL* in the output in the *Build* tab at the bottom of your screen.
    
[TODO: Add image]