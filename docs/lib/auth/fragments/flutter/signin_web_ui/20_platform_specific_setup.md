## How It Works
Signin with web UI requires the Amplify plugin to display the signin UI inside a webview. This is managed internally by amplify-android and amplify-ios. After the signin process is complete they will redirect back to your app.

## Android Platform Setup
Add the following activity to the `AndroidManifest.xml` file in your app's `Android` directory, replacing `myapp` with whatever value you used for your redirect URI prefix:

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

## iOS Platform Setup
Add the following entry to the URL scheme in the `Info.plist` file in your app's `iOS` directory, replacing `myapp` with whatever value you used for your redirect URI prefix:

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

