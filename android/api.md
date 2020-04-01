---
canonical_url: https://docs.amplify.aws/lib/graphqlapi/getting-started?platform=android
---
<br />

**Note**
This guide shows how to build an app using our Amplify Libraries for Android (Preview) and the Amplify CLI toolchain.
To use the existing AWS Mobile SDK for Android instead, [click here.](../sdk/android/start)
{: .callout .callout--warning}
# API

The API category provides a solution for making HTTP requests to REST and GraphQL endpoints.

## GraphQL

AWS AppSync helps you build data-driven apps with real-time capabilities. The [Amplify API Plugin](https://github.com/aws-amplify/amplify-android) enables you to integrate your app with the AWS AppSync service. The framework supports multiple authorization models, handles subscription handshake protocols for real-time updates to data, and allows you to easily mutate and query your date using auto-generated Java model classes.

You can integrate with Amplify framework using the following steps:

1. Setup the API endpoint and authentication information in the client side configuration.
2. Generate Java Model classes from the API schema.
3. Write app code to run queries, mutations and subscriptions.

### Set up your backend

**Prerequisites:**
* An Android project targeting at least Android API 15 (Ice Cream Sandwich).
* Install and configure the Amplify CLI

```terminal
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
? What best describes your project: `One-to-many relationship (e.g., “Blogs” with “Posts” and “Comments”)`
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

```terminal
The following types do not have '@auth' enabled. Consider using @auth with @model
	 - Blog
	 - Post
	 - Comment
Learn more about @auth here: https://aws-amplify.github.io/docs/cli-toolchain/graphql#auth


GraphQL schema compiled successfully.
```

This will generate the Model files to be used with `Amplify.API` to query, mutate, and subscribe to your AppSync endpoint. After build completes, the model files will be generated under `app/src/main/java/com/amplifyframework.datastore.generated.model`.

Note: You will see import errors in these files until performing the next steps below.

### Install Amplify libraries and tools

Open your **project** `build.gradle` and add `mavenCentral()` as a repository

```gradle
buildscript {
    repositories {
        mavenCentral()
    }
}
```

Next, add the following dependencies to your **app** `build.gradle` and `compileOptions` to work with the Java 8 features used:

```gradle
android {
  compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }
}

dependencies {
  implementation 'com.amplifyframework:core:0.9.1'
  implementation 'com.amplifyframework:aws-api:0.9.1'
}
```

Sync the project with Maven and ensure it builds successfully.

### (Optional) Add Gradle Plugin to auto generate models

If you would like your models to easily update both locally and on the server when you make changes to your schema, follow these steps to install our Gradle Plugin which automates the whole process on build:

1 - Add the following dependencies to your **project** `build.gradle`:

* `classpath 'com.amplifyframework:amplify-tools-gradle-plugin:0.2.0'` as a dependency
* A plugin of `'com.amplifyframework.amplifytools'` as in the example below:

```gradle
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

### Initialize Amplify

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
		} catch (Exception e) {
		    Log.e("ApiQuickstart", e.getMessage());
		}
	    }

	    @Override
	    public void onError(Exception e) {
		Log.e("ApiQuickstart", "Initialization error.", e);
	    }
	});
    }	
}
```

### Use cases

#### Run a Mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

With the Blog model generated, you can create an instance of this object and pass it to your GraphQL operation. Note you should not specify an ID - we will create one for you. Also, if you manually type out the builder method, you'll notice that it guides you into entering all required fields first before you'll see the optional fields and build() method appear in auto-suggest.

Call this method after the `Amplify.configure(...)` method above:

```java
private void createBlog() {
    Blog blog = Blog.builder().name("My first blog").build();

    Amplify.API.mutate(
            blog,
            MutationType.CREATE,
            new ResultListener<GraphQLResponse<Blog>>() {
                @Override
                public void onResult(GraphQLResponse<Blog> response) {
                    Log.i("ApiQuickStart", "Added Blog with id: " + response.getData().getId());
                }

                @Override
                public void onError(Throwable throwable) {
                    Log.e("ApiQuickStart", throwable.getMessage());
                }
            }
    );
}
```

As you saw from the schema above, Post has a BelongsTo relationship with Blog which has a HasMany relationship to Post. To associate a model with another one it is in a relationship with, you always create the link on the BelongsTo side. So let's create a Post which BelongsTo our Blog we just created. Call the below method with the id which was printed out from the above mutation - you can call it a few times with different post names if you'd like:

```java
private void createPost(String postName, String blogId) {
    Post post = Post.builder().title(postName).blog(Blog.justId(blogId)).build();

    Amplify.API.mutate(
            post,
            MutationType.CREATE,
            new ResultListener<GraphQLResponse<Post>>() {
                @Override
                public void onResult(GraphQLResponse<Post> response) {
                    Log.i("ApiQuickStart", "Added Post " + response.getData().getId());
                }

                @Override
                public void onError(Throwable throwable) {
                    Log.e("ApiQuickStart", throwable.getMessage());
                }
            }
    );
}
```

You can also delete data:

```java
private void deletePost(String postId) {
    Amplify.API.mutate(
        Post.justId(postId),
        MutationType.DELETE,
        new ResultListener<GraphQLResponse<Post>>() {
            @Override
            public void onResult(GraphQLResponse<Post> response) {
                Log.i("ApiQuickStart", "Deleted: " + response.getData().getTitle());
            }

            @Override
            public void onError(Throwable throwable) {
                Log.e("ApiQuickStart", throwable.getMessage());
            }
        }
    );
}
```

Run the app and ensure that it builds successfully. You should see results printed to Logcat if the GraphQL operation is successful.

#### Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out for the blog creation and query for it - you'll see that it returns the Posts we associated with it as well.

```java
private void getBlog(String id) {
    Amplify.API.query(
            Blog.class,
            id,
            new ResultListener<GraphQLResponse<Blog>>() {
                @Override
                public void onResult(GraphQLResponse<Blog> response) {
                    Log.i("ApiQuickStart", "Got " + response.getData().getName());

                    for(Post post : response.getData().getPosts()) {
                        Log.i("ApiQuickStart", "Post: " + post.getTitle());
                    }
                }

                @Override
                public void onError(Throwable throwable) {
                    Log.e("ApiQuickStart", throwable.getMessage());
                }
            }
    );
}
```

#### List Query

You can get the list of items that match a condition that you specify in `Amplify.API.query`

```java
private void listBlogs() {
    Amplify.API.query(
        Blog.class,
        Blog.NAME.contains("first").and(Blog.NAME.ne("first day of kindergarten")),
        new ResultListener<GraphQLResponse<Iterable<Blog>>>() {
            @Override
            public void onResult(GraphQLResponse<Iterable<Blog>> iterableGraphQLResponse) {
                for(Blog blog : iterableGraphQLResponse.getData()) {
                    Log.i("ApiQuickstart", "List result: " + blog.getName());
                }
            }

            @Override
            public void onError(Throwable throwable) {
                Log.e("ApiQuickStart", throwable.getMessage());
            }
        }
    );
}
```

#### Subscribe to Data

Subscribe to onCreate, onUpdate, and onDelete events.

```java
private void onUpdateBlog(String blogId) {
    // Start listening for update events on the Blog model
    ApiOperation subscription = Amplify.API.subscribe(
            Blog.class,
            SubscriptionType.ON_UPDATE,
            new StreamListener<GraphQLResponse<Blog>>() {
                @Override
                public void onNext(GraphQLResponse<Blog> response) {
                    Log.i("ApiQuickStart", "Blog update subscription received: " + response.getData().getName());
                }

                @Override
                public void onComplete() {
                    Log.i("ApiQuickStart", "Blog onUpdate subscription complete");
                }

                @Override
                public void onError(Throwable throwable) {
                    Log.e("ApiQuickStart", throwable.getMessage());
                }
            }
    );

    // Perform an update on whatever blog id was passed in here
    Amplify.API.mutate(
            Blog.builder().name("New updated first blog").id(blogId).build(),
            MutationType.UPDATE,
            new ResultListener<GraphQLResponse<Blog>>() {
                @Override
                public void onResult(GraphQLResponse<Blog> tGraphQLResponse) {
                    // Do nothing - watch it come in the subscription
                }

                @Override
                public void onError(Throwable throwable) {
                    Log.e("ApiQuickStart", throwable.getMessage());
                }
            }
    );

    // Cancel the subscription listener when you're finished with it
    subscription.cancel();
}
```

### Relationships

In addition to the HasMany / BelongsTo relationship demonstrated above, you can also use other relationships in your schema - [see the documentation here](./cli-toolchain/graphql#connection).

### Authorization Modes

For client authorization AppSync supports API Keys, Amazon IAM credentials, Amazon Cognito User Pools, and 3rd party OIDC providers. This is inferred from the `amplifyconfiguration.json` file when you call `Amplify.configure()`.

#### API Key

API Key is the easiest way to setup and prototype your application with AppSync.

```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-GRAPHQLENDPOINT-NAME": {
            "endpointType": "GraphQL",
            "endpoint": "YOUR-GRAPHQL-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "API_KEY",
        }
    }
}
```

#### Cognito User Pools

Amazon Cognito User Pools is the most common service to use with AppSync when adding user Sign-Up and Sign-In to your application. If your application needs to interact with other AWS services besides AppSync, such as S3, you will need to use IAM credentials with Cognito Identity Pools. The Amplify CLI can automatically configure this for you when running `amplify add auth` and can also automatically federate User Pools with Identity Pools. This allows you to have both User Pool credentials for AppSync and AWS credentials for S3. You can then use the `AWSMobileClient` for automatic credentials refresh [as outlined in the authentication section](./authentication). For manual configuration, add the following snippet to your `awsconfiguration.json` file:

```json
{
  "CognitoUserPool": {
        "Default": {
            "PoolId": "POOL-ID",
            "AppClientId": "APP-CLIENT-ID",
            "AppClientSecret": "APP-CLIENT-SECRET",
            "Region": "us-east-1"
        }
    },
    "CredentialsProvider": {
      "CognitoIdentity": {
          "Default": {
              "PoolId": "YOUR-COGNITO-IDENTITY-POOLID",
              "Region": "us-east-1"
          }
      }
  }
}
```

and your `amplifyconfiguration.json` file, under the `awsAPIPlugin`
```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-GRAPHQLENDPOINT-NAME": {
            "endpointType": "GraphQL",
            "endpoint": "YOUR-GRAPHQL-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "AMAZON_COGNITO_USER_POOLS",
        }
    }
}
```

#### IAM

When using AWS IAM in a mobile application you should leverage Amazon Cognito Identity Pools. The Amplify CLI can automatically configure this for you when running `amplify add auth`. You can then use the `AWSMobileClient` for automatic credentials refresh [as outlined in the authentication section](./authentication) For manual configuration, add the following snippet to your `awsconfiguration.json` file:


and your `amplifyconfiguration.json` file, under the `awsAPIPlugin`
```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-GRAPHQLENDPOINT-NAME": {
            "endpointType": "GraphQL",
            "endpoint": "YOUR-GRAPHQL-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "API_IAM",
        }
    }
}
```

#### Multi-Auth

This section talks about the capability of AWS AppSync to configure multiple authorization modes for a single AWS AppSync endpoint and region. Follow the [AWS AppSync Multi-Auth](https://docs.aws.amazon.com/appsync/latest/devguide/security.html#using-additional-authorization-modes) to configure multiple authorization modes for your AWS AppSync endpoint.

You can now configure a single GraphQL API to deliver private and public data. Private data requires authenticated access using authorization mechanisms such as IAM, Cognito User Pools, and OIDC. Public data does not require authenticated access and is delivered through authorization mechanisms such as API Keys. You can also configure a single GraphQL API to deliver private data using more than one authorization type. For example, you can configure your GraphQL API  to authorize some schema fields using OIDC, while other schema fields through Cognito User Pools and/or IAM.

As discussed in the above linked documentation, certain fields may be protected by different authorization types. This can lead the same query, mutation, or subscription to have different responses based on the authorization sent with the request; Therefore, it is recommended to use the different `friendly_name_<AuthMode>` as the `apiName` parameter in the `Amplify.API` call to reference each authorization type.

The following snippets highlight the new values in the `amplifyconfiguration.json` and the client code configurations.

The `friendly_name` illustrated here is created from Amplify CLI prompt. There are 4 clients in this configuration that connect to the same API except that they use different `AuthMode`.

```json
{
    "UserAgent": "aws-amplify-cli/2.0",
    "Version": "1.0",
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "friendly_name_API_KEY": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "da2-abcdefghijklmnopqr"
                },
                "friendly_name_AWS_IAM": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_IAM",
                },
                "friendly_name_AMAZON_COGNITO_USER_POOLS": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "AMAZON_COGNITO_USER_POOLS",
                },
                "friendly_name_OPENID_CONNECT": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://xyz.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "OPENID_CONNECT",
                }
            }
        }
    }
}
```

To invoke a named API:

```java
Amplify.API.mutate("friendly_name_API_KEY" ...)
```

## REST API

### Overview

The Amplify CLI deploys REST APIs and handlers using [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/) and [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/).

The API category will perform SDK code generation which, when used with the `AWSMobileClient` can be used for creating signed requests for Amazon API Gateway when the service Authorization is set to `AWS_IAM` or when using a [Cognito User Pools Authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-integrate-with-cognito.html).

See [the authentication section for more details](./authentication) for using the `AWSMobileClient` in your application.

### Set Up Your Backend

In a terminal window, navigate to your project folder (the folder that contains your app `.Android Studioproj` file), and add the SDK to your app.

```terminal
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add api
```

When prompted select the following options:

```terminal
$ > REST
$ > Create a new Lambda function
$ > Serverless express function
$ > Restrict API access? Yes
$ > Who should have access? Authenticated and Guest users
```

When configuration of your API is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. You can confirm this by running `amplify status`. Finally deploy your changes to the cloud:

```terminal
$ amplify push
```

Next make a call using one of the HTTP verbs under `Amplify.API` such as a GET:

```java
final Map parameters = new HashMap<>();
parameters.put("lang", "en_US");

RestOptions options = new RestOptions("/items", parameters);

Amplify.API.get("myAPI", options, new ResultListener<RestResponse>() {
    @Override
    public void onResult(RestResponse restResponse) {
        Log.i("SUCCESS", restResponse.toString());
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e("RESTERROR", throwable.toString());
    }
});
```

### Authorization Modes
By default API Gateway is setup with AWS IAM authorization. To switch to another mode run `amplify console API` and select `REST` to change this in the API Gateway console.

#### API Key

To invoke an API Gateway endpoint with API Key as the auth mode, you should have the following configuration in your `amplifyconfiguration.json` file.

```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-west-2",
            "authorizationType": "API_KEY",
        }
    }
}
```

#### Cognito User Pools authorization

To invoke an API Gateway endpoint from your application with Cognito User Pools authorization use the `AWSMobileClient` as outlined in [the authentication section](./authentication). If you have logged in with the `AWSMobileClient` at the start of your application lifecycle, the Amplify API category will use these credentials automatically for you as long as the configuration set in your `amplifyconfiguration.json` file is set to `"authorizationType": "AMAZON_COGNITO_USER_POOLS"`.

```json
{
  "CognitoUserPool": {
        "Default": {
            "PoolId": "POOL-ID",
            "AppClientId": "APP-CLIENT-ID",
            "AppClientSecret": "APP-CLIENT-SECRET",
            "Region": "us-east-1"
        }
    },
    "CredentialsProvider": {
      "CognitoIdentity": {
          "Default": {
              "PoolId": "YOUR-COGNITO-IDENTITY-POOLID",
              "Region": "us-east-1"
          }
      }
  }
}
```

and your `amplifyconfiguration.json` file, under the `awsAPIPlugin`
```json
{
    ...
    "awsAPIPlugin": {
        "<YOUR-RESTENDPOINT-NAME": {
            "endpointType": "REST",
            "endpoint": "YOUR-REST-ENDPOINT",
            "region": "us-east-1",
            "authorizationType": "AMAZON_COGNITO_USER_POOLS",
        }
    }
}
```
