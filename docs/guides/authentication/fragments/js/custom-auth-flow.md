The [Amplify UI Component library](~/ui/auth/authenticator.md) allows you to scaffold out an end-to-end authentication flow in just a few lines of code, but you will often need to create a custom authentication flow from scratch.

In this guide, you will learn how to use the `Auth` class to manage user identity and the `Hub` utility to listen to authentication events.

## Auth class

The [Auth class](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html) is an API provided by the Amplify JavaScript library that has over 30 methods for managing user identity in your app.

In this guide, we'll be working with the following methods:

- [signUp](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signup) - Create a new user account
- [confirmSignUp](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#confirmsignup) - Confirms a user with a verification code for a multi-factor authentication (MFA) flow
- [signIn](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin) - Signs a user in
- [currentAuthenticatedUser](https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#currentauthenticateduser) - If a user is signed in, returns metadata about the currently signed in user. If no user is signed in, returns null.

## Hub

The [Hub](~/lib/utilities/hub.md) utility is a local eventing system used to share data between modules and components in your app. In this guide you will learn how to listen to authentication events using the `Hub` utility:

## Concepts

When building a user authentication flow, there are a few pieces of state that you have to manage:

1. __Form state__ - The form state manages which form should be shown to the user. Are they a new user? How can you show them the sign up form. Are they in the process of signing up? Should you be showing them the confirm sign up form for an MFA flow?
2. __Form input state__ - The form input state is the value of the actual form fields as the user is typing. For instance, you may have a form that allows the user to input their email address, password, and phone number. The form input state will hold these values and allow you to send them in an API request.
3. __Routing state__ - The routing state determines what url, route, or page the user is viewing. Many times this will determine whether a user can or cannot view a certain route or page. The implementation depends heavily on the type of app you are building, and the framework you are using (if any).
4. __User state__ - The user state is the currently signed in user (if there is one). Using this user state, you can determine the routing state and enable more fine grained control based on whether a user is signed in or based on the identity of the signed in user.

<!-- This guide will cover strategies for handling __form state__, __form input state__, and __user state__ but will not be covering routing state as this is very dependent on the framework. -->

## Implementation of a custom authentication flow

Using a combination of application state and the Amplify APIs you can easily manage the authentication flow of your app. Let's have a look at how we could achieve this with __pseudocode__:

```javascript
/* Import the Amplify Auth API */
import { Auth } from 'aws-amplify';

/* Create the form state and form input state */
let formState = "signUp";
let formInputState = { username: '', password: '', email: '', verificationCode: '' };

/* onChange handler for form inputs */
function onChange(e) {
  formInputState = { ...formInputState, [e.target.name]: e.target.value };
}

/* Sign up function */
async function signUp() {
  try {
    await Auth.signUp({
      username: formInputState.username,
      password: formInputState.password,
      attributes: {
        email: formInputState.email
      }});
    /* Once the user successfully signs up, update form state to show the confirm sign up form for MFA */
    formState = "confirmSignUp";
  } catch (err) { console.log({ err }); }
}

/* Confirm sign up function for MFA */
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(formInputState.username, formInputState.verificationCode);
    /* Once the user successfully confirms their account, update form state to show the sign in form*/
    formState = "signIn";
  } catch (err) { console.log({ err }); }
}

/* Sign in function */
async function signIn() {
  try {
    await Auth.signIn(formInputState.username, formInputState.password);
    /* Once the user successfully signs in, update the form state to show the signed in state */
    formState = "signedIn";
  } catch (err) { console.log({ err }); }
}


/* In the UI of the app, render forms based on form state */
/* If the form state is "signUp", show the sign up form */
if (formState === "signUp") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="password"
        type="password"
        onChange={onChange}
      />
      <input
        name="email"
        onChange={onChange}
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  )
}

/* If the form state is "confirmSignUp", show the confirm sign up form */
if (formState === "confirmSignUp") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="verificationCode"
        onChange={onChange}
      />
      <button onClick={confirmSignUp}>Confirm Sign Up</button>
    </div>
  )
}

/* If the form state is "signIn", show the sign in form */
if (formState === "signIn") {
  return (
    <div>
      <input
        name="username"
        onChange={onChange}
      />
      <input
        name="password"
        onChange={onChange}
      />
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}

/* If the form state is "signedIn", show the app */
if (formState === "signedIn") {
  return (
    <div>
      <h1>Welcome to my app!</h1>
    </div>
  )
}
```

## Managing user state

To manage user state, you can call the `currentAuthenticatedUser` method of the `Auth` class. In this example, you can call the method to show or hide the sign up form when the app loads:

```javascript
async function onAppLoad() {
  const user = await Auth.currentAuthenticatedUser();
  console.log('user:', user)
  if (user) {
    formState = "signedIn";
  } else {
    formState = "signUp";
  }
}
```

## Listening to auth events

To listen to auth events (sign up, sign in, etc..) you can use the `Hub` utility. Let's say you needed to listen for a sign out event from anywhere in the app. To do that, you could use the following code:

```javascript
Hub.listen('auth', (data) => {
  const event = data.payload.event;
  console.log('event:', event);
  if (event === "signOut") {
    console.log('user signed out...');
  }
});
```
