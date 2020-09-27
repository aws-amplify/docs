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
        print("Error occurred while fetching the escape hatch \(error)")
    }
}
```

It is not recommended to use`AWSMobileClient` credentials apis like `getToken`, `getAWSCredentials` through the escape hatch object.

You can use the escape hatch to `federatedSignIn` with a valid token from other social providers. Find more details [here](https://docs.amplify.aws/sdk/auth/federated-identities/q/platform/ios)

```swift
awsmobileclient.federatedSignIn(providerName: IdentityProvider.apple.rawValue,
                                            token: "<APPLE_TOKEN_HERE>") { (userState, error) in
        if let error = error {
            print("Error in federatedSignIn: \(error)")
            return
        }

        guard let userState = userState else {
            print("userState unexpectedly nil")
            return
        }
        print("federatedSignIn successful: \(userState)")

}
```        