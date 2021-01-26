## How It Works
Sign-in with web UI will display the sign-in UI inside a webview. After the sign-in process is complete, the sign-in UI will redirect back to your app.

## Android Platform Setup
Add the following activity to the `AndroidManifest.xml` file in your app's `android` directory. Replace `myapp` with the "redirect signin URI" you provided to the CLI:

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
