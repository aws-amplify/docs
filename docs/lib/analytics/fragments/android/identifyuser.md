This call sends information that you have specified about the user to Pinpoint. This could be an unauthenticated or an authenticated user. AWSMobileClient assigns all users an `identityId` that can be used to call `Amplify.Analytics.identifyUser` with. If you have asked for location access and got the user's location information, you can also provide that in `UserProfile.Location`.


```java
UserProfile.Location location = UserProfile.Location.builder()
    .latitude(47.606209)
    .longitude(-122.332069)
    .postalCode("98122")
    .city("Seattle")
    .region("WA")
    .country("USA")
    .build();

UserProfile profile = UserProfile.builder()
    .location(location)
    .name("name")
    .email("name@email.com")
    .build();

Amplify.Analytics.identifyUser("UserID", profile);
```
