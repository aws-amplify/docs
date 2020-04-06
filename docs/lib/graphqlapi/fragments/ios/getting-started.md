You can integrate with Amplify framework using the following steps:

1. Setup the API endpoint and authentication information in the client side configuration.
2. Generate Swift Model classes from the API schema.
3. Write app code to run queries, mutations and subscriptions.

## Set up your backend

**Prerequisites**
* An iOS project targeting at least iOS 11.0.
* Install and configure the Amplify CLI

```bash
$ npm install -g @aws-amplify/cli
$ amplify configure
```

**Steps**

Go to your project directory and run the following commands to get a fully functioning AppSync backend with API category.

Run `amplify init` command as shown:

```bash
$ amplify init
? Enter a name for the project AmplifAPI
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building ios
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

Add API using the command `amplify add api`. Here is an example:

```perl
? Please select from one of the below mentioned services: `GraphQL`
? Provide API name: `apiName`
? Choose the default authorization type for the API `API key`
? Enter a description for the API key: 
? After how many days from now the API key should expire (1-365): `30`
? Do you want to configure advanced settings for the GraphQL API `No, I am done.`
? Do you have an annotated GraphQL schema? `No`
? Do you want a guided schema creation? `Yes`
? What best describes your project: `Single object with fields (e.g., “Todo” with ID, name, description)`
? Do you want to edit the schema now? `Yes`
```

We'll be using this schema:
```ruby
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```
Provision the backend with `amplify push` command. Here is an example:
```perl
? Are you sure you want to continue? `Yes`
? Do you want to generate code for your newly created GraphQL API `No`
```

The example above creates a backend with the Todo schema. You can open the AWS Console for AppSync with 
`amplify console api` to interact directly with the GraphQL service.  When your backend is successfully updated, there should be two newly created files: `amplifyconfiguration.json` and `awsconfiguration.json` in your project folder.

## Install Amplify libraries and tools

If this is a new project, run `pod init` to create the `Podfile` to use CocoaPods to manage your dependencies. Add the following to the Podfile:

```ruby
target :'YOUR-APP-NAME' do
    use_frameworks!
    pod 'AmplifyPlugins/AWSAPIPlugin'
    pod 'amplify-tools'
end
```

Close out of the existing Xcode project if you have it open.

Install the dependencies via CocoaPods
```ruby
pod install --repo-update
```

Open the `.xcworkspace` file created by CocoaPods
```ruby
open <YOURAPP>.xcworkspace
```
Build your project and you should see the `amplify` folder, `amplifyxc.config`, `awsconfiguration.json`, and `amplifyconfiguration.json`. 

## Initialize Amplify

Initialize Amplify and AWSAPIPlugin.

Add the following imports to the top of your `AppDelegate.swift` file 
```swift
import Amplify
import AmplifyPlugins
```

Add the follow code to your AppDelegate's `application:didFinishLaunchingWithOptions` method
```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    let apiPlugin = AWSAPIPlugin(modelRegistration: AmplifyModels())
    do {
        try Amplify.add(plugin: apiPlugin)
        try Amplify.configure()
        print("Amplify initialized")
    } catch {
        print("Failed to configure Amplify \(error)")
    }
    return true
}
```
## Add configuration files

3. Click on the top level project on the left panel.
4. Click on your app under Targets in the left panel that contains Project and Targets.
5. Click on Build Phases
6. Expand the Copy Bundle Resources
7. Click on the + button, and select `awsconfiguration.json` and `amplifyconfiguration.json` to add.
8. Build and run (`CMD+R`) the app and make sure Amplify is initialized.

## Running code generator

1. In `amplifyxc.config`, enable model generation, and save the file.
    ```ruby
    modelgen=true
    ```
2. Build (`CMD+B`). This will generate the Model files to be used with `Amplify.API` to query, mutate, and subscribe to you AppSync service. After build completes, the model files will be generated under `amplify/generated/models`. When you edit the schema under `amplify/backend/api/<APINAME>/schema.graphql` and build, it will regenerate the Model files.

3. Alternatively, you can run `amplify codegen models` using Amplify CLI. Make sure you set `modelgen=false` if you are using the CLI instead of Amplify Tools.

3. Drag the entire `models` directory over to your project. If you Build the project, the model files will be regenerated under the `amplify` folder. 
4. Select each model file, and select the app under Target Membership, to make sure it gets added to the target when building the app.

6. Register the models before initializing Amplify in your AppDelegate method.
    ```
    ModelRegistry.register(modelType: Todo.self)
    ```
Make sure it builds and runs (`CMD+R`) successfully before moving onto the next section.

## API Reference   

For the complete API documentation for API, visit our [API Reference](https://aws-amplify.github.io/amplify-ios/docs/Classes/AmplifyAPICategory.html)