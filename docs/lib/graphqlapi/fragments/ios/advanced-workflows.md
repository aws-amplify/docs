This section describes different use cases for constructing your own custom GraphQL requests and how to approach it. You may want to construct your own GraphQL request if you want to
- retrieve only a subset of the data to reduce data transfer
- retrieve nested objects at a depth that you choose
- combine multiple operations into a single request

A GraphQL request is automatically generated for you when using AWSAPIPlugin with the existing workflow. For example, if you have a Todo model, a mutation request to save the Todo will look like this:
```swift
let todo = Todo(name: "my first todo", description: "todo description")
Amplify.API.mutate(request: .create(todo))
```
Underneath the covers, a request is generated with a GraphQL document and variables and sent to the AppSync service. 

```json
{ 
  "query": "mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      name
      description
    }
  }
  ",
  "variables":"{
    "input": {
      "id": "[UNIQUE-ID]",
      "name": "my first todo",
      "description": "todo description"
    }
  }
}
```

The different parts of the document is described as follows
- `mutation` - the operation type to be performed, other operation types are `query` and `subscription`
- `createTodo($input: CreateTodoInput!)` - the name and input of the operation. 
- `$input: CreateTodoInput!` - the input of type `CreateTodoInput!` referencing the variables containing JSON input
- `createTodo(input: $input)` - the mutation operation which takes a variable input from `$input`
- the selection set containing `id`, `name`, and `description` are fields specified to be returned in the response

You can learn more about the structure of a request from [GraphQL Query Language](https://graphql.org/learn/) and [AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/graphql-overview.html). To test out constructing your own requests, open the AppSync console using `amplify console api` and navigate to the Queries tab.

## Subset of data

The selection set of the document specifies which fields are returned in the response. For example, if you are displaying a view of the Todo without the description, you can construct the document to omit the field. You can learn more about selection sets [here](https://spec.graphql.org/draft/#sec-Selection-Sets).

```
query getTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
  }
}
```
The response data will look like this
```json
{
  "data": {
    "getTodo": {
      "id": "111",
      "name": "my first todo"
    }
  }
}
```
First, create your own `GraphQLRequest`

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

## Nested Data
If you have a relational model, you can retrieve the nested object by creating a `GraphQLRequest` with a selection set containing the nested object's fields. For example, in this schema, the Post can contain multiple comments.
```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}
type Post @model {
  id: ID!
  title: String!
  rating: Int!
  status: PostStatus!
  comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
}
type Comment @model
  @key(name: "byPost", fields: ["postID", "content"]) {
  id: ID!
  postID: ID!
  post: Post! @connection(fields: ["postID"])
  content: String!
}
```
The `GraphQLRequest` will look like this

```swift
extension GraphQLRequest {
    static func getPostWithComments(byId id: String) -> GraphQLRequest<JSONValue> {
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
                                         responseType: JSONValue.self)
    }
}

```
Query with `Amplify.API.query(request: .getCommentWithPost(byId: "[COMMENT_ID]"))`. Notice here that `JSONValue` is used as the `responseType`. `JSONValue` is utility type that can be used to represent an arbitrary JSON response.

## Combining Multiple Operations

When you want to perform more than one operation in a single request, you can place them within the same document. For example, to retrieve a Post and a Todo
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






