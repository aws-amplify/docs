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
implementation 'com.amplifyframework:core:1.0.0'
implementation 'com.amplifyframework:aws-analytics-pinpoint:1.0.0'
implementation 'com.amplifyframework:aws-auth-cognito:1.0.0'
```