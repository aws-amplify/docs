
<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func createTodo() {
    let todo = Todo(name: "my first todo", description: "todo description")
    Amplify.API.mutate(request: .create(todo)) { event in
        switch event {
        case .success(let result):
            switch result {
            case .success(let todo):
                print("Successfully created the todo: \(todo)")
            case .failure(let graphQLError):
                print("Failed to create graphql \(graphQLError)")
            }
        case .failure(let apiError):
            print("Failed to create a todo", apiError)
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func createTodo() -> AnyCancellable {
    let todo = Todo(name: "my first todo", description: "todo description")
    let sink = Amplify.API.mutate(request: .create(todo))
        .resultPublisher
        .sink { completion in
        if case let .failure(error) = completion {
            print("Failed to create graphql \(error)")
        }
    }
    receiveValue: { result in
        switch result {
        case .success(let todo):
            print("Successfully created the todo: \(todo)")
        case .failure(let graphQLError):
            print("Could not decode result: \(graphQLError)")
        }
    }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>