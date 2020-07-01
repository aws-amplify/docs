In this guide you will learn how to deploy a Gatsby site with Amplify hosting.

### Getting started

<amplify-callout>

In this step, you will create a new Gatsby site. If you have already created a site, you can jump to the [next step](#creating-the-git-repository).

</amplify-callout>

If you haven't already, install the [Gatsby CLI](https://www.gatsbyjs.org/tutorial/part-zero/#using-the-gatsby-cli):

```sh
# Using YARN
yarn global add gatsby-cli

# Using NPM
npm install --global gatsby-cli
```

Next, create a new site and change into the new directory:

```sh
gatsby new gatsby-amplify
cd gatsby-amplify
```

### Creating the Git repository

Next, create a new Git repository and copy the URI of the repo to your clipboard.

![Gatsby Hosting with Amplify Console - Creating a new project in Git](~/images/hosting/gatsby/1.png)

Now, initialize the new repository within the root of your project and push the code to Git.

```sh
git init
git remote add origin git@github.com:username/project-name.git # or your git repository location
git add .
git commit -m 'initial commit'
git push origin master
```

### Deploying the site to Amplify Console Hosting

Visit the [Amplify Console](https://console.aws.amazon.com/amplify/home) and click __GET STARTED__ under __Deploy__.

![Gatsby Hosting with Amplify Console - Console view](~/images/hosting/gatsby/2.png)

Next, choose the Git provider that you are using and click __Continue__:

![Gatsby Hosting with Amplify Console - Choosing Git provider](~/images/hosting/gatsby/3.png)

In the next screen, choose your repository and branch and click __Next__:

![Gatsby Hosting with Amplify Console - Choosing repo and branch](~/images/hosting/gatsby/4.png)

In the __App build and test settings__ view, click __Next__:

![Gatsby Hosting with Amplify Console - Configuring build settings](~/images/hosting/gatsby/5.png)

Finally, click __Save and deploy__.

Once your site has successfully deployed, you should see three green checkmarks:

![Gatsby Hosting with Amplify Console - Deployment complete](~/images/hosting/gatsby/6.png)

To view the live site, click on the automatically generated URL given to you by the Amplify Console.