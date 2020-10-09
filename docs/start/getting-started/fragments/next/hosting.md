You've successfully built an Amplify app with Next.js! Now that you've built something, it's time to deploy it to the web!

> **Note**: Amplify Console is adding support for Server-Side Rendering (SSR).
> [Vote & comment on this issue](https://github.com/aws-amplify/amplify-console/issues/412) to show your support!

## Using [Serverless Next.js Component](https://github.com/serverless-nextjs/serverless-next.js)

> _For more information, read the [Serverless Next.js Component announcement](https://www.serverless.com/blog/serverless-nextjs)_

### Option 1: Watch the video guide

Watch the video below to learn how to deploy a Next.js application with the Serverless framework, or skip to the next section to follow the step-by-step instructions.

<iframe src="https://www.youtube-nocookie.com/embed/2SwlDpfGkXM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Options 2: Follow the instructions

Create __serverless.yml__ with the following content:

```yaml
# serverless.yml
nextamplified:
  component: "@sls-next/serverless-component@1.16.0"
```

Finally, deploy with the following command:

```bash
npx serverless
```

You'll see a link to your app in the output:

```console
  nextamplified:
    appUrl:         https://••••••••••.cloudfront.net
    bucketName:     XXXXXX-XXXXXXX
    distributionId: XXXXXXXXXXXXXX
```

> **Note**: Your CloudFront Distribution may take several minutes to go from "In Progress" to "Active".  Visit your [CloudFront Console](https://console.aws.amazon.com/cloudfront/home) to monitor progress.

👏 Congratulations, your app is online!

To delete the app, run the following:

```bash
npx serverless remove
```
