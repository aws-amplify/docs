## DELETE data

```java
void deleteTodo() {
    RestOptions options = new RestOptions("/todo");

    Amplify.API.delete(options,
            response -> Log.i("MyAmplifyApp", response.toString()),
            error -> Log.e("MyAmplifyApp", "DELETE failed", error)
    );
}
```