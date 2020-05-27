<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Hub.subscribe(HubChannel.AUTH,
      hubEvent -> {
          if (hubEvent.getName().equals(InitializationStatus.SUCCEEDED.toString())) {
              Log.i("AuthQuickstart", "Auth successfully initialized");
          } else if (hubEvent.getName().equals(InitializationStatus.FAILED.toString())){
              Log.i("AuthQuickstart", "Auth failed to succeed");
          } else {
              switch (AuthChannelEventName.valueOf(hubEvent.getName())) {
                  case SIGNED_IN:
                      Log.i("AuthQuickstart", "Auth just became signed in.");
                  case SIGNED_OUT:
                      Log.i("AuthQuickstart", "Auth just became signed out.");
                  case SESSION_EXPIRED:
                      Log.i("AuthQuickstart", "Auth session just expired.");
              }
          }
      }
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
Amplify.Hub.subscribe(HubChannel.AUTH) { hubEvent: HubEvent<*> ->
    if (hubEvent.name == InitializationStatus.SUCCEEDED.toString()) {
        Log.i("AuthQuickstart", "Auth successfully initialized")
    } else if (hubEvent.name == InitializationStatus.FAILED.toString()) {
        Log.i("AuthQuickstart", "Auth failed to succeed")
    } else {
        when (AuthChannelEventName.valueOf(hubEvent.name)) {
            AuthChannelEventName.SIGNED_IN -> Log.i("AuthQuickstart", "Auth just became signed in.")
            AuthChannelEventName.SIGNED_OUT -> Log.i("AuthQuickstart", "Auth just became signed out.")
            AuthChannelEventName.SESSION_EXPIRED -> Log.i("AuthQuickstart", "Auth session just expired.")
        }
    }
}
```

 </amplify-block>
</amplify-block-switcher>