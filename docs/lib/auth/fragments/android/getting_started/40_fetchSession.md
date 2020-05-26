For testing purposes, you can run this from your MainActivity's `onCreate` method.

```java
Amplify.Auth.fetchAuthSession(
        result -> Log.i("AmplifyQuickstart", result.toString()),
        error -> Log.e("AmplifyQuickstart", error.toString())
);
```
