You've successfully built an Amplify app with Next.js! Now that you've built something, it's time to deploy it to the web!

> **Note**: Amplify Console is adding support for Server-Side Rendering (SSR).
> [Upvote & comment on this issue](https://github.com/aws-amplify/amplify-console/issues/412) to show your support!

## Using [Serverless Next.js Component](https://github.com/serverless-nextjs/serverless-next.js)

> _For more information, read the [Serverless Next.js Component accouncement](https://www.serverless.com/blog/serverless-nextjs)_

First, install the `serverless` binary from https://www.serverless.com/framework/docs/getting-started/.

Next, install `@sls-next/serverless-component`:

```bash
npm install @sls-next/serverless-component@^1.17.0-alpha.12
```

Then, create __serverless.yml__ with the following content:

```yaml
# serverless.yml
nextamplified:
  component: "@sls-next/serverless-component@^1.17.0-alpha.12"
```

Finally, deploy with the following command:

<!-- Note: I had to run `isengard assume` to get the corrent behavior -->

```bash
AWS_SDK_LOAD_CONFIG=1 serverless
```

You'll see a link to your app in the output:

```console
  nextamplified:
    appUrl:         https://••••••••••.cloudfront.net
    bucketName:     XXXXXX-XXXXXXX
    distributionId: XXXXXXXXXXXXXX
```

> **Note**: It may take a few minutes for your CloudFront Distribution to become "Active".

👏 Congratulations, your app is online!
