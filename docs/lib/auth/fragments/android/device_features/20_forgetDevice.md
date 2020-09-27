<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.forgetDevice(
    () -> Log.i("AuthQuickStart", "Forget device succeeded"),
    error -> Log.e("AuthQuickStart", "Forget device failed with error " + error.toString()));
```

</amplify-block>
<amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.forgetDevice(
    { Log.i("AuthQuickStart", "Forget device succeeded") },
    { error -> Log.e("AuthQuickStart", "Forget device failed with error: $error") })
```

</amplify-block>
<amplify-block name="RxJava">

```java
Amplify.Auth.forgetDevice()
    .subscribe(
      () -> Log.i("AuthQuickStart", "Forget device succeeded"),
      error -> Log.e("AuthQuickStart", "Forget device failed with error " + error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
