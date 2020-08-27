
<amplify-block-switcher>
<amplify-block name="Java">

```java
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
        return GraphQLRequest<String>(document: document,
                                         variables: ["postId": postId,
                                                     "todoId": todoId],
                                         responseType: String.self)
    }
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
extension GraphQLRequest {
    static func get(byPostId postId: String, todoId: String) -> GraphQLRequest<String> {
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
        return GraphQLRequest<String>(document: document,
                                         variables: ["postId": postId,
                                                     "todoId": todoId],
                                         responseType: String.self)
    }
}
```

</amplify-block>
</amplify-block-switcher>