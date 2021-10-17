## How It Works

Sign-in with web UI will display the sign-in UI inside a webview. After the sign-in process is complete, the sign-in UI will redirect back to your app.

## Android Platform Setup

<amplify-block-switcher>
<amplify-block name="v0.16.0+">

Add the following activity and queries tag to the `AndroidManifest.xml` file in your app's `android/app/src/main` directory, 
replacing `myapp` with your redirect URI prefix if necessary:

```xml
<queries>
  <intent>
      <action android:name=
          "android.support.customtabs.action.CustomTabsService" />
  </intent>
</queries>
<application ...>
  ...
  <activity
      android:name="com.amplifyframework.auth.cognito.activities.HostedUIRedirectActivity">
      <intent-filter>
          <action android:name="android.intent.action.VIEW" />
          <category android:name="android.intent.category.DEFAULT" />
          <category android:name="android.intent.category.BROWSABLE" />
          <data android:scheme="myapp" />
      </intent-filter>
  </activity>
  ...
</application>
```

</amplify-block>
<amplify-block name="v0.15.0 and below">

**Note:** These versions have known issues with sign-out after signing in via web UI.
Please update to the latest version and follow the updated instructions for best results.

Add the following activity to the `AndroidManifest.xml` file in your app's `android/app/src/main` directory, replacing `myapp` with
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

</amplify-block>
</amplify-block-switcher>

## iOS Platform Setup
Add the following entry to the URL scheme in the `Info.plist` file in your app's `ios` directory. Replace `myapp` with the "redirect signin URI" you provided to the CLI:

```xml
 <plist version="1.0">

     <dict>
     <!-- YOUR OTHER PLIST ENTRIES HERE -->

     <!-- ADD AN ENTRY TO CFBundleURLTypes for Cognito Auth -->
     <!-- IF YOU DO NOT HAVE CFBundleURLTypes, YOU CAN COPY THE WHOLE BLOCK BELOW -->
     <key>CFBundleURLTypes</key>
     <array>
         <dict>
             <key>CFBundleURLSchemes</key>
             <array>
                 <string>myapp</string>
             </array>
         </dict>
     </array>

     <!-- ... -->
     </dict>
```
