## Update data

Put data to the API endpoint:

```java
void putTodo() {
    byte[] body = "body".getBytes();

    RestOptions options = new RestOptions("/todo", body);

    Amplify.API.put(options,
            response -> Log.i("MyAmplifyApp", response.toString()),
            error -> Log.e("MyAmplifyApp", "PUT failed", error)
    );
}
```