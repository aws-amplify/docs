## DELETE data

```java
void deleteTodo() {
    RestOptions options = new RestOptions("/todo");
    Amplify.API.delete(options,
            restResponse -> Log.i("ApiGettingStarted", restResponse.toString()),
            apiFailure -> Log.e("ApiGettingStarted", apiFailure.getMessage(), apiFailure)
    );
}
```