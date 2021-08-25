```swift
extension GraphQLRequest {
    static func get(byPostId postId: String, todoId: String) -> GraphQLRequest<JSONValue> {
        let document = """
        query get($postId: ID!, $todoId: ID!) {
          getPost(id: $postId) {
            id
            title
            rating
          }
          getTodo(id: $todoId) {
            id
            name
          }
        }
        """
        return GraphQLRequest<JSONValue>(document: document,
                                         variables: ["postId": postId,
                                                     "todoId": todoId],
                                         responseType: JSONValue.self)
    }
}
```
Notice here that `JSONValue` is used as the `responseType`. `JSONValue` is utility type that can be used to represent an arbitrary JSON response.

Once you have the response data in a `JSONValue`, you can access each object in the JSON structure by encoding it back to Data and decoding it to the expected Model.

```swift
Amplify.API.query(request: .get(byPostId: "[POST_ID]", todoId: "[TODO_ID]")) { result in
    switch result {
    case .success(let response):
        switch response {
        case .success(let data):
            if let todoJSON = data.value(at: "getTodo"),
                let todoData = try? JSONEncoder().encode(todoJSON),
                let todo = try? JSONDecoder().decode(Todo.self, from: todoData) {
                print(todo)
            }
            if let postJSON = data.value(at: "getPost"),
                let postData = try? JSONEncoder().encode(postJSON),
                let post = try? JSONDecoder().decode(Post.self, from: postData) {
                print(post)
            }
        case .failure(let errorResponse):
            print("Response contained errors: \(errorResponse)")
        }
    case .failure(let apiError):
        print("Failed with error: \(apiError)")
    }
}
```

If you have custom models or your Model has required fields that you have decided not to include in the response, you can create a `Codable` that conforms to the structure of the response data that you expect. From the previous example, the `Codable` would look like this

```swift
struct PostAndTodoResponse: Codable {
    public let getTodo: Todo
    public let getPost: Post
    struct Todo: Codable {
        public let id: String
        public var name: String
    }
    struct Post: Codable {
        public let id: String
        public var title: String
        public var rating: Int
    }
}
```
Then use `PostAndTodoResponse` as the `responseType` of the `GraphQLRequest` instead of using `JSONValue`.