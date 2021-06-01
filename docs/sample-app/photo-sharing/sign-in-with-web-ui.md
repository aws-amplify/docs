---
title: Sign In With WebUI
description: This section elaborates how PhotoSharing App makes use of Authentication Category to perform Auth Flow.
disableTOC: true
filterKey: platform
---

This section elaborates how PhotoSharing App makes use of [Authentication Category](https://docs.amplify.aws/lib/auth/getting-started/q/platform/ios) to perform Auth Flow.

When App is launched. It performs a AuthSession check by calling [Amplify.Auth.fetchAuthSession](https://docs.amplify.aws/lib/auth/getting-started/q/platform/ios#check-the-current-auth-session).

## OnboardingView/Signed Out State
If user is signed out, the App shows `OnboardingView` which is a view allows user to register and sign in

Below is the `webSignIn` method in `AmplifyAuthService`
```swift
class AmplifyAuthService: AuthService {

    @Published private(set) var sessionState: SessionState = .signedOut
    var authUser: AuthUser?

    /*
    other variables and methods
    */

    func webSignIn(completion: @escaping (Result<Void, AuthError>) -> Void) {
        _ = Amplify.Auth.signInWithWebUI(presentationAnchor: window,
                                         options: .preferPrivateSession()) { result in
            switch result {
            case .success:
                guard let user = Amplify.Auth.getCurrentUser() else {
                    self.authUser = nil
                    self.sessionState = .signedOut
                    return
                }

                self.authUser = user
                self.sessionState = .signedIn(user)
                completion(.successfulVoid)
            case .failure(let error):
                if case .service(_, _, let underlyingError) = error,
                   case .userCancelled = (underlyingError as? AWSCognitoAuthError) {
                    return
                } else {
                    completion(.failure(error))
                }
            }
        }
    }
}
```

### Several notes in this method:
1. Once `webSignIn` is successful, it calls `Amplify.Auth.getCurrentUser()` to fetch `AuthUser` and set sessionState to be `.signedIn(user)` accordingly, otherwise, set `authUser = nil` and `sessionState = .signedOut`.

2. In SwiftUI, `window` variable of type `UIWindow` can be be a computed property like this

```swift
class AmplifyAuthService: AuthService {

    /*
    other variables and methods
    */

    private var window: UIWindow {
        guard
            let scene = UIApplication.shared.connectedScenes.first,
            let windowSceneDelegate = scene.delegate as? UIWindowSceneDelegate,
            let window = windowSceneDelegate.window as? UIWindow
        else { return UIWindow() }

        return window
    }
}
```

3. Noticed that in the `.failure` case, it is filtering out a specific error `.userCancelled` so that whenever user tap Cancel button of WebUI, `AlertView` is not presenting.

4. The reason of passing `.preferPrivateSession()` as an option is explained [here](https://docs.amplify.aws/lib/auth/signin_web_ui/q/platform/ios#prefer-private-session-during-signin)

## UserProfileView/Signed In State

If user is signed in with valid token, user is able to sign out

Below is the `signOut` method

```swift
class AmplifyAuthService: AuthService {

    /*
    other variables and methods
    */

    func signOut(completion: @escaping (Result<Void, AuthError>) -> Void) {
        _ = Amplify.Auth.signOut { result in
            switch result {
            case .success:
                self.authUser = nil
                self.sessionState = .signedOut
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
}
```



