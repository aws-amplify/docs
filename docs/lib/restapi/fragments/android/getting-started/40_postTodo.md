```java
void postTodo() {
    RestOptions options = new RestOptions("/todo");
    Amplify.API.post(options,
            restResponse -> Log.i("ApiGettingStarted", restResponse.toString()),
            apiFailure -> Log.e("ApiGettingStarted", apiFailure.getMessage(), apiFailure)
    );
}
```