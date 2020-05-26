Subscribe to mutations for creating real-time clients.

```java
private void onCreateTodo(String todoId) {
     // Start listening for create events on the Todo model
    ApiOperation subscription = Amplify.API.subscribe(Todo.class,
        SubscriptionType.ON_CREATE,
        subscriptionEstablished -> Log.i("ApiQuickStart", "Subscription established: "+subscriptionEstablished),
        todoCreated -> Log.i("ApiQuickStart", "Todo create subscription received: " + todoCreated.getData().getName()),
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure),
        () -> Log.i("ApiQuickStart", "Subscription completed.")
    );
    
    // Cancel the subscription listener when you're finished with it
    subscription.cancel();
}
```