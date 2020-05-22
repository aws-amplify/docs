Open your project `build.gradle` and add the following:

* `mavenCentral()` as a repository

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.5.0'
    }
}
```

Next add the following dependencies to your app `build.gradle`:

```groovy
implementation 'com.amplifyframework:core:0.10.0'
implementation 'com.amplifyframework:aws-analytics-pinpoint:0.10.0'
implementation 'com.amplifyframework:aws-auth-cognito:0.10.0'
```