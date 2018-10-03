# Add User Sign-in to Your Mobile App with Amazon Cognito

Enable your users to sign-in using credentials from Facebook, Google, or your own custom user directory. The CLI deploys [Amazon Cognito identity pool](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html) and [user pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) to create your backend.

## Set Up Your Backend

**Prerequisite** Complete the [Get Started](./get-started) steps before you proceed.

## Email & Password

This default auth configuration sets up a custom user pool for your app.

**To set up email and password sign-in**

1. In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI will prompt you for configuration parameters.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add auth
    ```

2. Choose the default configuration.

    ```
    ❯ Yes, use the default configuration.
    ```

3. When configuration for email and password sign-in is complete, a message appears confirming that you have configured local CLI metadata for this category. You can confirm this by viewing status.

    ```bash
    $ amplify status
      | Category | Resource name   | Operation | Provider plugin   |
      | -------- | --------------- | --------- | ----------------- |
      | Auth     | cognitoabcd0123 | Create    | awscloudformation |
    ```

4. To create your backend AWS resources run the following:

    ```bash
    $ amplify push
    ```

5. Follow the [Set up Email & Password Login](#set-up-email-and-password) steps to connect to your backend from your app.

## Facebook

**To set up Facebook sign-in**

1. In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI prompts you for configuration parameters.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add auth
    ```

2. Choose to set up your own configuration.

    ```
    ❯ No, I will set up my own configuration.
    ```

3. Choose to set up authentication flow using AWS IAM access controls.

    ```
    ❯ User Sign-Up, Sign-In, connected with AWS IAM controls
    ```

4. Choose yes, to: `? Allow unauthenticated logins?`.

5. Choose yes, to: `? Do you want to enable 3rd party authentication providers in your identity pool?`.

6. Choose Facebook and then provide your Facebook app ID. To retrieve or create your Facebook app ID, see [Setting Up Facebook Authentication](http://docs.aws.amazon.com/aws-mobile/latest/developerguide/auth-facebook-setup.html).

7. When configuration for Facebook sign-in is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. You can confirm this by viewing status.

    ```
    $ amplify status
    | Category  | Resource name   | Operation | Provider plugin   |
    | --------- | --------------- | --------- | ----------------- |
    | Auth      | cognitoa7cbb553 | Create    | awscloudformation |
    ```

8. To create your backend AWS resources run the following:

```
$ amplify push
```

9. Follow the steps at [Set Up Facebook Login](#set-up-facebook) to connect to your backend from your app.

## Google

**To set up Google sign-in**

1. In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI prompts you for configuration parameters.

	```
	$ cd ./YOUR_APP_ROOT
	$ amplify add auth
	```

2. Choose to set up your own configuration.

	```
	❯ No, I will set up my own configuration.
	```

3. Choose to set up authentication flow using AWS IAM access controls.

	```
	❯ User Sign-Up, Sign-In, connected with AWS IAM controls ...
	```

4. Choose yes, to: `? Allow unauthenticated logins?`.

5. Choose yes, to: `? Do you want to enable 3rd party authentication providers in your identity pool?`.

6. Choose Google and then provide your Google client ID. To retrieve or create your Google app ID, see [Setting Up Google Authentication](http://docs.aws.amazon.com/aws-mobile/latest/developerguide/auth-google-setup.html).

7. When configuration for Google sign-in is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. You can confirm this by viewing status.

	```
	$ amplify status
	| Category  | Resource name   | Operation | Provider plugin   |
	| --------- | --------------- | --------- | ----------------- |
	| Auth      | cognitoa7cbb553 | Create    | awscloudformation |
	```

8. To create your backend AWS resources run the following:

	```
	$ amplify push
	```

9. Follow the steps at [Set Up Google Login](#set-up-google) to connect to your backend from your app.

Note that the CLI allows you to select more than one identity provider for your app. You can also run `amplify auth update` to add an identity provider to an existing auth configuration.

## Set Up Email and Password Login in Your Mobile App

> **Use Android API level 23 or higher** The AWS Mobile SDK library for Android sign-in (`aws-android-sdk-auth-ui`) provides the activity and view for presenting a `SignInUI` for the sign-in providers you configure. This library depends on the Android SDK API Level 23 or higher.

1. Add the following permissions to the `AndroidManifest.xml` file:

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    ```

2. Add the following dependencies to the `app/build.gradle` file:

	```groovy
	     dependencies {
	          // Mobile Client for initializing the SDK
	          implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }

	          // Cognito UserPools for SignIn
	          implementation 'com.android.support:support-v4:24.+'
	          implementation ('com.amazonaws:aws-android-sdk-auth-userpools:2.6.+@aar') { transitive = true }

	          // Sign in UI Library
	          implementation 'com.android.support:appcompat-v7:24.+'
	          implementation ('com.amazonaws:aws-android-sdk-auth-ui:2.6.+@aar') { transitive = true }
	     }
	```

  Note: When you add the dependencies, make sure that the major version of appcompat and support libraries match. In the previous example, we're using version 24.

3. Create an activity that will present your sign-in screen.

	In Android Studio, choose `File > New > Activity > Basic Activity` and type an activity name, such as `AuthenticatorActivity`. If you want to make this your starting activity, move the intent filter block containing `.LAUNCHER` to the `AuthenticatorActivity` in your app's `AndroidManifest.xml`.

    ```xml
    <activity android:name=".AuthenticatorActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
    ```

## Set Up Facebook Login in Your Mobile App

1. Add or update your AWS backend configuration file to incorporate your new sign-in. For details, see the last steps in the :ref:`Get Started: Set Up Your Backend <add-aws-mobile-sdk-basic-setup>` section.

2. Add the following permissions and Activity to your `AndroidManifest.xml` file:

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    ```

    ```xml
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
    ```

    ```xml
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id" />
    ```

3. Add the following dependencies to your `app/build.gradle` file:

    ```
    dependencies {
      // Mobile Client for initializing the SDK
      implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }

      // Facebook SignIn
      implementation 'com.android.support:support-v4:24.+'
      implementation ('com.amazonaws:aws-android-sdk-auth-facebook:2.6.+@aar') { transitive = true }

      // Sign in UI
      implementation 'com.android.support:appcompat-v7:24.+'
      implementation ('com.amazonaws:aws-android-sdk-auth-ui:2.6.+@aar') { transitive = true }
    }
    ```

    > Note: When you add the dependencies, make sure that the major version of appcompat and support libraries match. In the previous example, we're using version 24.

4. In `strings.xml`, add string definitions for your Facebook app ID and login protocol scheme. The value for app_id is your Facebook app ID and the value for logic_protocol_scheme should be your Facebook app ID prefixed with `fb`.

    ```xml
    <string name="facebook_app_id">1231231231232123123</string>
    <string name="fb_login_protocol_scheme">fb1231231231232123123</string>
    ```
5. Create an activity that will present your sign-in screen.

    In Android Studio, choose `File > New > Activity > Basic Activity` and type an activity name, such as `AuthenticatorActivity`. If you want to make this your starting activity, move the intent filter block containing `.LAUNCHER` to the `AuthenticatorActivity` in your app's `AndroidManifest.xml`.

    ```xml
    <activity android:name=".AuthenticatorActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
    ```

## Set Up Google Login in Your Mobile App

> **Use Android API level 23 or higher** The AWS Mobile SDK library for Android sign-in (`aws-android-sdk-auth-ui`) provides the activity and view for presenting a `SignInUI` for the sign-in providers you configure. This library depends on the Android SDK API Level 23 or higher.

1. Add or update your AWS backend configuration file to incorporate your new sign-in. For details, see the last steps in the :ref:`Get Started: Set Up Your Backend <add-aws-mobile-sdk-basic-setup>` section.

2. Add the following permissions to your `AndroidManifest.xml` file:

    ```xml
    <uses-permission android:name="android.permission.INTERNET"/>
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
    ```
3. Add the following dependencies to your `app/build.gradle` file:

    ```java
    dependencies {
      // Mobile Client for initializing the SDK
      implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }

      // Google SignIn
      implementation 'com.android.support:support-v4:24.+'
      implementation ('com.amazonaws:aws-android-sdk-auth-google:2.6.+@aar') { transitive = true }

      // Sign in UI Library
      implementation 'com.android.support:appcompat-v7:24.+'
      implementation ('com.amazonaws:aws-android-sdk-auth-ui:2.6.+@aar') { transitive = true }
    }
    ```

4. Create an activity that will present your sign-in screen.

    In Android Studio, choose `File > New > Activity > Basic Activity` and type an activity name, such as `AuthenticatorActivity`. If you want to make this your starting activity, move the intent filter block containing `.LAUNCHER` to the `AuthenticatorActivity` in your app's `AndroidManifest.xml`.

    ```xml
    <activity android:name=".AuthenticatorActivity">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
    ```

## Launch your sign-in screen

5. Update the `onCreate` function of your `AuthenticatorActivity` to call `AWSMobileClient`. This component provides the functionality to resume a signed-in authentication session. It makes a network call to retrieve the AWS credentials that allow users to access your AWS resources and registers a callback for when that transaction is complete.

	If the user is already signed in, the app switches to the `NextActivity`.  If the user is not signed in, the user is presented with the AWS Mobile configurable sign-in UI.  After the user is authenticated, the app continues to the `NextActivity`.

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

	        // Add a call to initialize AWSMobileClient
	        AWSMobileClient.getInstance().initialize(this, new AWSStartupHandler() {
	            @Override
	            public void onComplete(AWSStartupResult awsStartupResult) {
	                SignInUI signin = (SignInUI) AWSMobileClient.getInstance().getClient(AuthenticatorActivity.this, SignInUI.class);
	                signin.login(AuthenticatorActivity.this, MainActivity.class).execute();
	            }
	        }).execute();
    }
    }
	```
      Choose the run icon (|play|) in Android Studio to build your app and run it on your device/emulator. You should see our ready made sign-in UI for your app. Check out the next steps to learn how to [customize your UI] (./add-aws-mobile-user-sign-in-customize).

> Note: If you get an exception which mentions `Developer Error`, it is likely due to missing SHA1 value from the Google configuration console. Create an Android client app from the Google console and add your machine's SHA1 keys there. [Reference Link](https://stackoverflow.com/questions/37273145/error-statusstatuscode-developer-error-resolution-null)

## API Reference
* [AWSMobileClient](https://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobile/client/AWSMobileClient.html)
A library that initializes the SDK, constructs CredentialsProvider and AWSConfiguration objects, fetches the AWS credentials, and creates a SDK SignInUI client instance.
* [Auth UserPools](https://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobile/auth/userpools/CognitoUserPoolsSignInProvider.html)
A wrapper library for Amazon Cognito user pools that provides a managed email/password sign-in UI.
* [Auth Core](https://docs.aws.amazon.com/AWSAndroidSDK/latest/javadoc/com/amazonaws/mobile/auth/core/IdentityManager.html)
A library that caches and federates a login provider authentication token using Amazon Cognito federated identities, caches the federated AWS credentials, and handles the sign-in flow.

## Enable Sign-out

To enable a user to sign-out of your app, register a callback for sign-in events by adding a `SignInStateChangeListener` to `IdentityManager`. The listener captures both `onUserSignedIn` and `onUserSignedOut` events.

```java
IdentityManager.getDefaultIdentityManager().addSignInStateChangeListener(new SignInStateChangeListener() {
   @Override
   // Sign-in listener
   public void onUserSignedIn() {
       Log.d(TAG, "User Signed In");
   }

   // Sign-out listener
   @Override
   public void onUserSignedOut() {
      Log.d(TAG, "User signed out");
   }
});
```

To initiate a sign-out, call the `signOut` method of `IdentityManager`.

```java
IdentityManager.getDefaultIdentityManager().signOut();
```

### Next Steps

  * [Customize the UI](./add-aws-mobile-user-sign-in-customize)
  * [Import Your Existing Amazon Cognito Identity Pool](./how-to-cognito-integrate-an-existing-identity-pool)
  * [Amazon Cognito Developer Guide](http://docs.aws.amazon.com/cognito/latest/developerguide/)
