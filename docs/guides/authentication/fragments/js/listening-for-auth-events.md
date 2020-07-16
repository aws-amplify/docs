In this guide you will learn how to use the `Hub` utility to listen for different authentication events.

Amplify’s Auth category publishes in the auth channel when `signIn`, `signUp`, and `signOut` events happen. You can listen and act upon those event notifications.

```js
import { Hub } from 'aws-amplify';

Hub.listen('auth', (data) => {
  switch (data.payload.event) {
    case 'signIn':
        console.log('user signed in');
        break;
    case 'signUp':
        console.log('user signed up');
        break;
    case 'signOut':
        console.log('user signed out');
        break;
    case 'signIn_failure':
        console.log('user sign in failed');
        break;
    case 'configured':
        console.log('the Auth module is configured');
  }
});
```

To learn more about how `Hub` works, check out the API docs [here](~/lib/utilities/hub.md)