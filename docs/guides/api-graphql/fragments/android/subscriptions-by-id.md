Now you can create a custom subscription for comment creation with a specific post id:

<amplify-block-switcher>
<amplify-block name="Java">

```java
private GraphQLRequest<Comment> onCreateCommentByPostId(String id) {
    String document = "subscription onCreateCommentByPostId($id: ID!) { "
        + "onCommentByPostId(postCommentsId: $id) { "
            + "content "
            + "id "
            + "postCommentsId "
        + "}"
    + "}";
    return new SimpleGraphQLRequest<>(
        document,
        Collections.singletonMap("id", id),
        Comment.class,
        new GsonVariablesSerializer()
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun onCreateCommentByPostId(id: String): GraphQLRequest<Comment> {
    val document = """
        subscription onCreateCommentByPostId(${'$'}id: ID!) {
            onCommentByPostId(postCommentsId: ${'$'}id) {
                content
                id
                postCommentsId
            }
         }
    """.trimIndent()
    return SimpleGraphQLRequest(
        document,
        mapOf("id" to id),
        Comment::class.java,
        GsonVariablesSerializer()
    )
}
```

</amplify-block>
</amplify-block-switcher>

To listen to creation updates with the specific post using the post id, you can use the following code sample:

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void createSubscription() {
    Amplify.API.subscribe(onCreateCommentByPostId("12345"),
        subscriptionId -> Log.d("MyAmplifyApp", "Established subscription with id: " + subscriptionId),
        response -> {
            if (response.hasErrors()) {
                Log.e("MyAmplifyApp", "Error receiving Comment: " + response.getErrors());
            } else if(!response.hasData()) {
                Log.e("MyAmplifyApp", "Error receiving Comment; no data in response.");
            } else {
                Log.d("MyAmplifyApp", "Got comment from subscription: " + response.getData());
            }
        },
        failure -> Log.e("MyAmplifyApp", "Subscription terminated with error.", failure),
        () -> Log.d("MyAmplifyApp", "Subscription has been closed successfully.")
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun createSubscription() {
    Amplify.API.subscribe(onCreateCommentByPostId("12345"),
        { Log.d("MyAmplifyApp", "Established subscription. id = $it") },
        { response: GraphQLResponse<Comment> ->
            if (response.hasErrors()) {
                Log.e("MyAmplifyApp", "Error receiving Comment: " + response.errors)
            } else if (!response.hasData()) {
                Log.e("MyAmplifyApp", "Error receiving Comment; no data in response.")
            } else {
                Log.d("MyAmplifyApp", "Got comment on subscription: " + response.data)
            }
        },
        { Log.e("MyAmplifyApp", "Subscription terminated with error.", it) },
        { Log.d("MyAmplifyApp", "Subscription has been closed successfully.") }
    )
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
private void createSubscription() {
private void createSubscription() {
    RxOperations.RxSubscriptionOperation<? extends GraphQLResponse<Comment>> subscription =
        RxAmplify.API.subscribe(onCreateCommentByPostId("12345"));
    subscription
        .observeConnectionState()
        .subscribe(connectionStateEvent -> 
            Log.i("MyAmplifyApp", String.valueOf(connectionStateEvent))
        );
    subscription
        .observeSubscriptionData()
        .subscribe(
            response -> {
                if (response.hasErrors()) {
                    Log.e("MyAmplifyApp", "Error receiving Comment: " + response.getErrors());
                } else if (!response.hasData()) {
                    Log.e("MyAmplifyApp", "Error receiving Comment; no data in response.");
                } else {
                    Log.d("MyAmplifyApp", "Got comment from subscription: " + response.getData());
                }
            },
            failure -> Log.e("MyAmplifyApp", "Subscription failed.", failure),
            () -> Log.i("MyAmplifyApp", "Subscription completed.")
        );
    // Cancel the subscription listener when you're finished with it
    subscription.cancel();
}
}
```

</amplify-block>
</amplify-block-switcher>
