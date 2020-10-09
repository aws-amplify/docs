<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func postTodo() {
    let request = RESTRequest(path: "/todo", body: "my new Todo".data(using: .utf8))
    Amplify.API.post(request: request) { result in
        switch result {
        case .success(let data):
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        case .failure(let apiError):
            print("Failed", apiError)
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func postTodo() -> AnyCancellable {
    let request = RESTRequest(path: "/todo", body: "my new Todo".data(using: .utf8))
    let sink = Amplify.API.post(request: request)
        .resultPublisher
        .sink {
            if case let .failure(apiError) = $0 {
                print("Failed", apiError)
            }
        }
        receiveValue: { data in
            let str = String(decoding: data, as: UTF8.self)
            print("Success \(str)")
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>
