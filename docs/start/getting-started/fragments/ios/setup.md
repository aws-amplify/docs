
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

    pod 'AWSAppSync'

    # other pods
end
```

Install dependencies by running the following command:

```bash
pod install --repo-update
```

Close your Xcode project and reopen it using `./YOUR-PROJECT-NAME.xcworkspace` file. Remember to always use `./YOUR-PROJECT-NAME.xcworkspace` to open your Xcode project from now on. Build your Xcode project.


## Step 2: Initialize your project

In a terminal window, run the following command (for this app, accepting all defaults is OK) in your project folder (the folder that contains your `xcodeproj` file):

```bash
$ amplify init        # accept defaults
```

The `awsconfiguration.json` configuration file should be created in the root directory. 

## Step 3: Add config

**What is awsconfiguration.json?**

> Rather than configuring each service through a constructor or constants file, the AWS SDKs for iOS support configuration through a centralized file called `awsconfiguration.json` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your Swift application code. On iOS projects the `awsconfiguration.json` will be placed into the root directory and you will need to add it to your Xcode project.

In the Finder, drag `awsconfiguration.json` into Xcode under the top Project Navigator folder (the folder name should match your Xcode project name). When the `Options` dialog box appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Finish`.

## Step 4: Add API and Database

Add a [GraphQL API](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) to your app and automatically provision a database by running the the following command from the root of your application directory:

```bash
amplify add api #accept defaults
```

The default values are highlighted below.
```bash
? Please select from one of the below mentioned services:
# GraphQL
? Provide API name:
# myapi
? Choose the default authorization type for the API:
# API Key
? Enter a description for the API key:
# demo
? After how many days from now the API key should expire:
# 7 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API:
# No
? Do you have an annotated GraphQL schema? 
# No
? Do you want a guided schema creation? 
# Yes
? What best describes your project: 
# Single object with fields
? Do you want to edit the schema now? 
# Yes
```

The CLI should open this GraphQL schema in your text editor.

__amplify/backend/api/myapi/schema.graphql__

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

The schema generated is for a Todo app. You'll notice a directive on the `Todo` type of `@model`. This directive is part of the [GraphQL transform](~/cli/graphql-transformer/directives.md) library of Amplify. 

The GraphQL Transform Library provides custom directives you can use in your schema that allow you to do things like define data models, set up authentication and authorization rules, configure serverless functions as resolvers, and more.

A type decorated with the `@model` directive will scaffold out the database table for the type (Todo table), the schema for CRUD (create, read, update, delete) and list operations, and the GraphQL resolvers needed to make everything work together.

From the command line, press __enter__ to accept the schema and continue to the next steps.

## Step 5: Push changes

Create the required backend resources for your configured API using the `amplify push` command.
Since you added an API, the `amplify push` process will automatically enter the [codegen process](https://aws-amplify.github.io/docs/cli-toolchain/graphql#codegen) and prompt you for configuration. Accept the defaults.

The codegen process generates a file named `API.swift` in your application root directory after the completion of `amplify push` command.

The CLI flow for push command is shown below:

```bash
amplify push
? Are you sure you want to continue?
# Yes
? Do you want to generate code for your newly created GraphQL API:
# Yes
? Enter the file name pattern of graphql queries, mutations and subscriptions:
# graphql/**/*.graphql
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions:
# Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested]:
# 2
? Enter the file name for the generated code:
# API.swift
```

Next, run the following command to check Amplify's status:

```bash
amplify status
```

This will give us the current status of the Amplify project, including the current environment, any categories that have been created, and what state those categories are in. It should look similar to this:

```bash
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | myapi         | No Change | awscloudformation |
```
