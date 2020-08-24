<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.

    // Assumes `unsubscribeToken` is declared as an instance variable in your view
    unsubscribeToken = Amplify.Hub.listen(to: .auth) { payload in
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

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    // Do any additional setup after loading the view.

    // Assumes `sink` is declared as an instance variable in your view controller
    sink = Amplify.Hub
        .publisher(for: .auth)
        .sink { payload in
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

</amplify-block>

</amplify-block-switcher>
