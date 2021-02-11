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
    Amplify.API.query(request: .paginatedList(Todo.self, where: predicate)) { event in
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
    let sink = Amplify.API.query(request: .paginatedList(Todo.self, where: predicate))
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

> **Note**: This approach will only return up to the first 1,000 items.  To change this limit or make requests for additional results beyond this limit, use *pagination* as discussed below.

## List subsequent pages of items

A list query only returns the first 1,000 items by default, so for large data sets, you'll need to paginate through the results.  After receiving a page of results, you can check if there are subsequent pages and obtain the next page. The page size is configurable as well, as in the example below.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
import class Amplify.List

class TodosViewModel: ObservableObject {
    @Published var todos = [Todo]()
    var ref: List<Todo>?
    
    init() {
        Amplify.API.query(request: .paginatedList(Todo.self, limit: 5)) { (result) in
            switch result {
            case .success(let graphQLResponse):
                switch graphQLResponse {
                case .success(let todos):
                    self.ref = todos
                    DispatchQueue.main.async {
                        self.todos.append(contentsOf: todos.elements)
                    }
                case .failure(let error):
                    print("\(error)")
                }
            case .failure(let error):
                print("\(error)")
            }
        }
    }
    
    func getNextPage() {
        guard let ref = ref, ref.hasNextPage() else {
            return
        }
        ref.getNextPage { (result) in
            switch result {
            case .success(let nextPage):
                self.ref = nextPage
                DispatchQueue.main.async {
                    self.todos.append(contentsOf: nextPage.elements)
                }
            case .failure(let error):
                print("\(error)")
            }
        }
    }
    
    func getAllPages() {
        guard let ref = ref else {
            return
        }
        if ref.hasNextPage() {
            ref.getNextPage { (result) in
                switch result {
                case .success(let nextPage):
                    self.ref = nextPage
                    DispatchQueue.main.async {
                        self.todos.append(contentsOf: nextPage.elements)
                    }
                    self.getAllPages()
                case .failure(let error):
                    print("\(error)")
                }
            }
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
import class Amplify.List
import Combine

class TodosViewModel: ObservableObject {
    @Published var todos = [Todo]()
    var ref: List<Todo>?
    var sink: AnyCancellable?
    
    init() {
        sink = Amplify.API.query(request: .paginatedList(Todo.self, limit: 5))
            .resultPublisher
            .sink { (error) in
                if case let .failure(error) = error {
                    print("\(error)")
                }
            } receiveValue: { (result) in
                switch result {
                case .success(let todos):
                    self.ref = todos
                    DispatchQueue.main.async {
                        self.todos.append(contentsOf: todos.elements)
                    }
                case .failure(let error):
                    print("\(error)")
                }
            }
    }

    func getNextPage() {
        guard let ref = ref, ref.hasNextPage() else {
            return
        }
        ref.getNextPage { (result) in
            switch result {
            case .success(let nextPage):
                self.ref = nextPage
                DispatchQueue.main.async {
                    self.todos.append(contentsOf: nextPage.elements)
                }
            case .failure(let error):
                print("\(error)")
            }
        }
    }
    
    func getAllPages() {
        guard let ref = ref else {
            return
        }
        if ref.hasNextPage() {
            ref.getNextPage { (result) in
                switch result {
                case .success(let nextPage):
                    self.ref = nextPage
                    DispatchQueue.main.async {
                        self.todos.append(contentsOf: nextPage.elements)
                    }
                    self.getAllPages()
                case .failure(let error):
                    print("\(error)")
                }
            }
        }
    }
}
```

</amplify-block>

</amplify-block-switcher>