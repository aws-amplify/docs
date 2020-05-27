Invoke this api with whatever provider you're using (shown with Facebook below):

```swift
_ = Amplify.Auth.signInWithWebUI(for: .facebook, presentationAnchor: self.view.window!) { result in
            switch result {
            case .success(_):
                print("Sign in succeeded")
            case .failure(let error):
                print("Sign in failed \(error)")
            }
        }
```