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

You can get the list of items using `.paginatedList` with optional parameters `limit` and `where` to specific the page size and condition. By default, the page size is 1000.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
func listTodos() {
    let todo = Todo.keys
    let predicate = todo.name == "my first todo" && todo.description == "todo description"
    Amplify.API.query(request: .paginatedList(Todo.self, where: predicate, limit: 1000)) { event in
        switch event {
        case .success(let result):
            switch result {
            case .success(let todos):
                print("Successfully retrieved list of todos: \(todos)")
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
    let sink = Amplify.API.query(request: .paginatedList(Todo.self, where: predicate, limit: 1000))
        .resultPublisher
        .sink {
            if case let .failure(error) = $0 {
                print("Got failed event with error \(error)")
            }
        }
        receiveValue: { result in
        switch result {
            case .success(let todos):
                print("Successfully retrieved list of todos: \(todos)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
    return sink
}
```

</amplify-block>

</amplify-block-switcher>

### List subsequent pages of items

For large data sets, you'll need to paginate through the results. After receiving the first page of results, you can check if there is a subsequent page and obtain the next page.

```swift
var todos: [Todo] = []
var currentPage: List<Todo>?

func listTodos() {
    let todo = Todo.keys
    let predicate = todo.name == "my first todo" && todo.description == "todo description"
    Amplify.API.query(request: .paginatedList(Todo.self, where: predicate, limit: 1000)) { event in
        switch event {
        case .success(let result):
            switch result {
            case .success(let todos):
                print("Successfully retrieved list of todos: \(todos)")
                self.currentPage = todos
                self.todos.append(contentsOf: todos)
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failure(let error):
            print("Got failed event with error \(error)")
        }
    }
}

func loadMore() {
    if let current = currentPage, current.hasNextPage() {
        current.getNextPage { result in
            switch result {
            case .success(let todos):
                self.todos.append(contentsOf: todos)
                self.currentPage = todos
            case .failure(let coreError):
                print("Failed to get next page \(coreError)")
            }
        }
    }
}
```

## List all pages

If you want to get all pages, first get the initial page and then use it to recursively check if there is a subsequent page before retrieving the next page, aggregating the data from each page into the `todos` array.

```swift
var todos: [Todo] = []
var currentPage: List<Todo>?

func getAllPages() {
    if currentPage == nil {
        Amplify.API.query(request: .paginatedList(Todo.self)) { event in
            switch event {
            case .success(let result):
                switch result {
                case .success(let todos):
                    print("Successfully retrieved list of todos: \(todos)")
                    self.currentPage = todos
                    self.todos.append(contentsOf: todos)
                    self.getAllPages()
                case .failure(let error):
                    print("Got failed result with \(error.errorDescription)")
                }
            case .failure(let error):
                print("Got failed event with error \(error)")
            }
        }
    } else if let current = currentPage, current.hasNextPage() {
        current.getNextPage { result in
            switch result {
            case .success(let todos):
                self.todos.append(contentsOf: todos)
                self.currentPage = todos
                self.getAllPages()
            case .failure(let coreError):
                print("Failed to get next page \(coreError)")
            }
        }
    }
}
```