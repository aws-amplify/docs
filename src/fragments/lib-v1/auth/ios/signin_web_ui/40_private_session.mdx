### Prefer private session during signIn

Starting Amplify 1.6.0, `Amplify.Auth.signInWithWebUI` automatically uses [ASWebAuthenticationSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession) internally for iOS 13.0+. For older iOS versions, it will fall back to [SFAuthenticationSession](https://developer.apple.com/documentation/safariservices/sfauthenticationsession).
This release also introduces a new `preferPrivateSession` flag to `AWSAuthWebUISignInOptions` during the sign in flow. If `preferPrivateSession` is set to `true` during sign in, the user will not see a web view displayed when they sign out. `preferPrivateSession` will set [ASWebAuthenticationSession.prefersEphemeralWebBrowserSession](https://developer.apple.com/documentation/authenticationservices/aswebauthenticationsession/3237231-prefersephemeralwebbrowsersessio) internally and the authentication session will be private if the user's preferred browser supports it.

```swift
Amplify.Auth.signInWithWebUI(presentationAnchor: self.view.window!, 
                             options: .preferPrivateSession()) { ... }
```