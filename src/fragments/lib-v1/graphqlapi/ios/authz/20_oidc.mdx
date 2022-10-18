
Add the following code to your app:

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
try Amplify.add(plugin: AWSAPIPlugin(apiAuthProviderFactory: MyAPIAuthProviderFactory()))
try Amplify.configure()
```