Add the following dependencies to your **app** build.gradle file and click "Sync Now" when asked:

```groovy
dependencies {
    implementation 'com.amplifyframework:core:1.0.0'
    implementation 'com.amplifyframework:aws-datastore:1.0.0'
    implementation 'com.amplifyframework:aws-api:1.0.0'
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