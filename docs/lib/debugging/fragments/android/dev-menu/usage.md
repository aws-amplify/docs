Shake the device to access the developer menu during a debug build of your app. An emulator can be shaken by selecting the more option (denoted by three dots) next to the emulator, navigating to the “Virtual Sensors” tab, clicking the “Move” button, and then moving the emulator shown within the “Virtual Sensors” tab back and forth a few times.

![Shake Android Emulator](~/images/debugging/shakeAndroidEmulator.gif)

The developer menu will only be shown when running a debug build of your app.  However, if you still would like to disable the menu even for debug builds, you can pass a custom configuration when configuring Amplify:

<amplify-block-switcher>
<amplify-block name="Java">

```java
AmplifyConfiguration config = AmplifyConfiguration.builder(getApplicationContext())
        .devMenuEnabled(false)
        .build();
Amplify.configure(config, getApplicationContext());
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val config = AmplifyConfiguration.builder(applicationContext)
    .devMenuEnabled(false)
    .build()
Amplify.configure(config, applicationContext)
```

</amplify-block>
</amplify-block-switcher>
