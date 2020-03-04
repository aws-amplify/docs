## Run a Mutation

Now that the client is set up, you can run a GraphQL mutation with `Amplify.API.mutate` to create, update, and delete your data.

With the Todo model generated, add the following import and the method..

```swift
import Amplify

func createTodo() {
    let todo = Todo(name: "MyTodo", description: "description") // Create an instance of the Model you want to mutate
    _ = Amplify.API.mutate(of: todo, type: .create) { (event) in  // Call Mutate with the model with `create` mutation type. You can also `update` or `delete`
        switch event {
        case .completed(let result):
            switch result {
            case .success(let todo):
                print("Successfully created todo: \(todo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        case .failed(let error):
            print("Got failed event with error \(error)")
        default:
            print("Should never happen")
        }
    }
}

```