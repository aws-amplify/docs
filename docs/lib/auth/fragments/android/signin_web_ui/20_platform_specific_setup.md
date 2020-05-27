## Update AndroidManifest.xml
In your AndroidManifest.xml file, add the following property to the MainActivity activity: `android:launchMode="singleInstance"`

e.g.

```xml
<application>
   <activity
        android:name=".MainActivity"
        android:launchMode="singleInstance">
   </activity>
</application>
```

<amplify-callout>
We're using MainActivity here and in subsequent steps for the sake of the tutorial. In your production code, substitute whatever
activity will be launching the web UI sign in experience.
</amplify-callout>

Add this new intent filter below the existing one in the Android Manifest:

```xml
<intent-filter>
   <action android:name="android.intent.action.VIEW" />

   <category android:name="android.intent.category.DEFAULT" />
   <category android:name="android.intent.category.BROWSABLE" />

   <data android:scheme="myapp" />
</intent-filter>
```

<amplify-callout>
The value of `myapp` above is just an example value. You can set this to whatever you want.
Just be sure it matches the redirect URIs you specified above when configuring Auth in CLI
and update the value in `onNewIntent` below.
</amplify-callout>

## Add Response Handler
Add the following `onNewIntent` method in MainActivity to capture the response from the sign in web UI:

<amplify-block-switcher>
 <amplify-block name="Java">

```java
@Override
protected void onNewIntent(Intent intent) {
    super.onNewIntent(intent);

    if(intent.getData() != null && "myapp".equals(intent.getData().getScheme())) {
        Amplify.Auth.handleWebUISignInResponse(intent);
    }
}
```

 </amplify-block>
 <amplify-block name="Kotlin">

```kotlin
override fun onNewIntent(intent: Intent?) {
    super.onNewIntent(intent)

    if(intent?.scheme != null && "myapp".equals(intent?.scheme)) {
        Amplify.Auth.handleWebUISignInResponse(intent)
    }
}
```

 </amplify-block>
</amplify-block-switcher>


