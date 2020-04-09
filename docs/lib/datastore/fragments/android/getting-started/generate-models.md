## Using Gradle

Open your project `build.gradle` and add `mavenCentral()` as a repository, `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'` as a dependency, and `'com.amplifyframework.amplifytools'` as a plugin:

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.6.2'
        classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'
    }
}

apply plugin: 'com.amplifyframework.amplifytools'
```

Next, add the following dependencies to your app `build.gradle`:

```groovy
implementation 'com.amplifyframework:core:0.10.0'
implementation 'com.amplifyframework:aws-api:0.10.0' // If using cloud sync
implementation 'com.amplifyframework:aws-datastore:0.10.0'
```

Sync the project and ensure that it built successfully. Switch to the **Project** view in Android Studio and open the schema file at `amplify/backend/api/amplifyDatasource/schema.graphql`. For this guide, edit this file so that it contains the schema definition below.  [Learn more](https://docs.amplify.aws/cli/graphql-transformer/overview) about annotating GraphQL schemas and data modeling.

## Manual Model Generation

If you do not wish to use the above Gradle task, you can perform the same steps manually. First, install the latest version of the Amplify CLI:

```
npm i -g @aws-amplify/cli@latest
```

Generate models at any time by executing this Amplify CLI command:

```
amplify codegen models
```
