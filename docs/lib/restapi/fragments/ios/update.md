## Update data

Put data to the API endpoint:

```swift
func putTodo() {
    let request = RESTRequest(path: "/todo", body: nil)
    _ = Amplify.API.put(request: request) { result in
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