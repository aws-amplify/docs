You can integrate with Amplify framework using the following steps:

1. Setup the API endpoint and authentication information in the client side configuration.
2. Generate Java Model classes from the API schema.
3. Write app code to run queries, mutations and subscriptions.

## Set up your backend

**Prerequisites:**
* An Android project targeting at least Android API 15 (Ice Cream Sandwich).
* Install and configure the Amplify CLI

```bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning AppSync backend with API category.

1 - Run `amplify init` command as shown:

```perl
$ amplify init
? Enter a name for the project `AmplifyAPI`
? Enter a name for the environment `dev`
? Choose your default editor: `Visual Studio Code`
? Choose the type of app that you are building `android`
Please tell us about your project
? Where is your Res directory:  `app/src/main/res`
? Do you want to use an AWS profile? `Yes`
? Please choose the profile you want to use `default`
```

2 - Add API `amplify add api`. Here is an example:

```perl
? Please select from one of the below mentioned services: `GraphQL`
? Provide API name: `apiName`
? Choose the default authorization type for the API `API key`
? Enter a description for the API key:
? After how many days from now the API key should expire (1-365): `30`
? Do you want to configure advanced settings for the GraphQL API `No, I am done.`
? Do you have an annotated GraphQL schema? `No`
? Do you want a guided schema creation? `Yes`
? What best describes your project: `One-to-many relationship (e.g., "Blogs" with "Posts" and "Comments")`
? Do you want to edit the schema now? `No`
```

This will create the following schema for us to get started with:
```ruby
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

3 - Provision the backend with `amplify push`:
```perl
? Are you sure you want to continue? `Yes`
? Do you want to generate code for your newly created GraphQL API `No`
```

The example above creates a backend with the types in the schema. You can open the AWS Console for AppSync with
`amplify console api` to interact directly with the GraphQL service.  When your backend is successfully updated, there should be two files: `amplifyconfiguration.json` and `awsconfiguration.json` in your `app/src/main/res/raw` folder.

4 - Generate the Java models to easily perform operations on your schema with `amplify codegen models`.

```bash
The following types do not have '@auth' enabled. Consider using @auth with @model
     - Blog
     - Post
     - Comment
Learn more about @auth here: https://aws-amplify.github.io/docs/cli-toolchain/graphql#auth


GraphQL schema compiled successfully.
```

This will generate the Model files to be used with `Amplify.API` to query, mutate, and subscribe to your AppSync endpoint. After build completes, the model files will be generated under `app/src/main/java/com/amplifyframework.datastore.generated.model`.

Note: You will see import errors in these files until performing the next steps below.

## Install Amplify libraries and tools

Open your **project** `build.gradle` and add `mavenCentral()` as a repository

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
}
```

Next, add the following dependencies to your **app** `build.gradle` and `compileOptions` to work with the Java 8 features used:

```groovy
android {
  compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}

dependencies {
  implementation 'com.amplifyframework:core:0.10.0'
  implementation 'com.amplifyframework:aws-api:0.10.0'
}
```

Sync the project with Maven and ensure it builds successfully.

### (Optional) Add Gradle Plugin to auto generate models

If you would like your models to easily update both locally and on the server when you make changes to your schema, follow these steps to install our Gradle Plugin which automates the whole process on build:

1 - Add the following dependencies to your **project** `build.gradle`:

* `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.0'` as a dependency
* A plugin of `'com.amplifyframework.amplifytools'` as in the example below:

```groovy
buildscript {
  dependencies {
      classpath 'com.android.tools.build:gradle:3.5.0'
      classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.1'
  }
}

apply plugin: 'com.amplifyframework.amplifytools'
```

2 - Run 'Make Project'

When the build is successful, it adds two gradle tasks to you project - `modelgen` and `amplifyPush`. These can be found in the configuration dropdown menu which currently would display app if it's a new project, up where you would run your project. Whenever you update your schema (found at `amplify/backend/api/amplifyDatasource/schema.graphql`) run the `modelgen` task followed by `amplifyPush` to update your online resources and local Java models.

## Initialize Amplify

Add the following imports at the top of your MainActivity and code at the bottom of the `onCreate` method (ideally this would go in your Application class but this works for getting started quickly):

```java
import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobile.client.Callback;
import com.amazonaws.mobile.client.UserStateDetails;
import com.amplifyframework.api.aws.AWSApiPlugin;
import com.amplifyframework.core.Amplify;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        AWSMobileClient.getInstance().initialize(getApplicationContext(), new Callback<UserStateDetails>() {
            @Override
            public void onResult(UserStateDetails userStateDetails) {
                try {
                    Amplify.addPlugin(new AWSApiPlugin());
                    Amplify.configure(getApplicationContext());
                    Log.i("ApiQuickstart", "All set and ready to go!");
                } catch (Exception exception) {
                    Log.e("ApiQuickstart", exception.getMessage(), exception);
                }
            }
            @Override
            public void onError(Exception exception) {
                Log.e("ApiQuickstart", "Initialization error.", exception);
            }
        });
    }    
}
```