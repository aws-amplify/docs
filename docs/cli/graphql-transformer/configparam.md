---
title: Advanced scenarios
description: Some Description
---

## Configurable Parameters

Much of the behavior of the GraphQL Transform logic is configured by passing arguments to the directives in the GraphQL SDL definition. However, certain other things are configured by passing parameters to the CloudFormation template itself. This provides escape hatches without leaking too many implementation details into the SDL definition. You can pass values to these parameters by adding them to the `parameters.json` file in the API directory of your amplify project.

### AppSyncApiName

**Override the name of the generated AppSync API**

```
{
  "AppSyncApiName": "AppSyncAPI"
}
```

### CreateAPIKey

`CreateAPIKey` takes value of either `1` or `0`. 

It give you the mechanism to rotate the API Key, in scenarios such as to handle API Key expiration. 

Follow these two steps when you need to rotate an API Key
- Delete the existing API key by setting `CreateAPIKey` to `0` in the `amplify/backend/api/<apiName>/parameters.json` file and execute `amplify push`. 
- Create a new API key by setting `CreateAPIKey` to `1` in the `amplify/backend/api/<apiName>/parameters.json` file and execute `amplify push`. 

**Delete the existing API Key**

```
{
  "CreateAPIKey": 0
}
```

**Create new API Key**

```
{
  "CreateAPIKey": 1
}
```

### APIKeyExpirationEpoch

**Resets the API Key to expire 1 week after the next `amplify push`**

```
{
  "APIKeyExpirationEpoch": 0
}
```

**Do not create an API key**

```
{
  "APIKeyExpirationEpoch": -1
}
```

**Set a custom API key expiration date**

```
{
  "APIKeyExpirationEpoch": 1544745428
}
```

> The value specified is the expiration date in seconds since Epoch

### DynamoDBBillingMode

**Set the DynamoDB billing mode for the API. One of "PROVISIONED" or "PAY_PER_REQUEST".**

```
{
  "DynamoDBBillingMode": "PAY_PER_REQUEST"
}
```

### DynamoDBModelTableReadIOPS

**Override the default read IOPS provisioned for each @model table**

**Only valid if the "DynamoDBBillingMode" is set to "PROVISIONED"**

```
{
  "DynamoDBModelTableReadIOPS": 5
}
```

### DynamoDBModelTableWriteIOPS

**Override the default write IOPS provisioned for each @model table**

**Only valid if the "DynamoDBBillingMode" is set to "PROVISIONED"**

```
{
  "DynamoDBModelTableWriteIOPS": 5
}
```

### ElasticsearchStreamingFunctionName

**Override the name of the AWS Lambda searchable streaming function**

```
{
  "ElasticsearchStreamingFunctionName": "CustomFunctionName"
}
```

### ElasticsearchInstanceCount

**Override the number of instances launched into the Elasticsearch domain created by @searchable**

```
{
  "ElasticsearchInstanceCount": 1
}
```

### ElasticsearchInstanceType

**Override the type of instance launched into the Elasticsearch domain created by @searchable**

```
{
  "ElasticsearchInstanceType": "t2.small.elasticsearch"
}
```

### ElasticsearchEBSVolumeGB

**Override the amount of disk space allocated to each instance in the Elasticsearch domain created by @searchable**

```
{
  "ElasticsearchEBSVolumeGB": 10
}
```


**Note: To use the @auth directive, the API must be configured to use Amazon Cognito user pools.**

```graphql
type Task
  @model
  @auth(rules: [
      {allow: groups, groups: ["Managers"], mutations: [create, update, delete], queries: null},
      {allow: groups, groups: ["Employees"], mutations: null, queries: [get, list]}
    ])
{
  id: ID!
  title: String!
  description: String
  status: String
}
type PrivateNote
  @model
  @auth(rules: [{allow: owner}])
{
  id: ID!
  content: String!
}
```

#### Task Queries

```graphql
# Create a task. Only allowed if a manager.
mutation CreateTask {
  createTask(input:{
    title:"A task",
    description:"A task description",
    status: "pending"
  }) {
    id
    title
    description
  }
}

# Get a task. Allowed if an employee.
query GetTask($taskId:ID!) {
  getTask(id:$taskId) {
    id
    title
    description
  }
}

# Automatically inject the username as owner attribute.
mutation CreatePrivateNote {
  createPrivateNote(input:{content:"A private note of user 1"}) {
    id
    content
  }
}

# Unauthorized error if not owner.
query GetPrivateNote($privateNoteId:ID!) {
  getPrivateNote(id:$privateNoteId) {
    id
    content
  }
}

# Return only my own private notes.
query ListPrivateNote {
  listPrivateNote {
    items {
      id
      content
    }
  }
}
```

## Conflict Detection

```
type Note @model @versioned {
  id: ID!
  content: String!
  version: Int! # You can leave this out. Validation fails if this is not a int like type (Int/BigInt) and is always coerced to non-null.
}
```

## Conflict Detection Queries

```graphql
mutation Create {
  createNote(input:{
    content:"A note"
  }) {
    id
    content
    version
  }
}

mutation Update($noteId: ID!) {
  updateNote(input:{
    id: $noteId,
    content:"A second version",
    expectedVersion: 1
  }) {
    id
    content
    version
  }
}

mutation Delete($noteId: ID!) {
  deleteNote(input:{
    id: $noteId,
    expectedVersion: 2
  }) {
    id
    content
    version
  }
}
```
## Common Patterns for the API Category

The Amplify CLI exposes the GraphQL Transform libraries to help create APIs with common
patterns and best practices baked in but it also provides number of escape hatches for
those situations where you might need a bit more control. Here are a few common use cases
you might find useful.

#### Filter Subscriptions by model fields and/or relations

In multi-tenant scenarios, subscribed clients may not always want to receive every change for a model type. These are useful features for limiting the objects that are returned by a client subscription. It is crucial to remember that subscriptions can only filter by what fields are returned from the mutation query. Keep in mind, these two methods can be used together to create truly robust filtering options.

Consider this simple schema for our examples:

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
  comments: [Comment] @connection(name: "TodoComments")
}
type Comment @model {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

**Filtering by type fields**

This is the simpler method of filtering subscriptions, as it requires one less change to the model than filtering on relations.

1. Add the subscriptions argument on the *@model* directive, telling Amplify to *not* generate subscriptions for your Comment type.

```graphql
type Comment @model(subscriptions: null) {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

2. Run `amplify push` at this point, as running it after adding the Subscription type will throw an error, claiming you cannot have two Subscription definitions in your schema.

3. After the push, you will need to add the Subscription type to your schema, including whichever scalar Comment fields you wish to use for filtering (content in this case):

```graphql
type Subscription {
  onCreateComment(content: String): Comment @aws_subscribe(mutations: ["createComment"])
  onUpdateComment(id: ID, content: String): Comment @aws_subscribe(mutations: ["updateComment"])
  onDeleteComment(id: ID, content: String): Comment @aws_subscribe(mutations: ["deleteComment"])
}
```

**Filtering by related (*@connection* designated) type**

This is useful when you need to filter by what Todo objects the Comments are connected to. You will need to augment your schema slightly to enable this.

1. Add the subscriptions argument on the *@model* directive, telling Amplify to *not* generate subscriptions for your Comment type. Also, just as importantly, we will be utilizing an auto-generated column from DynamoDB by adding `commentTodoId` to our Comment model:

```graphql
type Comment @model(subscriptions: null) {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
  commentTodoId: String # This references the commentTodoId field in DynamoDB
}
```
2. You should run `amplify push` at this point, as running it after adding the Subscription type will throw an error, claiming you cannot have two Subscription definitions in your schema.

3. After the push, you will need to add the Subscription type to your schema, including the `commentTodoId` as an optional argument:

```graphql
type Subscription {
  onCreateComment(commentTodoId: String): Comment @aws_subscribe(mutations: "createComment")
  onUpdateComment(id: ID, commentTodoId: String): Comment @aws_subscribe(mutations: "updateComment")
  onDeleteComment(id: ID, commentTodoId: String): Comment @aws_subscribe(mutations: "deleteComment")
}
```

The next time you run `amplify push` or `amplify api gql-compile`, your subscriptions will allow an `id` and/or `commentTodoId` argument on a Comment subscription. As long as your mutation on the Comment type returns the specified argument field from its query, AppSync filters which subscription events will be pushed to your subscribed client.

## Common Patterns for the API Category

The Amplify CLI exposes the GraphQL Transform libraries to help create APIs with common
patterns and best practices baked in but it also provides number of escape hatches for
those situations where you might need a bit more control. Here are a few common use cases
you might find useful.

#### Filter Subscriptions by model fields and/or relations

In multi-tenant scenarios, subscribed clients may not always want to receive every change for a model type. These are useful features for limiting the objects that are returned by a client subscription. It is crucial to remember that subscriptions can only filter by what fields are returned from the mutation query. Keep in mind, these two methods can be used together to create truly robust filtering options.

Consider this simple schema for our examples:

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
  comments: [Comment] @connection(name: "TodoComments")
}
type Comment @model {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

**Filtering by type fields**

This is the simpler method of filtering subscriptions, as it requires one less change to the model than filtering on relations.

1. Add the subscriptions argument on the *@model* directive, telling Amplify to *not* generate subscriptions for your Comment type.

```graphql
type Comment @model(subscriptions: null) {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

2. Run `amplify push` at this point, as running it after adding the Subscription type will throw an error, claiming you cannot have two Subscription definitions in your schema.

3. After the push, you will need to add the Subscription type to your schema, including whichever scalar Comment fields you wish to use for filtering (content in this case):

```graphql
type Subscription {
  onCreateComment(content: String): Comment @aws_subscribe(mutations: ["createComment"])
  onUpdateComment(id: ID, content: String): Comment @aws_subscribe(mutations: ["updateComment"])
  onDeleteComment(id: ID, content: String): Comment @aws_subscribe(mutations: ["deleteComment"])
}
```

**Filtering by related (*@connection* designated) type**

This is useful when you need to filter by what Todo objects the Comments are connected to. You will need to augment your schema slightly to enable this.

1. Add the subscriptions argument on the *@model* directive, telling Amplify to *not* generate subscriptions for your Comment type. Also, just as importantly, we will be utilizing an auto-generated column from DynamoDB by adding `commentTodoId` to our Comment model:

```graphql
type Comment @model(subscriptions: null) {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
  commentTodoId: String # This references the commentTodoId field in DynamoDB
}
```
2. You should run `amplify push` at this point, as running it after adding the Subscription type will throw an error, claiming you cannot have two Subscription definitions in your schema.

3. After the push, you will need to add the Subscription type to your schema, including the `commentTodoId` as an optional argument:

```graphql
type Subscription {
  onCreateComment(commentTodoId: String): Comment @aws_subscribe(mutations: "createComment")
  onUpdateComment(id: ID, commentTodoId: String): Comment @aws_subscribe(mutations: "updateComment")
  onDeleteComment(id: ID, commentTodoId: String): Comment @aws_subscribe(mutations: "deleteComment")
}
```

The next time you run `amplify push` or `amplify api gql-compile`, your subscriptions will allow an `id` and/or `commentTodoId` argument on a Comment subscription. As long as your mutation on the Comment type returns the specified argument field from its query, AppSync filters which subscription events will be pushed to your subscribed client.