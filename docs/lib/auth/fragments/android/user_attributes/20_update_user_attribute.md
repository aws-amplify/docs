To update a single user attribute, call `updateUserAttribute`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
AuthUserAttribute userEmail =
    new AuthUserAttribute(AuthUserAttributeKey.email(), "email@email.com");
Amplify.Auth.updateUserAttribute(userEmail,
    result -> Log.i("AuthDemo", "Updated user attribute = " + result.toString()),
    error -> Log.e("AuthDemo", "Failed to update user attribute.", error)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val userEmail = AuthUserAttribute(AuthUserAttributeKey.email(), "email@email.com")
Amplify.Auth.updateUserAttribute(userEmail,
    { Log.i("AuthDemo", "Updated user attribute = $it") },
    { Log.e("AuthDemo", "Failed to update user attribute.", $it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
AuthUserAttribute userEmail =
    new AuthUserAttribute(AuthUserAttributeKey.email(), "email@email.com");
RxAmplify.Auth.updateUserAttribute(userEmail)
    .subscribe(
        result -> Log.i("AuthDemo", "Updated user attribute = " + result.toString()),
        error -> Log.e("AuthDemo", "Failed to update user attribute.", error)
    );
```

</amplify-block>
</amplify-block-switcher>

To update multiple user attributes at a time, call `updateUserAttributes`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.updateUserAttributes(
    attributes, // attributes is a list of AuthUserAttribute
    result -> Log.i("AuthDemo", "Updated user attributes = " + result.toString()),
    error -> Log.e("AuthDemo", "Failed to update user attributes.", error.)
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.updateUserAttributes(
    attributes, // attributes is a list of AuthUserAttribute
    { Log.i("Updated user attributes = $it") },
    { Log.e("Failed to update user attributes.", $it) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
// attributes is a list of AuthUserAttribute
RxAmplify.Auth.updateUserAttributes(attributes)
    .subscribe(
        result -> Log.i("AuthDemo", "Updated user attributes = " + result.toString()),
        error -> Log.e("AuthDemo", "Failed to update user attributes.", error)
    );
```

</amplify-block>
</amplify-block-switcher>
