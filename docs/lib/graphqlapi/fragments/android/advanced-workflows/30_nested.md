<amplify-block-switcher>
<amplify-block name="Java">

```java
extension GraphQLRequest {
    static func getPostWithComments(byId id: String) -> GraphQLRequest<Post.self> {
        let document = """
        query getPost($id: ID!) {
          getPost(id: $id) {
            id
            title
            rating
            status
            comments {
              items {
                id
                postID
                content
              }
            }
          }
        }
        """
        return GraphQLRequest<JSONValue>(document: document,
                                         variables: ["id": id],
                                         responseType: Post.self)
    }
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
extension GraphQLRequest {
    static func getPostWithComments(byId id: String) -> GraphQLRequest<Post.self> {
        let document = """
        query getPost($id: ID!) {
          getPost(id: $id) {
            id
            title
            rating
            status
            comments {
              items {
                id
                postID
                content
              }
            }
          }
        }
        """
        return GraphQLRequest<JSONValue>(document: document,
                                         variables: ["id": id],
                                         responseType: Post.self)
    }
}
```

</amplify-block>
</amplify-block-switcher>

Query with `Amplify.API.query(request: .getCommentWithPost(byId: "[COMMENT_ID]"))`. 