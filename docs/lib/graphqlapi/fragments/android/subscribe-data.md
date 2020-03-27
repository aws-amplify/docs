Subscribe to onCreate, onUpdate, and onDelete events.

```java
private void onUpdateBlog(String blogId) {
     // Start listening for update events on the Blog model
    ApiOperation subscription = Amplify.API.subscribe(Blog.class,
        SubscriptionType.ON_UPDATE,
        suscriptionEstablished -> Log.i("ApiQuickStart", "Subscription established: "+suscriptionEstablished),
        blogUpdated -> Log.i("ApiQuickStart", "Blog update subscription received: " + blogUpdated.getData().getName()),
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure),
        () -> Log.i("ApiQuickStart", "Subscription completed.")
    );

    // Perform an update on whatever blog id was passed in here
    Amplify.API.mutate(
        Blog.builder().name("New updated first blog").id(blogId).build(),
        MutationType.UPDATE,
        blogUpdated -> Log.i("ApiQuickStart", "Blog updated"),
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
    );

    // Cancel the subscription listener when you're finished with it
    subscription.cancel();
}
```