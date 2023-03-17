When using a third-party OIDC auth provider, you are required to provide an instance of `APIAuthProviderFactory`. Your factory implementation must be capable of creating objects conforming to the `AmplifyOIDCAuthProvider` protocol. The responsibility of the `AmplifyOIDCAuthProvider` is to return the JWT token that was provided by your OIDC provider. To do this:
* Create a subclass of `APIAuthProviderFactory`
```swift
class MyAPIAuthProviderFactory: APIAuthProviderFactory {
    let myAuthProvider = MyOIDCAuthProvider()

    override func oidcAuthProvider() -> AmplifyOIDCAuthProvider? {
        return myAuthProvider
    }
}
```

* Implement your class which conforms to `AmplifyOIDCAuthProvider`:
```swift
class MyOIDCAuthProvider : AmplifyOIDCAuthProvider {
    func getLatestAuthToken() -> Result<String, Error> {
       ....
    }
}
```
* Finally, register your instance of `APIAuthProviderFactory` prior to calling `Amplify.configure()`:
```swift
let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels())
try Amplify.add(plugin: dataStorePlugin)
try Amplify.add(plugin: AWSAPIPlugin(apiAuthProviderFactory: MyAPIAuthProviderFactory()))
try Amplify.configure()
```
