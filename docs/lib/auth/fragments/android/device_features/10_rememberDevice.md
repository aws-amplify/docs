<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.rememberDevice(
    () -> Log.i("AuthQuickStart", "Remember device succeeded"),
    error -> Log.e("AuthQuickStart", "Remember device failed with error " + error.toString()));
```

</amplify-block>
<amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.rememberDevice(
    { Log.i("AuthQuickStart", "Remember device succeeded") },
    { error -> Log.e("AuthQuickStart", "Remember device failed with error: $error") })
```

</amplify-block>
<amplify-block name="RxJava">

```java
Amplify.Auth.rememberDevice()
    .subscribe(
      () -> Log.i("AuthQuickStart", "Remember device succeeded"),
      error -> Log.e("AuthQuickStart", "Remember device failed with error " + error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
