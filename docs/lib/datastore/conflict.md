---
title: Conflict resolution
description: Learn more about how conflict resolution in DataStore is managed and how to configure it.
---

## Setup

When syncing with AWS AppSync, DataStore updates from multiple clients will converge by tracking object versions and adhere to different conflict resolution strategies. The default strategy is called *Automerge* where GraphQL type information on an object is inspected at runtime to perform merge operations. You can read more about this behavior and alternatives such as *Optimistic Concurrency* Control and *custom Lambda functions* in the [AWS AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/conflict-detection-and-sync.html). To update the conflict resolution strategies navigate into your project from a terminal and run `amplify update api` choosing *Yes* when prompted to change the conflict detection and conflict resolution strategies:

```
amplify update api # Select GraphQL

? Do you want to configure advanced settings for the GraphQL API 
❯ Yes, I want to make some additional changes. 

? Configure conflict detection? Yes
? Select the default resolution strategy 
  Auto Merge 
❯ Optimistic Concurrency 
  Custom Lambda 
  Learn More 
```

### Per model configuration

Note that this flow will also allow you to change the strategy on each individual GraphQL type, though is is recommended to use the same strategy for your whole schema unless you have an advanced use case:

```
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

## Optional configurations

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/conflict.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/conflict.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/conflict.md"></inline-fragment>
