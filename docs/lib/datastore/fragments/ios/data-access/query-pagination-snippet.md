```swift
Amplify.DataStore.query(Post.self, paginate: .page(0, limit: 100)) {
    // handle result
}
```

The `paginate` arguments takes an object of type `QueryPaginationInput`. That object can be created with the following factory functions:

- `.page(_ page: UInt, limit: UInt)`: the page number (starting at `0`) and the page size, defined by `limit` (defaults to `100`)
- `.firstPage`: an idiomatic shortcut to `.page(0, limit: 100)`
- `.firstResult`: an idiomatic shortcut to `.page(0, limit: 1)`
