<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.save(
    Post(title: "My first post",
         description: "Amplify.DataStore is awesome!",
         status: .draft)
) {
    switch $0 {
    case .success:
        print("Created a new post successfully")
    case .failure(let error):
        print("Error creating post - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let saveSink = Amplify.DataStore.save(
    Post(
        title: "My first post",
        description: "Amplify.DataStore is awesome!",
        status: .draft
    )
)
.sink {
    if case let .failure(error) = $0 {
        print("Error creating post - \(error.localizedDescription)")
    }
}
receiveValue: {
    print("Created a new post successfully")
}
```

</amplify-block>

</amplify-block-switcher>
