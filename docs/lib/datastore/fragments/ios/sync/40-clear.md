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
