<amplify-block-switcher>
<amplify-block name="Java">

```java
extension GraphQLRequest {
    static func getWithoutDescription(byId id: String) -> GraphQLRequest<Todo> {
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
                                    responseType: Todo.self)
    }
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
extension GraphQLRequest {
    static func getWithoutDescription(byId id: String) -> GraphQLRequest<Todo> {
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
                                    responseType: Todo.self)
    }
}
```

</amplify-block>
</amplify-block-switcher>

Then, query for the Todo by a todo id

<amplify-block-switcher>
<amplify-block name="Java">

```java
Amplify.API.query(request: .getWithoutDescription(byId: "[UNIQUE_ID]")) { 
  // handle result
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
Amplify.API.query(request: .getWithoutDescription(byId: "[UNIQUE_ID]")) { 
  // handle result
```

</amplify-block>
</amplify-block-switcher>