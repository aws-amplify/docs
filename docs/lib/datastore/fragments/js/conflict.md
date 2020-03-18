## Setup

When syncing with AWS AppSync, DataStore updates from multiple clients will converge by tracking object versions and adhere to different conflict resolution strategies. The default strategy is called *Automerge* where GraphQL type information on an object is inspected at runtime to perform merge operations. You can read more about this behavior and alternatives such as *Optimistic Concurrency* Control and *custom Lambda functions* in the [AWS AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/conflict-detection-and-sync.html). To update the conflict resolution strategies navigate into your project from a terminal and run `amplify update api` choosing *Yes* when prompted to change the conflict detection and conflict resolution strategies:

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

## Optional configurations

DataStore has a few optional configurations, such as the ability to specify a custom handler for error messages that take place in any part of the system. You can also specify a custom conflict handler that runs if a mutation is rejected by AWS AppSync during one of the conflict resolution strategies.

Finally you can configure `maxRecordsToSync` as an upper bound on items (per-Model) which will be stored locally on the device, as well as `fullSyncInterval` which is an override of the default 24 hour "base query" which runs as part of the Delta Sync process.

The code below illustrates a conflict resolution handler for the `Post` model that retries a mutation with the same title, but the most recent remote data for all other fields. The conflict resolution handler discards conflicts for all other models (by returning the `DISCARD` symbol imported from `@aws-amplify/datastore`).

```javascript
import { DISCARD } from '@aws-amplify/datastore';

DataStore.configure({
		errorHandler: error => {
			console.warn('Unrecoverable error', { error });
		},
		conflictHandler: async data => {  // Example conflict handler

			const modelConstructor = data.modelConstructor;

			if (modelConstructor === Post) {

				const remoteModel = data.remoteModel;

				const localModel = data.localModel;

				const newModel = modelConstructor.copyOf(remoteModel, d => {
					d.title = localModel.title;
				});
				return newModel;
			}

			return DISCARD;
		},
		// maxRecordsToSync: 30000,
		fullSyncInterval: 60,        //minutes
	});
```
