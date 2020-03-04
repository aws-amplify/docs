**Availability Note**
Currently, the federation feature in the AWSMobileClient supports Cognito Identity Pools only.
{: .callout .callout--info}

### Federated Sign In

```java
AWSMobileClient.getInstance().federatedSignIn(IdentityProvider.FACEBOOK.toString(), "FACEBOOK_TOKEN_HERE", new Callback<UserStateDetails>() {
    @Override
    public void onResult(final UserStateDetails userStateDetails) {
        //Handle the result
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "sign-in error", e);
});
```

`federatedSignIn()` can be used to obtain federated "Identity ID" using external providers like Google, Facebook or Twitter. If the tokens are expired and new tokens are needed, a notification will be dispatched on the `AWSMobileClient` listener with the user state `SIGNED_OUT_FEDERATED_TOKENS_INVALID`. You can give the updated tokens via the same `federatedSignIn()` method. 

The API calls to get AWS credentials will be asynchronously blocked until you fetch the social provider's token and give it to `AWSMobileClient`. Once you pass the tokens, the `AWSMobileClient` will fetch AWS Credentials using the new tokens and unblock all waiting calls. It will then use the new credentials.

#### SAML with Cognito Identity

To federate your SAML sign-in provider as a user sign-in provider for AWS services called in your app, you will pass tokens to `AWSMobileClient.getInstance().federatedSignIn()`. 
You must first register your SAML application with AWS IAM by using the the following [instructions](https://docs.aws.amazon.com/cognito/latest/developerguide/saml-identity-provider.html). 

Once you retrieve the SAML tokens from your sign-in, you can call the `federatedSignIn` API in `AWSMobileClient`:

```java
// Perform SAML token federation
AWSMobileClient.getInstance().federatedSignIn("YOUR_SAML_PROVIDER_NAME", "YOUR_SAML_TOKEN", new Callback<UserStateDetails>() {
    @Override
    public void onResult(final UserStateDetails userStateDetails) {
        //Handle the result
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "sign-in error", e);
});
```

**Note**
If the SAML token contains more than one Role ARN, you will need to specify which role will be assumed when federating. If the SAML token has more than one Role ARN and a `customRoleARN` is not specified, it will result in an error.
{: .callout .callout--info}

```java
// Choose one of the roles available in the token
FederatedSignInOptions options = FederatedSignInOptions.builder()
                                     .customRoleARN("choose-one")
                                     .build();
// Perform SAML token federation
AWSMobileClient.getInstance().federatedSignIn("YOUR_SAML_PROVIDER_NAME", "YOUR_SAML_TOKEN", options, new Callback<UserStateDetails>() {
    @Override
    public void onResult(final UserStateDetails userStateDetails) {
        //Handle the result
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "sign-in error", e);
});
```

#### Facebook with Cognito Identity

To federate Facebook as a user sign-in provider for AWS services called in your app, you will pass tokens to `AWSMobileClient.getInstance().federatedSignIn()`. You must first register your application with Facebook by using the [Facebook Developers portal](https://developers.facebook.com/) and configure this with Amazon Cognito Identity Pools.

AWS Amplify helps set this up for you but first this topic explains how to set up Facebook as an identity provider for your app.

If you already have a Facebook app ID, you can copy and paste it into the `Facebook App ID` field
when configuring authentication using the AWS Amplify CLI.
{: .callout .callout--info}

**To get a Facebook app ID**

1. In the [Facebook Developers portal](https://developers.facebook.com/), sign in with your
   Facebook credentials.

2. From `Create App`, choose `Add a New App` (note: this menu label will be
   `My Apps` if you have previously created an app.


  ![Image](~/images/new-facebook-app.png)

3. If asked, choose the platform of your app that will use Facebook sign-in, and `basic
   setup`.

4. Type a display name for your app, select a category for your app from the `Category`
   drop-down list, and then choose `Create App ID`.

  ![Image](~/images/new-facebook-app-new-app-id.png)


5. Complete the `Security Check` that appears. Your new app then appears in the
   `Dashboard`.

  ![Image](~/images/new-facebook-app-id.png)

6. Copy the App ID and note it for later when using the Amplify CLI.

7. In the Facebook Developer portal's left hand navigation list, choose `Settings`, then
   choose `+ Add Platform`.

  ![Image](~/images/new-facebook-add-platform.png)

8. Choose your platform and provide information about your app that Facebook will use for
   integration during credential validation.

9. In the Facebook Developers portal, choose `Save changes`, then `Use this
   package name` if a dialog appears saying that Google Play has an issue with your package name.

10. Only users with roles assigned in the Facebook portal will be able to authenticate through your
   app while it is in development (not yet published).

    To authorize users, in the Facebook Developer portal's left hand navigation list, choose
    `Roles`, then `Add Testers`. Provide a valid Facebook ID.

![Image](~/images/new-facebook-add-testers.png)

For more information about integrating with Facebook Login, see the [Facebook Getting Started Guide](https://developers.facebook.com/docs/facebook-login).

**Amplify CLI Configuration - Facebook**

In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI prompts you for configuration parameters. Choose **I will setup my own configuration** and **AWS IAM controls** when prompted.

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add auth              ##"amplify update auth" if already configured
❯ Manual Configuration
❯ User Sign-Up, Sign-In, connected with AWS IAM controls
```

Choose **YES** to `? Allow unauthenticated logins?` and **YES** to `? Do you want to enable 3rd party authentication providers in your identity pool?`.

**Choose Facebook** and then provide your Facebook **App ID** that you saved earlier.

When configuration for Facebook sign-in is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. Run the following to update your changes in the cloud:

```bash
$ amplify push
```

You can now [configure Facebook in your mobile app](./authentication#facebook-login-in-your-mobile-app).

Note that the CLI allows you to select more than one identity provider for your app. You can also run `amplify auth update` to add an identity provider to an existing auth configuration.

#### Google with Cognito Identity

To federate Google as a user sign-in provider for AWS services called in your app, you will pass tokens to `AWSMobileClient.getInstance().federatedSignIn()`. You must first register your application with Google Sign-In in the Google Developers Console, and then configure this with Amazon Cognito Identity Pools.

To implement Google Sign-in into your Android app, you need two things: 

1. OAuth Web Client ID 
2. Android Client ID

These Client IDs are part of your Google Developers project. The Web Client ID will be used by Cognito Identity Pools to manage the OAuth flow between Cognito and Google on the server side. The Android Client ID will be used in your Android app to authorize the OAuth flow directly with Google allowing your users to authenticate with Google using their Google login credentials.

**NOTE:** The creation and configuration steps for creating OAuth Clients for Google Sign-In is constantly changing, always refer to the official setup instructions from Google.

First, navigate to the [Configure a Google API Console project](https://developers.google.com/identity/sign-in/android/start-integrating) and click **Configure a Project** to get an OAuth client ID. When you select an existing or new project, this will automatically create the "Web Client ID" for you in the background fulfilling requirement #1 above.

When prompted choose **Android** as the calling platform along with your Package name and certificate. Once created the **Android Client ID** will be created. Copy this as you will use it when configuring your backend with the Amplify CLI.

Next, obtain your **OAuth Web Client ID** from your project credentials navigating directly to the [Credentials section of the Google Developer console](https://console.developers.google.com/apis/credentials). Select your project (you may need to click **All**) and under **OAuth 2.0 client IDs** copy the Client ID associated with the Web application type. Save it for the next step. The Android Client ID from earlier is listed here as well.

![Image](~/images/Android_OAuth.png)

After completing the steps above, note both of the **Google Client IDs** for usage with the Amplify CLI in the next section.

**Amplify CLI Configuration - Google**

In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI prompts you for configuration parameters. Choose **I will setup my own configuration** and **AWS IAM controls** when prompted.

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add auth              ##"amplify update auth" if already configured
❯ Manual Configuration
❯ User Sign-Up, Sign-In, connected with AWS IAM controls
```

Choose **YES** to `? Allow unauthenticated logins?` and **YES** to `? Do you want to enable 3rd party authentication providers in your identity pool?`.

Choose **Google** and then provide your Google **Client IDs** as appropriate. The CLI will ask you for both the **Web Client ID** and **Android Client ID** at the appropriate time.
When configuration for Google sign-in is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. Run the following to update your changes in the cloud:

```bash
$ amplify push
```

You can now [configure Google in your mobile app](./authentication#google-login-in-your-mobile-app).

Note that the CLI allows you to select more than one identity provider for your app. You can also run `amplify auth update` to add an identity provider to an existing auth configuration.

#### Developer Authenticated Identities with Cognito Identity

With developer authenticated identities, you can register and authenticate users via your own existing authentication process, while still using Amazon Cognito to access AWS resources. Using developer authenticated identities involves interaction between the end user device, your backend for authentication, and Amazon Cognito.

Begin by registering yourself with Cognito Identity in the console.

![Image](~/images/dev-auth-ids-console-settings.png)

Then, once the end-user has authenticated with you, the app should receive a Cognito identity id and token confirming the sign-in with you from your servers.

The app will federate your sign-in with Cognito Identity to receive AWS credentials by making the following call.

```java
FederatedSignInOptions options = FederatedSignInOptions.builder()
                                     .cognitoIdentityId(identityId)
                                     .build();

AWSMobileClient.getInstance().federatedSignIn(IdentityProvider.DEVELOPER.toString(), token, options, new Callback<UserStateDetails>() {
    @Override
    public void onResult(final UserStateDetails userStateDetails) {
        // Handle the result
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "federated sign-in error", e);
    }
});
```

### Facebook Login in Your Mobile App

> **Use Android API level 23 or higher** The `AWSMobileClient` library for Android sign-in provides the activity and view for presenting a `SignInUI` for the sign-in providers you configure. This library depends on the Android SDK API Level 23 or higher.

Add the following permissions and Activity to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>

<activity
    android:name="com.facebook.FacebookActivity"
    android:exported="true">
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="@string/fb_login_protocol_scheme" />
</intent-filter>
</activity>

<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id" />
```

Add the following dependencies to your `app/build.gradle` file:

```groovy
dependencies {
    // Mobile Client for initializing the SDK
    implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.15.+@aar') { transitive = true }

    // Facebook SignIn
    implementation 'com.android.support:support-v4:28.+'
    implementation ('com.amazonaws:aws-android-sdk-auth-facebook:2.15.+@aar') { transitive = true }

    // Sign in UI
    implementation 'com.android.support:appcompat-v7:28.+'
    implementation ('com.amazonaws:aws-android-sdk-auth-ui:2.15.+@aar') { transitive = true }
}
```

> Note: When you add the dependencies, make sure that the major version of appcompat and support libraries match. In the previous example, we're using version 28.

In `strings.xml`, add string definitions for your Facebook app ID and login protocol scheme. The value for app_id is your Facebook app ID and the value for logic_protocol_scheme should be your Facebook app ID prefixed with `fb`.

```xml
<string name="facebook_app_id">1231231231232123123</string>
<string name="fb_login_protocol_scheme">fb1231231231232123123</string>
```

Next, create an activity that will present your sign-in screen. In Android Studio, choose `File > New > Activity > Basic Activity` and type an activity name, such as `AuthenticatorActivity`. If you want to make this your starting activity, move the intent filter block containing `.LAUNCHER` to the `AuthenticatorActivity` in your app's `AndroidManifest.xml`.

```xml
<activity android:name=".AuthenticatorActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

Finally, you can update the `onCreate` function of your `AuthenticatorActivity` to call `AWSMobileClient.getInstance().federatedSignIn()` as outlined earlier.

```java
import android.app.Activity;
import android.os.Bundle;

import com.amazonaws.mobile.auth.ui.SignInUI;
import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobile.client.AWSStartupHandler;
import com.amazonaws.mobile.client.AWSStartupResult;

public class AuthenticatorActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_authenticator);

        AWSMobileClient.getInstance().initialize(this, new Callback<UserStateDetails>() {
            @Override
            public void onResult(UserStateDetails userStateDetails) {
                Log.i("INIT", userStateDetails.getUserState());
                AWSMobileClient.getInstance().showSignIn(
                        AuthenticatorActivity.this,
                        SignInUIOptions.builder()
                                .nextActivity(NextActivity.class)
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
            }

            @Override
            public void onError(Exception e) {
                Log.e("INIT", "Error during initialization", e);
            }
        });
    }
}
```

### Google Login in Your Mobile App

> **Use Android API level 23 or higher** The `AWSMobileClient` library for Android sign-in provides the activity and view for presenting a `SignInUI` for the sign-in providers you configure. This library depends on the Android SDK API Level 23 or higher.


Add the following permissions to your `AndroidManifest.xml` file:

```xml
<uses-permission android:name="android.permission.INTERNET"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
```

Add the following dependencies to your `app/build.gradle` file:

```groovy
dependencies {
    // Mobile Client for initializing the SDK
    implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.15.+@aar') { transitive = true }

    // Google SignIn
    implementation 'com.android.support:support-v4:28.+'
    implementation ('com.amazonaws:aws-android-sdk-auth-google:2.15.+@aar') { transitive = true }

    // Sign in UI Library
    implementation 'com.android.support:appcompat-v7:28.+'
    implementation ('com.amazonaws:aws-android-sdk-auth-ui:2.15.+@aar') { transitive = true }
}
```

> Note: When you add the dependencies, make sure that the major version of appcompat and support libraries match. In the previous example, we're using version 28.

Create an activity that will present your sign-in screen. In Android Studio, choose `File > New > Activity > Basic Activity` and type an activity name, such as `AuthenticatorActivity`. If you want to make this your starting activity, move the intent filter block containing `.LAUNCHER` to the `AuthenticatorActivity` in your app's `AndroidManifest.xml`.

```xml
<activity android:name=".AuthenticatorActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```

Finally, you can update the `onCreate` function of your `AuthenticatorActivity` to call `AWSMobileClient.getInstance().federatedSignIn()` as outlined earlier.

```java
import android.app.Activity;
import android.os.Bundle;

import com.amazonaws.mobile.auth.ui.SignInUI;
import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobile.client.AWSStartupHandler;
import com.amazonaws.mobile.client.AWSStartupResult;

public class AuthenticatorActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_authenticator);

        AWSMobileClient.getInstance().initialize(this, new Callback<UserStateDetails>() {
            @Override
            public void onResult(UserStateDetails userStateDetails) {
                Log.i("INIT", userStateDetails.getUserState());
                AWSMobileClient.getInstance().showSignIn(
                        AuthenticatorActivity.this,
                        SignInUIOptions.builder()
                                .nextActivity(NextActivity.class)
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
            }

            @Override
            public void onError(Exception e) {
                Log.e("INIT", "Error during initialization", e);
            }
        });
    }
}
```