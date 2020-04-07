```java
Amplify.DataStore.query(Post.class, Post.RATING.gt(4),
    goodPosts -> {
        while (goodPosts.hasNext()) {
            Post post = goodPosts.next();
            Log.i("GetStarted", "Post: " +  post);
        }
    },
    failure -> Log.e("GetStarted", "Query failed.", failure)
);
```

<amplify-callout>

Note: when constructing predicates, static `QueryField` instances such as `Post.RATING` do not own any information about the model to which the field belongs. In order to avoid any ambiguity between field names which are used across multiple models, it is recommended to construct a custom instance of `QueryField` in the form of `QueryField.field("{model-name}.{field-name}")` (i.e. `field("post.rating")`).

</amplify-callout>
