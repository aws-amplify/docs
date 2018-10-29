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

iOS - Swift

Drag the `awsconfiguration.json` into the folder containing your `Info.plist` file in your Xcode project. Choose `Copy items` and `Create groups` in the options dialog.


### Add the SDK to your App

iOS - Swift

Set up AWS Mobile SDK components as follows:

1. Add the `AWSMobileClient` pod to your `Podfile` to install the AWS Mobile SDK.

```swift

     platform :ios, '9.0'

        target :'YOUR-APP-NAME' do
           use_frameworks!

            pod 'AWSMobileClient', '~> 2.6.13'

            # other pods . . .

        end
```

2. Run `pod install --repo-update` in your app root folder before you continue.

  If you encounter an error message that begins "`[!] Failed to connect to GitHub to update the CocoaPods/Specs . . .`", and your internet connectivity is working, you may need to (update openssl and Ruby) (https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48962041#48962041).


3. Add the following code to your AppDelegate to establish a run-time connection with AWS Mobile.

```swift
 import UIKit
 import AWSMobileClient

 @UIApplicationMain
 class AppDelegate: UIResponder, UIApplicationDelegate {

   func application(_ application: UIApplication,
         didFinishLaunchingWithOptions launchOptions:

         [UIApplicationLaunchOptionsKey: Any]?) -> Bool {


         // Uncomment to turn on logging, look for "Welcome to AWS!" to confirm success
         // AWSDDLog.add(AWSDDTTYLogger.sharedInstance)
         // AWSDDLog.sharedInstance.logLevel = .info


         // Instantiate AWSMobileClient to get AWS user credentials
         return AWSMobileClient.sharedInstance().interceptApplication(application, didFinishLaunchingWithOptions: launchOptions)

   }
 }
```
When you run your app, you should see no behavior change. To verify success, turn on logging by uncommenting the lines in the preceding example, and look for the message :code:`"Welcome to AWS!"` in your the output.

4. To get the users identity, use `getCredentialsProvider()` to access `AWSIdentityManager`, shown here being done in a `ViewController`.

```swift
import UIKit
import AWSMobileClient
import AWSAuthCore

class ViewController: UIViewController {

    @IBOutlet weak var textfield: UITextField!
    override func viewDidLoad() {
        super.viewDidLoad()
        textfield.text = "View Controller Loaded"

        // Get the identity Id from the AWSIdentityManager
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        let credentialsProvider = AWSMobileClient.sharedInstance().getCredentialsProvider()
        let identityId = AWSIdentityManager.default().identityId
    }
}
```


## Next Steps

* For further information, see [Amazon Cognito Developer Guide](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html).
