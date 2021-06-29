<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchAuthSession(
    result -> {
        AWSCognitoAuthSession cognitoAuthSession = (AWSCognitoAuthSession) result;
            // Check refresh token is valid or not
            switch (cognitoAuthSession.getUserPoolTokens().getType()) {
                case SUCCESS:
                    Log.i("AuthQuickStart", "Refresh token is valid.");
                    break;
                case FAILURE:
                    Log.e("AuthQuickStart", "Refresh token expired. User must re-authenticate by signing in again.", cognitoAuthSession.getUserPoolTokens().getError());
                    // Check whether AuthSession is expired
                    subscribeToAuthEvents();
            }
        Log.i("AuthQuickstart", result.isSignedIn() ? "User is signed in" : "User is signed out");
    },
    error -> Log.e("AuthQuickstart", "Failed to determine user sign-in state" + error.toString())
);

private void subscribeToAuthEvents() {
    Amplify.Hub.subscribe(HubChannel.AUTH,
            hubEvent -> {
                if (AuthChannelEventName.valueOf(hubEvent.getName()) == AuthChannelEventName.SESSION_EXPIRED) {
                    Log.i("AuthQuickstart", "Auth session just expired.");
                }
            }
    );
}
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

```kotlin
Amplify.Auth.fetchAuthSession(
    {
        val cognitoAuthSession = it as AWSCognitoAuthSession
        // Check refresh token is valid or not
        when (cognitoAuthSession.userPoolTokens.type) {
            AuthSessionResult.Type.SUCCESS ->
                Log.i("AuthQuickStart", "Refresh token is valid.")
            AuthSessionResult.Type.FAILURE -> {
                Log.e(
                    "AuthQuickStart",
                    "Refresh token expired. User must re-authenticate by signing in again." + cognitoAuthSession.userPoolTokens.error
                )
                // Check whether AuthSession is expired
                subscribeToAuthEvents()
            }
        }
        if (it.isSignedIn) {
            Log.i("AuthQuickstart", "User is signed in")
        } else {
            Log.i("AuthQuickstart", "User is signed out")
        }
    },
    { Log.e("AuthQuickStart", "Failed to fetch session", it) }
)

private fun subscribeToAuthEvents() {
    Amplify.Hub.subscribe(HubChannel.AUTH) { event ->
        if (AuthChannelEventName.valueOf(event.name) == AuthChannelEventName.SESSION_EXPIRED) {
            Log.i("AuthQuickstart", "Auth session just expired.")
        }
    }
}
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

```kotlin
try {
    val result = Amplify.Auth.fetchAuthSession()
    val cognitoAuthSession = result as AWSCognitoAuthSession
    // Check refresh token is valid or not
    when (cognitoAuthSession.userPoolTokens.type) {
        AuthSessionResult.Type.SUCCESS ->
            Log.i("AuthQuickStart", "Refresh token is valid.")
        AuthSessionResult.Type.FAILURE -> {
                Log.e(
                    "AuthQuickStart",
                    "Refresh token expired. User must re-authenticate by signing in again." + cognitoAuthSession.userPoolTokens.error
                )
                // Check whether AuthSession is expired
                subscribeToAuthEvents()
            }
    }
    if (result.isSignedIn) {
        Log.i("AuthQuickstart", "User is signed in")
    } else {
        Log.i("AuthQuickstart", "User is signed out")
    }
} catch (error: AuthException) {
    Log.e("AuthQuickStart", "Failed to fetch Auth session", error)
}

private suspend fun subscribeToAuthEvents() {
    Amplify.Hub.subscribe(HubChannel.AUTH).collect {
        if (AuthChannelEventName.valueOf(it.name) == AuthChannelEventName.SESSION_EXPIRED) {
            Log.i("AuthQuickstart", "Auth session just expired.")
        }
    }
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.fetchAuthSession()
    .subscribe(
            result -> {
                AWSCognitoAuthSession cognitoAuthSession = (AWSCognitoAuthSession) result;
                // Check refresh token is valid or not
                switch (cognitoAuthSession.getUserPoolTokens().getType()) {
                    case SUCCESS:
                        Log.i("AuthQuickStart", "Refresh token is valid.");
                        break;
                    case FAILURE:
                        Log.e("AuthQuickStart", "Refresh token expired. User must re-authenticate by signing in again.", cognitoAuthSession.getUserPoolTokens().getError());
                        // Check whether AuthSession is expired
                        subscribeToAuthEvents();
                }
                Log.i("AuthQuickstart", result.isSignedIn() ? "User is signed in" : "User is signed out");
            },
            error -> Log.e("AuthQuickstart", "Failed to fetch AuthSession" + error.toString())
    );

private void subscribeToAuthEvents() {
    RxAmplify.Hub.on(HubChannel.AUTH)
            .map(HubEvent::getName)
            .subscribe(name -> {
                if (AuthChannelEventName.valueOf(name) == AuthChannelEventName.SESSION_EXPIRED) {
                    Log.i("AuthQuickstart", "Auth session just expired.");
                }
            }
    );
}
```

</amplify-block>
</amplify-block-switcher>
