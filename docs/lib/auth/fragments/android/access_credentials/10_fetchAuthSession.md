However, if you need to access them in relation to working with an API outside Amplify or want access to AWS specific identifying information (e.g. IdentityId),
you can access these implementation details by casting the result of fetchAuthSession as follows:  

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.Auth.fetchAuthSession(
    result -> {
        AWSCognitoAuthSession cognitoAuthSession = (AWSCognitoAuthSession) result;
            switch(cognitoAuthSession.getIdentityId().getType()) {
                case SUCCESS:
                    Log.i("AuthQuickStart", "IdentityId: " + cognitoAuthSession.getIdentityId().getValue());
                    break;
                case FAILURE:
                    Log.i("AuthQuickStart", "IdentityId not present because: " + cognitoAuthSession.getIdentityId().getError().toString());
            }
        },
        error -> Log.e("AuthQuickStart", error.toString())
);
```

</amplify-block>
<amplify-block name="Kotlin">

 ```kotlin
Amplify.Auth.fetchAuthSession(
    { result ->
        val cognitoAuthSession = result as AWSCognitoAuthSession
        when (cognitoAuthSession.identityId.type) {
            AuthSessionResult.Type.SUCCESS -> Log.i("AuthQuickStart", "IdentityId: " + cognitoAuthSession.identityId.value)
            AuthSessionResult.Type.FAILURE -> Log.i("AuthQuickStart", "IdentityId not present because: " + cognitoAuthSession.identityId.error.toString())
        }
    },
    { error -> Log.e("AuthQuickStart", error.toString()) }
)
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxAmplify.Auth.fetchAuthSession()
    .subscribe(
        result -> {
            AWSCognitoAuthSession cognitoAuthSession = (AWSCognitoAuthSession) result;

            switch (cognitoAuthSession.getIdentityId().getType()) {
                case SUCCESS:
                    Log.i("AuthQuickStart", "IdentityId: " + cognitoAuthSession.getIdentityId().getValue());
                    break;
                case FAILURE:
                    Log.i("AuthQuickStart", "IdentityId not present because: " + cognitoAuthSession.getIdentityId().getError().toString());
            }
        },
        error -> Log.e("AuthQuickStart", error.toString())
    );
```

</amplify-block>
</amplify-block-switcher>
