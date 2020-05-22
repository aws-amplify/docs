This call sends information that you have specified about the user to Amazon Pinpoint. This could be an authenticated or guest user. AWSMobileClient assigns all users an `identityId` that can be used to call `Amplify.Analytics.identifyUser()`. If you have asked for location access and received the user's location information, you can also provide that in `AnalyticsUserProfile.Location`.

```swift
func identifyUser() {

    var identityId: String?
    
    // Get identityId
    _ = Amplify.Auth.fetchAuthSession(listener: { event in
        switch event {
        case .success(let authSession):
            let cognitoAuthSession = (authSession as? AuthCognitoIdentityProvider)?.getIdentityId()
            switch cognitoAuthSession {
            case .success(let identityId):
                identityId = identityId
            case .failure(let error):
                print("Failed to get identity id: \(error)")
            }
        case .failure(let error):
            print("Failed to fetch auth session: \(error)")
        }
    })

    let location = AnalyticsUserProfile.Location(latitude: 47.606209,
                                                    longitude: -122.332069,
                                                    postalCode: "98122",
                                                    city: "Seattle",
                                                    region: "WA",
                                                    country: "USA")

    let userProfile = AnalyticsUserProfile(name: "name",
                                            email: "name@example.com",
                                            phoneNumber: "206-266-1000"
                                            location: location)

    Amplify.Analytics.identifyUser(identityId as String, withProfile: userProfile)

}
```
