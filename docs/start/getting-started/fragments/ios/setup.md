
👋 Welcome! In this tutorial, you will:

- Set up an iOS application configured with Amplify
- Create a data model and persist data to Amplify DataStore
- Connect your local data to synchronize to a cloud backend

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 10 or higher
- Install [Xcode](https://developer.apple.com/xcode/downloads/) version 11.4 or later
- Install [Cocoapods](https://cocoapods.org/)
- Install [Amplify CLI](~/cli/cli.md) version 4.22.0 or later by running:

  <inline-fragment src="~/fragments/cli-install-block.md"></inline-fragment>

## Set up your application

### Create a new iOS application

1. **Open Xcode.** From the menu bar, select **"File -> New -> Project..."**

1. Select **Single View App**, and then select the **Next** button.
  ![](~/images/lib/getting-started/ios/set-up-ios-select-project-template.png)

1. Fill in the following for your project:
  * Product Name: **Todo**
  * Interface: **SwiftUI**
  * Life Cycle: **SwiftUI App** (only relevant if Xcode 12 is being used)
  * Language: **Swift**
  * Select the **Next** button

  ![](~/images/lib/getting-started/ios/set-up-ios-studio-configure-your-project.png)

1. After selecting **Next**, **select where you would like to save your project**, and then select **Create**.

  You should now have an empty iOS project without Amplify.

### Add Amplify to your application

Amplify for iOS is distributed through Cocoapods as a Pod. In this section, you'll setup Cocoapods and add the required Amplify packages.

1. Before starting this step, **close Xcode**. Now **open a terminal window** and **change to the directory for your Todo project**. For example, if you created your project in the folder `~/Developer`, you can type the following:
  ```bash
  cd ~/Developer/Todo
  ```

1. To create the Amplify app first you will need to use `amplify` CLI previously installed, **run the command**:
  ```bash
  amplify init --quickstart --frontend ios
  ```

1. To initialize your project with the Cocoapods package manager, **run the command**:
  ```bash
  pod init
  ```

  After doing this, you should see a newly created file called `Podfile`. This file is used to describe the packages your project depends on.

1. Open `Podfile` in the file editing tool of your choice, and replace the contents of the file so that your `Podfile` looks like the following:
  ```ruby
  target 'Todo' do
    use_frameworks!
  
    pod 'Amplify'
    pod 'AmplifyPlugins/AWSAPIPlugin'
    pod 'AmplifyPlugins/AWSDataStorePlugin'
  
  end
  ```

1. To download and install the Amplify pod into your project, **run the command**:
  ```bash
  pod install --repo-update
  ```

1. After running the previous command, you should see the file named `Todo.xcworkspace` in your project directory. You are required to use this file from now on instead of the `.xcodeproj` file. To open your newly generated `Todo.xcworkspace` in Xcode, **run the command**:
  ```bash
  xed .
  ```

You are ready to start building with Amplify! 🎉
