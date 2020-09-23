To update a single user attribute, call `updateUserAttribute`:

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.updateUserAttribute(new AuthUserAttribute(AuthUserAttributeKey.email(), "email@email.com"),
    result -> Log.i("Update user attribute succeeded", "Result: " + result.toString()),
    error -> Log.e("Update user attribute failed", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.updateUserAttribute(
    AuthUserAttribute(AuthUserAttributeKey.email(), "email@email.com"),
    { result-> Log.i("Update user attribute succeeded", "Result: " + result.toString()) },
    { error-> Log.e("Update user attribute failed", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.updateUserAttribute(AuthUserAttribute(AuthUserAttributeKey.email(), "email@email.com"))
    .subscribe(
        result -> Log.i("Update user attribute succeeded", "Result: " + result.toString()),
        error -> Log.e("Update user attribute failed", error.toString())
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
    result -> Log.i("Update user attributes succeeded", "Result: " + result.toString()),
    error -> Log.e("Update user attributes failed", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.Auth.updateUserAttributes(
    attributes, // attributes is a list of AuthUserAttribute
    { result-> Log.i("Update user attributes succeeded", "Result: " + result.toString()) },
    { error-> Log.e("Update user attributes failed", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
// attributes is a list of AuthUserAttribute
RxAmplify.Auth.updateUserAttributes(attributes)
    .subscribe(
        result -> Log.i("Update user attributes succeeded", "Result: " + result.toString()),
        error -> Log.e("Update user attributes failed", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
