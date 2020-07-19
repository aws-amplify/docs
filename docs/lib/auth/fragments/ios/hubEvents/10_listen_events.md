```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.

    _ = Amplify.Hub.listen(to: .auth) { payload in
        switch payload.eventName {
        case HubPayload.EventName.Auth.signedIn:
            print("User signed in")
            // Update UI

        case HubPayload.EventName.Auth.sessionExpired:
            print("Session expired")
            // Re-authenticate the user

        case HubPayload.EventName.Auth.signedOut:
            print("User signed out")
            // Update UI

        default:
            break
        }
    }
}
```