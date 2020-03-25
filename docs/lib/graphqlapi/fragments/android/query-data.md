## Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out for the blog creation and query for it - you'll see that it returns the Posts we associated with it as well.

```java
private void getBlog(String id) {
    Amplify.API.query(
        Blog.class,
        id,
        response -> {
            Log.i("ApiQuickStart", "Got " + response.getData().getName());

            for(Post post : response.getData().getPosts()) {
                Log.i("ApiQuickStart", "Post: " + post.getTitle());
            }
        },
        throwable -> Log.e("ApiQuickStart", throwable.getMessage())
    );
}
```

## List Query

You can get the list of items that match a condition that you specify in `Amplify.API.query`

```java
private void listBlogs() {
    Amplify.API.query(
        Blog.class,
        Blog.NAME.contains("first").and(Blog.NAME.ne("first day of kindergarten")),
        iterableGraphQLResponse -> {
            for(Blog blog : iterableGraphQLResponse.getData()) {
                Log.i("ApiQuickstart", "List result: " + blog.getName());
            }
        },
        throwable -> Log.e("ApiQuickStart", throwable.getMessage())
    );
}
```