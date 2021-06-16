<amplify-block-switcher>

<amplify-block name="Swift Package Manager">

1. To install Amplify Analytics and Authentication to your application, open your project in Xcode and select **File > Swift Packages > Add Package Dependency**.

2. Enter the Amplify iOS GitHub repo URL (`https://github.com/aws-amplify/amplify-ios`) into the search bar and click **Next**.

3. Choose the first rule, **Version**, as it will use the latest compatible version and click **Next**.

4. Lastly, choose **AWSPinpointAnalyticsPlugin**, **AWSCognitoAuthPlugin**, and **Amplify**. Then click Finish.

</amplify-block>

<amplify-block name="CocoaPods">

To install the Amplify Analytics and Authentication to your application, **add both "AmplifyPlugins/AWSPinpointAnalyticsPlugin" and "AmplifyPlugins/AWSCognitoAuthPlugin" to your `Podfile`** (Because IAM credential is required to access AWS Pinpoint Service, `"AWSCognitoAuthPlugin"` also needs to be installed). Your `Podfile` should look similar to:

```bash
target 'MyAmplifyApp' do
  use_frameworks!
  pod 'Amplify'
  pod 'AmplifyPlugins/AWSPinpointAnalyticsPlugin'
  pod 'AmplifyPlugins/AWSCognitoAuthPlugin'
end
```

To install, download and resolve these pods, **execute the command**:

```bash
pod install --repo-update
```

Now you can **open your project** by opening the `.xcworkspace` file using the following command:

```bash
xed .
```

</amplify-block>

</amplify-block-switcher>