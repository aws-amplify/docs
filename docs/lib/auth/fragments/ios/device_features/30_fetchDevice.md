```swift
_ = Amplify.Auth.fetchDevices() { result in
    switch result {
    case .success(let fetchDeviceResult):
        for device in fetchDeviceResult {
            print(device.id)
        }
    case .failure(let error):
        print("Fetch devices failed with error \(error)")
    }
}
```
