```swift

import AmplifyPlugins

func getEscapeHatch() {
    do {
        let plugin = try Amplify.Auth.getPlugin(for: "awsCognitoAuthPlugin") as! AWSCognitoAuthPlugin
        guard case let .awsMobileClient(awsmobileclient) = plugin.getEscapeHatch() else {
            print("Failed to fetch escape hatch")
            return
        }
        print("Fetched escape hatch - \(awsmobileclient)")

    } catch {
        print("Error occured while fetching the escape hatch \(error)")
    }
}
```

It is not recommened to use`AWSMobileClient` credentials apis like `getToken`, `getAWSCredentials` through the escape hatch object.