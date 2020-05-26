This call sends information that you have specified about the user to Amazon Pinpoint. This could be an authenticated user. User is assigned with userId in Cognito User Pool. If the user is signed in through [Amplify.Auth.signIn](~/lib/auth/signin.md), then you can retrieve the current user and use their userId to identify the user with Analytics. If you have asked for location access and received the user's location information, you can also provide that in `AnalyticsUserProfile.Location`.

```swift
func identifyUser() {

    guard let user = Amplify.Auth.getCurrentUser() else {
        print("User is not signed in")
        return
    }
    // Get userId

    let location = AnalyticsUserProfile.Location(latitude: 47.606209,
                                                    longitude: -122.332069,
                                                    postalCode: "98122",
                                                    city: "Seattle",
                                                    region: "WA",
                                                    country: "USA")

    let userProfile = AnalyticsUserProfile(name: "name",
                                            email: "name@example.com",
                                            location: location)

    Amplify.Analytics.identifyUser(user.userId as String, withProfile: userProfile)

}
```
