If you would like to add request headers, you can add it directly to the request
```swift
let headers: [String: String] = ["headerField": "headerValue"]
let request = RESTRequest(headers: headers)
```