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
Amplify.Auth.confirmResetPassword(
   "NewPassword123",
   "confirmation code you received",
   { Log.i("AuthQuickstart", "New password confirmed") },
   { error -> Log.e("AuthQuickstart", error.toString()) }
)
```
 </amplify-block>
</amplify-block-switcher>
