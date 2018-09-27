# Customize the SDK Sign-In UI

By default, the SDK presents sign-in UI for each sign in provider you enable in your Mobile Hub project (Email and Password, Facebook, Google) with a default look and feel. It knows which provider(s) you chose by reading the :file:`awsconfiguration.json` file you integrated with your app.

To override the defaults, and modify the behavior, look, and feel of the sign-in UI, create an `AuthUIConfiguration` object and set the appropriate properties.

Android - Java

Create and configure an `AuthUIConfiguration` object and set its properties.

* To present the Email and Password user `SignInUI`, set `userPools` to `true`.

* To present Facebook or Google  user `SignInUI`, add `signInButton(FacebookButton.class)` or `signInButton(GoogleButton.class)`.

* To change the logo, use the `logoResId`.

* To change the background color, use `backgroundColor`.

* To cancel the sign-in flow, set `.canCancel(true)`.

* To change the font in the sign-in views, use the `fontFamily` method and pass in the string that represents a font family.

* To draw the `backgroundColor` full screen, use `fullScreenBackgroundColor`.

```java
  import android.app.Activity;
  import android.graphics.Color;
  import android.os.Bundle;

  import com.amazonaws.mobile.auth.facebook.FacebookButton;
  import com.amazonaws.mobile.auth.google.GoogleButton;
  import com.amazonaws.mobile.auth.ui.AuthUIConfiguration;
  import com.amazonaws.mobile.auth.ui.SignInUI;

  import com.amazonaws.mobile.client.AWSMobileClient;
  import com.amazonaws.mobile.client.AWSStartupHandler;
  import com.amazonaws.mobile.client.AWSStartupResult;

  public class YourMainActivity extends Activity {
      @Override
      protected void onCreate(Bundle savedInstanceState) {
          super.onCreate(savedInstanceState);

          AWSMobileClient.getInstance().initialize(this, new AWSStartupHandler() {
              @Override
              public void onComplete(final AWSStartupResult awsStartupResult) {
                  AuthUIConfiguration config =
                      new AuthUIConfiguration.Builder()
                          .userPools(true)  // true? show the Email and Password UI
                          .signInButton(FacebookButton.class) // Show Facebook button
                          .signInButton(GoogleButton.class) // Show Google button
                          .logoResId(R.drawable.mylogo) // Change the logo
                          .backgroundColor(Color.BLUE) // Change the backgroundColor
                          .isBackgroundColorFullScreen(true) // Full screen backgroundColor the backgroundColor full screenff
                          .fontFamily("sans-serif-light") // Apply sans-serif-light as the global font
                          .canCancel(true)
                          .build();
                  SignInUI signinUI = (SignInUI) AWSMobileClient.getInstance().getClient(YourMainActivity.this, SignInUI.class);
                  signinUI.login(YourMainActivity.this, YourNextActivity.class).authUIConfiguration(config).execute();
              }
          }).execute();
      }
  }
```
Android - Kotlin
Create and configure an `AuthUIConfiguration` object and set its properties.

* To present the Email and Password user `SignInUI`, set `userPools` to `true`.

* To present Facebook or Google  user `SignInUI`, add `signInButton(FacebookButton.class)` or `signInButton(GoogleButton.class)`.

* To change the logo, use the `logoResId`.

* To change the background color, use `backgroundColor`.

* To cancel the sign-in flow, set `.canCancel(true)`.

* To change the font in the sign-in views, use the `fontFamily` method and pass in the string that represents a font family.

* To draw the `backgroundColor` full screen, use `fullScreenBackgroundColor`.

```java
  import android.app.Activity;
  import android.graphics.Color;
  import android.os.Bundle;

  import com.amazonaws.mobile.auth.facebook.FacebookButton;
  import com.amazonaws.mobile.auth.google.GoogleButton;
  import com.amazonaws.mobile.auth.ui.AuthUIConfiguration;
  import com.amazonaws.mobile.auth.ui.SignInUI;

  import com.amazonaws.mobile.client.AWSMobileClient;
  import com.amazonaws.mobile.client.AWSStartupHandler;
  import com.amazonaws.mobile.client.AWSStartupResult;

  class MainActivity : AppCompatActivity() {
      override fun onCreate(savedInstanceState : Bundle?) {
          super.onCreate()
          AWSMobileClient.getInstance().initialize(this) {
              val config = AuthUIConfiguration.Builder()
                      .userPools(true) // show the Email and Password UI
                      .signInButton(FacebookButton.class) // Show Facebook
                      .signInButton(GoogleButton.class) // Show Google
                      .logoResId(R.drawable.mylogo) // Change the logo
                      .backgroundColor(Color.BLUE) // Change the background color
                      .isBackgroundColorFullScreen(true) // Full screen background color
                      .fontFamily("sans-serif-light") // font
                      .canCancel(true) // Add a cancel/back button
                      .build()
              val signInUI = AWSMobileClient.getInstance().getClient(this@MainActivity, SignInUI::class.java) as SignInUI
              signInUI.login(this@MainActivity, NextActivity::class.java).authUIConfiguration(config).execute()
          }.execute()
      }
  }
```
