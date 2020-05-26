Add the following dependencies to your **app**'s' `build.gradle` file and click "Sync Now" when prompted:

```groovy
dependencies {
    implementation 'com.amplifyframework:core:1.0.0'
    implementation 'com.amplifyframework:aws-auth-cognito:1.0.0'
}
```

Add the following compile options in the same file to support the Java 8 features that Amplify uses:

```groovy
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```
