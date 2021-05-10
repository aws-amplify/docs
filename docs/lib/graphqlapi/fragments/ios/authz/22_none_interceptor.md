You can also register your own request interceptor to intercept the request and perform an action or inject something into your request before it it performed. 

Define `MyCustomInterceptor`:

```swift
class MyCustomInterceptor: URLRequestInterceptor {
    
    func intercept(_ request: URLRequest) throws -> URLRequest {
        guard let mutableRequest = (request as NSURLRequest).mutableCopy() as? NSMutableURLRequest else {
            throw APIError.unknown("Could not get mutable request", "")
        }
        mutableRequest.setValue("headerValue", forHTTPHeaderField: "headerField")
        return mutableRequest as URLRequest
    }
}
```

Add your custom interceptor after Amplify has been configured:

```swift
try Amplify.configure()
try Amplify.API.add(interceptor: MyCustomInterceptor(), for: "[YOUR-ENDPOINT-NAME]")
```

