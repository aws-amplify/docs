## Update data

Put data to the API endpoint:

```java
void putTodo() {
    byte[] body = "body".getBytes();
    RestOptions options = new RestOptions("/todo", body);
    Amplify.API.put(options,
            restResponse -> Log.i("ApiGettingStarted", restResponse.toString()),
            apiFailure -> Log.e("ApiGettingStarted", apiFailure.getMessage(), apiFailure)
    );
}
```