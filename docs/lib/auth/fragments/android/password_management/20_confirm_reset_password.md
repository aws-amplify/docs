<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Auth.confirmResetPassword(
   "NewPassword123",
   "confirmation code you received",
   () -> Log.i("AuthQuickstart", "New password confirmed"),
   error -> Log.e("AuthQuickstart", error.toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

```kotlin
try {
    Amplify.Auth.confirmResetPassword("NewPassword123", "code you received")
    Log.i("AuthQuickstart", "New password confirmed") 
} catch (error: AuthException) {
    Log.e("AuthQuickstart", "Failed to confirm password reset", error)
}
```
 </amplify-block>
</amplify-block-switcher>
