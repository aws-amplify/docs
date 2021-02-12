If the next step is `confirmSignInWithSMSMFACode`, Amplify Auth has sent the user a random code over SMS, and is waiting to find out if the user successfully received it. To handle this step, your app's UI must prompt the user to enter the code. After the user enters the code, your implementation must pass the value to Amplify Auth `confirmSignIn` API.

Note: the signin result also includes an `AuthCodeDeliveryDetails` member. It includes additional information about the code delivery such as the partial phone number of the SMS recipient.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func confirmSignIn() {
    Amplify.Auth.confirmSignIn(challengeResponse: "<confirmation code received via SMS>") { result in
        switch result {
        case .success(let signInResult):
            print("Confirm sign in succeeded. Next step: \(signInResult.nextStep)")
        case .failure(let error):
            print("Confirm sign in failed \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func confirmSignIn() -> AnyCancellable {
    Amplify.Auth.confirmSignIn(challengeResponse: "<confirmation code received via SMS>")
        .resultPublisher
        .sink {
            if case let .failure(authError) = $0 {
                print("Confirm sign in failed \(authError)")
            }
        }
        receiveValue: { signInResult in
            print("Confirm sign in succeeded. Next step: \(signInResult.nextStep)")
        }
}
```

</amplify-block>

</amplify-block-switcher>
