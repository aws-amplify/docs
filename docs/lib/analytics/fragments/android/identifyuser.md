This call sends information that you have specified about the user to Amazon Pinpoint. This could be an unauthenticated or an authenticated user. The Authentication category assigns all users an `identityId` that can be used to call `Amplify.Analytics.identifyUser`. If you have asked for location access and received permission, you can also provide that in `UserProfile.Location`.

<amplify-block-switcher>
<amplify-block name="Java">

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

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val location = UserProfile.Location.builder()
        .latitude(47.606209)
        .longitude(-122.332069)
        .postalCode("98122")
        .city("Seattle")
        .region("WA")
        .country("USA")
        .build()

val profile = UserProfile.builder()
        .location(location)
        .name("name")
        .email("name@email.com")
        .build()

Amplify.Analytics.identifyUser("UserID", profile)
```

</amplify-block>
</amplify-block-switcher>