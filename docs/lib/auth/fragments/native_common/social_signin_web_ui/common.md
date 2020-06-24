## Prerequisites

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/getting_started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/common_prereq.md"></inline-fragment>

## Setup Your Auth Provider

<amplify-block-switcher>
<amplify-block name="Facebook Login">

1. Create a [developer account with Facebook](https://developers.facebook.com/docs/facebook-login).

2. [Sign In](https://developers.facebook.com/) with your Facebook credentials.

3. From the *My Apps* menu, choose *Add New App*.
![Image](~/images/cognitoHostedUI/facebook1.png)

4. Give your Facebook app a name and choose *Create App ID*.
![Image](~/images/cognitoHostedUI/facebook2.png)

5. On the left navigation bar, choose *Settings* and then *Basic*.
![Image](~/images/cognitoHostedUI/facebook3.png)

6. Note the *App ID* and the *App Secret*. You will use them in the next section in the CLI flow.

</amplify-block>
<amplify-block name="Google Sign-In">

1. Go to the [Google developer console](https://console.developers.google.com).
2. On the left navigation bar, choose *Credentials*.
![Image](~/images/cognitoHostedUI/google5.png)
3. Create your OAuth2.0 credentials by choosing *OAuth client ID* from the *Create credentials* drop-down list.
![Image](~/images/cognitoHostedUI/google6.png).
4. Choose *Web application*.
5. Click *Create*.
6. Note the *OAuth client ID* and *client secret*. You will need them for the next section in the CLI flow.
7. Choose *OK*.

</amplify-block>
<amplify-block name="Login with Amazon">

1. Create a [developer account with Amazon](https://developer.amazon.com/login-with-amazon).
2. [Sign in](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html) with your Amazon credentials.
3. You need to create an Amazon security profile to receive the Amazon client ID and client secret. Choose Create a Security Profile.
![Image](~/images/cognitoHostedUI/amazon1.png)
4. Type in a Security Profile Name, a Security Profile Description, and a Consent Privacy Notice URL.
![Image](~/images/cognitoHostedUI/amazon2.png)
5. Choose Save.
6. Choose Client ID and Client Secret to show the client ID and secret. You will need them for the next section in the CLI flow.
![Image](~/images/cognitoHostedUI/amazon3.png)

</amplify-block>

<amplify-block name="Sign in with Apple">

1. [Sign In](https://developer.apple.com/account/) with your Apple developer credentials.
2. On the main developer portal page, select **Certificates, IDs, & Profiles**.
3. On the left navigation bar, select **Identifier**.
4. On the Identifiers page, select the **+** icon.
5. On the Register a New Identifier page, select **App IDs**.
6. On the Register an App ID page, under App ID Prefix, take note of the Team ID value.
7. Provide a description in the Description text box and provide the bundleID of the iOS app.
![Image](~/images/cognitoHostedUI/apple1.png)
8. Under Capabilities, select Sign in with Apple.
9. Select **Continue**, review the configuration, and then select **Register**.
10. On the Identifiers page, on the right, select **App IDs**, and then select **Services ID**.
11. Select the **+** icon and, on the Register a New Identifier page, select **Services IDs**.
12. Provide a description in the *Description* text box and provide an identifier for the service id.
![Image](~/images/cognitoHostedUI/apple2.png)
13. Continue and register the service id.

</amplify-block>
</amplify-block-switcher>


## Configure Auth Category

In terminal, navigate to your project, run `amplify add auth`, and choose the following options (the last steps are specific to Facebook here but are similar for other providers):

<inline-fragment platform="android" src="~/lib/auth/fragments/android/social_signin_web_ui/10_cli_setup.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/social_signin_web_ui/10_cli_setup.md"></inline-fragment>

<amplify-callout>
Sign in with Apple is not yet added to the CLI, follow the steps below to enable it.
</amplify-callout>
Once finished run `amplify push` to publish your changes. Once finished, it will display an auto generated URL for your web UI.

You need to now inform your auth provider of this URL:

<amplify-block-switcher>
<amplify-block name="Facebook Login">

1. [Sign In](https://developers.facebook.com/) with your Facebook credentials.
2. From the *My Apps* menu, choose *Your App*.
![Image](~/images/cognitoHostedUI/facebook1.png)
3. On the left navigation bar, choose *Settings* and then *Basic*.
![Image](~/images/cognitoHostedUI/facebook3.png)
4. Choose *+ Add Platform* from the bottom of the page and then choose *Website*.
![Image](~/images/cognitoHostedUI/facebook4.png)
5. Under Website, type your user pool domain with the /oauth2/idpresponse endpoint into *Site URL*

    `https://<your-user-pool-domain>/oauth2/idpresponse`

    ![Image](~/images/cognitoHostedUI/facebook5.png)
6. Save changes.
7. Type your user pool domain into *App Domains*:

    `https://<your-user-pool-domain>`

    ![Image](~/images/cognitoHostedUI/facebook6.png)
8. Save changes.
9. From the navigation bar choose *Products* and then *Set up* from *Facebook Login*.
![Image](~/images/cognitoHostedUI/facebook7.png)
10. From the navigation bar choose *Facebook Login* and then *Settings*.
11. Type your redirect URL into *Valid OAuth Redirect URIs*. It will consist of your user pool domain with the /oauth2/idpresponse endpoint.

    `https://<your-user-pool-domain>/oauth2/idpresponse`

    ![Image](~/images/cognitoHostedUI/facebook8.png)
12. Save changes.

</amplify-block>
<amplify-block name="Google Sign-In">

1. Go to [Google Developer Console](https://developers.google.com/identity/sign-in/web/sign-in)
2. Click *CONFIGURE A PROJECT*
![Image](~/images/cognitoHostedUI/google1.png)
3. Type in a project name and choose *NEXT*.
![Image](~/images/cognitoHostedUI/google2.png)
4. Type in your product name and choose *NEXT*.
5. Choose *Web browser* from the *Where are you calling from?* drop-down list.
![Image](~/images/cognitoHostedUI/google3.png)
6. Click *CREATE*. You will NOT use the *Client ID* and *CLient Secret* from this step.
7. Click Done.
8. Go to the [Google developer console](https://console.developers.google.com).
9. On the left navigation bar, choose *Credentials*.
![Image](~/images/cognitoHostedUI/google5.png)
10. Select the client you created in the first step and choose the edit option.
11. Type your user pool domain into Authorized Javascript origins.
12. Type your user pool domain with the `/oauth2/idpresponse` endpoint into *Authorized Redirect URIs*.

    ![Image](~/images/cognitoHostedUI/google7.png)

    Note: If you saw an error message `Invalid Redirect: domain must be added to the authorized domains list before submitting.` when adding the endpoint, please go to the *authorized domains list* and add the domain.
13. Click *Save*.

</amplify-block>
<amplify-block name="Login with Amazon">

1. [Sign in](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html) with your Amazon credentials.
2. Hover over the gear and choose Web Settings associated with the security profile you created in the previous step, and then choose Edit.
![Image](~/images/cognitoHostedUI/amazon4.png)
3. Type your user pool domain into Allowed Origins and type your user pool domain with the /oauth2/idpresponse endpoint into Allowed Return URLs.
![Image](~/images/cognitoHostedUI/amazon5.png)
5. Choose Save.

</amplify-block>
<amplify-block name="Sign in with Apple">

1. [Sign In](https://developer.apple.com/account/) with your Apple developer credentials.
2. On the main developer portal page, select **Certificates, IDs, & Profiles**.
3. On the left navigation bar, select **Identifiers** and then select **Service IDs** from the drop down list on the right.
4. Select the service id created in `Setup your auth provider` step above.
5. Enabled **Sign In with Apple** and select **Configure**.
6. Under **Primary App ID** select the app id that was created before.
7. Type your user pool domain into **Domains and Subdomains**.
8. Type your user pool domain with the `/oauth2/idpresponse` endpoint into **Return URLs**.
![Image](~/images/cognitoHostedUI/apple3.png)
9. Click **Next**, review the information, then select **Done**.
10. On *Edit your Services ID Configuration* click **Continue**, review the information, then select **Save**.
11. On the main Certificates, Identifiers & Profiles, select **Keys**.
12. On the Keys page, select the **+** icon.
13. Provide a name for the key under **Key Name**.
14. Enable **Sign in with Apple** and select **Configure**
![Image](~/images/cognitoHostedUI/apple4.png)
15. Under **Primary App ID** select the app id that was created before.
16. Click on **Save**
17. On **Register a New Key** click **Continue**, review the information, then select **Register**.
18. On the page you are redirected to take note of the Key ID and download the .p8 file containing the private key.
![Image](~/images/cognitoHostedUI/apple5.png)

### Amazon Cognito User pool setup
1. In your terminal type `amplify auth console` and select `User Pool` to open the AWS console for the Amazon Cognito User Pool.
2. Under Federation, under the Identity providers tab, select Sign in with Apple.
3. Provide the Apple Services ID, Team ID, Key ID, and the downloaded private key for the Sign in with Apple application along with the desired scopes.
4. Select the Attribute mapping tab, and then select the Apple tab.
5. Select the checkboxes under Capture next to the Apple attributes, and select the user pool attribute under User pool attribute that will receive the value from the Apple attribute and that you would like to receive in the tokens from Amazon Cognito.
6. To enable your app client to allow federation through the Sign in with Apple IdP, under App Integration, select App client settings, find the App client that you want to allow Sign in with Apple, and select the Sign in with Apple check box.

</amplify-block>
</amplify-block-switcher>

<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/signin_web_ui/20_platform_specific_setup.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/auth/fragments/android/signin_web_ui/20_platform_specific_setup.md"></inline-fragment>

## Launch Social Web UI Sign In
Sweet! You're now ready to launch sign in with your social provider's web UI.

<inline-fragment platform="android" src="~/lib/auth/fragments/android/social_signin_web_ui/20_signin.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/auth/fragments/ios/social_signin_web_ui/20_signin.md"></inline-fragment>
