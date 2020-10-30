When using a 3rd party OIDC auth provider, you are required to provide an instance of `APIAuthProviderFactory` which is capable of creating an instance of a class that conforms to `AmplifyOIDCAuthProvider`.  The responsibility of the `AmplifyOIDCAuthProvider` is to return the JWT token that was provided by your OIDC provider.  To do this:
* Create a subclass of `APIAuthProviderFactory`
```swift
class MyAPIAuthProviderFactory: APIAuthProviderFactory {
    let myAuthProvider = MyOIDCAuthProvider()

    override func oidcAuthProvider() -> AmplifyOIDCAuthProvider? {
        return myAuthProvider
    }
}
```

* Implement your class which conforms `AmplifyOIDCAuthProvider`
```swift
class MyOIDCAuthProvider : AmplifyOIDCAuthProvider {
    func getLatestAuthToken() -> Result<String, Error> {
       ....
    }
}
```
* Finally, register your instance of `APIAuthProviderFactory` prior to calling `Amplify.configure()`
```swift
let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels())
try Amplify.add(plugin: dataStorePlugin)
try Amplify.add(plugin: AWSAPIPlugin(apiAuthProviderFactory: MyAPIAuthProviderFactory()))
try Amplify.configure()
```
