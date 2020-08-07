Add the following dependencies to your **app** build.gradle file and click "Sync Now" when asked:

```groovy
dependencies {
    implementation 'com.amplifyframework:core:1.1.2'
    implementation 'com.amplifyframework:aws-datastore:1.1.2'
}
```

At the top of the same file, add `compileOptions` to support the Java 8 features used by Amplify:

```groovy
android {
  compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}
```
