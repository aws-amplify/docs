---
---


# Nift
This tutorial walks you through how to use AWS Amplify to build a website with [Nift](https://nift.cc). Nift is possibly the world's fastest framework for managing and generating websites ([evidence](https://hugo-vs-nift.gitlab.io/)).

## Installation:

Follow any of the instructions [here](https://nift.cc/docs/installing_nift.html) to install Nift on either Linux, OSX or Windows.

## Create a Nift project:

To start a Nift project you can either initialise a project from scratch or import/fork an existing website repository template on a code sharing website like AWS CodeCommit, BitBucket, GitHub or GitLab. Either:

- In a directory of your choosing, create a new project as follows:<br>
  `nsm init`<br>
- From [here](https://nift.cc/resources/templates.html) import or fork an existing website repository template and make a local clone on your machine as follows:<br>
  `nsm clone clone-url`<br>

## Getting Started with the CLI:
To get started, initialize your project in the Nift project directory:

```
amplify init
```

After you answer the provided questions, you can use `amplify help` at any time to see the overall command structure, and `amplify help <category>` to see actions for a specific category. 

The Amplify CLI uses AWS CloudFormation, and you can add or modify configurations locally before you push them for execution in your account. To see the status of the deployment at any time, run `amplify status`.

## Publishing Your Website:

Without making any changes to your website using Nift, add web hosting as follows:
```
amplify add hosting
```

You would be prompted next to select the environment setup. Select **DEV (S3 only with HTTP)** for quick prototyping and testing, and once production ready you could run the `amplify update hosting` command to publish your app to Amazon CloudFront (a CDN service).

**Note:** when using the **PROD** option there could be a 15-20 minute delay for the CDN setup and content replication.

When you're prompted for information, such as the bucket name or application files, you can use the default values by pressing **Enter**.

**Note:** You can use an order alias to add or remove category features. You can also run `amplify hosting add`.

Run `amplify status` to see that status (not deployed). Next, build and deploy your site by running `amplify publish` or `amplify publish --invalidate-cache` - for cache invalidation in the distribution network (if CloudFront is added via the hosting category). After it's complete, your application is available in an S3 hosting bucket for testing. It's also fronted with an Amazon CloudFront distribution. (if it is added via the hosting category in the prior bucket)

## Modifying Your Website:

***Viewing Your Website Locally***

To view your website locally open up any of the webpages located in the *site* directory of the Nift project.

***Adding/Moving/Removing Pages***

To add a page run `nsm track page-name` from anywhere inside the Nift project. You can move a page by running `nsm mv old-name new-name` and remove a page by running `nsm rm page-name`. 

***Modifying Content Files***

The *content* directory contains the content files for each of the pages. To modify a page modify the content file then run `nsm build-updated` or `nsm build-all`. For more information see the Nift documentation on [content files](https://nift.cc/docs/content_files.html).

***Modifying Template Files***

The *template* directory contains the files for templates. To modify a template modify the files in the *template* directory then run `nsm build-updated` or `nsm build-all`. For more information see the Nift documentation on [template files](https://nift.cc/docs/template_files.html).

***Adding Files To Your Website***

To add files, e.g. CSS files, Javascript files, images, videos, etc., to your website just add them to the *site* directory like you would for any website. A good way to get the path from a page to a file using Nift in your source code is `@pathtofile(absolute-path-to-file)`. For example if you have an image *imgs/pic1.jpg* in your *site* directory you would have `<img src="@pathtofile(site/imgs/pic1.jpg)">`.

***Serving Your Website Locally***

To serve your website locally run `nsm serve` from within the Nift project, then you do not need to manually run `nsm build-updated` or `nsm build-all` when you make changes to your webpages.

## Publishing changes

Save your changes and run `nsm build-updated` then `amplify publish`. You've already pushed the changes earlier so just the local build is created and uploaded to the hosting bucket.
