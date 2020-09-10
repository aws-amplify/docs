### Sort

Query results can also be sorted by one or more fields.

For example, to sort all `Post` objects by `rating` in ascending order: 

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-sort-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-sort-snippet.md"></inline-fragment>

To get all `Post` objects sorted first by `rating` in ascending order, and then by `title` in descending order:

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/data-access/query-sort-multiple-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/data-access/query-sort-multiple-snippet.md"></inline-fragment>