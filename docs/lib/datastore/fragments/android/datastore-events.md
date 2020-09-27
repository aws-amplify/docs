For instance, to listen to see if the network status is active, you could set up the following listener:

<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Hub.subscribe(
        HubChannel.DATASTORE,
        hubEvent -> DataStoreChannelEventName.NETWORK_STATUS.equals(hubEvent.getName()),
        hubEvent -> {
            NetworkStatusEvent event = (NetworkStatusEvent) hubEvent.getData();
            Log.i("MyAmplifyApp", "User has a network connection: " + event.getActive());
        }
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
Amplify.Hub.subscribe(
        HubChannel.DATASTORE,
        { hubEvent -> DataStoreChannelEventName.NETWORK_STATUS.equals(hubEvent.name) },
        { hubEvent ->
            val event = hubEvent.data as NetworkStatusEvent?
            Log.i("MyAmplifyApp", "User has a network connection: " + event!!.active)
        }
)
```

 </amplify-block>
 <amplify-block name="RxJava">

```java
RxAmplify.Hub.on(HubChannel.DATASTORE)
        .filter(hubEvent -> DataStoreChannelEventName.NETWORK_STATUS.equals(hubEvent.getName()))
        .subscribe(hubEvent -> {
            NetworkStatusEvent event = (NetworkStatusEvent) hubEvent.getData();
            Log.i("MyAmplifyApp", "User has a network connection: " + event.getActive());
        });
```

 </amplify-block>

</amplify-block-switcher>
