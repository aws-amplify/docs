a. First, configure Amplify. A good place to do this is in the [`onCreate()`](https://developer.android.com/reference/android/app/Application#onCreate()) method of [Android's `Application` class](https://developer.android.com/reference/android/app/Application).

```java
try {
    Amplify.addPlugin(new AWSApiPlugin());
    Amplify.configure(getApplicationContext());
    Log.i("AmplifyGetStarted", "Amplify is ready for use!");
} catch (AmplifyException configurationFailure) {
    Log.e("AmplifyGetStarted", "Failed to configure Amplify", configurationFailure);
}
```

b. Next, add some data to your backend:

```java
Task firstTask = Task.builder()
    .title("My first task")
    .description("Get started with Amplify")
    .build();
Amplify.API.mutate(firstTask, MutationType.CREATE,
    taskCreationResponse -> {
        final String idOfCreatedTask = taskCreationResponse.getData().getId();
        Log.i("AmplifyGetStarted", "Created task with id: " + idOfCreatedTask);
    },
    apiFailure -> Log.e("AmplifyGetStarted", "Failed to create a task.", apiFailure)
);
```

c. Now, query your API. You should see the `firstTask` you just created.

```java
Amplify.API.query(Task.class,
    queryResults -> {
        for (Task task : queryResults.getData()) {
            Log.i("AmplifyGetStarted", "Found a task with title = " + task.getTitle());
        }
    },
    apiFailure -> Log.e("AmplifyGetStarted", "Failed to query for tasks.", apiFailure)
);
```

d. Finally, you can receive notifications whenever a `Task` is created on the backend. To do so, start a new subscription:

```java
Amplify.API.subscribe(Task.class, SubscriptionType.ON_CREATE,
    subscriptionId -> Log.i("AmplifyGetStarted", "Subscription established: " + subscriptionId),
    taskCreated -> Log.i("AmplifyGetStarted", "Task created: " + taskCreated.getData().getTitle()),
    apiFailure -> Log.e("AmplifyGetStarted", "Subscription failed.", apiFailure),
    () -> Log.i("AmplifyGetStarted", "Subscription completed.")
);
```

**Testing your API**
The web-based AWS AppSync Console provides an easy way to run Queries, Mutation, or Subscription against you new API. The following command will directly open the Console for your API. When you run GraphQL operations on the server, you should be able to observe changes in your app.

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

## Next Steps

🎉 Congratulations! You have now built an app with a realtime backend.

What next? Here are some things to add to your app:

* [Analytics](~/lib/analytics/getting-started.md)
* [API (GraphQL)](~/lib/graphqlapi/getting-started.md)
* [API (REST)](~/lib/restapi/getting-started.md)
* [Authentication](~/lib/auth/getting-started.md)
* [DataStore](~/lib/datastore/getting-started.md)
* [Storage](~/lib/storage/getting-started.md)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app, you will need to **manually configure** your app by including relevant configurations into the `amplifyconfiguration.json` file.

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
