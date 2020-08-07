<amplify-block-switcher>
<amplify-block name="Java">

```java
// Listen for sign out events.
final String signedOutEventName = AuthChannelEventName.SIGNED_OUT.toString();
Amplify.Hub.subscribe(HubChannel.AUTH,
    anyAuthEvent -> signedOutEventName.equals(anyAuthEvent.getName()),
    // When one arrives, clear the DataStore.
    signedOutEvent -> Amplify.DataStore.clear(
        () -> Log.i("MyAmplifyApp", "DataStore is cleared."),
        failure -> Log.e("MyAmplifyApp", "Failed to clear DataStore.")
    )
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val signedOutEventName: String = AuthChannelEventName.SIGNED_OUT.toString()
Amplify.Hub.subscribe(HubChannel.AUTH,
    { anyAuthEvent -> signedOutEventName == anyAuthEvent.getName() },
    { signedOutEvent ->
        // When one arrives, clear the DataStore.
        Amplify.DataStore.clear(
            { Log.i("MyAmplifyApp", "DataStore is cleared.") },
            { Log.e("MyAmplifyApp", "Failed to clear DataStore.", it) }
        )
    }
)
```

</amplify-block>
</amplify-block-switcher>

