## Model Generation

Modeling your data and *generating models* which are used by DataStore is the first step to get started. GraphQL is used as a common language across JavaScript, iOS, and Android for this process, and is also used as the network protocol when syncing with the cloud. GraphQL is also what powers some of the features such as Automerge in AppSync. Model generation can be done via an NPX script or from the command line with the Amplify CLI.

## Using CocoaPods

The fastest way to get started is adding the `amplify-tools` dependency to your `Podfile`:

```ruby
platform :ios, '13.0'
use_frameworks!

target 'DataStoreApp' do
  pod 'amplify-tools'
  pod 'AmplifyPlugins/AWSDataStorePlugin'
end
```

Then run `pod install` and open the `.xcworkspace` file to build your app.

Once this completes open the GraphQL schema in the `amplify/backend/api/amplifyDatasource/schema.graphql`. You can use the sample or the one below that will be used in this documentation:

```graphql
type Post @model {
  id: ID!
  title: String!
  rating: Int!
  status: String!
}
```

After saving the file build your project.

You do not need an AWS account to run this and use DataStore locally, however if you wish to sync with the cloud it is recommended you [Install and configure the Amplify CLI](..)
{: .callout .callout--info}

## Manual Model Generation

If you do not wish to use the above Xcode build tools you can do this manually by first installing the Amplify CLI:

```
npm i -g @aws-amplify/cli@latest
```

The Amplify CLI can generate models at any time with the following command:

```
amplify codegen models
```

### Schema updates

When a schema changes and Model generation re-runs, it will evaluate the changes and create a versioned hash if any changes are detected which impact the underlying on-device storage structure. For example types being added/deleted or fields becoming required/optional. DataStore evaluates this version on startup and if there are changes the local items on device will be removed and a full sync from AppSync will take place if you are syncing with the cloud. Local migrations on device are not supported. If you are syncing with the cloud the structure and items of that data in your DynamoDB table will not be touched as part of this process.

## Setup frontend

Open your AppDelegate and add the following code:

```swift
import Amplify
import AmplifyPlugins

class AppDelegate: UIResponder, UIApplicationDelegate {

//...other code
do {
    try Amplify.add(plugin: AWSDataStorePlugin(modelRegistration: AmplifyModels()))
    // add after all other plugins
    try Amplify.configure()
} catch {
    print("An error occurred setting up Amplify: \(error)")
}
```
**## This is different than JS where we have a sample React App**

## API Reference   

For the complete API documentation for DataStore, visit our [API Reference](https://aws-amplify.github.io/amplify-ios/api/classes/datastoreclass.html)
