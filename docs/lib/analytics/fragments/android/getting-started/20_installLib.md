To install the Analytic and Auth to your application, **add both `AmplifyPlugins/AWSPinpointPlugin` and `AmplifyPlugins/AWSCognitoAuthPlugin` to your `Podfile`**. Your `Podfile` should look similar to:

```ruby
target 'MyAmplifyApp' do
  use_frameworks!
  pod 'Amplify'
  pod 'AmplifyPlugins/AWSPinpointAnalyticsPlugin'
  pod `AmplifyPlugins/AWSCognitoAuthPlugin`
end
```

To install, download and resolve these pods, **execute the command**:

```ruby
pod install --repo-update
```

Now you can **open your project** by opening the `.xcworkspace` file using the following command:

```ruby
xed .
```