## Clear

To clear local data from DataStore, use the `clear` method:

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/other-methods/10_clear.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/other-methods/10_clear.md"></inline-fragment>

<amplify-callout>

If your app uses authentication, it is recommended to call `DataStore.clear()` on sign-in or sign-out to remove any user-specific data. In scenarios where a mobile device can be shared by several users, calling `DataStore.clear()` will ensure that data does not leak from one user to another.

</amplify-callout>

## Start

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/other-methods/15_start.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/other-methods/15_start.md"></inline-fragment>

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/other-methods/20_start.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/other-methods/20_start.md"></inline-fragment>

## Stop

To stop the DataStore sync process, you can use `DataStore.stop()`.  This will close the real time subscription connection when your app is no longer interested in updates. You will typically call `DataStore.stop()` just before your application is closed.  You can also force your [DataStore sync expressions](~/lib/datastore/sync.md) to be re-evaluated at runtime by calling `stop()` followed by `start()`.

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/other-methods/30_stop.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/other-methods/30_stop.md"></inline-fragment>
