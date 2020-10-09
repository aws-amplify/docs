```swift
extension GraphQLRequest {
    static func getWithoutDescription(byId id: String) -> GraphQLRequest<Todo> {
        let operationName = "getTodo"
        let document = """
        query getTodo($id: ID!) {
          \(operationName)(id: $id) {
            id
            name
          }
        }
        """
        return GraphQLRequest<Todo>(document: document,
                                    variables: ["id": id],
                                    responseType: Todo.self,
                                    decodePath: operationName)
    }
}
```
The decode path specifies which part of the response to deserialize to the `responseType`. You'll need to specify the operation name to deserialize the object at "data.getTodo" successfully into a Todo model.

Then, query for the Todo by a todo id
```swift
Amplify.API.query(request: .getWithoutDescription(byId: "[UNIQUE_ID]")) { 
  // handle result
```  