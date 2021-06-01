---
title: Getting Started
description: This section describe the high level code structure of PhotoSharing
filterKey: platform
---

PhotoSharing is a demonstration of building an iOS social networking App with [Amplify Libraries](~/lib/lib.md).

## App features

This is an App that you can perform sign in/sign out, post photos, update your profile image and scroll to view your created posts

### Sign In/Sign Out

The App allows you to sign up, sign in using [Amplify.Auth.signInWithWebUI](~/lib/auth/signin_web_ui.md) api.

**Sign Up Flow:**

![Sign Up](~/images/sample-app/photo-sharing/sign-up-flow.png)

**Sign In Flow:**
![Sign In](~/images/sample-app/photo-sharing/sign-in-flow.png)

### Post photos

Once you are authenticated, you can create a post with selected image using [Amplify.DataStore.save](~/lib/datastore/data-access.md#create-and-update) and [Amplify.Storage.UploadData](~/lib/storage/upload.md) api

![Create Post](~/images/sample-app/photo-sharing/post-creation-flow.png)

### Update profile image

Besides posting image, you can also update your profile image

![Update Profile](~/images/sample-app/photo-sharing/profile-update-flow.png)

### Posts loading

The loading of the posts is related to [Amplify.DataStore.query](~/lib/datastore/data-access.md#query-data) and [Amplify.Storage.downloadData](~/lib/storage/download.md)

![Load Posts](~/images/sample-app/photo-sharing/posts-loading.png)

## Requirements

Before moving forward, please make sure you have followed [instruction](https://docs.amplify.aws/lib/project-setup/prereq/q/platform/ios) to finish signing up AWS Account and setting up Amplify CLI

Once the above step is done, you need to have the following pre-requisites installed on your computer to run this iOS project:

* [Xcode 12 or later](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
* [CocoaPods latest version](https://cocoapods.org)
* [Amplify CLI latest version](https://docs.amplify.aws/cli)

If you have them, then go ahead and clone the repository: 

```bash
git clone git@github.com:aws-amplify/amplify-native-samples-staging.git
```

## Run the App

To run the App, please go to [amplify-ios-samples](https://github.com/aws-amplify/amplify-ios-samples) repository and follow the readme to provision backend resource.

