## Integrate into your app

Initialize the AppSync client inside your application code, such as the `onCreate()` lifecycle method of your activity class:

```java
private AWSAppSyncClient mAWSAppSyncClient;

@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    mAWSAppSyncClient = AWSAppSyncClient.builder()
        .context(getApplicationContext())
        .awsConfiguration(new AWSConfiguration(getApplicationContext()))
        .build();
}
```

You can now add data to your database with a mutation:

```java
public void runMutation(){
    CreateTodoInput createTodoInput = CreateTodoInput.builder().
        name("Use AppSync").
        description("Realtime and Offline").
        build();

    mAWSAppSyncClient.mutate(CreateTodoMutation.builder().input(createTodoInput).build())
        .enqueue(mutationCallback);
}

private GraphQLCall.Callback<CreateTodoMutation.Data> mutationCallback = new GraphQLCall.Callback<CreateTodoMutation.Data>() {
    @Override
    public void onResponse(@Nonnull Response<CreateTodoMutation.Data> response) {
        Log.i("Results", "Added Todo");
    }

    @Override
    public void onFailure(@Nonnull ApolloException e) {
        Log.e("Error", e.toString());
    }
};
```

Next, query the data:

```java
public void runQuery(){
    mAWSAppSyncClient.query(ListTodosQuery.builder().build())
        .responseFetcher(AppSyncResponseFetchers.CACHE_AND_NETWORK)
        .enqueue(todosCallback);
}

private GraphQLCall.Callback<ListTodosQuery.Data> todosCallback = new GraphQLCall.Callback<ListTodosQuery.Data>() {
    @Override
    public void onResponse(@Nonnull Response<ListTodosQuery.Data> response) {
        Log.i("Results", response.data().listTodos().items().toString());
    }

    @Override
    public void onFailure(@Nonnull ApolloException e) {
        Log.e("ERROR", e.toString());
    }
};
```

You can also setup realtime subscriptions to data:

```java
private AppSyncSubscriptionCall subscriptionWatcher;

private void subscribe(){
    OnCreateTodoSubscription subscription = OnCreateTodoSubscription.builder().build();
    subscriptionWatcher = mAWSAppSyncClient.subscribe(subscription);
    subscriptionWatcher.execute(subCallback);
}

private AppSyncSubscriptionCall.Callback subCallback = new AppSyncSubscriptionCall.Callback() {
    @Override
    public void onResponse(@Nonnull Response response) {
        Log.i("Response", response.data().toString());
    }

    @Override
    public void onFailure(@Nonnull ApolloException e) {
        Log.e("Error", e.toString());
    }

    @Override
    public void onCompleted() {
        Log.i("Completed", "Subscription completed");
    }
};
```

Call the `runMutation()`, `runQuery()`, and `subscribe()` methods from your app code, such as from a button click or when your app starts in `onCreate()`. You will see data being stored and retrieved in your backend from the Android Studio console. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.
