## Save Data

To write any data to the DataStore you can pass an instance of a Model to `DataStore.save()` and it will be persisted in offline storage. At this point you can use it as an item in a normal data store such as querying, updating or deleting. If you choose to later connect to the cloud the item will be synchronized using GraphQL mutations and any other systems connected to the same backend can run queries or mutations on these items as well as observe them with GraphQL subscriptions.

```swift
Amplify.DataStore.save(
    Post(title: "My First Post",
         rating: 10,
         status: "active")
){
    switch $0 {
    case .success:
        print("Added post")
    case .failure(let err):
        print("Error adding post - \(err.localizedDescription)")
    }
}
```
## Query Data

Querying data is always against the locally synchronized data, which is updated in the background for you by the DataStore Sync Engine when connected to the cloud. You can query using models as well as conditions using predicate filters for finer grained results.

```swift
  Amplify.DataStore.query(Post.self){
        switch $0 {
        case .success(let result):
          print("Posts: \(result)")   //result will be of type [Post]
        case .failure(let err):
         print("Error listing posts - \(err.localizedDescription)")
      }
}
```

### Query with Predicates

You can apply predicate filters against the DataStore using the fields defined on your GraphQL type along with the following conditions supported by DynamoDB:

**Strings:** `eq | ne | le | lt | ge | gt | contains | notContains | beginsWith | between`

**Numbers:** `eq | ne | le | lt | ge | gt | between`

**Lists:** `contains | notContains`

This is done via `Amplify.DataStore.query(<Model>, where:{})`. The `where` statement is a closure which accepts predicates compatible with the operators listed above. For example if you wanted all of the Posts with rating greater than 4:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating > 4 }){
    switch $0 {
    case .success(let result):
      print("Posts: \(result)")
    case .failure(let err):
      print("Error listing posts - \(err.localizedDescription)")
    }
}
```

You can build upon this with more complex `where` statements using Swift operators such as `||`, `&&`, etc:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating > 4 || p.status == "active" }){
    switch $0 {
    case .success(let result):
      print("Posts: \(result)")
    case .failure(let err):
      print("Error listing posts - \(err.localizedDescription)")
    }
}
```

You can also write this in a compositional function manner by replacing the operators with their equivalent predicate statements such as `.gt`, `.or`, etc:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating.gt(4).or(p.status.eq("active")) }){
    //...more code
}
```

## Update Data

Models in DataStore are immutable. To update a record you must query it to get a reference to the instance before updating it with `DataStore.save()`:

```swift
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let post):
        print("Updating the post \(String(describing: post))")
        if var updatedPost = post {
            updatedPost.status = "inactive"
            Amplify.DataStore.save(updatedPost){ res in
                switch res {
                case .success:
                    print("Post updated!")
                case .failure(let err):
                    print("Failed to update post - \(err.localizedDescription)")
                }
            }
        }
    case .failure(let err):
        print("Post not found - \(err.localizedDescription)")
    }
}
```

You can also apply conditions to update and delete operations. The condition will be applied locally and if you have enabled synchronization with the cloud it will be placed in a network mutation queue. The GraphQL mutation will then include this condition and be evaluated against the existing record in DynamoDB. If the condition holds the item in the cloud is updated and synchronized across devices. If the check fails then the item is not updated and the source of truth from the cloud will be applied to the local DataStore. For instance if you wanted to update if the `rating` was greater than 3:

```swift
//TODO
```

Conditional updates can only be applied to single items and not lists. If you wish to update a list of items you can loop over them and apply conditions one at a time.

## Delete Data

To delete an item simply pass in an instance:

```swift
Amplify.DataStore.delete(post) {
    switch $0 {
    case .success:
        print("Post deleted!")
    case .failure(let err):
        print("Error deleting post - \(err.localizedDescription)")
    }
}
```

Or specify it by ID:

```swift
Amplify.DataStore.delete(Post.self, withId: "123") {
    switch $0 {
    case .success:
        print("Post deleted!")
    case .failure(let err):
        print("Error deleting post - \(err.localizedDescription)")
    }
}
```

You can also pass predicate operators to delete multiple items. 

```swift
// TODO
```

## Observe Data

If you are running on iOS 13 or higher, you can subscribe to changes on your Models by using `publisher(for:)` in the DataStore API. This reacts dynamically to updates of data to the underlying Storage Engine, which could be the result of GraphQL Subscriptions as well as Queries or Mutations that run against the backing AppSync API if you are synchronizing with the cloud. 

The `publisher(for:)` API returns an [AnyPublisher](https://developer.apple.com/documentation/combine/anypublisher), only available in iOS 13.0 and above.

```
let postSubscription = Amplify
    .DataStore
    .publisher(for: Post.self)
    .sink(receiveCompletion: { completion in
        if case .failure(let err) = completion {
            print("Subscription received error - \(err.localizedDescription)")
        }
    }) {
        print("Subscription received mutation: \($0)")
}

// When finished observing
postSubscription.cancel()
```