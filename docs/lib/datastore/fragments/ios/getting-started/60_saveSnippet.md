<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let post = Post(title: "Create an Amplify DataStore app")

Amplify.DataStore.save(post) { result in
    switch result {
    case .success:
        print("Post saved successfully!")
    case .failure(let error):
        print("Error saving post \(error)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let saveSink = Amplify.DataStore.save(post).sink {
    if case let .failure(error) = $0 {
        print("Error saving post \(error)")
    }
}
receiveValue: {
    print("Post saved successfully!")
}
```

</amplify-block>

</amplify-block-switcher>
