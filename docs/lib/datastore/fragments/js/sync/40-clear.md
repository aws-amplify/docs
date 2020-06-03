```swift
let isSignedOut = HubFilters.forEventName(HubPayload.EventName.Auth.signedOut)
_ = Amplify.Hub.listen(to: .auth, isIncluded: isSignedOut) { _ in
    Amplify.DataStore.clear() { result in
        switch result {
        case .success:
            print("")
        case .failure:
            print("")
        }
    }
}
```
