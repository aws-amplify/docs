---
title: API
---
{% if jekyll.environment == 'production' %}
  {% assign base_dir = site.amplify.docs_baseurl %}
{% endif %}
{% assign media_base = base_dir | append: page.dir | append: "media" %}
{% assign common_media = base_dir | append: "/images" %}

<br />

**Note**
Amplify iOS is in preview mode and not intended for production usage at this time. We welcome feedback to improve your experience in using Amplify iOS.
{: .callout .callout--warning}

# DataStore

Amplify DataStore provides a persistent on-device storage repository for you to write, read, and observe changes to data if you are online or offline, and seamlessly sync to the cloud as well as across devices. Data modeling for your application is using GraphQL and converted to **Models** that are used in JavaScript, iOS, or Android applications. You can use DataStore for your offline use cases in a "local only" mode without an AWS account or provision an entire backend using AWS AppSync and Amazon DynamoDB. DataStore includes *Delta Sync* using your GraphQL backend and several conflict resolution strategies.


# Getting Started

## Model Generation

Modeling your data and *generating models* which are used by DataStore is the first step to get started. GraphQL is used as a common language across JavaScript, iOS, and Android for this process, and is also used as the network protocol when syncing with the cloud. GraphQL is also what powers some of the features such as Automerge in AppSync. Model generation can be done via an NPX script or from the command line with the Amplify CLI.

## Using CocoaPods

The fastest way to get started is adding the `amplify:tools` dependency to your `Podfile`:

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

## Setup

Open your AppDelegate and put in the following code:

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

# Save Data

To write any data to the DataStore you can pass an instance of a Model to `DataStore.save()` and it will be persisted in offline storage. At this point you can use it as an item in a normal data store such as querying, updating or deleting. If you choose to later connect to the cloud the item will be synchronized using GraphQL mutations and any other systems connected to the same backend can run queries or mutations on these items as well as observe them with GraphQL subscriptions.

```swift
Amplify.DataStore.save(
    Post(title: "My First Post",
         rating: 10,
         status: "active")
){
    switch $0 {
    case .success:
        print("Added post")
    case .failure(let err):
        print("Error adding post - \(err.localizedDescription)")
    }
}
```

# Query Data

Querying data is always against the locally synchronized data, which is updated in the background for you by the DataStore Sync Engine when connected to the cloud. You can query using models as well as conditions using predicate filters for finer grained results.

```swift
  Amplify.DataStore.query(Post.self){
        switch $0 {
        case .success(let result):
          print("Posts: \(result)")   //result will be of type [Post]
        case .failure(let err):
         print("Error listing posts - \(err.localizedDescription)")
      }
}
```

# Query with Predicates

You can apply predicate filters against the DataStore using the fields defined on your GraphQL type along with the following conditions supported by DynamoDB:

**Strings:** `eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains | notContains`

This is done via `Amplify.DataStore.query(<Model>, where:{})`. The `where` statement is a closure which accepts predicates compatible with the operators listed above. For example if you wanted all of the Posts with rating greater than 4:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating > 4 }){
    switch $0 {
    case .success(let result):
      print("Posts: \(result)")
    case .failure(let err):
      print("Error listing posts - \(err.localizedDescription)")
    }
}
```

You can build upon this with more complex `where` statements using Swift operators such as `||`, `&&`, etc:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating > 4 || p.status == "active" }){
    switch $0 {
    case .success(let result):
      print("Posts: \(result)")
    case .failure(let err):
      print("Error listing posts - \(err.localizedDescription)")
    }
}
```

You can also write this in a compositional function manner by replacing the operators with their equivalent predicate statements such as `.gt`, `.or`, etc:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating.gt(4).or(p.status.eq("active")) }){
    //...more code
}
```

# Update Data

Models in DataStore are immutable. To update a record you must query it to get a reference to the instance before updating it with `DataStore.save()`:

```swift
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let post):
        print("Updating the post \(String(describing: post))")
        if var updatedPost = post {
            updatedPost.status = "inactive"
            Amplify.DataStore.save(updatedPost){ res in
                switch res {
                case .success:
                    print("Post updated!")
                case .failure(let err):
                    print("Failed to update post - \(err.localizedDescription)")
                }
            }
        }
    case .failure(let err):
        print("Post not found - \(err.localizedDescription)")
    }
}
```

You can also apply conditions to update and delete operations. The condition will be applied locally and if you have enabled synchronization with the cloud it will be placed in a network mutation queue. The GraphQL mutation will then include this condition and be evaluated against the existing record in DynamoDB. If the condition holds the item in the cloud is updated and synchronized across devices. If the check fails then the item is not updated and the source of truth from the cloud will be applied to the local DataStore. For instance if you wanted to update if the `rating` was greater than 3:

```swift
//TODO
```

Conditional updates can only be applied to single items and not lists. If you wish to update a list of items you can loop over them and apply conditions one at a time.

# Delete Data

To delete an item simply pass in an instance:

```swift
Amplify.DataStore.delete(post) {
    switch $0 {
    case .success:
        print("Post deleted!")
    case .failure(let err):
        print("Error deleting post - \(err.localizedDescription)")
    }
}
```

Or specify it by ID:

```swift
Amplify.DataStore.delete(Post.self, withId: "123") {
    switch $0 {
    case .success:
        print("Post deleted!")
    case .failure(let err):
        print("Error deleting post - \(err.localizedDescription)")
    }
}
```

You can also pass predicate operators to delete multiple items. 

```swift
// TODO
```

# Observe Data

If you are running on iOS 13 or higher, you can subscribe to changes on your Models by using `publisher(for:)` in the DataStore API. This reacts dynamically to updates of data to the underlying Storage Engine, which could be the result of GraphQL Subscriptions as well as Queries or Mutations that run against the backing AppSync API if you are synchronizing with the cloud. 

The `publisher(for:)` API returns an [AnyPublisher](https://developer.apple.com/documentation/combine/anypublisher), only available in iOS 13.0 and above.

```swift
let postSubscription = Amplify
    .DataStore
    .publisher(for: Post.self)
    .sink(receiveCompletion: { completion in
        if case .failure(let err) = completion {
            print("Subscription received error - \(err.localizedDescription)")
        }
    }) {
        print("Subscription received mutation: \($0)")
}

// When finished observing
postSubscription.cancel()
```

# Sync with the cloud

Once you're happy with your application, you can start syncing with the cloud by provisioning a backend from your project. This can be done using the `amplify-app` npx script or with the Amplify CLI. Provisioning will also create a project in the [AWS Amplify Console](https://aws.amazon.com/amplify/console/) to store metadata (such as the GraphQL schema) which you can pull down to generate models on other platforms.

DataStore can connect to an existing AppSync backend that has been deployed from another JavaScript project or even it was originally deployed by iOS or Android. In these workflows it is best to work with the CLI directly by running an `amplify pull` command from your terminal and then generating models, either by building your project with the `amplify-tools` Xcode plugin or with `amplify codegen models` using the Amplify CLI.

For more information on this workflow please see the [Multiple Frontends documentation](https://aws-amplify.github.io/docs/cli-toolchain/quickstart#multiple-frontends){:target="_blank"}.

## Use Xcode

Open the `amplifyxc.config` in your project and set `push` to `true`. Then build your app with **Product > Build** (*CMD+B*), and a push will take place.

If you do not already have a local AWS profile with credentials (automatically setup with the Amplify CLI) you will be prompted to do this on the first push.
{: .callout .callout--info}

## Use Amplify CLI
```
amplify push
```

## Connect your app

Once the push finishes an `amplifyconfiguration.json` file will be created in your project which will be used to configure the DataStore with the cloud. Restart your app and it will connect with your backend using GraphQL queries, mutations, and subscriptions.

# Relational Models

DataStore has the capability to handle relationships between Models, such as `Has One`, `Has Many`, `Belongs To`, and `Many To Many`. In GraphQL this is done with `@connection` as defined in the [GraphQL Transformer documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection){:target="_blank"}. For the examples below with DataStore use the following schema:

```graphql
type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(name: "PostComments")
  rating: Int!
  status: String!
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

## Saving relations

In order to save connected models you will create an instance of the model you wish to connect and pass it to `DataStore.save` with the parent as an argument (`post` in the below example):

```swift
let postWithComments = Post(title: "My post with comments",
                            rating: 5,
                            status: "active")

let comment = Comment(content: "Loving Amplify DataStore", post: postWithComments)

Amplify.DataStore.save(postWithComments) {
    switch $0 {
    case .failure(let err):
        print("Error adding post - \(err.localizedDescription)")
    case .success(let post):
        Amplify.DataStore.save(comment) {
            switch $0 {
            case .success:
                print("Comment saved!")
            case .failure(let err):
                print("Error adding comment - \(err.localizedDescription)")
            }
        }
    }
}
```

The above example shows how to use a one-to-many schema and save connected models. For many-to-many relations, such as the one shows in the [GraphQL Transformer examples](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection) you would do something like the following:

```swift
Amplify.DataStore.save(postWithEditors) {
    switch $0 {
    case .failure(let err):
        print("Error adding post - \(err.localizedDescription)")
    case .success:
        Amplify.DataStore.save(nadia) {
            switch $0 {
            case .failure(let err):
                print("Error adding user - \(err.localizedDescription)")
            case .success:
                Amplify.DataStore.save(postEditor) {
                    switch $0 {
                    case .failure(let err):
                        print("Error saving postEditor - \(err.localizedDescription)")
                    case .success:
                        print("Saved user, post and postEditor!")
                    }
                }
            }
        }
    }
}
```

In this case, you save instances of models from each side of the relationship and then join them together in the connecting type on a field defined with `@connection`. For the schema above this corresponds to `post: Post! @connection(fields: ["postID"])` and `editor: User! @connection(fields: ["editorID"])`.

## Querying relations

Models with one-to-many connections are lazy-loaded when accessing the property, so accessing a relation is as simple as:

```swift
if let comments = postWithComments.comments {
    for comment in comments {
        print(comment.content)
    }
}
```

Connections are a type of Swift `Collection`, which means that you can filter, map, etc:

```swift
let excitedComments = postWithComments
    .comments?
    .compactMap { $0.content }
    .filter { $0.contains("Wow!") }
```

## Observing relations

```swift
let commentsSubscription = Amplify
    .DataStore
    .publisher(for: Comment.self)
    .tryMap { try $0.decodeModel() as? Comment }
    .compactMap { $0 }
    .sink(receiveCompletion: { completion in
        if case .failure(let err) = completion {
            print("Subscription received error - \(err.localizedDescription)")
        }
    }) { comment in
        print(comment.content)
}

// When finished observing
commentsSubscription.cancel()
```

## Deleting relations

When you delete a parent object in a one to many relationship, the children will also be removed from the DataStore and mutations for this deletion will be sent over the network. For example the following operation would remove the Post with id `123` as well as any related comments:

```swift
Amplify.DataStore.delete(postWithComments) {
    switch $0 {
    case .success:
        print("Post and comments deleted!")
    case .failure(let err):
        print("Error deleting post and comments - \(err.localizedDescription)")
    }
}
```

However, in a many to many relationship the children are not removed and you must explicitly delete them.

# Conflict Resolution

When syncing with AWS AppSync, DataStore updates from multiple clients will converge by tracking object versions and adhering to different conflict resolution strategies. The default strategy is called *Automerge*, where GraphQL type information on an object is inspected at runtime to perform merge operations. You can read more about this behavior and alternatives such as *Optimistic Concurrency* Control and *custom Lambda functions* in the [AWS AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/conflict-detection-and-sync.html){:target="_blank"}. To update the conflict resolution strategies navigate into your project from a terminal and run `amplify update api` choosing *Yes* when prompted to change the conflict detection and conflict resolution strategies:

```sh
amplify update api #Select GraphQL

? Do you want to configure advanced settings for the GraphQL API 
❯ Yes, I want to make some additional changes. 

? Configure conflict detection? Yes
? Select the default resolution strategy 
  Auto Merge 
❯ Optimistic Concurrency 
  Custom Lambda 
  Learn More 
```

Note that this flow will also allow you to change the strategy on each individual GraphQL type, though is is recommended to use the same strategy for your whole schema unless you have an advanced use case:

```sh
? Do you want to override default per model settings? Yes
? Select the models from below: 
❯◉ Post
 ◯ PostEditor
 ◯ User

? Select the resolution strategy for Post model Custom Lambda
? Select from the options below (Use arrow keys)
❯ Create a new Lambda Function 
  Existing Lambda Function 
```

# How it Works

<iframe width="600" height="345" src="https://www.youtube.com/embed/KcYl6_We0EU">
</iframe>

Amplify DataStore is an on device persistent repository for interacting with your local data while it synchronizes with the cloud. The core idea is to focus on your data modeling in your application with GraphQL, adding any authorization rules or business logic into your application when needed. This can be done using Amplify CLI project functionality (`amplify add auth` or `amplify add function`) as well as the [GraphQL Transformer](https://aws-amplify.github.io/docs/cli-toolchain/graphql){:target="_blank"}.

Starting with GraphQL schema (with or without an AWS account) a code generation process creates *Models* which are domain native constructs for a programming platform (TypeScript, Java, Swift classes). This "modelgen" process happens using the Amplify CLI which is either done manually in your terminal or using build tools that will invoke the CLI process (NPX scripts, Gradle, Xcode build phase).

Once Models have been generated, you can operate on these instances with the DataStore API to save, query, update, delete, or observe changes. At runtime models are passed into a *Storage Engine* that has a *Storage Adapter*. The Storage Engine manages a "Model Repository" of Models which were defined by the developer's GraphQL schema as well as "System Models" which are used for both metadata (such as settings) and queueing updates over the network when syncing to the cloud. Amplify ships with default Storage Adapter implementations, such as SQLite and IndexedDB, however the pattern allows for more in the future for community contributions and is not specific to one technology (e.g. SQL vs NoSQL).

![Image]({{common_media}}/storage.png)

When developer application code interacts with the DataStore API the it is the responsibility of the Storage Engine to store the specific Model for a GraphQL type in the Model Repository as well as serialize & deserialize as appropriate for persistence in the specific Storage Adapter representation. This includes conversion from a GraphQL specific type the appropriate structure in that database engine (e.g. `Int` to `Int64`).

If a developer chooses to sync with the cloud, the Amplify CLI will use the GraphQL schema to deploy an AWS AppSync backend with DynamoDB tables for each type and an additional table used for *Delta Sync*. Other AWS services such as Amazon Cognito or AWS Lambda will also be deployed if added to the project. Once this completes the local configuration for the platform (`aws-exports.js` or `amplifyconfiguration.json`) will be generated inside the project and updated with settings and endpoint information.

If the DataStore starts up and sees API information to sync with an AppSync endpoint, it will start an instance of it's *Sync Engine*. This component interfaces with the Storage Engine to get updates from the Model Repository. These components use an *Observer* pattern where the Sync Engine publishes events whenever updates happen in it (such as data being added, updated, or deleted) and both the DataStore API and Sync Engine subscribe to this publication stream. This is how the developer knows when updates have happened from the cloud by interacting with the DataStore API, and conversely how the Sync Engine knows when to communicate with the cloud when applications have made updates to data.

![Image]({{common_media}}/sync.png)

As notifications come into the Sync Engine from the Storage Engine it converts information from the Model Repository into GraphQL statements at runtime. This includes subscribing to all create/update/delete operations for each type, as well as running queries or mutations. 

The Sync Engine will run a GraphQL query on first start that hydrates the Storage Engine from the network using a *Base Query*. This defaults to a limit of 100 items at a time and will paginate through up to 1000 items. It will then store a *Last Sync Time* and each time the device goes from an offline to online state, it will use this as an argument in a *Delta Query*. When AppSync receives this Last Sync Time in it's argument list it will only returned the changes that have been missed by pulling items in a Delta Table.

All items (or "objects") are versioned by *Sync Enabled Resolvers* in AppSync using monotonically increasing counters. Clients never update versions, only the service controls versions. The Sync Engine receives new items or updates from GraphQL operations and applies them with their versions to the Storage Engine. When items are updated by application code they are always written to a queue and the Sync Engine sends them to AppSync using the currently known version as an argument (`_version`) in the mutation. 

When multiple clients send concurrent updates using the same version and conflict resolution is configured, a strategy for conflict resolution will be entered. The default strategy for clients is Automerge where the GraphQL type information is used to inspect the update and compare it to the current item that has been written to your table. Any non-conflicting fields are merged with the item and any lists will have values appended, with the service updating the item version as appropriate. You can change this default to apply version checks to the entire object with *Optimistic Concurrency* where the latest written item to your database will be used with a version check against the incoming record, or alternatively you can use a Lambda function and apply any custom business logic you wish to the process when merging or rejecting updates. In all cases the service controls the versions. For more information on how these conflict resolution rules work please [see the AWS AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/conflict-detection-and-sync.html){:target="_blank"}.

## Writing data from the AppSync console

DataStore is designed primarily for developers to not have to focus on the backend and let your application code and workflow create everything. However there will be some use cases where you will use the AppSync console, a Lambda function, or other out of band processes to write data (such as batch actions or data migrations) and you might send GraphQL operations without the DataStore client.

In these cases it's important that the selection set of your GraphQL mutation includes the fields `_lastChangedAt`, `_version`, and `_deleted` so that the DataStore clients can react to these updates. You will also need to send the **current** object version in the mutation input argument as `_input` so that the service can act accordingly. If you do not send this information the clients will still eventually catch up during the global sync process, but you will not see realtime updates to the client DataStore repositories. An example mutation:

```graphql
mutation UpdatePost {
  updatePost(input: {
    id: "12345"
    title: "updated title 19:40" 
    status: ACTIVE
    rating: 5
    _version: 7
  }) {
    id
    title
    status
    rating
    _lastChangedAt
    _version
    _deleted
  }
}
```

## API Reference   

For the complete API documentation for DataStore, visit our [API Reference](https://aws-amplify.github.io/amplify-ios/api/classes/datastoreclass.html)
{: .callout .callout--info}
