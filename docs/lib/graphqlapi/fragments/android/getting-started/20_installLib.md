<!--TODO Update AWSmobile Client -> Auth -->
Add the following dependencies to your **app** build.gradle file and click "Sync Now" when asked:

```groovy
dependencies {
    implementation 'com.amplifyframework:core:0.10.0'
    implementation 'com.amplifyframework:aws-api:0.10.0'
}
```

Also at the top of the same file, add this piece of code to support the Java 8 features Amplify uses:

```groovy
android {
  compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```