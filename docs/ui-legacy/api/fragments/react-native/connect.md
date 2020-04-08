The API category provides React Native components for working with GraphQL data using the Amplify GraphQL client. 

The `<Connect/>` component is used to execute a GraphQL query or mutation. You can execute GraphQL queries by passing your queries in `query` or `mutation` attributes

## Subscription

For subscriptions, you can use the `subscription` and `onSubscriptionMsg` attributes to enable subscriptions

## Mutations

For mutations, a `mutation` function needs to be provided with the `Connect` component. A `mutation` returns a promise that resolves with the result of the GraphQL mutation.
