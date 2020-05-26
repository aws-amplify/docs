
To install the Amplify Storage and Authentication to your application, add `AmplifyPlugins/AWSDataStorePlugin`. Your `Podfile` should look similar to:

```ruby
target 'MyAmplifyApp' do
  use_frameworks!
  pod 'Amplify'
  pod 'AmplifyPlugins/AWSDataStorePlugin'
end
```

To install, download and resolve these pods, **execute the command**:

```console
pod install --repo-update
```

Now you can **open your project** by opening the `.xcworkspace` file using the following command:

```console
xed .
```
