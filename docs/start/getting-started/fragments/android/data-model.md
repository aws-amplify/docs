### Model the data with GraphQL transform

Switch to **Project** view in Android Studio and open the schema file at `amplify/backend/api/amplifyDatasource/schema.graphql`.  
[Learn more](https://aws-amplify.github.io/docs/cli-toolchain/graphql) about annotating GraphQL schemas and data modeling.

In this guide, use the default schema included:

```
type Task @model {
    id: ID!
    title: String!
    description: String
    status: String
}
type Note @model {
    id: ID!
    content: String!
}
```

To generate the Java classes for these models, click the Gradle Task dropdown in the toolbar and select **modelgen** and run the task. Once it completes you should have generated Java classes under `app/src/main/java/com/amplifyframework.datastore.generated.model`.

## Create the API with database

1. Run `amplify configure` in Terminal from the root of your application folder to set up Amplify with your AWS account.

    - Your default browser will open a tab prompting you to sign in / create a new AWS account
    - Once done, return to the terminal and press Enter
    - Choose a region
    - Choose a username (can use default)
    - Your default browser will open a tab prompting you to walkthrough the process of creating an IAM user. At the end of the process. Save the Access ID and Secret key and return to the terminal.
    - Press Enter
    - It will then ask you to enter the access key ID from the finish page of the browser. Make sure to backspace the default and copy-paste the key for the IAM user you just created.
    - Do the same for <YOUR SECRET ACCESS KEY> in the next step
    - Hit Enter to go with default as the profile name

2. Click the Gradle Task dropdown in your Android Studio toolbar, select **amplifyPush**, and run the task.Once this is successful, you will see three generated files:

- **amplifyconfiguration.json** and **awsconfiguration.json** under `src/main/res/raw`: Rather than configuring each service through a constructor or constants file, the Amplify Framework for Android supports configuration through centralized files called amplifyconfiguration.json and awsconfiguration.json which define all the regions and service endpoints to communicate. On Android projects these two files will be placed into the root directory. You can also manually update them if you have existing AWS resources which you manage outside of the Amplify deployment process. Additionally, if you ever decide to run Amplify CLI commands from a terminal inside your Android Studio project these configurations will be automatically updated.
- **amplify-gradle-config.json** under the root directory: This file is used to configure modelgen and push to cloud actions.

3. After the deployment has completed you can open the `amplifyconfiguration.json` and you should see the `api` section containing your backend like the following:
```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "amplifyDatasource": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://<YOUR-GRAPHQL-ENDPOINT>.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "<YOUR API KEY>"
                }
            }
        }
    }
}
```

### Testing your API
You can open the AWS console for you to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```bash
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Integrate into your app

1. Initialize Amplify in your app's entry point, such as in the `onCreate` method of MainActivity:

```java
try {
    Amplify.addPlugin(new AWSApiPlugin());
    Amplify.configure(getApplicationContext());
    Log.i("AmplifyGetStarted", "Amplify is all setup and ready to go!");
} catch (AmplifyException exception) {
    Log.e("AmplifyGetStarted", exception.getMessage());
}
```

2. First add some data to your backend:

```java
Task task = Task.builder().title("My first task").description("Get started with Amplify").build();

Amplify.API.mutate(task, MutationType.CREATE, new ResultListener<GraphQLResponse<Task>>() {
    @Override
    public void onResult(GraphQLResponse<Task> taskGraphQLResponse) {
        Log.i("AmplifyGetStarted", "Added task with id: " + taskGraphQLResponse.getData().getId());
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e("AmplifyGetStarted", throwable.toString());
    }
});
```

3. Next query the results from your API:

```java
Amplify.API.query(Task.class, new ResultListener<GraphQLResponse<Iterable<Task>>>() {
    @Override
    public void onResult(GraphQLResponse<Iterable<Task>> iterableGraphQLResponse) {
        for(Task task : iterableGraphQLResponse.getData()) {
            Log.i("AmplifyGetStarted", "Task : " + task.getTitle());
        }
    }

    @Override
    public void onError(Throwable throwable) {
        Log.e("AmplifyGetStarted", throwable.toString());
    }
});
```

4. Finally, you can listen to the Subscription with a `StreamListener` using the `onNext` callback:

```java
Amplify.API.subscribe(
    Task.class,
    SubscriptionType.ON_CREATE,
    new StreamListener<GraphQLResponse<Task>>() {
        @Override
        public void onNext(GraphQLResponse<Task> taskGraphQLResponse) {
            Log.i("AmplifyGetStarted", "Subscription detected a create: " +
                    taskGraphQLResponse.getData().getTitle());
        }

        @Override
        public void onComplete() {
            // Whatever you want it to do on completing
        }

        @Override
        public void onError(Throwable throwable) {
            Log.e("AmplifyGetStarted", throwable.toString());
        }
    }
);
```