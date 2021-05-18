You've successfully built an Amplify app with Next.js! Now that you've built something, it's time to deploy it to the web with Amplify Console!

> **Note**: Amplify Console is adding support for Server-Side Rendering (SSR).
> [Vote & comment on this issue](https://github.com/aws-amplify/amplify-console/issues/412) to show your support!

## Add hosting to your app
You can deploy Next.js SSR apps with AWS Amplify's CI/CD and hosting service. In this guide we'll cover how to deploy and host your SSR web apps to quickly share with others. If you want to learn more about continuous deployment, please see [this guide](https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html#standard).

### Set up continuous deployments for your app

From the root of your project, run the following command and select the **bolded options**. 
```bash
amplify add hosting
```

```console
? Select the plugin module to execute: # Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type: # Continuous deployment (Git-based deployments)
```
The Amplify Console opens and displays your deployed backend environment. 

![image](../../images/start-nextjs-deploy-1.png)

Choose the **Frontend environments** tab, select a Git provider, then choose **Connect Branch**.

![image](../../images/start-nextjs-deploy-2.png)

Follow the steps in the Amplify console to choose the branch to connect, and deploy your app. 

> **Note**: Your CloudFront Distribution may take several minutes to go from "In Progress" to "Active".  Visit your [CloudFront Console](https://console.aws.amazon.com/cloudfront/home) to monitor progress.

After your site is successfully deployed, you'll see four green checkmarks. To view the live site, click on the automatically generated URL circled in red in the following screenshot.

![image](../../images/start-nextjs-deploy-3.png)



👏 Congratulations, your app is online!


