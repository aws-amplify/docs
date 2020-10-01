Invoke this api with whatever provider you're using (shown with Facebook below):

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func socialSignInWithWebUI() {
    Amplify.Auth.signInWithWebUI(for: .facebook, presentationAnchor: self.view.window!) { result in
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
func socialSignInWithWebUI() -> AnyCancellable {
    Amplify.Auth.signInWithWebUI(for: .facebook, presentationAnchor: self.view.window!)
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
