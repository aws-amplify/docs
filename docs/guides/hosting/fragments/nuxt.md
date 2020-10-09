In this guide you will learn how to deploy a Nuxt site with Amplify Hosting.

### Getting started

<amplify-callout>

In this step, you will create a new Nuxt site. If you have already created a site, you can jump to the [next step](#creating-the-git-repository).

</amplify-callout>

Create a new Nuxt site:

```sh
# Using YARN
yarn create nuxt-app amplify-nuxt

# Using NPM
npx create-nuxt-app amplify-nuxt
```

For the __Deployment target__, choose __Static (Static/JAMStack hosting)__.

Next, change into the new directory:

```sh
cd nuxt-amplify
```

### Creating the Git repository

Next, create a new Git repository and copy the URI of the repo to your clipboard.

![Nuxt Hosting with Amplify Console - Creating the repo](~/images/hosting/nuxt/1.png)

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

![Nuxt Hosting with Amplify Console - Console view](~/images/hosting/nuxt/2.png)

Next, choose the Git provider that you are using and click __Continue__:

![Nuxt Hosting with Amplify Console - Choosing your Git provider](~/images/hosting/nuxt/3.png)

In the next screen, choose your repository and branch and click __Next__:

![Nuxt Hosting with Amplify Console - Choosing your Git repo and branch](~/images/hosting/nuxt/4.png)

In the __App build and test settings__ view, click __Edit__ and do the following:

1. Set the __build__ command to: `yarn run generate`
2. Set the `baseDirectory` location to be `dist`
3. Click __Save__
4. Click __Next__

![Nuxt Hosting with Amplify Console - Configuring the build settings](~/images/hosting/nuxt/5.png)

Finally, click __Save and deploy__.

Once your site has successfully deployed, you should see three green checkmarks:

![Nuxt Hosting with Amplify Console - Deployment complete](~/images/hosting/nuxt/6.png)

To view the live site, click on the automatically generated URL given to you by the Amplify Console.