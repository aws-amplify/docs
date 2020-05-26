```java
Amplify.Auth.confirmResetPassword(
   "NewPassword123",
   "confirmation code you received",
   () -> Log.i(TAG, "New password confirmed"),
   error -> Log.e(TAG, error.toString())
)
```
