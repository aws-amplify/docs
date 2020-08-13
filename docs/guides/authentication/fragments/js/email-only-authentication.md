Instead of requiring users to create a username, many apps will use the email address of the user for authentication purposes. In this guide you'll learn how to enable this functionality using the Amplify CLI and libraries.

## Getting started - Creating the service

To enable authentication specifying `email` as the primary authentication property, follow these steps:

```sh
amplify add auth

? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Email
? Do you want to configure advanced settings? No, I am done.
```

Next, deploy the authentication service:

```sh
amplify push
```

## Client-side integration

Now that the service has been deployed, you will configure the client application to interact with the authentication service. You will learn how to interact with the service using both the UI components as well as the `Auth` class of the Amplify JavaScript library.

### UI Components

In the UI component you need to specify that you'd like to use the email address as the sign up and sign in property for users. To do so, you'll set the `usernameAlias` to `email`.

<amplify-block-switcher>

<amplify-block name="React">

```js
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

<AmplifyAuthenticator usernameAlias="email" />
```
</amplify-block>

<amplify-block name="Angular">

```js
<amplify-authenticator usernameAlias="email"></amplify-authenticator>
```

</amplify-block>

<amplify-block name="Vue">

```js
<amplify-authenticator username-alias="email"></amplify-authenticator>
```

</amplify-block>

<amplify-block name="React Native">

```js
import { withAuthenticator, Authenticator } from 'aws-amplify-react';

// When using Authenticator
class App {
  // ...

  render() {
    return (
      <Authenticator usernameAttributes='email'/>
    );
  }
}

export default App;

// When using withAuthenticator
class App2 {
  // ...
}

export default withAuthenticator(App2, { usernameAttributes: 'email' });
```

</amplify-block>

</amplify-block-switcher>

### Calling directly from Auth API

You can also call the Authentication service directly using the `Auth` category:

**Signing up**

```js
import { Auth } from 'aws-amplify';

await Auth.signUp({
  username: "youremail@yourdomain.com",
  password: "your-secure-password",
  attributes: {
    email: "youremail@yourdomain.com"
  }
});
```

**Confirming sign up**

```js
import { Auth } from 'aws-amplify';

await Auth.confirmSignUp("youremail@yourdomain.com", "123456");
```

**Signing in**

```js
import { Auth } from 'aws-amplify';

await Auth.signIn("youremail@yourdomain.com", "your-secure-password");
```