The `AWSMobileClient` client supports easy "drop-in" UI for your application. You can add drop-in Auth UI like so:

```swift
AWSMobileClient.default().showSignIn(navigationController: self.navigationController!, { (signInState, error) in
    if let signInState = signInState {
        print("Sign in flow completed: \(signInState)")
    } else if let error = error {
        print("error logging in: \(error.localizedDescription)")
    }
})
```

IMPORTANT: The drop-in UI requires the use of a navigation controller to anchor the view controller. Please make sure the app has an active navigation controller which is passed to the `navigationController` parameter.

## Customization

Currently, you can change the following properties of the drop-in UI with the `AWSMobileClient`:
- Logo: Any image file of png or jpg
- Background Color: Any iOS UIColor

```swift
AWSMobileClient.default()
    .showSignIn(navigationController: self.navigationController!,
                     signInUIOptions: SignInUIOptions(
                           canCancel: false,
                           logoImage: UIImage(named: "MyCustomLogo"),
                            backgroundColor: UIColor.black)) { (result, err) in
                            //handle results and errors               
}
```

You can also dismiss the sign in process by setting the `canCancel` property. 