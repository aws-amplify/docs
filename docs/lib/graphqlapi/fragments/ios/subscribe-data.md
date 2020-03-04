Subscribe to mutations for creating real-time clients.

```swift
func createSubscription() {
    let subscriptionOperation = Amplify.API.subscribe(from: Todo.self, type: .onCreate) { (event) in
        switch event {
        case .inProcess(let subscriptionEvent):
            switch subscriptionEvent {
            case .connection(let subscriptionConnectionState):
                print("Subsription connect state is \(subscriptionConnectionState)")
            case .data(let result):
                switch result {
                case .success(let todo):
                    print("Successfully got todo from subscription: \(todo)")
                case .failure(let error):
                    print("Got failed result with \(error.errorDescription)")
                }
            }
        case .completed:
            print("Subscription has been closed")
        case .failed(let error):
            print("Got failed result with \(error.errorDescription)")
        default:
            print("Should never happen")
        }
    }
}
```
