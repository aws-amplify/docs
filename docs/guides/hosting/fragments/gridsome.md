In this guide you will learn how to deploy a Gridsome site with Amplify Hosting.

### Getting started

<amplify-callout>

In this step, you will create a new Gridsome site. If you have already created a site, you can jump to the [next step](#creating-the-git-repository).

</amplify-callout>

If you haven't already, install the [Gridsome CLI](https://gridsome.org/docs/):

```sh
# Using YARN
yarn global add @gridsome/cli

# Using NPM
npm install --global @gridsome/cli
```

Next, create a new site and change into the new directory:

```sh
gridsome create gridsome-amplify
cd gridsome-amplify
```

### Creating the Git repository

Next, create a new Git repository and copy the URI of the repo to your clipboard.

![Gridsome Hosting with Amplify Console - Creating the repo](~/images/hosting/gridsome/0.png)

Now, initialize the new repository within the root of your project and push the code to Git.

```sh
git init
git remote add origin git@github.com:username/project-name.git # or your git repository location
git add .
git commit -m 'initial commit'
git push origin master
```

### Deploying the site to Amplify Console Hosting

To use Amplify Hosting, visit the [Amplify Console](https://console.aws.amazon.com/amplify/home) and click __GET STARTED__ under __Deploy__.

![Gridsome Hosting with Amplify Console - Console view](~/images/hosting/gridsome/1.png)

Next, choose the Git provider that you are using and click __Continue__:

![Gridsome Hosting with Amplify Console - Choosing your Git provider](~/images/hosting/gridsome/2.png)

In the next screen, choose your repository and branch and click __Next__:

![Gridsome Hosting with Amplify Console - Choosing your Git repo and branch](~/images/hosting/gridsome/3.png)

In the __App build and test settings__ view, click __Edit__, set the `baseDirectory` location to be `dist`, then click __Save__ and __Next__:

![Gridsome Hosting with Amplify Console - Configuring the build settings](~/images/hosting/gridsome/4.png)

Finally, click __Save and deploy__.

Once your site has successfully deployed, you should see three green checkmarks:

![Gridsome Hosting with Amplify Console - Deployment complete](~/images/hosting/gridsome/5.png)

To view the live site, click on the automatically generated URL given to you by the Amplify Console.