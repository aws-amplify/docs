
👋 Welcome! In this tutorial, you will:

- Set up an iOS application configured with Amplify
- Create a data model and persist data to Amplify DataStore
- Connect your local data to synchronize to a cloud backend

## Prerequisites

- Install [Node.js](https://nodejs.org/en/) version 10 or higher
- Install [Xcode](https://developer.apple.com/xcode/downloads/) version 10.2 or later
- Install [CocoaPods](https://cocoapods.org/)

- Install [Amplify CLI](~/cli/cli.md) version 4.21.0 or later by running:

    ```bash
    npm install -g @aws-amplify/cli
    ```

## Set up your application

### Create a new iOS application
1.  **Open Xcode.**  From the menu bar, select **"File -> New -> Project..."**

1.  Select **Single View App**, and then select the **Next** button.
  ![](~/images/lib/getting-started/ios/set-up-ios-select-project-template.png)

1.  Fill in the following for your project:
  * Product Name: **Todo**
  * Language: **Swift**
  * User Interface: **SwiftUI**
  * Select the **Next** button

  ![](~/images/lib/getting-started/ios/set-up-ios-studio-configure-your-project.png)

1.  After selecting **Next**, **select where you would like to save your project**, and then select **Create**.

  You should now have an empty iOS project without Amplify.

### Add Amplify to your application

Amplify for iOS is distributed through Cocoapods as a Pod. In this section, you'll setup cocoa pods and add the required Amplify packages.

1.  Before starting this step, **close Xcode.**

  **Open a terminal window** and **change to the directory for your Todo project**.  For example, if you created your project in the folder `~/Developer`, you can type the following:
  ```bash
  cd ~/Developer/Todo
  ```

1. Verify that this directory is a parent to four subdirectories:
  1. `Todo` (again)
  1. `Todo.xcodeproj`
  1. `TodoTests`
  1. `TodoUITests`

1.  To initialize your project with the CocoaPods package manager, **run the command**:
  ```bash
  pod init
  ```

  After doing this, you should see a newly created file called `Podfile`.  This file is used to describe the packages your project depends on.

1. Open `Podfile` in the file editing tool of your choice, and replace the contents of the file so that your `Podfile` looks like the following:
```
target 'Todo' do
    use_frameworks!
  
    pod 'Amplify'
    pod 'Amplify/Tools'
    pod 'AmplifyPlugins/AWSAPIPlugin'
    pod 'AmplifyPlugins/AWSDataStorePlugin'

end
```

1.  To download and install the Amplify pod into your project, **run the command**:
  ```bash
  pod install --repo-update
  ```

1.  After running the previous command, you should see the file named `Todo.xcworkspace` in your project directory.  You are required to use this file from now on instead of the .xcodeproj file.  To open your newly generated Todo.xcworkspace in Xcode, **run the command**:
  ```bash
  xed .
  ```

### Adding Amplify tools
We will now add AmplifyTools as a build phase in your project.  
1.  Click on the **Todo project** in the project workspace, then click the **Todo** app target, and then select **Build Phases**.
  ![](~/images/lib/getting-started/ios/set-up-ios-amplify-tools-1.png)

1.  Select the `+` button to add another phase, and select **New Run Script Phase**.
  ![](~/images/lib/getting-started/ios/set-up-ios-amplify-tools-2.png)

1.  Drag the new **Run Script** phase up to a higher position in the list, so that it runs prior to the **Compile Sources** phase.

1.  Update the **Run Script** build phase title to **"Run Amplify Tools"**.
1. Expand the **Run Amplify Tools** build phase and update the shell script to the following single line:
  ```bash
  "${PODS_ROOT}/AmplifyTools/amplify-tools.sh"
  ```
  Your project should now look like this.  Notice that the **Run Amplify Tools** phase comes before the **Compile Sources** phase.
  ![](~/images/lib/getting-started/ios/set-up-ios-amplify-tools-3.png)

1. Build your project in Xcode by using `Cmd+b`.  Now that we've added Amplify tools to the build process, it will run when you build your project. Because this is the first time you are building your project, Amplify tools will detect this and generate a number of files in your project directory.
  * `amplify` (folder) - Contains a number of configuration files and pre-generated sample files that we will be using in your project.
  * `amplifytools.xcconfig` - this configuration file controls the behavior of amplify tools.
  * `amplifyconfiguration.json` - this configuration file will be added to your project and shipped with your bundle.  This is required by the amplify libraries.
  * `awsconfiguration.json` - this configuration file will also be added to your project and shipped with your bundle.  This is also required by the amplify libraries.
    
You are ready to start building with Amplify! 🎉

<amplify-callout>

If Xcode reports build errors like `Undefined symbol: _OBJC_CLASS_$_AWSSignatureV4Signer`, as shown in the screenshot below, clean your build folder with **Product > Clean Build Folder** (`Shift+Cmd+K`) and rebuild the project (`Cmd+b`).

![Xcode Build Error](~/images/xcode-build-error.png)

</amplify-callout>
