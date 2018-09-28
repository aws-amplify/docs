# How to Integrate Your Existing Identity Pool


**Just Getting Started?** | [Use streamlined steps](./add-aws-mobile-user-sign-in) to install the SDK and integrate Amazon Cognito.
------------ | -------------

The [Get Started](./add-aws-mobile-user-sign-in) section of this guide allows you to create new resources and complete the steps described on this page in minutes. If you want to import existing resources or create them from scratch, this page will walk you through the following steps:

    * Set up short-lived credentials for accessing your AWS resources using a [Cognito Identity Pool](http://docs.aws.amazon.com/cognito/latest/developerguide/identity-pools.html).

    * Create an AWS Mobile configuration file that ties your app code to the identity pool that enables users to access your AWS resources.

    * Make small adjustments to your app code to install the SDK and retrieve AWS credentials for your user.


## Set Up Your Backend

### Import or Create a New Identity Pool

* If you already have an Amazon Cognito Identity Pool and know its ID and region, you can skip to `how-to-auth-connect-to-your-backend`.

To create a new identity pool:

1. Go to [Amazon Cognito Console](https://console.aws.amazon.com/cognito) and choose `Manage Federated Identities`.

2. Choose `Create new Identity pool` on the top left of the console.

3. Type a name for the Identity pool, select `Enable access to unauthenticated identities` under the `Unauthenticated Identities` section, and then choose `Create pool` on the bottom right.

4. Expand the `View Details` section to see the two roles that are to be created to enable access to your bucket. Copy and keep both the Authenticated and Unauthenticated role names, in the form of :code:`Cognito_<IdentityPoolName>Auth_Role` and :code:`Cognito_<IdentityPoolName>Unauth_Role`. In many cases, you will modify the permissions policy of these roles to control access to AWS resources that you add to your app.

5. Choose  `Allow` on the bottom right.

6. In the code snippet labeled `Get AWSCredentials` displayed by the console, copy the Identity Pool ID and the Region for use in a following configuration step. You will use these values to connect your backend to your app.

## Connect to Your Backend

Take the following steps to connect your app to its backend.


### Create the awsconfiguration.json file

1. Create a file with name `awsconfiguration.json` with the following contents:

```json
      {
          "Version": "1.0",
          "CredentialsProvider": {
              "CognitoIdentity": {
                  "Default": {
                      "PoolId": "COGNITO-IDENTITY-POOL-ID",
                      "Region": "COGNITO-IDENTITY-POOL-REGION"
                  }
              }
          },
          "IdentityManager" : {
            "Default" : {

            }
          }
      }
```

2. Make the following changes to the configuration file.

* Replace the `COGNITO-IDENTITY-POOL-ID` with the identity pool ID.

* Replace the `COGNITO-IDENTITY-POOL-REGION` with the region the identity pool was created in.


     - Need to find your pool's ID and region?

       - Go to [Amazon Cognito Console](https://console.aws.amazon.com/cognito) and choose `Manage Federated Identities`, then choose your pool and choose `Edit identity pool`. Copy the value of `Identity pool ID`.

         Insert this region value into the following form to create the value you need for this integration.

         ```bash

            "Region": "REGION-PREFIX-OF-YOUR-POOL-ID".
        ```
         For example, if your pool ID is :code:`us-east-1:01234567-yyyy-0123-xxxx-012345678901`, then your integration region value would be:
         ```bash

            "Region": "us-east-1".
        ```

### Add the awsconfiguration.json file to your app

Android - Java

In the Android Studio Project Navigator, right-click your app's `res` folder, and then choose `New > Directory`. Type `raw` as the directory name and then choose `OK`.

![Image](./media/add-aws-mobile-sdk-android-studio-res-raw.png)

Drag the `awsconfiguration.json` you created into the `res/raw` folder. Android gives a resource ID to any arbitrary file placed in this folder, making it easy to reference in the app.

Android - Kotlin

In the Android Studio Project Navigator, right-click your app's `res` folder, and then choose `New > Directory`. Type :userinput:`raw` as the directory name and then choose `OK`.

![Image](./media/add-aws-mobile-sdk-android-studio-res-raw.png)

Drag the `awsconfiguration.json` you created into the `res/raw` folder. Android gives a resource ID to any arbitrary file placed in this folder, making it easy to reference in the app.


### Add the SDK to your App

Android - Java

Set up AWS Mobile SDK components as follows:

1. Add the following to `app/build.gradle`:

```ruby
     dependencies {
        implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }

        // other dependencies . . .
     }
```

2. Perform a Gradle sync to download the AWS Mobile SDK components into your app.

3. Add the following code to the `onCreate` method of your main or startup activity. This will establish a connection with AWS Mobile. `AWSMobileClient` is a singleton that will be an interface for your AWS services.

  Once the network call to retrieve the user's AWS identity ID has succeeded, you can get the users identity using `getCachedUserID()` from the `AWSIdentityManager`.

```java
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.mobile.auth.core.IdentityHandler;
import com.amazonaws.mobile.auth.core.IdentityManager;
import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobile.client.AWSStartupHandler;
import com.amazonaws.mobile.client.AWSStartupResult;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        AWSMobileClient.getInstance().initialize(this, new AWSStartupHandler() {
            @Override
            public void onComplete(AWSStartupResult awsStartupResult) {

                //Make a network call to retrieve the identity ID
                // using IdentityManager. onIdentityId happens UPon success.
                IdentityManager.getDefaultIdentityManager().getUserID(new IdentityHandler() {

                    @Override
                    public void onIdentityId(String s) {

                        //The network call to fetch AWS credentials succeeded, the cached
                        // user ID is available from IdentityManager throughout your app
                        Log.d("MainActivity", "Identity ID is: " + s);
                        Log.d("MainActivity", "Cached Identity ID: " + IdentityManager.getDefaultIdentityManager().getCachedUserID());
                    }

                    @Override
                    public void handleError(Exception e) {
                        Log.e("MainActivity", "Error in retrieving Identity ID: " + e.getMessage());
                    }
                });
            }
        }).execute();
    }
}
```

When you run your app, you shouldn't see a behavior change. To verify success, look for the message `"Welcome to AWS!"` in your debug output.

Android - Kotlin

Set up AWS Mobile SDK components as follows:

1. Add the following to `app/build.gradle`:

```ruby
dependencies {
  implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }

  // other dependencies . . .
}
```

2. Perform a Gradle sync to download the AWS Mobile SDK components into your app.

3. Add the following code to the :code:`onCreate` method of your main or startup activity. This will establish a connection with AWS Mobile. `AWSMobileClient` is a singleton that will be an interface for your AWS services.

  Once the network call to retrieve the user's AWS identity ID has succeeded, you can get the users identity using `getCachedUserID()` from the `AWSIdentityManager`.

```kotlin
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.mobile.auth.core.IdentityHandler;
import com.amazonaws.mobile.auth.core.IdentityManager;
import com.amazonaws.mobile.client.AWSMobileClient;
import com.amazonaws.mobile.client.AWSStartupHandler;
import com.amazonaws.mobile.client.AWSStartupResult;

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        AWSMobileClient.getInstance().initialize(this) {
            IdentityManager.defaultIdentityManager.getUserID(
                object : IdentityHandler() {
                    override fun onIdentityId(s: String) {
                        // The network call to fetch AWS credentials succeeded
                        Log.d(TAG, "Identity ID is: ${s}")
                    }

                    override fun handleError(ex: Exception) {
                        Log.e(TAG, "Error: ${ex.message}")
                    }
                }
            )
        }.execute()
    }
}
```

When you run your app, you shouldn't see a behavior change. To verify success, look for the message `"Welcome to AWS!"` in your debug output.

## Next Steps

* For further information, see [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html).
