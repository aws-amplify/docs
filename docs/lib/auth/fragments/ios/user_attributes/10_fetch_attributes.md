```swift
    func fetchAttributes() {
        
        _ = Amplify.Auth.fetchUserAttributes(listener: { (result) in
                switch result {
                case .success(let attributes):
                    print("User attribtues - \(attributes)")
                case .failure(let error):
                    print("Fetching user attributes failed with error \(error)")
                }
        })
    }
```    