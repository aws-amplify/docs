```java
Amplify.Auth.updatePassword(
  "existingPassword",
  "newPassword",
  () -> Log.i("AuthQuickstart", "Updated password successfully"),
  error -> Log.e("AuthQuickstart", error.toString())
)
```
