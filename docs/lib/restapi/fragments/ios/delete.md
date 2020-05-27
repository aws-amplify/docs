## DELETE data

```swift
func deleteTodo() {
    let request = RESTRequest(path: "/todo")
    _ = Amplify.API.delete(request: request) { result in
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