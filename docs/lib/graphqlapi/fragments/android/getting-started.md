> ### Prerequisites
> * An [Android project](https://developer.android.com/training/basics/firstapp/creating-project) targeting Android API level 16 (Android 4.1) or above
> * [Install and configure](~/cli/start/install.md) the Amplify CLI

## GraphQL API with Amplify

The Amplify API category provides a solution for making HTTP requests to REST and GraphQL endpoints.  For GraphQL, it supports [AWS AppSync](https://aws.amazon.com/appsync/).

## Create GraphQL API service

Run the following command in your project's root folder:

```bash
amplify add api
```

```console
? Please select from one of the below mentioned services: `GraphQL`
? Provide API name: `apiName`
? Choose the default authorization type for the API: `API key`
? Enter a description for the API key:
? After how many days from now the API key should expire (1-365): `30`
? Do you want to configure advanced settings for the GraphQL API `No, I am done.`
? Do you have an annotated GraphQL schema? `No`
? Choose a schema template: `One-to-many relationship (e.g., "Blogs" with "Posts" and "Comments")`
? Do you want to edit the schema now? `No`
```

This will create the following schema for us to get started with:
```graphql
type Blog @model {
  id: ID!
  name: String!
  posts: [Post] @connection(name: "BlogPosts")
}

type Post @model {
  id: ID!
  title: String!
  blog: Blog @connection(name: "BlogPosts")
  comments: [Comment] @connection(name: "PostComments")
}

type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

To deploy the API, you can use the Amplify `push` command:

```bash
amplify push
```

```console
? Are you sure you want to continue? `Yes`
? Do you want to generate code for your newly created GraphQL API `No`
```

When your backend is successfully provisioned, there should be two new generated files : `amplifyconfiguration.json` and `awsconfiguration.json` in your `app/src/main/res/raw` directory.

To view the deployed services in your project at any time, go to Amplify Console by running the following command:

```bash
amplify console
```

Generate the Java models to easily perform operations on your schema with the following command:

```console
$ amplify codegen models

The following types do not have '@auth' enabled. Consider using @auth with @model
     - Blog
     - Post
     - Comment
Learn more about [@auth here](~/cli/graphql-transformer/auth.md).


GraphQL schema compiled successfully.
```

This will generate the Model files to be used with `Amplify.API` to query, mutate, and subscribe to your AppSync endpoint. After build completes, the model files will be generated under `app/src/main/java/com/amplifyframework.datastore.generated.model`.

Note: You will see import errors in these files until performing the next steps below.

## Configure your application

Open your **project** `build.gradle` and add `mavenCentral()` as a repository:

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
}
```

Next, add the following dependencies to your **app** `build.gradle`:

```groovy
dependencies {
  implementation 'com.amplifyframework:aws-api:1.27.0'

  // Support for Java 8 features
  coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```
Also in your **app** `build.gradle`, add this piece of code to support the Java 8 features Amplify uses:

```groovy
android {
  compileOptions {
    // Support for Java 8 features
    coreLibraryDesugaringEnabled true
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
  }
}
```

Sync the project with Maven and ensure it builds successfully.

### (Optional) Add Gradle Plugin to auto generate models

If you would like your models to easily update both locally and on the server when you make changes to your schema, follow these steps to install our Gradle Plugin which automates the whole process on build:

1 - Add the following dependencies to your **project** `build.gradle`:

* `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.2'` as a dependency
* A plugin of `'com.amplifyframework.amplifytools'` as in the example below:

```groovy
buildscript {
  dependencies {
      classpath 'com.android.tools.build:gradle:4.1.2'
      classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.2'
  }
}

apply plugin: 'com.amplifyframework.amplifytools'
```

2 - Run 'Make Project'

When the build is successful, it adds two gradle tasks to you project - `modelgen` and `amplifyPush`. These can be found in the configuration dropdown menu which currently would display app if it's a new project, up where you would run your project. Whenever you update your schema (found at `amplify/backend/api/amplifyDatasource/schema.graphql`) run the `modelgen` task followed by `amplifyPush` to update your online resources and local Java models.

## Initialize Amplify

Add the following imports at the top of your MainActivity and code at the bottom of the `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
import com.amplifyframework.AmplifyException;
import com.amplifyframework.api.aws.AWSApiPlugin;
import com.amplifyframework.core.Amplify;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        try {
            Amplify.addPlugin(new AWSApiPlugin());
            Amplify.configure(getApplicationContext());
            Log.i("ApiQuickstart", "All set and ready to go!");
        } catch (AmplifyException exception) {
            Log.e("ApiQuickstart", exception.getMessage(), exception);
        }
    }    
}
```


### Summary

Now you should be able to build and run your Android application and see "All set and ready to go!" in logcat.

In this example, you setup a GraphQL API using the Amplify CLI, autogenerated Java Model classes from the API schema, and integrated it into your Android application.
