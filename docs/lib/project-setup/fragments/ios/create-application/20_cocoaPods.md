Before starting this step, please make sure that please **close Xcode.**

**Open a terminal** and **change directories to your project**.  For example, if you created your project in the folder `~/Developer`, you can:
```bash
cd ~/Developer/MyAmplifyApp
```

In order to initialize your project with the CocoaPods package manager, **execute the command**:
```bash
pod init
```

After doing this, you should see a newly created file called `Podfile`.  This file is used to describe what packages your project depends on.

**Update the file** to include the `Amplify` pod:
```
target 'MyAmplifyApp' do
  use_frameworks!
  pod 'Amplify'
end
```

To download and install the Amplify pod into your project, **execute the command**:
```bash
pod install --repo-update
```

After doing this, you should now see file called `MyAmplifyApp.xcworkspace`.  You are required to use this file from now on instead of the .xcodeproj file.  To open your workspace, **execute the command**:
```bash
xed .
```
This should open the newly generated MyAmplifyApp.xcworkspace in Xcode.