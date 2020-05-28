You can make a call to the specific client using the friendly name:

```swift
let request = GraphQLRequest(apiName: "friendly_name_API_KEY", ...)
Amplify.API.mutate(request: request, listener: ...)
```