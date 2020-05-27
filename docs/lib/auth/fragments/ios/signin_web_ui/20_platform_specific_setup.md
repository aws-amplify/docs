## Update Info.plist

Signin with web UI require the Amplify plugin to show up the signin UI inside a webview. After the signin process is complete it will redirect back to our app. 
You have to enable this in your app's `Info.plist`. Right click Info.plist and then choose Open As > Source Code. Add the following entry in the URL scheme:

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
