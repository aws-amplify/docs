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