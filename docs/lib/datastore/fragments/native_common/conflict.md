
If data synchronization is enabled via [AppSync](https://aws.amazon.com/appsync/), there can be different versions of the same object on the client and server. Multiple clients may have updated their respective copies of an object. DataStore will converge different object versions by applying conflict detection and resolution strategies. The default resolution is called `Auto Merge`. This strategy allows collections to grow, and prefers server-side versions of single-field data. Other strategies include `Optimistic Concurrency` control and `Custom Lambda` functions. For more information, see the [AWS AppSync documentation on conflict handling](https://docs.aws.amazon.com/appsync/latest/devguide/conflict-detection-and-sync.html).

## Custom conflict resolution

To select a different conflict resolution strategy, navigate into your project from a terminal and run `amplify update api`. Choose *Yes* when prompted to change the conflict detection and resolution strategies.

```console
? Please select from one of the below mentioned services: 
    `GraphQL`
...
? Do you want to configure advanced settings for the GraphQL API 
    `Yes, I want to make some additional changes.`
? Configure additional auth types? 
    `No`
? Configure conflict detection? 
    `Yes`
? Select the default resolution strategy
  Auto Merge 
❯ Optimistic Concurrency 
  Custom Lambda 
  Learn More
```

### Per model configuration

Note that this flow will also allow you to change the strategy on each individual GraphQL type, though it is recommended to use the same strategy for your whole schema unless you have an advanced use case:

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

## Custom configuration

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/conflict.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/conflict.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/conflict.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/conflict.md"></inline-fragment>
