## Clear

To clear local data from DataStore, use the `clear` method:

```js
import { DataStore } from '@aws-amplify/datastore';

await DataStore.clear();
```

## Start

To manually start the sync process, use the `start` method:

```js
import { DataStore } from '@aws-amplify/datastore';

await DataStore.start();
```