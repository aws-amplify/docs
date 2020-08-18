<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let isSignedOut = HubFilters.forEventName(HubPayload.EventName.Auth.signedOut)
_ = Amplify.Hub.listen(to: .auth, isIncluded: isSignedOut) { _ in
    Amplify.DataStore.clear() { result in
        switch result {
        case .success:
            print("Local data cleared successfully.")
        case .failure(let error):
            print("Local data not cleared \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let isSignedOut = HubFilters.forEventName(HubPayload.EventName.Auth.signedOut)
let sink = Amplify.Hub.publisher(for: .auth)
    .setFailureType(to: DataStoreError.self)
    .filter { isSignedOut($0) }
    .flatMap { _ in Amplify.DataStore.clear() }
    .sink {
        if case let .failure(error) = $0 {
            print("Local data not cleared \(error)")
        }
    }
    receiveValue: {  in
        print("Local data cleared successfully.")
    }
```

</amplify-block>

</amplify-block-switcher>
