Create an `Application` class and add the Amplify initialization into its `onCreate()` to initialize Amplify once in your application.

Right-click on your namespace (e.g. `com.example.MyAmplifyApp`), click **New**, and click **Java Class** or **Kotlin File/Class** depending on which language you choose.

<amplify-block-switcher>
<amplify-block name="Java">

Configure the new class in **New Java Class**:

- Enter *MyAmplifyApp* in the **Name** field
- Enter *android.app.Application* in the **Superclass** field
- Press **OK**

Initialize Amplify by adding an `onCreate` method with the following code:

```java
  public void onCreate() {
      super.onCreate();

      try {
          Amplify.configure(getApplicationContext());
          Log.i("MyAmplifyApp", "Initialized Amplify");
      } catch (AmplifyException error) {
          Log.e("MyAmplifyApp", "Could not initialize Amplify", error);
      }
  }
```

</amplify-block>

<amplify-block name="Kotlin">

Configure the new class in **New Kotlin File/Class**:

- Enter *MyAmplifyApp* in the **Name** field
- Select *Class* from the types
- Press enter

Initialize Amplify by adding an `onCreate` method with the following code:

```kotlin
override fun onCreate() {
    super.onCreate()

    try {
        Amplify.configure(applicationContext)
        Log.i("MyAmplifyApp", "Initialized Amplify")
    } catch (error: AmplifyException) {
        Log.e("MyAmplifyApp", "Could not initialize Amplify", error)
    }
}
```

</amplify-block>
</amplify-block-switcher>

This overrides the `onCreate()` to initialize Amplify when your application is launched.

Next, configure your application to use your new custom `Application` class. Open **manifests** > **AndroidManifest.xml**, and add a `android:name` attribute with the value of your new class name:

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.MyAmplifyApp">

    <!-- Add the android:name attribute to the application node -->
    <application
        android:name=".MyAmplifyApp"
        ...
    </application>
</manifest>
```

Next, build and run the application. In logcat, you'll see a log line indicating success:

```console
com.example.MyAmplifyApp I/MyAmplifyApp: Initialized Amplify
```