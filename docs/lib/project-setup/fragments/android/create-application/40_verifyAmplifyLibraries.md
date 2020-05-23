Create an `Application` class and add the Amplify initialization into its `onCreate()` to initialize Amplify once in your application.

Right-click on your namespace (e.g. `com.example.myamplifyapplication`), click **New**, and click **Java Class** or **Kotlin File/Class** depending on which language you choose.

<amplify-block-switcher>
<amplify-block name="Java">

Configure the new class in **New Java Class**:

- Enter *MyAmplifyApplication* in the **Name** field
- Enter *android.app.Application* in the **Superclass** field
- Press **OK**

Initialize Amplify by replacing the contents with the following code:

```java
package com.example.myamplifyapplication;

import android.app.Application;
import android.util.Log;
import com.amplifyframework.AmplifyException;
import com.amplifyframework.core.Amplify;

public class MyAmplifyApplication extends Application {
    @Override
    public void onCreate() {
        super.onCreate();

        try {
            Amplify.configure(getApplicationContext());

            Log.i("MyAmplifyApplication", "Initialized Amplify");
        } catch (AmplifyException e) {
            Log.e("MyAmplifyApplication", "Could not initialize Amplify", e);
        }
    }
}
```

</amplify-block>

<amplify-block name="Kotlin">

Configure the new class in **New Kotlin File/Class**:

- Enter *MyAmplifyApplication* in the **Name** field
- Select *Class* from the types
- Press enter

Initialize Amplify by replacing the contents with the following code:

```kotlin
import android.app.Application
import android.util.Log
import com.amplifyframework.AmplifyException
import com.amplifyframework.core.Amplify

class MyAmplifyApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        try {
            Amplify.configure(applicationContext)
            Log.i("MyAmplifyApplication", "Initialized Amplify")
        } catch (e: AmplifyException) {
            Log.e("MyAmplifyApplication", "Could not initialize Amplify", e)
        }
    }
}
```

</amplify-block>
</amplify-block-switcher>

This overrides the `onCreate()` to initialize Amplify when your application is launched.

Next, configure your application to use your new custom `Application` class. Open **AndroidManifest.xml**, and add a `android:name` attribute with the value of your new class name:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.myamplifyapplication">

    <!-- Add the android:name attribute to the application node -->
    <application
        android:name=".MyAmplifyApplication"
        ...
    </application>
</manifest>
```

Next, build and run the application. In logcat, you'll see a log line indicating success:

```console
com.example.myamplifyapplication I/MyAmplifyApplication: Initialized Amplify
```