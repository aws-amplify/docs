## Add generated code

**What is API.swift?**

`API.swift` (or an alternate name chosen by you in CLI flow) contains the generated code for GraphQL statements such as queries, mutation, and subscriptions. This saves you time as you don't have to hand author them.

From the Finder window, drag and drop the generated `API.swift` to the Xcode project under the top Project Navigator folder whose name matches your Xcode project name. When the `Options` dialog box appears, do the following:

* Clear the `Copy items if needed` check box.
* Choose `Create groups`, and then choose `Finish`.

## Integrate into your app

Initialize the AppSync client inside your application delegate:

```swift
import AWSAppSync

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var appSyncClient: AWSAppSyncClient?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        do {
            // You can choose the directory in which AppSync stores its persistent cache databases
            let cacheConfiguration = try AWSAppSyncCacheConfiguration()

            // AppSync configuration & client initialization
            let appSyncServiceConfig = try AWSAppSyncServiceConfig()
            let appSyncConfig = try AWSAppSyncClientConfiguration(appSyncServiceConfig: appSyncServiceConfig,
                                                                  cacheConfiguration: cacheConfiguration)
            appSyncClient = try AWSAppSyncClient(appSyncConfig: appSyncConfig)
            print("Initialized appsync client.")
        } catch {
            print("Error initializing appsync client. \(error)")
        }
        // other methods
        return true
    }
}
```

Next, reference the AppSync client that you initialized in the AppDelegate, above. You could do so inside of your `viewDidLoad()` lifecycle method, or while instantiating a SwiftUI View. See the examples below.

```swift
import AWSAppSync

class Todos: UIViewController{
  //Reference AppSync client
  var appSyncClient: AWSAppSyncClient?

  override func viewDidLoad() {
      super.viewDidLoad()
      let appDelegate = UIApplication.shared.delegate as! AppDelegate
      appSyncClient = appDelegate.appSyncClient
  }
}
```

or SwiftUI View
```swift
import AWSAppSync
struct TodoView: View {
    // Reference AppSync client
    var appSyncClient: AWSAppSyncClient?
    init() {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate
        appSyncClient = appDelegate.appSyncClient
    }
    var body: some View {
        Text("Todos")
    }
}
```

You can now add data to your database with a mutation function as shown below:

```swift
func runMutation(){
    let mutationInput = CreateTodoInput(name: "Use AppSync", description:"Realtime and Offline")
    appSyncClient?.perform(mutation: CreateTodoMutation(input: mutationInput)) { (result, error) in
        if let error = error as? AWSAppSyncClientError {
            print("Error occurred: \(error.localizedDescription )")
        }
        if let resultError = result?.errors {
            print("Error saving the item on server: \(resultError)")
            return
        }
        print("Mutation complete.")
    }
}
```

Next, query the data using function below:

```swift
func runQuery(){
    appSyncClient?.fetch(query: ListTodosQuery(), cachePolicy: .returnCacheDataAndFetch) {(result, error) in
        if error != nil {
            print(error?.localizedDescription ?? "")
            return
        }
        print("Query complete.")
        result?.data?.listTodos?.items!.forEach { print(($0?.name)! + " " + ($0?.description)!) }
    }
}
```

> **Note:** The AppSync API is asynchronous, which means that simply invoking `runMutation` and `runQuery` back-to-back may not work as expected, because the mutation will not complete before the query is sent. If you want to ensure that a mutation is complete before issuing a query, use the mutation's callback to trigger the query as shown below:

```swift
func runMutation(){
    let mutationInput = CreateTodoInput(name: "Use AppSync", description:"Realtime and Offline")
    appSyncClient?.perform(mutation: CreateTodoMutation(input: mutationInput)) { [weak self] (result, error) in
        // ... do whatever error checking or processing you wish here
        self?.runQuery()
    }
}
```

You can also setup realtime subscriptions to data:

```swift
var discard: Cancellable?

func subscribe() {
    do {
        discard = try appSyncClient?.subscribe(subscription: OnCreateTodoSubscription(), resultHandler: { (result, transaction, error) in
            if let result = result {
                print("CreateTodo subscription data:" + result.data!.onCreateTodo!.name + " " + result.data!.onCreateTodo!.description!)
            } else if let error = error {
                print(error.localizedDescription)
            }
        })
        print("Subscribed to CreateTodo Mutations.")
        } catch {
            print("Error starting subscription.")
        }
}
```

Call the `runMutation()`, `runQuery()`, and `subscribe()` methods from your app code such as from a button click or when your app starts in `viewDidLoad()`. You will see data being stored and retrieved in your backend from the Xcode console.

## Testing your API
You can open the AWS console for you to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```bash
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.
