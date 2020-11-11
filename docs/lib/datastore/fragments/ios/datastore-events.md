<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let hubEventListener = Amplify.Hub.listen(to: .dataStore) { event in
    if event.eventName == HubPayload.EventName.DataStore.networkStatus {
        guard let networkStatus = event.data as? NetworkStatusEvent else {
            print("Failed to cast data as NetworkStatusEvent")
            return
        }
        print("User receives a network connection status: \(networkStatus.active)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let hubEventSubscriber = Amplify.Hub.publisher(for: .dataStore).sink { event in
    if event.eventName == HubPayload.EventName.DataStore.networkStatus {
        guard let networkStatus = event.data as? NetworkStatusEvent else {
            print("Failed to cast data as NetworkStatusEvent")
            return
        }
        print("User receives a network connection status: \(networkStatus.active)")
    }
}
```

</amplify-block>

</amplify-block-switcher>

<amplify-callout>

An initial `networkStatus` event is always dispatched, in which `active` is set to `false`. Shortly thereafter, you will receive an updated event that reflects the true status of the network connectivity.

</amplify-callout>

<amplify-callout>

You may want to setup your Hub Listener or Subscriber before calling `Amplify.configure()`, otherwise you may miss some of the `DataStore` events that are emitted.

</amplify-callout>