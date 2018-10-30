# Setup Options for the SDK

The AWS SDK contains [high level client interfaces](./start) for quickly adding common features and functionality to your app. You can also manually add the generated AWS service interfaces for direct interaction if you have custom or advanced requirements.

## CocoaPods setup

The AWS Mobile SDK for iOS is available through [CocoaPods](https://cocoapods.org). Install CocoaPods by running the following commands from the folder containing your projects `*.xcodeproj` file:

```bash
gem install cocoapods
pod setup
pod init
```

In your project directory (the directory where your `*.xcodeproj` file is), open the empty text file named `Podfile`. Replace `myAppName` with your app name. You can also remove pods for services that you don't use. For example, if you don't use `AWSAutoScaling`, remove or do not include the `AWSAutoScaling` pod.

```bash
source 'https://github.com/CocoaPods/Specs.git'

platform :ios, '8.0'
use_frameworks!

target :'YOUR-APP-NAME' do
    pod 'AWSAuth'
    pod 'AWSAuthCore'
    pod 'AWSAuthUI'
    pod 'AWSAutoScaling'
    pod 'AWSCloudWatch'
    pod 'AWSCognito'
    pod 'AWSCognitoAuth'
    pod 'AWSCognitoIdentityProvider'
    pod 'AWSCognitoIdentityProviderASF'
    pod 'AWSCore'
    pod 'AWSDynamoDB'
    pod 'AWSEC2'
    pod 'AWSElasticLoadBalancing'
    pod 'AWSFacebookSignIn'
    pod 'AWSGoogleSignIn'
    pod 'AWSIoT'
    pod 'AWSKMS'
    pod 'AWSKinesis'
    pod 'AWSLambda'
    pod 'AWSLex'
    pod 'AWSLogs'
    pod 'AWSMachineLearning'
    pod 'AWSMobileAnalytics'
    pod 'AWSMobileClient'
    pod 'AWSPinpoint'
    pod 'AWSPolly'
    pod 'AWSRekognition'
    pod 'AWSS3'
    pod 'AWSSES'
    pod 'AWSSNS'
    pod 'AWSSQS'
    pod 'AWSSimpleDB'
    pod 'AWSUserPoolsSignIn'
end
```

Once complete, run `pod install` and open the `*.xcworkspace` with Xcode and **build** your project to start using the SDK. Once you have created a workspace, always use `*.xcworkspace` to open the project instead of `*.xcodeproj`.

Whenever a new version of the SDK is released you can update by running `pod update` and rebuilding your project to use the new features.

## Logging

As of version 2.5.4 of this SDK, logging utilizes [CocoaLumberjack SDK](https://github.com/CocoaLumberjack/CocoaLumberjack), a flexible, fast, open source logging framework. It supports many capabilities including the ability to set logging level per output target, for instance, concise messages logged to the console and verbose messages to a log file.

CocoaLumberjack logging levels are additive such that when the level is set to verbose, all messages from the levels below verbose are logged. It is also possible to set custom logging to meet your needs. For more information, see [CocoaLumberjack Logging Levels](https://github.com/CocoaLumberjack/CocoaLumberjack/blob/master/Documentation/CustomLogLevels.md).

You can change the logging level to suit the phase of your development cycle by importing AWSCore and calling:

```swift
AWSDDLog.sharedInstance().logLevel = .verbose
```

The following logging level options are available:

- `.off`
- `.error`
- `.warning`
- `.info`
- `.debug`
- `.verbose`

We recommend setting the log level to  `.off` before publishing to the App Store.

CocoaLumberjack can direct logs to file or used as a framework that integrates with the Xcode console. For example:

```swift
//File Logger example
let fileLogger: AWSDDFileLogger = AWSDDFileLogger() // File Logger
fileLogger.rollingFrequency = TimeInterval(60*60*24)  // 24 hours
fileLogger.logFileManager.maximumNumberOfLogFiles = 7
AWSDDLog.add(fileLogger)


//Console example
AWSDDLog.add(AWSDDTTYLogger.sharedInstance) // TTY = Xcode console
```

## DocSet for Xcode

Open the macOS terminal and go to the directory containing the expanded archive. For example:

```bash
$ cd ~/Downloads/aws-ios-sdk-2.5.0
```

**Note**: Replace 2.5.0 in the preceding example with the version number of the AWS Mobile SDK for iOS that you downloaded.

Create a directory called `~/Library/Developer/Shared/Documentation/DocSets`:

```bash
$ mkdir -p ~/Library/Developer/Shared/Documentation/DocSets
```

Copy (or move) `documentation/com.amazon.aws.ios.docset` from the SDK installation files to the directory you created in the previous step:

```bash
$ mv documentation/com.amazon.aws.ios.docset ~/Library/Developer/Shared/Documentation/DocSets/
```

If Xcode was running during this procedure, restart Xcode. To browse the documentation, go to **Help**, click **Documentation and API Reference**, and select **AWS Mobile SDK for iOS v2.0 Documentation** (where '2.0' is the appropriate version number).