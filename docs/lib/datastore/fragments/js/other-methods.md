## Clear

To clear local data from DataStore, use the `clear` method:

```js
import { DataStore } from 'aws-amplify';

await DataStore.clear();
```
 `DataStore.clear()` will only clear local data if called after DataStore has started, which can be done either automatically or manually as detailed further below.

<amplify-callout>

If your app is has authentication implemented, it is recommended to call `DataStore.clear()` on signin/signout to remove any user-specific data. This method is often important to use for shared device scenarios or where you need to purge the local on-device storage of records for security/privacy concerns.

</amplify-callout>

## Start

To manually start the sync process, use the `start` method:

```js
import { DataStore } from 'aws-amplify';

await DataStore.start();
```

Synchronization starts automatically whenever you run any of the following methods: `DataStore.query()`, `DataStore.save()`, `DataStore.delete()`, or `DataStore.observe()`.
