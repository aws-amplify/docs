---
---

# Hosting

There are multiple ways to deploy and host your Amplify app. Two options are listed below:


<a href="#using-the-amplify-cli">Amplify CLI</a><br/>
<a href="#using-the-aws-amplify-console">AWS Amplify Console</a>

## Using the Amplify CLI

The `amplify publish` command is designed to build and publish both the backend and the front end of the project. Depending on the stage that the project is at, the command can be configured to publish either to a DEV or a PROD environment.<br/>
In the current implementation, the frontend publish is only available for JavaScript project for static web hosting. This is accomplished by the category plugin amplify-category-hosting, using Amazon S3 and Amazon CloudFront. <br/>
The amplify-category-hosting module uses the amplify-provider-awscloudformation to create and update the S3 and CloudFront resources.
For more  information of the Amazon S3 and Amazon CloudFront, check their docs:<br/>
[S3 static web hosting](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)<br/>
[CloudFront DEV Guide](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)

### Workflow
- `amplify hosting add`<br/>
This adds the hosting resources to the backend. The command will first prompt for environment selection, either DEV or PROD. Upon completion, the CloudFormation template for the resources is placed in the amplify/backend/hosting directory. <br/><br/>
- `amplify hosting configure`<br/>
This command walks through the steps to configure the different sections of the resources used in hosting, including S3, CloudFront, and publish ignore. See below for more details.<br/><br/>
- `amplify publish`<br/>
This command first builds and pushes the update of backend resources to the cloud (including the resources used in hosting), and then builds and publishes the frontend.<br/>
For the amplify-category-hosting implementation, the frontend build artifacts will be uploaded to the S3 hosting bucket, and then if the CloudFront is used and the command is executed with the `--invalidateCloudFront` or `-c` flag, an invalidation request will be sent to the CloudFront to invalidate its cache. 


### Configuration
The command `amplify hosting configure` walks through the steps to configure the different sections of the resources used in hosting. 
- `Website`<br/>
Configures the S3 bucket for static web hosting, the user can set the index doc and error doc, both are set to be `index.html` by default.<br/><br/>
- `CloudFront`<br/>
Configures the CloudFront content delivery network (CDN), the user can configure TTLs (Time To Live) for the default cache behavior, and configure custom error responses.<br/><br/>
- `Publish`<br/>
Configures the publish ignore patterns (just like what's in the .gitignore) for the publish command, the publish command will ignore directories and files in the distribution folder that have names matching the patterns. 

### Stages
For the amplify-category-hosting implementation, there are two stages you can select from:
- DEV: only S3 static web hosting
- PROD: S3 and CloudFront

It can take time to create and replicate a CloudFront Distribution across the global CDN footprint, in some cases 15 minutes or more. Therefore the Amplify CLI provides a DEV configuration with an S3 static site only when prototyping your application; and a PROD configuration when you are ready to deploy in production. Note that the DEV stage using S3 static sites does not have full HTTPS end to end so it is only recommended for prototyping your app. <br/>
You will be prompted to select a stage when you add hosting. <br/>
CloudFront can also be added or removed in your project afterwards by the `amplify hosting configure` command. <br/>
Note that if the hosting S3 bucket is newly created in regions other than us-east-1, you might get the `HTTP 307 Temporary Redirect` error in the beginning when you access your published application through CloudFront. This is because CloudFront forwards requests to the default S3 endpoint (s3.amazonaws.com), which is in the us-east-1 region, and it can take up to 24 hours for the new hosting bucket name to propagate globally.


## Using the AWS Amplify Console

The AWS Amplify Console is a continuous deployment and hosting service for Amplify web apps. [Learn more](http://console.amplify.aws){: .target='new'}.
{: .callout .callout--action}

The AWS Amplify Console provides a Git-based workflow for building, deploying, and hosting your Amplify web app — both the frontend and backend — from source control. Once you connect a feature branch, all code commits are automatically deployed to an `amplifyapp.com` subdomain or your custom domain. **[Get started >>](https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html)**

