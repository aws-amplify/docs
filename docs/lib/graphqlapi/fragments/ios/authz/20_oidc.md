

Add the following code to your app:

```swift
public class MyOidcURLRequestInterceptor: URLRequestInterceptor {

    public func intercept(_ request: URLRequest) throws -> URLRequest {
        guard let mutableRequest = (request as NSURLRequest).mutableCopy() as? NSMutableURLRequest else {
            throw APIError.unknown("Could not get mutable request", "")
        }
        mutableRequest.setValue(NSDate().aws_stringValue(AWSDateISO8601DateFormat2), forHTTPHeaderField: "X-Amz-Date")
        mutableRequest.setValue("application/json", forHTTPHeaderField: "Content-Type")
        mutableRequest.setValue("amplify-ios/0.0.1 Amplify", forHTTPHeaderField: "User-Agent")

        let token = "MyToken"
        mutableRequest.setValue(token, forHTTPHeaderField: "authorization")
        return mutableRequest as URLRequest
    }
}

do {
    // Initialize Amplify with the interceptor
    let apiPlugin = AWSAPIPlugin()
    do {
        try Amplify.add(plugin: apiPlugin)
        try Amplify.configure()
        print("Amplify initialized")
        let interceptor = MyOidcURLRequestInterceptor()
        try Amplify.API.add(interceptor: interceptor, for: "<YOUR-GRAPHQENDPOINT-NAME>")
    } catch {
        print("Failed to configure Amplify \(error)")
    }
} catch {
    print("Error initializing appsync client. \(error)")
}
```
