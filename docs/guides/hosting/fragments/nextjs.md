In this guide you'll learn how to deploy a *static* [Next](https://nextjs.org/) app using Amplify Hosting.

> Note: Next.js also supports pre-rendering for *dynamic* server-rendered routes. At this time, Amplify **does not** support the hosting of dynamic server-rendered routes with Next.js.

There are two options: One using the Amplify CLI, and the other using a Git repository. This will cover both.

1. [CLI workflow](#cli-workflow)
2. [Git-based workflow](#git-based-deployments)

## CLI workflow

To get started, create a new Next.js app:

```sh
$ npm init next-app

✔ What is your project named? my-app
✔ Pick a template › Default starter app
```

Next, change into the new directory and update __package.json__ to add the `export` script to the existing `build` script:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build && next export",
  "start": "next start"
},
```

> `next export` allows you to export your app to static HTML, which can be run standalone without the need of a Node.js server.

### Adding Amplify hosting

If you haven't already, install and configure the latest version of the Amplify CLI:

<inline-fragment src="~/fragments/cli-install-block.md"></inline-fragment>

```bash
amplify configure
```

> To see a video walkthrough of how to configure the CLI, click [here](https://www.youtube.com/watch?v=fWbM5DLh25U).

Next, initialize a new Amplify project. __Make sure you set the Distribution Directory Path to `out`__.

```sh
$ amplify init

? Enter a name for the project: mynextapp
? Enter a name for the environment: dev
? Choose your default editor: Visual Studio Code (or your preferred editor)
? Choose the type of app that youre building: javascript
? What javascript framework are you using: react
? Source Directory Path: src
? Distribution Directory Path: out
? Build Command: npm run-script build
? Start Command: npm run-script start
? Do you want to use an AWS profile? Y
? Please choose the profile you want to use: <your profile>
```

Now, add hosting with the Amplify `add` command:

```sh
$ amplify add hosting

? Select the plugin module to execute: Hosting with Amplify Console
? Choose a type: Manual deployment
```

Next, deploy the app:

```sh
$ amplify publish

? Are you sure you want to continue? Yes
```

⚡️ Congratulations, your app has now been successfully deployed! The URL for the app should be displayed in your terminal.

![CLI Output](~/images/hosting/next/cli-output.png)

To see your app in the Amplify console at any time, run the following command:

```sh
$ amplify console
```

### Deploying updates

Once you make changes to your app and are ready to deploy them, you can run the `publish` command again:

```sh
$ amplify publish
```

### Deleting the app

To delete the app and the deployment, run the `delete` command:

```sh
$ amplify delete
```

## Git-based deployments

Amplify also offers Git-based deployments with features like CI/CD and branch previews.

To host using a Git-based deployment, follow these steps instead.

__1.__ Create your app

```sh
$ npm init next-app

✔ What is your project named? my-app
✔ Pick a template › Default starter app
```

__2.__ Set the following custom `build` script in your package.json:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build && next export",
  "start": "next start"
},
```

__3.__ Create a Git repository, then push your code to Git.

```sh
$ git init
$ git remote add origin git@github.com:username/my-next-app.git
$ git add .
$ git commit -m 'initial commit'
$ git push origin main
```

__4.__ Go to the [Amplify Console](https://console.aws.amazon.com/amplify) and click "Connect App"

__5.__ Follow the steps to choose your Git provider and your branch.

__6.__ Set the __baseDirectory__ to __out__:

![Setting the baseDirectory property](~/images/hosting/next/build-config.png)

__7.__ Click __Next__ then __Save and deploy__.

Once your site has successfully deployed, you should see three green checkmarks.

To view the live site, click on the automatically generated URL given to you by the Amplify Console.

### Kicking off a new build

You can kick off a new build directly from the Amplify console or by pushing changes to main.

1. Make some changes to your code

2. Push the changes to git

```sh
$ git add .
$ git commit -m 'updates'
$ git push origin main
```

## Dynamic routes

Next.js also supports dynamic routes.

Let's say you have a folder and file structure that looks like this:

```
/pages/posts/[id].js
```

This component needs to read the ID from the URL and do something useful with it in the app. To make this happen, we can use `next/router`:

```javascript
// /pages/posts/[id].js
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Post: {id}</p>
}

export default Post
```

To enable this, you need to set up a rewrite for __/pages/posts/[id].html__ in the __Rewrites and redirects__ section of the Amplify Console:

![Rewrites](~/images/hosting/next/rewrites.png)

## API routes and server-rendered routes

In this guide you learned how to deploy a static __Next.js__ site using Amplify Hosting.

Next.js also supports pre-rendering for dynamic server-rendered routes. At this time, Amplify does not support the hosting of API routes or server-rendered routes with Next.js.