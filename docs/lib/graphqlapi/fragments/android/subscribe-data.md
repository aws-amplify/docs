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