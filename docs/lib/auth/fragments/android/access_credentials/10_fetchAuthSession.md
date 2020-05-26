```java
Amplify.Auth.fetchAuthSession(
        result -> {
            AWSCognitoAuthSession cognitoAuthSession = (AWSCognitoAuthSession) result;

            switch(cognitoAuthSession.getAWSCredentials().getType()) {
                case SUCCESS:
                    Log.i("AuthQuickStart", "AWSCredentials" + cognitoAuthSession.getAWSCredentials().getValue().toString());
                case FAILURE:
                    Log.i("AuthQuickStart", "AWSCredentials not present because: " + cognitoAuthSession.getAWSCredentials().getError().toString());
            }
        },
        error -> Log.e("AuthQuickStart", error.toString())
);
```
