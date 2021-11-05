## Using Amplify GraphQL client

Subscriptions is a GraphQL feature allowing the server to send data to its clients when a specific event happens. You can enable real-time data integration in your app with a subscription. 

```javascript
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import * as subscriptions from './graphql/subscriptions';

// Subscribe to creation of Todo
const subscription = API.graphql(
    graphqlOperation(subscriptions.onCreateTodo)
).subscribe({
    next: ({ provider, value }) => console.log({ provider, value }),
    error: error => console.warn(error)
});

// Stop receiving data updates from the subscription
subscription.unsubscribe();

```

When using **AWS AppSync** subscriptions, be sure that your AppSync configuration is at the root of the configuration object, instead of being under API: 

```javascript
Amplify.configure({
  Auth: {
    identityPoolId: 'xxx',
    region: 'xxx' ,
    cookieStorage: {
      domain: 'xxx',
      path: 'xxx',
      secure: true
    }
  },
  aws_appsync_graphqlEndpoint: 'xxxx',
  aws_appsync_region: 'xxxx',
  aws_appsync_authenticationType: 'xxxx',
  aws_appsync_apiKey: 'xxxx'
});
```

## Using AWS AppSync SDK

Finally, it's time to set up a subscription to real-time data. The syntax is `client.subscribe({ query: SUBSCRIPTION })` which returns an `Observable` that you can subscribe to with `.subscribe()` as well as `.unsubscribe()` when the data is no longer necessary in your application. For example, if you have a `onCreateTodo` subscription, your code might look like the following:

```javascript
import { onCreateTodo } from './graphql/subscriptions';

let subscription;

(async () => {
  subscription = client.subscribe({ query: gql(onCreateTodo) }).subscribe({
    next: data => {
      console.log(data.data.onCreateTodo);
    },
    error: error => {
      console.warn(error);
    }
  });
})();

// Unsubscribe after 10 secs
setTimeout(() => {
  subscription.unsubscribe();
}, 10000);
```

Note that since `client.subscribe` returns an `Observable`, you can use `filter`, `map`, `forEach` and other stream related functions. When you subscribe, you'll get back a subscription object you can use to unsubscribe. 

Subscriptions can also take input types like mutations, in which case they will be subscribing to particular events based on the input. To learn more about subscription arguments, see [Real-Time data](https://docs.aws.amazon.com/appsync/latest/devguide/real-time-data.html).
