---
title: Configurable Parameters
description: Additional configurable parameters for GraphQL Transform can be passed to the CloudFormation template itself. This provides escape hatches without leaking too many implementation details into the SDL definition
---

Much of the behavior of the GraphQL Transform logic is configured by passing arguments to the directives in the GraphQL SDL definition. However, certain other things are configured by passing parameters to the CloudFormation template itself. This provides escape hatches without leaking too many implementation details into the SDL definition. You can pass values to these parameters by adding them to the `parameters.json` file in the API directory of your amplify project.

## AppSyncApiName

**Override the name of the generated AppSync API**

```
{
  "AppSyncApiName": "AppSyncAPI"
}
```

## CreateAPIKey

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

## APIKeyExpirationEpoch

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

## DynamoDBBillingMode

**Set the DynamoDB billing mode for the API. One of "PROVISIONED" or "PAY_PER_REQUEST".**

```
{
  "DynamoDBBillingMode": "PAY_PER_REQUEST"
}
```

## DynamoDBModelTableReadIOPS

**Override the default read IOPS provisioned for each @model table**

**Only valid if the "DynamoDBBillingMode" is set to "PROVISIONED"**

```
{
  "DynamoDBModelTableReadIOPS": 5
}
```

## DynamoDBModelTableWriteIOPS

**Override the default write IOPS provisioned for each @model table**

**Only valid if the "DynamoDBBillingMode" is set to "PROVISIONED"**

```
{
  "DynamoDBModelTableWriteIOPS": 5
}
```

## ElasticsearchStreamingFunctionName

**Override the name of the AWS Lambda searchable streaming function**

```
{
  "ElasticsearchStreamingFunctionName": "CustomFunctionName"
}
```

## ElasticsearchInstanceCount

**Override the number of instances launched into the Elasticsearch domain created by @searchable**

```
{
  "ElasticsearchInstanceCount": 1
}
```

## ElasticsearchInstanceType

**Override the type of instance launched into the Elasticsearch domain created by @searchable**

```
{
  "ElasticsearchInstanceType": "t2.small.elasticsearch"
}
```

## ElasticsearchEBSVolumeGB

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