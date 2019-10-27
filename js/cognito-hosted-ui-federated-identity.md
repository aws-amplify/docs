{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign image_base = base_dir | append: page.dir | append: "images" %}
{% assign common_media = base_dir | append: "/images" %}


## Social Provider Setup

Before adding a social provider to an Amplify project, you must first create go to that provider and configure an application identifier as outlined below.

### Facebook Instructions

1. Create a [developer account with Facebook](https://developers.facebook.com/docs/facebook-login)
2. [Sign In](https://developers.facebook.com/) with your Facebook credentials.
3. From the *My Apps* menu, choose *Add New App*.
![Image]({{common_media}}/cognitoHostedUI/facebook1.png)
4. Give your Facebook app a name and choose *Create App ID*.
![Image]({{common_media}}/cognitoHostedUI/facebook2.png)
5. On the left navigation bar, choose *Settings* and then *Basic*.
![Image]({{common_media}}/cognitoHostedUI/facebook3.png)
6. Note the *App ID* and the *App Secret*. You will use them in the next section in the CLI flow.

### Google Sign-In Instructions

1. Go to the [Google developer console](https://console.developers.google.com).
2. On the left navigation bar, choose *Credentials*.
![Image]({{common_media}}/cognitoHostedUI/google5.png)
3. Create your OAuth2.0 credentials by choosing *OAuth client ID* from the *Create credentials* drop-down list.
![Image]({{common_media}}/cognitoHostedUI/google6.png)
4. Choose *Web application*.
5. Click *Create* twice.
6. Note the *OAuth client ID* and *client secret*. You will need them for the next section in the CLI flow.
7. Choose *OK*.

### Amazon Login Instructions

1. Create a [developer account with Amazon](https://developer.amazon.com/login-with-amazon).
2. [Sign in](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html) with your Amazon credentials.
3. You need to create an Amazon security profile to receive the Amazon client ID and client secret. Choose Create a Security Profile.
![Image]({{common_media}}/cognitoHostedUI/amazon1.png)
4. Type in a Security Profile Name, a Security Profile Description, and a Consent Privacy Notice URL.
![Image]({{common_media}}/cognitoHostedUI/amazon2.png)
5. Choose Save.
6. Choose Client ID and Client Secret to show the client ID and secret. You will need them for the next section in the CLI flow.
![Image]({{common_media}}/cognitoHostedUI/amazon3.png)


### Finish Social Setup

After adding your Social provider information into the Amplify project setup, the domain that was created must be added into the Social provider configuration to complete the process.

### Facebook Instructions

1. [Sign In](https://developers.facebook.com/) with your Facebook credentials.
2. From the *My Apps* menu, choose *Your App*.
![Image]({{common_media}}/cognitoHostedUI/facebook1.png)
3. On the left navigation bar, choose *Settings* and then *Basic*.
![Image]({{common_media}}/cognitoHostedUI/facebook3.png)
4. Choose *+ Add Platform* from the bottom of the page and then choose *Website*.
![Image]({{common_media}}/cognitoHostedUI/facebook4.png)
5. Under Website, type your user pool domain with the /oauth2/idpresponse endpoint into *Site URL*

    `https://<your-user-pool-domain>/oauth2/idpresponse`

    ![Image]({{common_media}}/cognitoHostedUI/facebook5.png)
6. Save changes.
7. Type your user pool domain into *App Domains*:

    `https://<your-user-pool-domain>`

    ![Image]({{common_media}}/cognitoHostedUI/facebook6.png)
8. Save changes.
9. From the navigation bar choose *Products* and then *Set up* from *Facebook Login*.
![Image]({{common_media}}/cognitoHostedUI/facebook7.png)
10. From the navigation bar choose *Facebook Login* and then *Settings*.
11. Type your redirect URL into *Valid OAuth Redirect URIs*. It will consist of your user pool domain with the /oauth2/idpresponse endpoint.

    `https://<your-user-pool-domain>/oauth2/idpresponse`

    ![Image]({{common_media}}/cognitoHostedUI/facebook8.png)
12. Save changes.

### Google Sign-In Instructions

1. Go to [Google Developer Console](https://developers.google.com/identity/sign-in/web/sign-in).
2. Click *CONFIGURURE A PROJECT*
![Image]({{common_media}}/cognitoHostedUI/google1.png)
3. Type in a project name and choose *NEXT*.
![Image]({{common_media}}/cognitoHostedUI/google2.png)
4. Type in your product name and choose *NEXT*.
5. Choose *Web browser* from the *Where are you calling from?* drop-down list.
![Image]({{common_media}}/cognitoHostedUI/google3.png)
6. Click *CREATE*. You will NOT use the *Client ID* and *CLient Secret* from this step.
7. Click Done.
8. Go to the [Google developer console](https://console.developers.google.com).
9. On the left navigation bar, choose *Credentials*.
![Image]({{common_media}}/cognitoHostedUI/google5.png)
10. Select the client you created in the first step and choose the edit option
11. Type your user pool domain into Authorized Javascript origins.
12. Type your user pool domain with the `/oauth2/idpresponse` endpoint into *Authorized Redirect URIs*.

    ![Image]({{common_media}}/cognitoHostedUI/google7.png)

    Note: If you saw an error message `Invalid Redirect: domain must be added to the authorized domains list before submitting.` when adding the endpoint, please go to the *authorized domains list* and add the domain.
13. Click *Save*.

### Amazon Login Instructions

1. [Sign in](https://developer.amazon.com/loginwithamazon/console/site/lwa/overview.html) with your Amazon credentials.
2. Hover over the gear and choose Web Settings associated with the security profile you created in the previous step, and then choose Edit.
![Image]({{common_media}}/cognitoHostedUI/amazon4.png)
3. Type your user pool domain into Allowed Origins and type your user pool domain with the /oauth2/idpresponse endpoint into Allowed Return URLs.
![Image]({{common_media}}/cognitoHostedUI/amazon5.png)
5. Choose Save.
