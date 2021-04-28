```graphql
type Todo @model @auth(rules: [{ allow: public }]) {
    id: ID!
    name: String!
    description: String
    isComplete: Boolean!
}
```

- This schema also describes a model called Todo with four properties:
    - **id** - an auto-generated identifier field for a Todo item
    - **name** - a non-optional string field containing the name of a Todo item
    - **description** - an optional string field containing additional details about a Todo item
    - **isComplete** - a non-optional boolean field indicating the completion status of a Todo item

        <amplify-callout>

        **Note:** We are also specifying an @auth directive on our model which can be useful for setting up authorization rules later, but for the purposes of this tutorial, the model will be authorized for public access. You can read more about authorization rules [here](https://docs.amplify.aws/lib/datastore/setup-auth-rules/q/platform/flutter).

        </amplify-callout>