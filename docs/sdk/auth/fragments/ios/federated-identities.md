**Availability Note**
Currently, the federation feature in the AWSMobileClient supports Cognito Identity Pools only.
{: .callout .callout--info}

## Federated Sign In

```swift
AWSMobileClient.default().federatedSignIn(providerName: IdentityProvider.facebook.rawValue, token: "FACEBOOK_TOKEN_HERE") { (userState, error)  in
    if let error = error {
        print("Federated Sign In failed: \(error.localizedDescription)")
    }
}
```

`federatedSignIn()` can be used to obtain federated "Identity ID" using external providers like Google, Facebook or Twitter. If the tokens are expired and new tokens are needed, a notification will be dispatched on the `AWSMobileClient` listener with the user state `signedOutFederationTokensInvalid`. You can give the updated tokens via the same `federatedSignIn()` method. 

The API calls to get AWS credentials will be asynchronously blocked until you fetch the social provider's token and give it to `AWSMobileClient`. Once you pass the tokens, the `AWSMobileClient` will fetch AWS Credentials using the new tokens and unblock all waiting calls. It will then use the new credentials.

### SAML with Cognito Identity

To federate your SAML sign-in provider as a user sign-in provider for AWS services called in your app, you will pass tokens to `AWSMobileClient.default().federatedSignIn()`. 
You must first register your SAML application with AWS IAM by using the the following [instructions](https://docs.aws.amazon.com/cognito/latest/developerguide/saml-identity-provider.html). 

Once you retrieve the SAML tokens from your login, you can call the `federatedSignIn` API in `AWSMobileClient`:

```swift
// Perform SAML token federation
AWSMobileClient.default().federatedSignIn(providerName: "YOUR_SAML_PROVIDER_NAME",
                                                    token: "YOUR_SAML_TOKEN") { (userState, error) in
    if let error = error as? AWSMobileClientError {
        print(error.localizedDescription)
    }
    if let userState = userState {
        print("Status: \(userState.rawValue)")
    }
}

```

**Note**
If the SAML token contains more than one Role ARN, you will need to specify which role will be assumed when federating. If the SAML token has more than one Role ARN and a `customRoleARN` is not specified, it will result in an error.
{: .callout .callout--info}

```swift
// Choose one of the roles available in the token
val options = FederatedSignInOptions(customRoleARN: "choose-one")

// Perform SAML token federation
AWSMobileClient.default().federatedSignIn(providerName: "YOUR_SAML_PROVIDER_NAME",
                                                        token: "YOUR_SAML_TOKEN"
                                       federatedSignInOptions: options) { (userState, error) in
    if let error = error as? AWSMobileClientError {
        print(error.localizedDescription)
    }
    if let userState = userState {
        print("Status: \(userState.rawValue)")
    }
}
```

### Facebook with Cognito Identity

To federate Facebook as a user sign-in provider for AWS services called in your app, you will pass tokens to `AWSMobileClient.default().federatedSignIn()`. You must first register your application with Facebook by using the [Facebook Developers portal](https://developers.facebook.com/) and configure this with Amazon Cognito Identity Pools.

AWS Amplify helps set this up for you but first this topic explains how to set up Facebook as an identity provider for your app.

If you already have a Facebook app ID, you can copy and paste it into the `Facebook App ID` field
when configuring authentication using the AWS Amplify CLI.
{: .callout .callout--info}

**To get a Facebook app ID**

1. In the [Facebook Developers portal](https://developers.facebook.com/), sign in with your
   Facebook credentials.

2. From `Create App`, choose `Add a New App` (note: this menu label will be
   `My Apps` if you have previously created an app.

![Image](~/images/new-facebook-app.png)

3. If asked, choose the platform of your app that will use Facebook sign-in, and `basic
   setup`.

4. Type a display name for your app, select a category for your app from the `Category`
   drop-down list, and then choose `Create App ID`.

![Image](~/images/new-facebook-app-new-app-id.png)


5. Complete the `Security Check` that appears. Your new app then appears in the
   `Dashboard`.

6. Copy the App ID and note it for later when using the Amplify CLI.

![Image](~/images/new-facebook-app-id.png)

7. In the Facebook Developer portal's left hand navigation list, choose `Settings`, then
   choose `+ Add Platform`.

![Image](~/images/new-facebook-add-platform.png)

8. Choose your platform and provide information about your app that Facebook will use for
   integration during credential validation.

   `For iOS:`

      1. Add your app's Bundle ID. (for example, com.amazon.YourProjectName).

![Image](~/images/new-facebook-add-platform-ios.png)


9. In the Facebook Developers portal, choose `Save changes`, then `Use this
   package name` if a dialog appears saying that Google Play has an issue with your package name.

10. Only users with roles assigned in the Facebook portal will be able to authenticate through your
   app while it is in development (not yet published).

    To authorize users, in the Facebook Developer portal's left hand navigation list, choose
    `Roles`, then `Add Testers`. Provide a valid Facebook ID.

![Image](~/images/new-facebook-add-testers.png)


For more information about integrating with Facebook Login, see the [Facebook Getting Started Guide](https://developers.facebook.com/docs/facebook-login).

**Amplify CLI Configuration - Facebook**

In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI prompts you for configuration parameters. Choose **I will setup my own configuration** and **AWS IAM controls** when prompted.

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add auth              ##"amplify update auth" if already configured
❯ Manual Configuration.
❯ User Sign-Up, Sign-In, connected with AWS IAM controls
```

Choose **YES** to `? Allow unauthenticated logins?` and **YES** to `? Do you want to enable 3rd party authentication providers in your identity pool?`.

**Choose Facebook** and then provide your Facebook **App ID** that you saved earlier.

When configuration for Facebook sign-in is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. Run the following to update your changes in the cloud:

```bash
$ amplify push
```

You can now [configure Facebook in your mobile app](./authentication#facebook-login-in-your-mobile-app).

Note that the CLI allows you to select more than one identity provider for your app. You can also run `amplify auth update` to add an identity provider to an existing auth configuration.

### Google with Cognito Identity

To federate Google as a user sign-in provider for AWS services called in your app, you will pass tokens to `AWSMobileClient.default().federatedSignIn()`. You must first register your application with Google Sign-In in the Google Developers Console, and then configure this with Amazon Cognito Identity Pools.

To implement Google Sign-in into your iOS app, you need two things: 

1. OAuth Web Client ID 
2. iOS Client ID

These Client IDs are part of your Google Developers project. The Web Client ID will be used by Cognito Identity Pools to manage the OAuth flow between Cognito and Google on the server side. The iOS Client ID will be used in your iOS app to authorize the OAuth flow directly with Google allowing your users to authenticate with Google using their Google login credentials.

**NOTE:** The creation and configuration steps for creating OAuth Clients for Google Sign-In is constantly changing, always refer to the official setup instructions from Google.

First, navigate to the ["Start Integrating" section of the Google Developer portal](https://developers.google.com/identity/sign-in/ios/start-integrating) and click **CREATE AN OAUTH CLIENT ID** to get an OAuth client ID. When you select an existing or new project, this will automatically create the "Web Client ID" for you in the background fulfilling requirement #1 above.

When prompted choose **iOS** as the calling platform along with your Package name and certificate. Once created the **iOS Client ID** will be created. Copy this as you will use it when configuring your backend with the Amplify CLI.

Next, obtain your **OAuth Web Client ID** from your project credentials navigating directly to the [Credentials section of the Google Developer console](https://console.developers.google.com/apis/credentials). Select your project (you may need to click **All**) and under **OAuth 2.0 client IDs** copy the Client ID associated with the Web application type. Save it for the next step. The iOS Client ID from earlier is listed here as well.

![Image](~/images/iOS_OAuth.png)

After completing the steps above, note both of the **Google Client IDs** for usage with the Amplify CLI in the next section.
**Amplify CLI Configuration - Google**

In a terminal window, navigate to the root of your app files and add the auth category to your app. The CLI prompts you for configuration parameters. Choose **I will setup my own configuration** and **AWS IAM controls** when prompted.

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify add auth              ##"amplify update auth" if already configured
❯ Manual Configuration  
❯ User Sign-Up, Sign-In, connected with AWS IAM controls
```

Choose **YES** to `? Allow unauthenticated logins?` and **YES** to `? Do you want to enable 3rd party authentication providers in your identity pool?`.

Choose **Google** and then provide your Google **Client IDs** as appropriate. The CLI will ask you for both the **Web Client ID** and **iOS Client ID** at the appropriate time.

When configuration for Google sign-in is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. Run the following to update your changes in the cloud:

```bash
$ amplify push
```

You can now [configure Google in your mobile app](./authentication#google-login-in-your-mobile-app).

Note that the CLI allows you to select more than one identity provider for your app. You can also run `amplify auth update` to add an identity provider to an existing auth configuration.

### Developer Authenticated Identities with Cognito Identity

With developer authenticated identities, you can register and authenticate users via your own existing authentication process, while still using Amazon Cognito to access AWS resources. Using developer authenticated identities involves interaction between the end user device, your backend for authentication, and Amazon Cognito.

Begin by registering yourself with Cognito Identity in the console.

![Image](~/images/dev-auth-ids-console-settings.png)

Then, once the end-user has authenticated with you, the app should receive a Cognito identity id and token confirming the sign-in with you from your servers.

The app will federate your sign-in with Cognito Identity to receive AWS credentials by making the following call.

```swift
AWSMobileClient.default().federatedSignIn(providerName: IdentityProvider.developer.rawValue,
                                                        token: "YOUR_TOKEN",
                                       federatedSignInOptions: FederatedSignInOptions(cognitoIdentityId: identityId!)) { (userState, error) in
    if let error = error as? AWSMobileClientError {
        print(error.localizedDescription)
    }
    if let userState = userState {
        print("Status: \(userState.rawValue)")
    }
}
```

## Facebook Login in Your Mobile App

1. Add the following dependencies in your project's `Podfile`.

	```ruby
	platform :ios, '9.0'
	  target 'YOUR-APP-NAME' do
	    use_frameworks!

	    pod 'AWSFacebookSignIn', '~> 2.12.0'     # Add this new dependency
	    pod 'AWSAuthUI', '~> 2.12.0'             # Add this dependency if you have not already added
	    
	    # Other Pod entries
	    pod 'AWSMobileClient', '~> 2.12.0'
	    pod 'AWSUserPoolsSignIn', '~> 2.12.0'
	    
	  end
	```

Run `pod install --repo-update`.

Note : `AWSFacebookSignIn` is only needed for using Facebook in your app and  `AWSAuthUI` is only necessary if using the "Drop-In UI".
{: .callout .callout--info}

2. Add Facebook meta data to `Info.plist`.

	To configure your Xcode project to use Facebook Login, right-choose `Info.plist` and then choose `Open As > Source Code`.

	Add the following entry, using your project name, Facebook ID and login scheme ID.

```xml
  <plist version="1.0">

  <dict>
  <!-- YOUR OTHER PLIST ENTRIES HERE -->

  <!-- START OF FACEBOOK PLIST ENTRIES HERE -->
  <!-- 0123456789012345 BELOW IS EQUIVALENT TO YOUR APP ID -->
  <key>FacebookAppID</key>
  <string>0123456789012345</string>
  <key>FacebookDisplayName</key>
  <string>YOUR-PROJECT-NAME</string>
  <key>LSApplicationQueriesSchemes</key>
  <array>
      <string>fbapi</string>
      <string>fb-messenger-api</string>
      <string>fbauth2</string>
      <string>fbshareextension</string>
  </array>
  <!-- END OF FACEBOOK PLIST ENTRIES HERE -->

  <!-- ADD AN ENTRY TO CFBundleURLTypes for Facebook -->
  <!-- IF YOU DO NOT HAVE CFBundleURLTypes, YOU CAN COPY THE WHOLE BLOCK BELOW -->
  <key>CFBundleURLTypes</key>
  <array>
      <dict>
          <key>CFBundleURLSchemes</key>
          <array>
              <string>fb0123456789012345</string>
          </array>
      </dict>
  </array>

  <!-- ... -->
  </dict>
```

Now, your drop-in UI will show a Facebook sign in button which the users can use to sign in to your app. This uses the `federatedSignIn()` flow underneath it.

## Google Login in Your Mobile App

1. Add or update your AWS backend configuration file to incorporate your new sign-in. For details, see the last steps in the [Get Started: Set Up Your Backend](./start) section.

2. Add the following dependencies in the Podfile.

	```ruby
	platform :ios, '9.0'
	target :'YOUR-APP-NAME' do
	  use_frameworks!
	  pod 'AWSGoogleSignIn', '~> 2.12.0'     # Add this new dependency
	  pod 'GoogleSignIn', '~> 4.0'          # Add this new dependency
	  pod 'AWSAuthUI', '~> 2.12.0'           # Add this dependency if you have not already added
	    
	  # Other Pod entries
	  pod 'AWSMobileClient', '~> 2.12.0'
	  pod 'AWSUserPoolsSignIn', '~> 2.12.0'
	  
	end
	```
	Run `pod install --repo-update` before you continue.

Note : `AWSGoogleSignIn` is only needed for using Google Login in your app and `AWSAuthUI` is only necessary if using the "Drop-In UI".
{: .callout .callout--info}

2. Add Google metadata to `Info.plist`.

	To configure your Xcode project to use Google Login, open its `Info.plist` file using **Right-click > Open As > Source Code.** Add the following entry. Substitute your project name for the placeholder string.

	```xml

	<plist version="1.0">
	<!-- YOUR OTHER PLIST ENTRIES HERE -->

	<!-- ADD AN ENTRY TO CFBundleURLTypes for Google -->
	<!-- IF YOU DO NOT HAVE CFBundleURLTypes, YOU CAN COPY THE WHOLE BLOCK BELOW -->
	<key>CFBundleURLTypes</key>
	<array>
	    <dict>
	    <key>CFBundleURLSchemes</key>
	    <array>
	        <string>com.googleusercontent.apps.xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</string>
	    </array>
	    </dict>
	</array>

	<!-- ... -->
	```

Now, your drop-in UI will show a Google sign in button which the users can use to sign in to your app. This uses the `federatedSignIn()` flow underneath it.