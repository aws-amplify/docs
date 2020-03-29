Enable your users to receive mobile push messages sent from the Apple (APNs) and Google (FCM/GCM) platforms. The Amplify CLI deploys your push notification backend using [Amazon Pinpoint](http://docs.aws.amazon.com/pinpoint/latest/developerguide/).
You can also create Amazon Pinpoint campaigns that tie user behavior to push or other forms of messaging.

## Set Up Your Backend

1. Complete the [Get Started](/start?integration=ios) steps before you proceed.

2. Complete the [Setting Up APNS Guide](~/setup-apns). This will guide you through the process of setting up an App ID, SSL certificate, provisioning profile, entitlements, distribution certificate, and provisioning profile, which are required to deliver notifications to iOS devices.

3. Use the CLI to add notifications to your cloud-enabled backend and app.

    In a terminal window, navigate to your project folder (the folder that typically contains your project level `xcodeproj` file), and add the SDK to your app.

    ```bash
    $ cd ./YOUR_PROJECT_FOLDER
    $ amplify add notifications
    ```

4. Set up your backend to support receiving push notifications:

    - Choose Apple Push Notification Service (APNs).

        ```
        > APNS
        ```

    - Choose Certificate as your authentication method.

        ```
        > Certificate
        ```

    - Provide the path to your P12 certificate that you created in [Setting Up iOS Push Notifications](./setup-apns).

   Use the steps in the next section to connect your app to your backend.

## Connect to Your Backend

### Automatic configuration

Use the following steps to connect add push notification backend services to your app.

1. The `Podfile` that you configure to install the AWS Mobile SDK must contain the `AWSPinpoint` pod:

    ```ruby
    platform :ios, '9.0'

    target :'YOUR-APP-NAME' do
      use_frameworks!

        pod  'AWSPinpoint'
        pod  'AWSMobileClient'
    end
    ```

    Run `pod install --repo-update` before you continue.

    If you encounter an error message that begins `[!] Failed to connect to GitHub to update the CocoaPods/Specs...`, and your internet connectivity is working, you may need to [update openssl and Ruby](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48962041#48962041).

2. Classes that call Amazon Pinpoint APIs must use the following import statements:

    ```swift
    import AWSPinpoint
    import AWSMobileClient
    ```

3. To receive push notifications with Amazon Pinpoint, you'll instantiate a Pinpoint instance and register your device token with Amazon Pinpoint. We recommend you do this during app startup, so your users can begin receiving notifications as early as possible.

    **Note**: If you have already integrated `Analytics`, you can skip this step.

    Edit the `application(_:didFinishLaunchingWithOptions:)` method of your app's `AppDelegate.swift` by adding a `pinpoint` instance property, and initializing the Pinpoint client as shown below:

    ```swift
    class AppDelegate: UIResponder, UIApplicationDelegate {

       /** start code copy **/
       var pinpoint: AWSPinpoint?
       /** end code copy **/

       func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

            // Other didFinishLaunching code...

            /** start code copy **/
            // Create AWSMobileClient to connect with AWS
	          AWSMobileClient.default().initialize { (userState, error) in
              if let error = error {
                print("Error initializing AWSMobileClient: \(error.localizedDescription)")
              } else if let userState = userState {
                print("AWSMobileClient initialized. Current UserState: \(userState.rawValue)")
              }
            }

            // Initialize Pinpoint
            let pinpointConfiguration = AWSPinpointConfiguration.defaultPinpointConfiguration(launchOptions: launchOptions)
            pinpoint = AWSPinpoint(configuration: pinpointConfiguration)
            /** end code copy **/
            return true
       }
    }
    ```

### Manual Configuration

As an alternative to automatic configuration using the Amplify CLI, you can manually enter the necessary configurations. Here is a snippet of the relevant sections of the `awsconfiguration.json` file:

```json
{
    "Version": "0.1.0",
    "IdentityManager": {
        "Default": {}
    },
    "CredentialsProvider": {
        "CognitoIdentity": {
            "Default": {
                "PoolId": "COGNITO-IDENTITY-POOL-ID",
                "Region": "COGNITO-IDENTITY-POOL-REGION"
            }
        }
    },
    "CognitoUserPool": {
        "Default": {
            "PoolId": "COGNITO-USER-POOL-ID",
            "AppClientId": "COGNITO-USER-APP-CLIENT-ID",
            "AppClientSecret": "COGNITO-USER-POOL-APP-CLIENT-SECRET",
            "Region": "COGNITO-USER-POOL-REGION"
        }
    },
    "PinpointAnalytics": {
        "Default": {
            "AppId": "PINPOINT-APP-ID",
            "Region": "PINPOINT-REGION"
        }
    },
    "PinpointTargeting": {
        "Default": {
            "Region": "PINPOINT-REGION"
        }
    }
}
```