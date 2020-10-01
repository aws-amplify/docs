This guide will show you how to host a static site from a local Amplify project using Amplify hosting.

In this example you will be deploying a React app, but you can also also use any of the following types of projects or frameworks:

1. Static HTML
2. Vue
3. Angular
4. Ionic
5. Gatsby

## 1. Create a new web app and change into the directory

```sh
npx create-react-app amplifyapp
cd amplifyapp
```

## 2. Initialize a new Amplify project

```sh
amplify init

# Follow the steps to give the project a name, environment name, and set the default text editor.
# Accept defaults for everything else and choose your AWS Profile.
```

## 3. Add hosting

```sh
amplify add hosting

? Select the plugin module to execute: Hosting with Amplify Console
? Choose a type: Manual Deployment
```

## 4. Deploy the app

Now, the app is ready to deploy. To do so, you can run the `publish` command.
```sh
amplify publish
```

## 5. View in the Amplify Console

To view the project in the Amplify Console at any time, you can run the `console` command:

```sh
amplify console
```