## Update AndroidManifest.xml
Add the following activity to your app's `AndroidManifest.xml` file, replacing `myapp` with
whatever value you used for your redirect URI prefix:

  ```xml
  <activity
      android:name="com.amazonaws.mobileconnectors.cognitoauth.activities.CustomTabsRedirectActivity">
      <intent-filter>
          <action android:name="android.intent.action.VIEW" />

          <category android:name="android.intent.category.DEFAULT" />
          <category android:name="android.intent.category.BROWSABLE" />

          <data android:scheme="myapp" />
      </intent-filter>
  </activity>
  ```

<amplify-callout>
  These instructions have been updated since version 1.2.0. If you set this up for a version of Amplify prior to 1.2.0, be sure to remove the `intent-filter` with `android:scheme` from your own activity as well as the `singleInstance` launch mode.
</amplify-callout>

## Add Response Handler
Add the following result handler to whichever `Activity` you are calling HostedUI from:

<amplify-block-switcher>
 <amplify-block name="Java">

```java
@Override
protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    if (requestCode == AWSCognitoAuthPlugin.WEB_UI_SIGN_IN_ACTIVITY_CODE) {
        Amplify.Auth.handleWebUISignInResponse(data);
    }
}
```

 </amplify-block>
 <amplify-block name="Kotlin">

```kotlin
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.onActivityResult(requestCode, resultCode, data)

    if (requestCode == AWSCognitoAuthPlugin.WEB_UI_SIGN_IN_ACTIVITY_CODE) {
        Amplify.Auth.handleWebUISignInResponse(data)
    }
}
```

 </amplify-block>
</amplify-block-switcher>

<amplify-callout>
  If you set this up for a version of Amplify prior to 1.2.0, be sure to remove the `onNewIntent` method code from your `Activity` that was previously specified.
</amplify-callout>
