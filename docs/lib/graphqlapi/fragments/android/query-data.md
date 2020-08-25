## Query item

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

<amplify-block-switcher>
<amplify-block name="Java">

```java
private void getTodo(String id) {
  Amplify.API.query(
          ModelQuery.get(Todo.class, id),
          response -> Log.i("MyAmplifyApp", ((Todo) response.getData()).getName()),
          error -> Log.e("MyAmplifyApp", error.toString(), error)
  );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun getTodo(id: String) {
    Amplify.API.query(
            ModelQuery.get(Todo::class.java, id),
            { response -> Log.i("MyAmplifyApp", response.data.name) },
            { error -> Log.e("MyAmplifyApp", "Query failed", error) }
    )
}
```

</amplify-block>
</amplify-block-switcher>

## List items

You can get the list of items that match a condition that you specify in `Amplify.API.query`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.query(
        ModelQuery.list(Todo.class, Todo.NAME.contains("first")),
        response -> {
            for (Todo todo : response.getData()) {
                Log.i("MyAmplifyApp", todo.getName());
            }
        },
        error -> Log.e("MyAmplifyApp", "Query failure", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.API.query(
        ModelQuery.list(Todo::class.java, Todo.NAME.contains("first")),
        { response ->
            for (todo in response.data) {
                Log.i("MyAmplifyApp", todo.name)
            }
        },
        { error -> Log.e("MyAmplifyApp", "Query failure", error) }
)
```

</amplify-block>
</amplify-block-switcher>

> **Note**: This approach will only return up to the first 1,000 items.  To change this limit or make requests for additional results beyond this limit, use *pagination* as discussed below.

## List multiple pages of items

Pagination allows you to request a maximum number of results to be returned in a response. To consume further results beyond that, you can request a next page of results, if available.

<amplify-block-switcher>
<amplify-block name="Java">

```java
public void queryFirstPage() {
    query(ModelQuery.list(Todo.class, ModelPagination.firstPage().withLimit(1_000)));
}

private static void query(GraphQLRequest<PaginatedResult<Todo>> request) {
    Amplify.API.query(
        request,
        response -> {
            if (response.hasData()) {
                for (Todo todo : response.getData().getItems()) {
                    Log.d("MyAmplifyApp", todo.getName());
                }
                if (response.getData().hasNextResult()) {
                    query(response.getData().getRequestForNextResult());
                }
            }
        },
        failure -> Log.e("MyAmplifyApp", "Query failed.", failure)
    );
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
fun queryFirstPage() {
    query(ModelQuery.list(Todo::class.java, ModelPagination.firstPage().withLimit(1_000)))
}

fun query(request: GraphQLRequest<PaginatedResult<Todo>>) {
    Amplify.API.query(
        request,
        { response ->
            if (response.hasData()) {
                for (todo in response.data.items) {
                    Log.d("MyAmplifyApp", todo.name)
                }
                if (response.data.hasNextResult()) {
                    query(response.data.requestForNextResult)
                }
            }
        },
        { failure -> Log.e("MyAmplifyApp", "Query failed.", failure) }
    )
}
```

</amplify-block>
</amplify-block-switcher>
