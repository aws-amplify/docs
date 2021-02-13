<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchDevices(
    devices -> {
        for (AuthDevice device : devices) {
            Log.i("AuthQuickStart", "Device: " + device);
        }
    },
    error -> Log.e("AuthQuickStart", "Fetch devices failed with error: " + error.toString()));
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
try {
    Amplify.Auth.fetchDevices().forEach { device ->
        Log.i("AuthQuickStart", "Device: $device")
    }
} catch (error: AuthException) {
    Log.e("AuthQuickStart",  "Fetch devices failed with error:", error)
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
Amplify.Auth.fetchDevices()
    .subscribe(
        device -> Log.i("AuthQuickStart", "Device: " + device);
        error -> Log.e("AuthQuickStart", "Fetch devices failed with error: " + error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
