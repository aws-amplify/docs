<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Auth.resetPassword(
   "username",
   result -> Log.i("AuthQuickstart", result.toString()),
   error -> Log.e("AuthQuickstart", error.toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

```kotlin
Amplify.Auth.resetPassword(
   "username",
   { result -> Log.i("AuthQuickstart", result.toString()) },
   { error -> Log.e("AuthQuickstart", error.toString()) }
)
```

 </amplify-block>
</amplify-block-switcher>