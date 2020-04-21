---
title: Manipulating data
description: Learn how to save, query, paginate, update, delete and observe data in DataStore.
---

## Save Data

To write any data to the DataStore you can pass an instance of a Model to `DataStore.save()` and it will be persisted in offline storage. At this point you can use it as an item in a normal data store such as querying, updating or deleting. If you choose to later connect to the cloud the item will be synchronized using GraphQL mutations and any other systems connected to the same backend can run queries or mutations on these items as well as observe them with GraphQL subscriptions.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/save-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/save-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/save-snippet.md"></inline-fragment>

## Query Data

Querying data is always against the locally synchronized data, which is updated in the background for you by the DataStore Sync Engine when connected to the cloud. You can query using models as well as conditions using predicate filters for finer grained results.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-basic-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-basic-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-basic-snippet.md"></inline-fragment>

### Query with Predicates

You can apply predicate filters against the DataStore using the fields defined on your GraphQL type along with the following conditions supported by DynamoDB:

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

Query results can also be paginated, you can optionally pass in a limit and page. This will return a list of the first 100 items:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/query-pagination-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-pagination-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-pagination-snippet.md"></inline-fragment>

## Update Data

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/update-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/update-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/update-snippet.md"></inline-fragment>

You can also apply conditions to update and delete operations. The condition will be applied locally and if you have enabled synchronization with the cloud it will be placed in a network mutation queue. The GraphQL mutation will then include this condition and be evaluated against the existing record in DynamoDB. If the condition holds the item in the cloud is updated and synchronized across devices. If the check fails then the item is not updated and the source of truth from the cloud will be applied to the local DataStore. For instance if you wanted to update if the `rating` was greater than 3:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/update-condition-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/update-condition-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/update-condition-snippet.md"></inline-fragment>

Conditional updates can only be applied to single items and not lists. If you wish to update a list of items you can loop over them and apply conditions one at a time.

## Delete Data

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/delete-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/delete-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/delete-snippet.md"></inline-fragment>

## Observe Data

You can subscribe to changes on your Models. This reacts dynamically to updates of data to the underlying Storage Engine, which could be the result of GraphQL Subscriptions as well as Queries or Mutations that run against the backing AppSync API if you are synchronizing with the cloud.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/data-access/observe-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/observe-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/observe-snippet.md"></inline-fragment>
