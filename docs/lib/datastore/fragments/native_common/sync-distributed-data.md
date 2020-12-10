## Distributed data

When working with distributed data, it is important to be mindful about the state of the local and the remote systems. DataStore tries to make that as simple as possible for you; however, some scenarios might require some consideration.


For instance, when updating or deleting data, one has to consider that the state of the local data might be out-of-sync with the backend. This scenario can affect how conditions should be implemented.


<inline-fragment platform="js" src="~/lib/datastore/fragments/native_common/sync-save-delete-predicate.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/sync/19-sync-save-delete-predicate.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/native_common/sync-save-delete-predicate.md"></inline-fragment>

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/sync/20-savePredicate.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/sync/20-savePredicate.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/sync/20-savePredicate.md"></inline-fragment>

There's a difference between the traditional local condition check using `if/else` constructs and the predicate in the aforementioned APIs as you can see in the example below.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/sync/30-savePredicateComparison.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/sync/30-savePredicateComparison.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/sync/30-savePredicateComparison.md"></inline-fragment>

### Conflict detection and resolution

When concurrently updating the data in multiple places, it is likely that some conflict might happen. For most of the cases the default *Auto-merge* algorithm should be able to resolve conflicts. However, there are scenarios where the algorithm won't be able to be resolved, and in these cases, a more advanced option is available and will be described in detail in the next section.
