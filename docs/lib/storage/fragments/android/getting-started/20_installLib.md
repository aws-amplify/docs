Expand **Gradle Scripts**, open **build.gradle (Module: app)**. You will already have configured Amplify by following the steps in the [Project Setup walkthrough](~/lib/project-setup/create-application.md).

Add these libraries into the `dependencies` block:
```groovy
dependencies {
    implementation 'com.amplifyframework:aws-storage-s3:1.6.4'
    implementation 'com.amplifyframework:aws-auth-cognito:1.6.4'
}
```

`aws-auth-cognito` is used to provide authentication for Amazon S3.

Click **Sync Now**.
