a. Initialize Amplify in your app's entry point, such as in the `onCreate` method of MainActivity:

```java
try {
    Amplify.addPlugin(new AWSApiPlugin());
    Amplify.configure(getApplicationContext());
    Log.i("AmplifyGetStarted", "Amplify is all setup and ready to go!");
} catch (AmplifyException exception) {
    Log.e("AmplifyGetStarted", exception.getMessage());
}
```

b. First add some data to your backend:

```java
Task task = Task.builder().title("My first task").description("Get started with Amplify").build();
    Amplify.API.mutate(task,
    MutationType.CREATE,
    taskGraphQLResponse -> Log.i("AmplifyGetStarted", "Added task with id: " + taskGraphQLResponse.getData().getId()),
    throwable -> Log.e("AmplifyGetStarted", throwable.toString())
);
```

c. Next query the results from your API:

```java
Amplify.API.query(Task.class,
    result -> result.getData().forEach(task -> Log.i("AmplifyGetStarted", task.getTitle())),
    throwable -> Log.e("AmplifyGetStarted", throwable.toString())
);
```

d. Finally, you can listen to the Subscription with a `StreamListener` using the `onNext` callback:

```java
Amplify.API.subscribe(Task.class,
    SubscriptionType.ON_CREATE,
    establishedMessage -> Log.i("AmplifyGetStarted", "Subscription established: "+establishedMessage),
    response -> Log.i("AmplifyGetStarted", "Task created: "+response.getData().getTitle()),
    throwable -> Log.e("AmplifyGetStarted", throwable.toString()),
    () -> Log.i("AmplifyGetStarted", "Subscription completed.")
);
```

**Testing your API**
You can open the AWS console for you to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Next Steps

🎉 Congratulations! Your app is built, with a realtime backend using AWS AppSync.

What next? Here are some things to add to your app:

* [Authentication](./authentication)
* [DataStore](./datastore)
* [Storage](./storage)
* [API](./api)
* [Analytics](./analytics)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with an `amplifyconfiguration.json` file in your code.

```json
{
  "UserAgent": "aws-amplify-cli/2.0",
  "Version": "1.0",
  "storage": {
    "plugins": {
      "awsS3StoragePlugin": {
         "bucket": "my-s3-bucket",
         "region": "us-west-2",
         "defaultAccessLevel": "guest"
      }
    }
  },
  "analytics": {
    "plugins": {
      "awsPinpointAnalyticsPlugin": {
        "pinpointAnalytics": {
          "appId": "xxxx123xxxx23423bf24234",
          "region": "us-east-1"
        },
        "pinpointTargeting": {
           "region": "us-east-1",
        }
      }
    }
  },
  "api": {
    "plugins": {
      "awsAPIPlugin": {
        "uniqueApiname123": {
          "endpoint": "http://api-gw-endpoint-1",
          "region": "us-east-1"
          "authorizationType": "AWS_IAM",
          "endpointType": "REST"
        },
        "graphqlEndpoint123UserPools": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AMAZON_COGNITO_USER_POOLS",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint234APIKEy": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "API_KEY",
          "apiKey": "apikey12sudksjdfnskjd",
          "endpointType": "GraphQL"
        },
        "graphqlEndpoint345IAM": {
          "endpoint": "http://graphql-endpoint-1",
          "region": "us-east-1",
          "authorizationType": "AWS_IAM",
          "endpointType": "GraphQL"
        }

      }
    }
  },
"predictions":{
  "plugins": {
     "awsPredictionsPlugin": {
        "identify": {
           "collectionId": "TestCollection",
           "region": "us-east-1",
           "maxEntities": 50
         },
        "convert": {
           "voiceId": "Ivy",
           "region": "us-east-1"
        }
      }
    }
  }
}
```

In the configuration above, you would need to set the appropriate values such as `Region`, `Bucket`, etc.