<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Hub.subscribe(
    HubChannel.DATASTORE,
    hubEvent -> DataStoreChannelEventName.NETWORK_STATUS.toString().equals(hubEvent.getName()),
    hubEvent -> {
        NetworkStatusEvent event = (NetworkStatusEvent) hubEvent.getData();
        Log.i("MyAmplifyApp", "User has a network connection: " + event.getActive());
    }
);
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Hub.subscribe(HubChannel.DATASTORE,
    { it.name.equals(DataStoreChannelEventName.NETWORK_STATUS.toString()) },
    { 
        val networkStatus = it.data as NetworkStatusEvent
        Log.i("MyAmplifyApp", "User has a network connection? ${networkStatus.active}")
    }
)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
Amplify.Hub.subscribe(DATASTORE)
    { it.name == NETWORK_STATUS.toString() }
    .collect {
        val event = it.data as NetworkStatusEvent
        Log.i("MyAmplifyApp", "User has a network connection: ${event.active}")
    }
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Hub.on(HubChannel.DATASTORE)
    .filter(hubEvent -> DataStoreChannelEventName.NETWORK_STATUS.toString().equals(hubEvent.getName()))
    .subscribe(hubEvent -> {
        NetworkStatusEvent event = (NetworkStatusEvent) hubEvent.getData();
        Log.i("MyAmplifyApp", "User has a network connection: " + event.getActive());
    });
```

</amplify-block>

</amplify-block-switcher>
