# Getting Started

Get started building a cloud-powered iOS app using the AWS Amplify CLI and the AWS SDK for iOS. This page guides you through setting up an initial backend and integrating the SDK into your app.

## Step 1: Set Up Your Development Environment

We strongly recommend that you use the Amplify CLI for building the serverless backend for your app. If you have already installed the CLI, skip ahead to [Step 2](./add-aws-mobile-sdk-basic-setup).

*  [Sign up for an AWS Account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).

*  Install [Node.js](https://nodejs.org/) and npm (if they are not already installed).

> Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater by running :code:`node -v` and :code:`npm -v` in a terminal/console window. Older versions aren't supported and might generate errors.

To install and configure the Amplify CLI globally, run the following commands in a terminal window.

```bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

* Choose the iOS app project you want to integrate with an AWS backend.
* [Install Xcode](https://developer.apple.com/xcode/downloads/) version 8.0 or later.

## Step 2: Set Up Your Backend

1. The CLI prompts you for configuration parameters.

	In a terminal window, navigate to your project folder (the folder that typically contains your project level `xcodeproj` file), and add the SDK to your app.

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify init
```

2. To create your backend AWS resources and add a configuration file to your app, run the following:

```bash
$ amplify push
```

In the Finder, navigate to the folder containing your app `.xcodeproj` file. From there, drag :code:`awsconfiguration.json` to Xcode under the top Project Navigator folder (the folder name should match your Xcode project name). In the `Options` dialog box that appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Next`.

3. To verify that the CLI is set up for your app, run the following command. The CLI displays a status table with no resources listed. As you add categories to your app, backend resources created for your app are listed in this table.

```bash
  $ amplify status
  | Category | Resource name | Operation | Provider plugin |
  | -------- | ------------- | --------- | --------------- |
```

   Use the steps in the next section to configure the connection between your app and the serverless backend.

## Step 3: Connect to Your Backend

Perform the following steps to set up a connection to AWS services that you'll use in the Get Started section of this guide.

1. Install Cocoapods. From a terminal window run the following:

```
sudo gem install cocoapods
```

2. Create `Podfile`. From a terminal window, navigate to the directory that contains your project's `.xcodeproj` file and run the following:

```
pod init
```

3. Open `Podfile` in a text editor and add the pod for core AWS Mobile SDK components to your build.

```
platform :ios, '9.0'
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'AWSCore', '~> 2.6.13'

    # other pods
end
```
4. Install dependencies by running the following:

```
pod install --repo-update
```

 If you encounter an error message that begins `[!] Failed to connect to GitHub to update the CocoaPods/Specs . . .`, and your internet connectivity is working, you might need to [update openssl and Ruby](https://stackoverflow.com/questions/38993527/cocoapods-failed-to-connect-to-github-to-update-the-cocoapods-specs-specs-repo/48962041#48962041).

5. The command `pod install` creates a new workspace file. Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace`.
	- Use **ONLY** your .xcworkspace
	- Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on.

6. Rebuild your app after reopening it in the workspace to resolve APIs from new libraries called in your code. This is a good practice any time you add import statements.

Your app is now ready for you to add cloud-powered features. We recommend [adding analytics](./analytics) as your first feature.

## Next Steps

* [Add Analytics](./analytics)
* [Add User Sign-in](./authentication)
* [Add Push Notification](./push-notifications)
* [Add User File Storage](./storage)
* [Add Serverless Backend](./api)
* [Add Cloud Logic](./api)
* [Add Messaging](./messaging)
