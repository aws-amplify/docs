
<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/importing-datastore-snippet.md"></inline-fragment>

## Create and update

To write data to the DataStore, pass an instance of a model to `Amplify.DataStore.save()`:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/save-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/save-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/save-snippet.md"></inline-fragment>

The `save` method creates a new record, or in the event that one already exists in the local store, it updates the record.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/update-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/update-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/update-snippet.md"></inline-fragment>

## Delete

To delete an item simply pass in an instance.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/delete-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/delete-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/delete-snippet.md"></inline-fragment>

## Query Data

Queries are performed against the _local store_. When cloud synchronization is enabled, the local store is updated in the background by the DataStore Sync Engine.

You can narrow the results of your query by specifying a model type of interest. For more advanced filtering, such as matching arbitrary field values on an object, you can supply a query predicate.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-basic-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-basic-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-basic-snippet.md"></inline-fragment>

### Predicates

Predicates are filters that can be used to match items in the DataStore. When applied to a query(), they constrain the returned results. When applied to a save(), they act as a pre-requisite for updating the data. You can match against fields in your schema by using the following predicates:

**Strings:** `eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains | notContains`

For example if you wanted a list of all `Post` Models that have a `rating` greater than 4:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-predicate-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-predicate-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-predicate-snippet.md"></inline-fragment>

Multiple conditions can also be used, like the ones defined in [GraphQL Transform condition statements](~/cli/graphql-transformer/resolvers.md). For example, fetch all posts that has a rating greater than `4` and are `PUBLISHED`:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-predicate-multiple-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-predicate-multiple-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-predicate-multiple-snippet.md"></inline-fragment>

Alternatively, the `or` logical operator can also be used:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-predicate-or-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-predicate-or-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-predicate-or-snippet.md"></inline-fragment>

<inline-fragment platform="ios" src="~/lib/datastore/fragments/native_common/sort.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/native_common/sort.md"></inline-fragment>

### Pagination

Query results can also be paginated by passing in a `page` number (starting at 0) and an optional `limit` (defaults to 100). This will return a list of the first 100 items:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-pagination-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-pagination-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-pagination-snippet.md"></inline-fragment>
