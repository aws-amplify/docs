<amplify-block-switcher>
<amplify-block name="Java">
\```java
Amplify.DataStore.query(Post.class,
    Where.matchesAll().paginated(Page.startingAt(0).withLimit(100)),
    matchingPosts -> {
        while (matchingPosts.hasNext()) {
            Post post = matchingPosts.next();
            Log.i("MyAmplifyApp", "Title: " + post.getTitle());
        }
    },
    failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
);
\```
</amplify-block>
<amplify-block name="Kotlin">
\```kotlin
Amplify.DataStore.query(Post::class.java,
    Where.matchesAll().paginated(Page.startingAt(0).withLimit(100)),
    {
        while (it.hasNext()) {
            Log.i("MyAmplifyApp", "Title: ${it.next().title}")
        }
    },
    { Log.e("MyAmplifyApp", "Query failed.", it) }
)
\```

</amplify-block>
</amplify-block-switcher>

The `paginate` arguments takes an object of type [`QueryPaginationInput`](https://aws-amplify.github.io/amplify-ios/docs/Structs/QueryPaginationInput.html). That object can be created with the following factory functions:

- [`.page(_ page: UInt, limit: UInt)`](https://aws-amplify.github.io/amplify-ios/docs/Structs/QueryPaginationInput.html#/s:7Amplify20QueryPaginationInputV4page_5limitACSu_SutFZ): the page number (starting at `0`) and the page size, defined by `limit` (defaults to `100`)
- [`.firstPage`](https://aws-amplify.github.io/amplify-ios/docs/Structs/QueryPaginationInput.html#/s:7Amplify20QueryPaginationInputV9firstPageACvpZ): an idiomatic shortcut to `.page(0, limit: 100)`
- [`.firstResult`](https://aws-amplify.github.io/amplify-ios/docs/Structs/QueryPaginationInput.html#/s:7Amplify20QueryPaginationInputV11firstResultACvpZ): an idiomatic shortcut to `.page(0, limit: 1)`
