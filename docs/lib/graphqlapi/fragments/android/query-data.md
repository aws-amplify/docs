## Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out for the blog creation and query for it - you'll see that it returns the Posts we associated with it as well.

```java
private void getBlog(String id) {
    Amplify.API.query(
        Blog.class,
        id,
        queryResponse -> {
            Log.i("ApiQuickStart", "Got " + queryResponse.getData().getName());

            for (Post post : queryResponse.getData().getPosts()) {
                Log.i("ApiQuickStart", "Post: " + post.getTitle());
            }
        },
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
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
        queryResponse -> {
            for (Blog blog : queryResponse.getData()) {
                Log.i("ApiQuickstart", "List result: " + blog.getName());
            }
        },
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
    );
}
```