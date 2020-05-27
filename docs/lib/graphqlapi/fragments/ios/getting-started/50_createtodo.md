```swift
func createTodo() {
    let todo = Todo(name: "my first todo", description: "todo description")
    _ = Amplify.API.mutate(request: .create(todo)) { event in
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