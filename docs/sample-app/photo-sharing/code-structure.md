---
title: Code Structure
description: This section describe the high level code structure of PhotoSharing
filterKey: platform
---

This section describes the high level code structure of PhotoSharing which is a pattern that we develop and follow while we were implementing the App. See below diagram

![Image](~/images/sample-app/photo-sharing/code-structure.png)

## App Singleton

This is a level of *Services Implementation* & *Services Management.* 

* Protocol defines what services ViewModel have access to
    * Easier for testing: *MockAuthService*
    * Different Libraries could be used: *FirebaseAuthService* (Amplify is better than Firebase)
* Class defines the storage of concrete instances of Amplify Services


### ServiceManager

```swift
protocol ServiceManager {
    var authService: AuthService { get }
    var dataStoreService: DataStoreService { get }
    var storageService: StorageService { get }
    var errorTopic: PassthroughSubject<AmplifyError, Never> { get }
    func configure()
}

class AppServiceManager: ServiceManager {

    private init() {}

    static let shared = AppServiceManager()

    let authService: AuthService = AmplifyAuthService()
    let dataStoreService: DataStoreService = AmplifyDataStoreService()
    let storageService: StorageService = AmplifyStorageService()
    let errorTopic = PassthroughSubject<AmplifyError, Never>()

    func configure() {
        authService.configure()
        dataStoreService.configure(authService.sessionStatePublisher)
    }
}
```

### AuthService

```swift
protocol AuthService {
    var sessionState: SessionState { get }
    var sessionStatePublisher: Published<SessionState>.Publisher { get }
    var psAuthUser: PSAuthUser? { get }

    func configure()
    func signOut(completion: @escaping (Result<Void, AuthError>) -> Void)
    func webSignIn(completion: @escaping (Result<Void, AuthError>) -> Void)
}

class AmplifyAuthService: AuthService {
    // implementation of protocol
}
```


## View Models

View Model is responsible for binding the *UI components in views* with *properties in View Model*


```swift
class OnboardingViewModel: ObservableObject {

    @Published var hasError = false
    @Published var photoSharingError: AmplifyError?

    var authService: AuthService

    init(manager: ServiceManager = AppServiceManager.shared) {
        // As you can see, ViewModel class is accessing AuthService in App Singleton
        self.authService = manager.authService
    }

    func signIn() {
        self.authService.webSignIn {
            switch $0 {
            case .success:
                return
            case .failure(let error):
                Amplify.log.error("\(#function) Error signing in - \(error.localizedDescription)")
                self.photoSharingError = error
                self.hasError = true
            }
        }
    }

    /*
    implementation of other methods
    */
}
```

## Views

**View** reacts to the changes of properties and send actions to call methods in its corresponding *ViewModel*.

