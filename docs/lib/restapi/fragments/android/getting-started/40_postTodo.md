```java
void postTodo() {
    RestOptions options = new RestOptions("/todo");

    Amplify.API.post(options,
            response -> Log.i("MyAmplifyApp", response.toString()),
            error -> Log.e("MyAmplifyApp", "POST failed", error)
    );
}
```