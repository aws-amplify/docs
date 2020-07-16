Next you'll use the generated model to create, update, query, and delete data. In this section you'll initialize DataStore, and then manipulate Todo items.

## Configure Amplify and DataStore

First, we'll add the DataStore plugin and configure Amplify.

1. Open `AppDelegate.swift` and **add the following** import statements at the top of the file:
  ```swift
  import Amplify
  import AmplifyPlugins
  ```

1. In the same file (`AppDelegate.swift`), **add the following** code to the `application(_,Didfinishlaunchingwithoptions:)` method:
  ```swift

  let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels())
  do {
      try Amplify.add(plugin:dataStorePlugin)
      try Amplify.configure()
      print("Initialized Amplify");
  } catch {
      print("Could not initialize Amplify: \(error)")
  }
  ```

1. **Build and run** the application. In console window, you'll see a log line indicating success:

    ```console
    Initialized Amplify
    ```

    Optionally, if you'd like to adjust the log level, you can do this by updating the `Amplify.Logging.logLevel` variable.  For example:
    ```swift
    Amplify.Logging.logLevel = .info
    ```

    Setting the log level to `.info`, re-building and re-running the application should render additional log statements:
    ```swift
    [Amplify] Configuring
    Initialized Amplify
    [AWSDataStorePlugin] Unable to find suitable API plugin for syncEngine.  syncEngine will not be started
    ```

## Create a Todo

Next, you'll create a Todo and save it to DataStore.

1. Open `ContentView.swift` and **add the following** import statements at the top of the file:
  ```swift
  import Amplify
  import AmplifyPlugins
  ```

1. In the same file (`ContentView.swift`), **update the body view**  to call a function called `performOnAppear()`:

  ```swift
    var body: some View {
        Text("Hello, World!")
            .onAppear {
                self.performOnAppear()
        }
    }
  ```

1. In the same file (`ContentView.swift`), **add a function** called `performOnAppear()`:

  ```swift
  func performOnAppear() {
      let item = Todo(name: "Build iOS Application",
                      description: "Build an iOS application using Amplify")
  }
  ```
  This code creates a Todo item with two properties: a name and a description. This is a plain object that isn't stored in DataStore yet.

1. Below the creation of the item, **add the code** to save the item to DataStore:

  ```swift
  Amplify.DataStore.save(item) { (result) in
      switch(result) {
      case .success(let savedItem):
          print("Saved item: \(savedItem.name)")
      case .failure(let error):
          print("Could not save item to datastore: \(error)")
      }    
  }
  ```

1. **Build and run** the application. In the console output, you'll see an indication that the item was saved successfully:

  ```console
  Initialized Amplify
  Saved item: Build iOS Application
  ```

1. **Replace the item** with a new Todo to save an additional item. Let's change the name and description, and add a priority:

  ```java
  let item = Todo(name: "Finish quarterly taxes",
                  priority: .high,
                  description: "Taxes are due for the quarter next week")
  ```

1. **Build and run** the application. In the console output, you'll see an indication that the item was saved successfully:

  ```console
  Initialized Amplify
  Saved item: Finish quarterly taxes
  ```

## Query Todos

Now that you have some data in DataStore, you can run queries to retrieve those records.

1. Edit your `performOnAppear()` method to remove the item creation and save, and add the following instead of it.  Your entire function should be this:

  ```swift
  func performOnAppear() {
      Amplify.DataStore.query(Todo.self, completion: { result in
          switch(result) {
          case .success(let todos):
              for todo in todos {
                  print("==== Todo ====")
                  print("Name: \(todo.name)")
                  if let priority = todo.priority {
                      print("Priority: \(priority)")
                  }
                  if let description = todo.description {
                      print("Description: \(description)")
                  }
              }
          case .failure(let error):
              print("Could not query DataStore: \(error)")
          }
      })
  }
  ```

1. **Build and run** the application. In the console output, you'll see both items returned:

  ```console
  Initialized Amplify
  ==== Todo ====
  Name: Build an iOS application using Amplify
  ==== Todo ====
  Name: Finish quarterly taxes
  Description: Taxes are due for the quarter next week
  Priority: high
  ```

1. Queries can also contain predicate filters. These will query for specific objects matching a certain condition.

  The following predicates are supported:

  **Strings**
  
  `eq` `ne` `le` `lt` `ge` `gt` `contains` `notContains` `beginsWith` `between`

  **Numbers**

  `eq` `ne` `le` `lt` `ge` `gt` `between`

  **Lists**

  `contains` `notContains`

  To use a predicate, pass an additional argument into your query. For example, to see all high priority items:

  ```swift
  Amplify.DataStore.query(Todo.self,
                          where: Todo.keys.priority.eq(Priority.high.rawValue),
                          completion: { result in
      switch(result) {
      case .success(let todos):
          for todo in todos {
              print("==== Todo ====")
              print("Name: \(todo.name)")
              if let description = todo.description {
                  print("Description: \(description)")
              }
              if let priority = todo.priority {
                  print("Priority: \(priority)")
              }
          }
      case .failure(let error):
          print("Could not query DataStore: \(error)")
      }
  })
  ```
  In the above, notice addition of the predicate parameter as the second argument.

1. Run the application. In logcat, you'll see only the high priority item returned:

  ```console
  Initialized Amplify
  ==== Todo ====
  Name: Finish quarterly taxes
  Description: Taxes are due for the quarter next week
  Priority: high
  ```

## Update a Todo

You may want to change the contents of a record. Below, we'll query for a record, create a copy of it, modify it, and save it back to DataStore. 
1. Edit your `performOnAppear()` method to remove anything related to datastore and **add the following** instead of it:

    ```swift
    Amplify.DataStore.query(Todo.self,
                            where: Todo.keys.name.eq("Finish quarterly taxes"),
                            completion: { result in
        switch(result) {
        case .success(let todos):
            guard todos.count == 1, var updatedTodo = todos.first else {
                print("Did not find exactly one todo, bailing")
                return
            }
            updatedTodo.name = "File quarterly taxes"
            Amplify.DataStore.save(updatedTodo,
                                   completion: { result in
                                    switch(result) {
                                    case .success(let savedTodo):
                                        print("Updated item: \(savedTodo.name )")
                                    case .failure(let error):
                                        print("Could not update data in Datastore: \(error)")
                                    }
            })
        case .failure(let error):
            print("Could not query DataStore: \(error)")
        }
    })
    ```

1. **Build and run** the application. In your console output, you'll see an indication that the item was updated successfully:

    ```console
    Initialized Amplify
    Updated item: File quarterly taxes
    ```
  
## Delete a Todo

To round out our CRUD operations, we'll query for a record and delete it from DataStore.
1. Edit your `performOnAppear()` method to remove anything related to datastore and **add the following** instead of it:

    ```swift
    Amplify.DataStore.query(Todo.self,
                            where: Todo.keys.name.eq("File quarterly taxes"),
                            completion: { result in
        switch(result) {
        case .success(let todos):
            guard todos.count == 1, let toDeleteTodo = todos.first else {
                print("Did not find exactly one todo, bailing")
                return
            }
            Amplify.DataStore.delete(toDeleteTodo,
                                     completion: { result in
                                        switch(result) {
                                        case .success:
                                            print("Deleted item: \(toDeleteTodo.name)")
                                        case .failure(let error):
                                            print("Could not update data in Datastore: \(error)")
                                        }
            })
        case .failure(let error):
            print("Could not query DataStore: \(error)")
        }
  })
  ```

1. **Build and run** the application. In the console output, you'll see an indication that the item was deleted successfully:
  ```console
  Initialized Amplify
  Deleted item: File quarterly taxes
  ```