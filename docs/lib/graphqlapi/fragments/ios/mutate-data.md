## Run a Mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

```swift
func updateTodo() {
    // Retrieve your Todo using Amplify.API.query
    var todo = Todo(name: "my first todo", description: "todo description")
    todo.description = "updated description"
    _ = Amplify.API.mutate(request: .update(todo)) { event in
        switch event {
        case .success(let result):
            switch result {
            case .success(let todo):
                print("Successfully created todo: \(todo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failure(let error):
            print("Got failed event with error \(error)")
    }
}
```