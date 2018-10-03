# Customize the SDK Sign-In UI

By default, the SDK presents sign-in UI for each sign in provider you enable in your Mobile Hub project (Email and Password, Facebook, Google) with a default look and feel. It knows which provider(s) you chose by reading the `awsconfiguration.json` file you integrated with your app.

To override the defaults, and modify the behavior, look, and feel of the sign-in UI, create an `AuthUIConfiguration` object and set the appropriate properties.


iOS - Swift

Create and configure an `AWSAuthUIConfiguration` object and set its properties.

Create and configure an `AuthUIConfiguration` object.

* To present the Email and Password user `SignInUI`, set `enableUserPoolsUI` to `true`.

* To present Facebook or Google  user `SignInUI`, add `.addSignInButtonView(class: AWSFacebookSignInButton.self)` or `.addSignInButtonView(class: AWSFacebookSignInButton.self)`.

* To change the logo, use `logoImage`.

* To change the background color, use `backgroundColor`.

* To cancel the sign-in flow, use `canCancel`.

* To change the font in the sign-in views, use the `font` property and pass in the `UIFont` object that represents a font family.

* To draw the `backgroundColor` full screen, use `fullScreenBackgroundColor`.

```swift
import UIKit
import AWSAuthUI
import AWSMobileClient
import AWSUserPoolsSignIn
import AWSFacebookSignIn
import AWSGoogleSignIn

class SampleViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        if !AWSSignInManager.sharedInstance().isLoggedIn {
            presentAuthUIViewController()
        }
    }

    func presentAuthUIViewController() {
        let config = AWSAuthUIConfiguration()
        config.enableUserPoolsUI = true
        config.addSignInButtonView(class: AWSFacebookSignInButton.self)
        config.addSignInButtonView(class: AWSGoogleSignInButton.self)
        config.backgroundColor = UIColor.blue
        config.font = UIFont (name: "Helvetica Neue", size: 20)
        config.isBackgroundColorFullScreen = true
        config.canCancel = true

        AWSAuthUIViewController.presentViewController(
            with: self.navigationController!,
            configuration: config, completionHandler: { (provider: AWSSignInProvider, error: Error?) in
                if error == nil {
                    // SignIn succeeded.
                } else {
                    // end user faced error while loggin in, take any required action here.
                }
        })
    }
}
```
