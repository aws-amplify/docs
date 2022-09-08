
Add the following code to your app:

* Create a subclass of `APIAuthProviderFactory`
```swift
class MyAPIAuthProviderFactory: APIAuthProviderFactory {
    let myAuthProvider = MyFunctionAuthProvider()

    open func functionAuthProvider() -> AmplifyFunctionAuthProvider? {
        return MyFunctionAuthProvider()
    }
}
```

* Implement your class which conforms to `AmplifyFunctionAuthProvider`:
```swift
class MyFunctionAuthProvider : AmplifyFunctionAuthProvider {
    func getLatestAuthToken() -> Result<AuthToken, Error> {
       ....
    }
}
```
* Finally, register your instance of `APIAuthProviderFactory` prior to calling `Amplify.configure()`:
```swift
try Amplify.add(plugin: AWSAPIPlugin(apiAuthProviderFactory: MyAPIAuthProviderFactory()))
try Amplify.configure()
```