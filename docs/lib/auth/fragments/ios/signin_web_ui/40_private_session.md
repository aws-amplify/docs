### Prefer private session during signIn

Starting Amplify 1.6.0, `Amplify.Auth.signInWithWebUI` automatically uses `ASWebAuthenticationSession` internally for iOS 13.0+. For older iOS versions, it will fall back to `SFAuthenticationSession`.
This release also introduces a new `preferPrivateSession` flag to `AWSAuthWebUISignInOptions` during the sign in flow. If `preferPrivateSession` is set to `true` during sign in, and the user's preferred browser supports `ASWebAuthenticationSession.prefersEphemeralWebBrowserSession`, the user will not see a web view displayed when they sign out.

```swift
Amplify.Auth.signInWithWebUI(presentationAnchor: self.view.window!, 
                             options: .preferPrivateSession()) { ... }
```