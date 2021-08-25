<amplify-block-switcher>
<amplify-block name="Java">

```java
private GraphQLRequest<Post> getPostWithCommentsRequest(String id) {
    String document = "query getPost($id: ID!) { "
        + "getPost(id: $id) { "
            + "id "
            + "title "
            + "rating "
            + "status "
            + "comments { "
                + "items { "
                    + "id "
                    + "postID "
                    + "content "
                + "} "
            + "} "
        + "} "
    + "}";
    return new SimpleGraphQLRequest<>(
            document,
            Collections.singletonMap("id", id),
            Post.class,
            new GsonVariablesSerializer());
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
private fun getPostWithCommentsRequest(id: String): GraphQLRequest<Post> {
    val document = ("query getPost(\$id: ID!) { "
        + "getPost(id: \$id) { "
            + "id "
            + "title "
            + "rating "
            + "status "
            + "comments { "
                + "items { "
                    + "id "
                    + "postID "
                    + "content "
                + "} "
            + "} "
        + "} "
    + "}")
    return SimpleGraphQLRequest(
            document,
            mapOf("id" to id),
            Post::class.java,
            GsonVariablesSerializer())
}
```

</amplify-block>
</amplify-block-switcher>

Then query for the Post:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.query(getPostWithCommentsRequest("[POST_ID]"),
    response -> Log.d("MyAmplifyApp", "response" + response),
    error -> Log.e("MyAmplifyApp", "error" + error)
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.API.query(getPostWithCommentsRequest("[POST_ID]"),
    { Log.d("MyAmplifyApp", "Response = $it") },
    { Log.e("MyAmplifyApp", "Error!", it) }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val response = Amplify.API.query(getPostWithCommentsRequest("[POST_ID]"))
    Log.d("MyAmplifyApp", "Query response = $response")
} catch (error: ApiException) {
    Log.e("MyAmplifyApp", "Query error", error)
}
```

</amplify-block>
</amplify-block-switcher>
