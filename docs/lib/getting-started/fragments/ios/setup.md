
Amplify iOS is in preview mode and not intended for production usage at this time. We welcome feedback to improve your experience in using Amplify iOS.
[Click here](../sdk/ios/start) to access the Getting Started guide for iOS SDK 2.0 docs.
{: .callout .callout--warning}

## Getting Started

Build an iOS app using the Amplify Framework which contains:

- Amplify Tools - CLI toolchain for creating and managing your serverless backend.
- iOS, Android, and JavaScript libraries to access your resources using a category based programming model.
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue.

This page guides you through setting up a backend and integrating the Amplify libraries in your iOS app. You will create a "Note app" with a GraphQL API and to store and retrieve items in a cloud database, as well as receive updates over a realtime subscription using the [API category](https://aws-amplify.github.io/docs/ios/api){:target="_blank"}. Alternatively the [DataStore category](https://aws-amplify.github.io/docs/ios/datastore){:target="_blank"} can be used for local-first programming, offline access, and object sync with GraphQL.

[GraphQL](http://graphql.org){:target="_blank"} is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites

* [Install Xcode](https://developer.apple.com/xcode/downloads/){:target="_blank"} version 10.2 or later.

* [Install CocoaPods](https://cocoapods.org/)

* [Install Node](https://nodejs.org/en/)

* This guide assumes that you are familiar with iOS development and tools. If you are new to iOS development, you can follow [these steps](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/BuildABasicUI.html){:target="_blank"} to create your first iOS application using Swift. 


## Configure your app
You can use an existing iOS app or create a new iOS app in Swift as per the steps in prerequisite section. 

a. From a terminal window, navigate into your Xcode project's root application directory and run the following commands:

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ pod init
```

b. Open the created  `Podfile` in a text editor and add the pods for the core Amplify Framework components.

```ruby
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'amplify-tools'

    pod 'Amplify'
    pod 'AWSPluginsCore'
    pod 'AmplifyPlugins/AWSAPIPlugin'

    # other pods
end
```

c. Install dependencies by running the following command:

```bash
pod install --repo-update
```

d. Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace` file. Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on.

e. Build your Xcode project.

Once the build is successful, three files are generated:
* **amplifyconfiguration.json** and **awsconfiguration.json**: Rather than configuring each service through a constructor or constants file, the Amplify Framework for iOS supports configuration through centralized files called amplifyconfiguration.json and awsconfiguration.json which define all the regions and service endpoints to communicate.
* **amplifyxc.config** : This file is used to configure modelgen and push to cloud actions.
