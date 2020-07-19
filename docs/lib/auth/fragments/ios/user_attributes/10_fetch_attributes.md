```swift
    func fetchAttributes() {
        
        _ = Amplify.Auth.fetchUserAttributes() { result in
                switch result {
                case .success(let attributes):
                    print("User attributes - \(attributes)")
                case .failure(let error):
                    print("Fetching user attributes failed with error \(error)")
                }
        }
    }
```    