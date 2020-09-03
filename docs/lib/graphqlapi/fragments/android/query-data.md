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
<amplify-block name="RxJava">

```java
private void getTodo(String id) {
  RxAmplify.API.query(ModelQuery.get(Todo.class, id))
          .subscribe(
              response -> Log.i("MyAmplifyApp", ((Todo) response.getData()).getName()),
              error -> Log.e("MyAmplifyApp", error.toString(), error)
          );
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
<amplify-block name="RxJava">

```java 
RxAmplify.API.query(ModelQuery.list(Todo.class, Todo.NAME.contains("first"))
    .subscribe(
        response -> {
            for (Todo todo : response.getData()) {
                Log.i("MyAmplifyApp", todo.getName());
            }
        },
        error -> Log.e("MyAmplifyApp", "Query failure", error)
    );
```

</amplify-block>
</amplify-block-switcher>

> **Note**: This approach will only return up to the first 1,000 items.  To change this limit or make requests for additional results beyond this limit, use *pagination* as discussed below.

## List subsequent pages of items

A list query only returns the first 1,000 items by default, so for large data sets, you'll need to paginate through the results.  After receiving a page of results, you can obtain a `GraphQLRequest` for requesting the next page, if there are more results available.  The page size is configurable as well, as in the example below.

<amplify-block-switcher>
<amplify-block name="Java">

```java
public void queryFirstPage() {
    query(ModelQuery.list(Todo.class, ModelPagination.limit(1_000)));
}

private static void query(GraphQLRequest<PaginatedResult<Todo>> request) {
    Amplify.API.query(
        request,
        response -> {
            if (response.hasData()) {
                for (Todo todo : response.getData())) {
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
                for (todo in response.data) {
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

<amplify-block name="RxJava">

```java
BehaviorSubject<GraphQLRequest<PaginatedResult<Todo>>> subject =
        BehaviorSubject.createDefault(ModelQuery.list(Todo.class, ModelPagination.limit(1_000)));
subject.concatMap(request -> RxAmplify.API.query(request).toObservable())
    .doOnNext(response -> {
        if (response.hasErrors()) {
            subject.onError(new Exception(String.format("Query failed: %s", response.getErrors())));
        } else if (!response.hasData()) {
            subject.onError(new Exception("Empty response from AppSync."));
        } else if(response.getData().hasNextResult()) {
            subject.onNext(response.getData().getRequestForNextResult());
        } else {
            subject.onComplete();
        }
    })
    .concatMapIterable(GraphQLResponse::getData)
    .subscribe(
        todo -> Log.d(TAG, "Todo: " + todo),
        error -> Log.e(TAG, "Error: " + error)
    );
```

</amplify-block>
</amplify-block-switcher>
