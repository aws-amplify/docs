Once finished, run `amplify push` to publish your changes. Once finished, it will display an auto generated URL for your web UI.

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

1. Go to the [Google developer console](https://console.developers.google.com).
2. On the left navigation bar, choose *Credentials*.
3. Select the client you created in the first step and click the edit button.
4. Type your user pool domain into Authorized Javascript origins.
5. Type your user pool domain with the `/oauth2/idpresponse` endpoint into *Authorized Redirect URIs*.

    ![Image](~/images/cognitoHostedUI/google8.png)

    Note: If you saw an error message `Invalid Redirect: domain must be added to the authorized domains list before submitting.` when adding the endpoint, please go to the *authorized domains list* and add the domain.
6. Click *Save*.

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

</amplify-block>
</amplify-block-switcher>
