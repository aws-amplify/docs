The `AWSMobileClient` client supports a simple "drop-in" UI for your application. You can add drop-in Auth UI like so:

```java
// 'this' refers the current active activity
AWSMobileClient.getInstance().showSignIn(this, new Callback<UserStateDetails>() {
    @Override
    public void onResult(UserStateDetails result) {
        Log.d(TAG, "onResult: " + result.getUserState());
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "onError: ", e);
    }
});
```

In the above code you would have created an Android Activity called `NextActivity` which would automatically be navigated to upon successful sign-up and sign-in. For testing, you can alternatively just use `MainActivity.class` after initializing:

```java
AWSMobileClient.getInstance().showSignIn(
        this,
        SignInUIOptions.builder()
                .nextActivity(NextActivity.class)
                .build(),
        new Callback<UserStateDetails>() {
            @Override
            public void onResult(UserStateDetails result) {
                Log.d(TAG, "onResult: " + result.getUserState());
                switch (result.getUserState()){
                    case SIGNED_IN:
                        Log.i("INIT", "logged in!");
                        break;
                    case SIGNED_OUT:
                        Log.i(TAG, "onResult: User did not choose to sign-in");
                        break;
                    default:
                        AWSMobileClient.getInstance().signOut();
                        break;
                }
            }

            @Override
            public void onError(Exception e) {
                Log.e(TAG, "onError: ", e);
            }
        }
);
```

The above code also shows an additional Auth API, `signOut()`. For more advanced scenarios, you can call the `AWSMobileClient` APIs, such as for building your own UI or using functionality in different UX of your application lifecycle.

## Customization

Currently, you can change the following properties of the drop-in UI with the `AWSMobileClient`:
- Logo: Any Drawable resource supported by ImageView
- Background Color: Any color Android supported

```java
AWSMobileClient.getInstance().showSignIn(
        this,
        SignInUIOptions.builder()
                .nextActivity(NextActivity.class)
                .logo(R.id.logo)
                .backgroundColor(R.color.black)
                .canCancel(false)
                .build(),
        new Callback<UserStateDetails>() {
            @Override
            public void onResult(UserStateDetails result) {
                Log.d(TAG, "onResult: " + result.getUserState());
            }


            @Override
            public void onError(Exception e) {
                Log.e(TAG, "onError: ", e);
            }
        }
);
```

You can allow the sign in process to be dismissed by setting the `canCancel` property. 