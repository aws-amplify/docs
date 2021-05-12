You've successfully built an Amplify app with Next.js! Now that you've built something, it's time to deploy it to the web with Amplify Console!

> **Note**: Amplify Console is adding support for Server-Side Rendering (SSR).
> [Vote & comment on this issue](https://github.com/aws-amplify/amplify-console/issues/412) to show your support!

## Add hosting to your app
Next.js SSR apps can only be set up with automatic continuous deployments. In this guide we'll cover how to deploy and host your SSR web apps to quickly share with others. If you want to learn more about continuous deployment, please see [this guide](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html#standard).

### Set up continuous deployments for your app

From the root of your project, run the following command and select the **bolded options**. 
```bash
amplify add hosting
```

```console
? Select the plugin module to execute: # Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type: # Continuous deployment (Git-based deployments)
```
The Amplify Console will open to your deployed backend environment. Finish setting up continuous deployment by connecting your app's frontend to the Git repository where your project is stored.

> **Note**: Your CloudFront Distribution may take several minutes to go from "In Progress" to "Active".  Visit your [CloudFront Console](https://console.aws.amazon.com/cloudfront/home) to monitor progress.



👏 Congratulations, your app is online!


