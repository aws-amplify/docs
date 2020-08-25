<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func fetchDevices() {
    Amplify.Auth.fetchDevices() { result in
        switch result {
        case .success(let fetchDeviceResult):
            for device in fetchDeviceResult {
                print(device.id)
            }
        case .failure(let error):
            print("Fetch devices failed with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func fetchDevices() -> AnyCancellable {
    Amplify.Auth.fetchDevices()
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Fetch devices failed with error \(authError)")
            }
        }
        receiveValue: { fetchDeviceResult in
            for device in fetchDeviceResult {
                print(device.id)
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>
