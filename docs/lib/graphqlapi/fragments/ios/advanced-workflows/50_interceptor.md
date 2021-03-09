To include custom headers in your outgoing requests, add an `URLRequestInterceptor` to the `AWSAPIPlugin`. Also specify the name of one of the APIs configured in your **amplifyconfiguration.json** file.

```swift
struct CustomInterceptor: URLRequestInterceptor {
    func intercept(_ request: URLRequest) throws -> URLRequest {
        let nsUrlRequest = (request as NSURLRequest)
        guard let mutableRequest = nsUrlRequest.mutableCopy() as? NSMutableURLRequest else {
            throw APIError.unknown("Could not get mutable request", "")
        }
        mutableRequest.setValue("headerValue", forHTTPHeaderField: "headerKey")
        return mutableRequest as URLRequest
    }
}
val apiPlugin = try AWSAPIPlugin()
try apiPlugin.add(interceptor: CustomInterceptor(), for: "yourApiName")
try Amplify.addPlugin(apiPlugin)
```

