This call sends information that you have specified about a user to Amazon Pinpoint. This could be for an unauthenticated (guest) or an authenticated user.

You can get the current user's ID from the Amplify Auth category as shown below. Be sure you have it added and setup per the Auth category documentation.

If you have asked for location access and received permission, you can also provide that in `AnalyticsUserProfileLocation`


```dart

AnalyticsUserProfileLocation location = new AnalyticsUserProfileLocation();
    location.latitude = 47.606209;
    location.longitude = -122.332069;
    location.postalCode = "98122";
    location.city = "Seattle";
    location.region = "WA";
    location.country = "USA";

AnalyticsProperties properties = new AnalyticsProperties();
    properties.addStringProperty("phoneNumber", "+11234567890"); 
    properties.addIntProperty("age", 25); 

AnalyticsUserProfile userProfile = new AnalyticsUserProfile();
    userProfile.name = username;
    userProfile.email = "name@example.com";
    userProfile.location = location; 

Amplify.Analytics.identifyUser(userId: userId, userProfile: profile);
```