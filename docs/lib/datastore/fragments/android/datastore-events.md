For instance, to listen to see if the network status is active, you could set up the following listener:

<amplify-block-switcher>
 <amplify-block name="Java">

```java
Amplify.Hub.subscribe(
      HubChannel.DATASTORE,
      DataStoreChannelEventName.NETWORK_STATUS,
      hubEvent -> Log.i("User has a network connection: " + hubEvent.isActive().toString())
);
```

 </amplify-block>
 <amplify-block name="Kotlin">

 ```kotlin
Amplify.Hub.subscribe(HubChannel.DATASTORE, DataStoreChannelEventName.NETWORK_STATUS) {
    Log.i("User has a network connection: " + hubEvent.isActive().toString())
}      
```

 </amplify-block>
 <amplify-block name="RxJava">

```java
RxAmplify.Hub.on(HubChannel.DATASTORE)
    .filter(event -> DataStoreChannelEventName.NETWORK_STATUS.equals(event.getName()))
    .subscribe(event -> Log.i("User has a network connection: " + hubEvent.isActive().toString()));
```

 </amplify-block>

</amplify-block-switcher>