```java
Amplify.Auth.updatePassword(
  "existingPassword",
  "newPassword",
  () -> Log.i(TAG, "Updated password successfully"),
  error -> Log.e(TAG, error.toString())
)
```
