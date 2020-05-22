## Query by Id

Now that you were able to make a mutation, take the `Id` that was printed out and use it in your query to retrieve data.

```swift
func getTodo() {
    _ = Amplify.API.query(request: .get(Todo.self, byId: "9FCF5DD5-1D65-4A82-BE76-42CB438607A0")) { event in
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

## List Query

You can get the list of items that match a condition that you specify using the `where` parameter in `Amplify.API.query`

```swift
ffunc listTodos() {
    let todo = Todo.keys
    let predicate = todo.name == "MyTodo" && todo.description == "description"
    _ = Amplify.API.query(request: .list(Todo.self, where: predicate)) { event in
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
