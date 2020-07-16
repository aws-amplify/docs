```swift
func postTodo() {
    let request = RESTRequest(path: "/todo", body: nil)
    _ = Amplify.API.post(request: request) { result in
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