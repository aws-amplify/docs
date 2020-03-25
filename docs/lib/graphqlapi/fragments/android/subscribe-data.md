Subscribe to onCreate, onUpdate, and onDelete events.

```java
private void onUpdateBlog(String blogId) {
     // Start listening for update events on the Blog model
    ApiOperation subscription = Amplify.API.subscribe(Blog.class,
            SubscriptionType.ON_UPDATE,
            suscriptionEstablished -> Log.i("ApiQuickStart", "Subscription established: "+suscriptionEstablished),
            response -> Log.i("ApiQuickStart", "Blog update subscription received: " + response.getData().getName()),
            throwable -> Log.e("ApiQuickStart", throwable.toString()),
            () -> Log.i("ApiQuickStart", "Subscription completed.")
    );

    // Perform an update on whatever blog id was passed in here
    Amplify.API.mutate(
        Blog.builder().name("New updated first blog").id(blogId).build(),
        MutationType.UPDATE,
        tGraphQLResponse -> Log.i("ApiQuickStart", "Blog updated"),
        throwable -> Log.e("ApiQuickStart", throwable.getMessage())
    );

    // Cancel the subscription listener when you're finished with it
    subscription.cancel();
}
```