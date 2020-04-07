The code below illustrates a conflict resolution handler for the `Post` model that retries a mutation with the same title, but the most recent remote data for all other fields. The conflict resolution handler discards conflicts for all other models (by returning the `DISCARD` symbol imported from `@aws-amplify/datastore`).

```js
import { DISCARD } from "@aws-amplify/datastore";

DataStore.configure({
  errorHandler: (error) => {
    console.warn("Unrecoverable error", { error });
  },
  conflictHandler: async (data) => {
    // Example conflict handler

    const modelConstructor = data.modelConstructor;
    if (modelConstructor === Post) {
      const remoteModel = data.remoteModel;
      const localModel = data.localModel;
      const newModel = modelConstructor.copyOf(remoteModel, (d) => {
        d.title = localModel.title;
      });
      return newModel;
    }

    return DISCARD;
  },
  maxRecordsToSync: 30000,
  fullSyncInterval: 60, // minutes
});
```
