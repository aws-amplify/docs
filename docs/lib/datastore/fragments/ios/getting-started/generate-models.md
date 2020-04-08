## Using CocoaPods

The fastest way to get started is adding the `Amplify/Tools` dependency to your `Podfile`:

```ruby
platform :ios, '13.0'
use_frameworks!

target 'DataStoreApp' do
  pod 'Amplify'
  pod 'AmplifyPlugins/AWSDataStorePlugin'
  pod 'AmplifyPlugins/AWSAPIPlugin'

  # Handles Amplify CLI and code generation as a build phase in Xcode
  pod 'Amplify/Tools'
end
```

Then run `pod install` and open the `.xcworkspace` file and build your app.

Once this completes open the GraphQL schema in the `amplify/backend/api/amplifyDatasource/schema.graphql` and add your schema to it. You can use the aforementioned [sample schema](~/lib/datastore/getting-started.md#sample-schema) or your own.

## Manual Model Generation

If you do not wish to use the above Xcode `Amplify/Tools` you can do this manually by first [installing the Amplify CLI](~/cli/start/install.md) and then generate models at any time with the following command:

```
amplify codegen models
```

<amplify-callout>

Regardless of the method used to generate the models, you will need to add the newly generated files to Xcode. The files are generated at `amplify/generated/models/`.

You can drag and drop them from Finder into Xcode or right-click the folder/group you want to add the files to and choose `Add files to "GROUP_NAME"`.

</amplify-callout>
