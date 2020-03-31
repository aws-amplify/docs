## Run a Mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

With the Blog model generated, add the following.

```java
private void createBlog() {
    Blog blog = Blog.builder()
        .name("My first blog")
        .build();

    Amplify.API.mutate(
        blog,
        MutationType.CREATE,
        response -> Log.i("ApiQuickStart", "Added Blog with id: " + response.getData().getId()),
        apiFailure -> Log.e("ApiQuickStart", apiFailure.getMessage(), apiFailure)
    );
}

```