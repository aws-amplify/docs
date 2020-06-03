---
title: Manipulating data
description: Learn how to save, query, paginate, update, delete and observe data in DataStore.
---
<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/importing-datastore-snippet.md"></inline-fragment>

## Create and update

To write data to the DataStore you can pass an instance of a model to `Amplify.DataStore.save()`.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/save-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/save-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/save-snippet.md"></inline-fragment>

The `save` method takes care of creating a new record or updating an existing one in case the model `id` already exists in the database.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/update-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/update-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/update-snippet.md"></inline-fragment>

## Delete

To delete an item simply pass in an instance.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/delete-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/delete-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/delete-snippet.md"></inline-fragment>

## Query Data

Querying data is always against the local database. When cloud synchronization is enabled, the loca database is updated in the background for you by the DataStore Sync Engine.

You can query using models as well as conditions using predicate filters for finer grained results.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-basic-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-basic-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-basic-snippet.md"></inline-fragment>

### Predicates

You can apply predicate filters against the DataStore using the fields defined on your schema along with the following conditions.

**Strings:** `eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains | notContains`

For example if you wanted a list of all `Post` Models that have a `rating` greater than 4:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-predicate-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-predicate-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-predicate-snippet.md"></inline-fragment>

Multiple conditions can also be used, like the ones defined in [GraphQL Transform condition statements](~/cli/graphql-transformer/resolvers.md). For example, fetch all posts that has a rating greater than `4` and are `active`:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-predicate-multiple-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-predicate-multiple-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-predicate-multiple-snippet.md"></inline-fragment>

Alternatively, the `or` logical operator can also be used:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-predicate-or-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-predicate-or-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-predicate-or-snippet.md"></inline-fragment>

### Pagination

Query results can also be paginated by passing in a `page` number (starting at 0) and an optional `limit` (defaults to 100). This will return a list of the first 100 items:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-pagination-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-pagination-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-pagination-snippet.md"></inline-fragment>
