## Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func getTodo() {
    Amplify.API.query(request: .get(Todo.self, byId: "9FCF5DD5-1D65-4A82-BE76-42CB438607A0")) { event in
        switch event {
        case .success(let result):
            switch result {
            case .success(let todo):
                guard let todo = todo else {
                    print("Could not find todo")
                    return
                }
                print("Successfully retrieved todo: \(todo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failure(let error):
            print("Got failed event with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func getTodo() -> AnyCancellable {
    Amplify.API
        .query(request: .get(Todo.self, byId: "9FCF5DD5-1D65-4A82-BE76-42CB438607A0"))
        .resultPublisher
        .sink {
            if case let .failure(error) = $0 {
                print("Got failed event with error \(error)")
            }
        }
        receiveValue: { result in
            switch result {
            case .success(let todo):
                guard let todo = todo else {
                    print("Could not find todo")
                    return
                }
                print("Successfully retrieved todo: \(todo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
}
```

</amplify-block>

</amplify-block-switcher>

## List Query

You can get the list of items that match a condition that you specify using the `where` parameter in `Amplify.API.query`

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func listTodos() {
    let todo = Todo.keys
    let predicate = todo.name == "my first todo" && todo.description == "todo description"
    Amplify.API.query(request: .list(Todo.self, where: predicate)) { event in
        switch event {
        case .success(let result):
            switch result {
            case .success(let todo):
                print("Successfully retrieved list of todos: \(todo)")

            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failure(let error):
            print("Got failed event with error \(error)")
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func listTodos() -> AnyCancellable {
    let todo = Todo.keys
    let predicate = todo.name == "my first todo" && todo.description == "todo description"
    let sink = Amplify.API.query(request: .list(Todo.self, where: predicate))
        .resultPublisher
        .sink {
            if case let .failure(error) = $0 {
                print("Got failed event with error \(error)")
            }
        }
        receiveValue: { result in
        switch result {
            case .success(let todo):
                print("Successfully retrieved list of todos: \(todo)")

            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>
