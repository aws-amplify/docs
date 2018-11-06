## Handling FCM/GCM Push Notifications

You can enable your Android to receive push notifications that you send through by using Amazon Pinpoint. With Amazon Pinpoint, you can send push notifications through Firebase Cloud Messaging (FCM) or its predecessor, Google Cloud Messaging (GCM).

Amazon Pinpoint campaigns can take one of three actions when a user taps a notification. One of those possible actions is a deep link, which opens the app to a specified activity.

To specify a destination activity for deep links, the app must have set up deep linking. This setup requires an intent filter that registers a URL scheme the deep links will use. After the app creates an intent filter, the data provided by the intent determines the activity to render.

**Creating an Intent Filter**

Begin to set up deep linking by creating an intent filter in your `AndroidManifest.xml` file. For example:

```xml
<!-- This activity allows your application to receive a deep link that navigates directly to the 
"Deeplink Page"-->
<activity
    android:name=".DeepLinkActivity"
    android:label="A deeplink!" >
    <intent-filter android:label="inAppReceiver">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <!-- Accepts URIs of type "pinpoint://deeplink" -->
        <data android:scheme="pinpoint"
              android:host="deeplink" />
    </intent-filter>
</activity>
```

The data element in the previous example registers a URL scheme, `pinpoint://`, as well as the host, `deeplink`. As a result, when given a URL in the form of `pinpoint://deeplink`, the manifest is prepared to execute the action.

**Handling the Intent**

Next, set up an intent handler to present the screen associated with the registered URL scheme and host. Intent data is retrieved in the onCreate() method, which then can use `Uri` data to create an activity. The following example shows an alert and tracks an event.

```java
public class DeeplinkActivity extends Activity {
 
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
 
        if (getIntent().getAction() == Intent.ACTION_VIEW) {
            Uri data = getIntent().getData();
 
            if (data != null) {
 
                // show an alert with the "custom" param
                new AlertDialog.Builder(this)
                        .setTitle("An example of a Deeplink")
                        .setMessage("Found custom param: " +data.getQueryParameter("custom"))
                        .setPositiveButton(android.R.string.yes, new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int which) {
                                dialog.dismiss();
                            }
                        })
                        .setIcon(android.R.drawable.ic_dialog_alert)
                        .show();
            }
        }
    }
}
```