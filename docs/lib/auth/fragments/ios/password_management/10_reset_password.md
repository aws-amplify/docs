```swift
func resetPassword(username: String) {

    _ = Amplify.Auth.resetPassword(for: username) { result in

        do {
            let resetResult = try result.get()
            switch resetResult.nextStep {
            case .confirmResetPasswordWithCode(let deliveryDetails, let info):
                print("Confirm reset password with code send to - \(deliveryDetails) \(info)")
            case .done:
                print("Reset completed")
            }
        } catch {
            print("Reset password failed with error \(error)")
        }
    }
}
```
Usually resetting the password require you to verify that it is the actual user that tried to reset the password. So the next step above will be `.confirmResetPasswordWithCode`.