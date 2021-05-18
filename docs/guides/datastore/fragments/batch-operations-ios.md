Amplify DataStore provides APIs that allow you to create, read, update, and delete items individually. Sometimes you need to perform batch operations like creating and updating multiple objects or querying and deleting object by their IDs. In this guide, you will learn how to perform batch operations using Combine to extend the functionality of the Amplify DataStore APIs.

<amplify-callout warning>

For simplicity, this Guide demonstrates how to perform batch operations using the Combine framework. To follow along, you must include `import Combine` at the top of your file.

</amplify-callout>

## Batch create and update

To batch write data to the DataStore, pass an array of models to a Combine `Publishers.Sequence` and perform `Amplify.DataStore.save(_ model:)` on each object:

```swift
let todos = [
    Todo(name: "Learn Amplify"),
    Todo(name: "Build app"),
    Todo(name: "Profit")
]

let sink = Publishers.Sequence<[Todo], Never>(sequence: todos)
    .flatMap { todo -> AnyPublisher<Todo, DataStoreError> in
        Amplify.DataStore.save(todo)
    }
    .collect()
    .sink {
        if case let .failure(error) = $0 {
            print("Error on save() for type Todo - \(error.localizedDescription)")
        }
    } receiveValue: { savedTodos in
        print("Todos: \(savedTodos)")
    }
```

`Publishers.Sequence` creates a `Publisher` where each model is passed to `.flatMap()` individually, allowing for each object to be saved to DataStore. `.collect()` emits a single array of all the elements collected, returning the saved models in `receiveValue`.

## Batch delete

To batch delete items, pass an array of IDs to `Publishers.Sequence` and perform `Amplify.DataStore.delete(_withId:)` for each ID:

```swift
let todoIds = ["123", "456", "789"]

let sink = Publishers.Sequence<[String], Never>(sequence: todoIds)
    .flatMap { todoId -> AnyPublisher<Void, DataStoreError> in
        Amplify.DataStore.delete(Todo.self, withId: todoId)
    }
    .collect()
    .sink {
        if case let .failure(error) = $0 {
            print("Error deleting post - \(error.localizedDescription)")
        }
    } receiveValue: { _ in
        print("Posts deleted!")
    }
```

`Amplify.DataStore.delete(_withId:)` emits a `Void` when successful. The `receiveValue` of batch deletes will pass `[Void]`.

## Batch query

To batch query items, pass an array of IDs to `Publishers.Sequence` and perform `Amplify.DataStore.query(_:byId:)` for each ID:

```swift
let todoIds = ["123", "456", "789"]

let sink = Publishers.Sequence<[String], Never>(sequence: todoIds)
    .flatMap { itemId -> AnyPublisher<Todo?, DataStoreError> in
        Amplify.DataStore.query(Todo.self, byId: itemId)
    }
    .compactMap { $0 }
    .collect()
    .sink {
        if case let .failure(error) = $0 {
            print("Error on query() for type Todo - \(error.localizedDescription)")
        }
    } receiveValue: { todos in
        print("Todos: \(todos)")
    }
```

`Amplify.DataStore.query(_:byId:)` emits an optional model in the event an object is not found with that ID. `compactMap()` prevents `receiveValue` from providing an array with `nil` values. To include `nil` values in the result, omit `compactMap { $0 }`.