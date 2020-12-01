---
title: Custom domains
description: Access Admin UI on a custom domain
---

If your application is set up to use the Amplify Console's web hosting features, you can access Admin UI with the custom domain that you have set up for your application's frontend. For example, if you host your app at `https://exampledomain.com`, you can set up a friendly redirect to the Admin UI for the app at a domain address such as `https://exampledomain.com/amplify/adminui`.

When you connect a custom domain, the process for updating the DNS settings with your third-party DNS provider varies.  See [Set up custom domains](https://docs.aws.amazon.com/amplify/latest/userguide/custom-domains.html) for more information about connecting custom domains and instructions for updating your DNS settings with GoDaddy, Google Domains, and Amazon Route 53.

## To set up custom domain access for Admin UI
1. Sign in to the AWS Management console and open AWS Amplify.
2. Choose the app that you want to connect to a custom domain for Admin UI access.
3. In the navigation pane, choose **App settings**, **Domain management**.
4. On the **Domain management** page, choose **Add domain**.
5. For **Domain**, enter your root domain, and then choose **Configure domain**.
3. At the bottom of the **Add domain** page, choose **Set up redirects for custom domain to point to admin UI**. 
6. Go to your DNS provider's website, log in to your account, and update the DNS management settings for your domain. Note that verification of domain ownership and DNS propagation for third-party domains can take up to 48 hours.
7. After your app is successfully connected to your custom domain, you can access the Admin UI at the custom domain address. 

After you perform the preceding procedure, you can access the Admin UI by appending your domain address with `/amplify/staging`. For example, if your app's domain is `https://exampledomain.com`, by default you can access Admin UI at `https://exampledomain.com/amplify/staging`. You can also create your own custom redirect rule. Use the following instructions to customize the domain address to use to access the Admin UI.

## To add a redirect rule for Admin UI access
1. Sign in to the AWS Management console and open AWS Amplify.
2. Choose the app that you want to add a redirect rule to for Admin UI access.
3. In the navigation pane, choose **App settings**, **Admin UI management**.
4. The **Domain management** section displays the redirect rules for Admin UI.
5. Choose **Manage**.
6. Choose **Add redirect rule**. For **Source**, enter the custom redirect rule, for example `/amplify/adminui`. For **Target**, select the backend environment to open Admin UI for, such as `staging`.
7. Choose **Save**.
8. In this example, if an app is hosted at `https://exampledomain.com`, the Admin UI for the `staging` backend will be available at `https://exampledomain.com/amplify/adminui`.

