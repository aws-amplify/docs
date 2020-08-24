Sweet! You're now ready to launch sign in with web UI. The `signInWithWebUI` api require a presentationAnchor and for an iOS app it will be the main UIWindow of the app. The example code below assume that you are in a UIViewController where you can fetch the UIWindow instance by `self.view.window`.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func signInWithWebUI() {
    Amplify.Auth.signInWithWebUI(presentationAnchor: self.view.window!) { result in
        switch result {
        case .success:
            print("Sign in succeeded")
        case .failure(let error):
            print("Sign in failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func signInWithWebUI() -> AnyCancellable {
    Amplify.Auth.signInWithWebUI(presentationAnchor: self.view.window!)
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Sign in failed \(authError)")
            }
        }
        receiveValue: { _ in
            print("Sign in succeeded")
        }
}
```

</amplify-block>

</amplify-block-switcher>
