
## Step 1: Configure your app
You can use an existing iOS app or create a new iOS app in Swift as per the steps in prerequisite section. 

Install Cocoapods: From a terminal window navigate into your Xcode project's application directory and run the following:

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ sudo gem install cocoapods
$ pod init
```

Open the created  `Podfile` in a text editor and add the pod for core AWS Mobile SDK components to your build.

```ruby
target :'YOUR-APP-NAME' do
    use_frameworks!

    pod 'AWSCore', '~> 2.12.0'
    pod 'AWSAppSync', '~> 3.0.2'

    # other pods
end
```

Install dependencies by running the following command:

```bash
pod install --repo-update
```

Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace` file. Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on. Build your Xcode project.


## Step 2: Initialize your project

In a terminal window, navigate to your project folder (the folder that contains your `xcodeproj` file), and run the following command (for this app, accepting all defaults is OK):

```bash
$ cd ./YOUR_PROJECT_FOLDER
$ amplify init        #accept defaults
```

The `awsconfiguration.json` configuration file should be created in the root directory. 

## Step 3: Add config

**What is awsconfiguration.json?**

Rather than configuring each service through a constructor or constants file, the AWS SDKs for iOS support configuration through a centralized file called `awsconfiguration.json` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your Swift application code. On iOS projects the `awsconfiguration.json` will be placed into the root directory and you will need to add it to your Xcode project.

In the Finder, drag `awsconfiguration.json` into Xcode under the top Project Navigator folder (the folder name should match your Xcode project name). When the `Options` dialog box appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Finish`.

## Step 4: Add API and Database

Add a [GraphQL API](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) to your app and automatically provision a database by running the the following command from the root of your application directory (accepting all defaults is OK):

```bash
$ amplify add api     #select 'GraphQL' service, and 'API Key' for the authorization type
```

The `add api` flow  will ask you simple questions. If this is your first time using the CLI select **No** for the question "Do you have an annotated GraphQL schema". The CLI then guides you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. You can always change the schema as needed. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database. The CLI flow will look like below:

```bash
$ amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: todo
? Choose the default authorization type for the API: API key
? Enter a description for the API key: ToDo description
? After how many days from now the API key should expire (1-365): 180
? Do you want to configure advanced settings for the GraphQL API: No, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? No
```

[Learn more](https://aws-amplify.github.io/docs/cli-toolchain/graphql) about annotating GraphQL schemas and data modeling.

## Step 5: Push changes

Create the required backend resources for your configured API using the `amplify push` command.
Since you added an API, the `amplify push` process will automatically enter the [codegen process](https://aws-amplify.github.io/docs/cli-toolchain/graphql#codegen) and prompt you for configuration. Accept the defaults.

The codegen process generates a file named `API.swift` in your application root directory after the completion of `amplify push` command.

The CLI flow for push command is shown below:

```bash
$ amplify push
? Are you sure you want to continue?: Yes
? Do you want to generate code for your newly created GraphQL API: Yes
? Enter the file name pattern of graphql queries, mutations and subscriptions: graphql/**/*.graphql
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
? Enter the file name for the generated code: API.swift
```
