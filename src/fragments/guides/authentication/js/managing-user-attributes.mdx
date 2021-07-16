In Cognito, you have the ability to manage both __standard__ and __custom__ user attributes for your users.

## Standard attributes

### Configuring standard attributes

There are many user attributes available to use by default in Cognito. Here is a list of them:

- address
- birthdate
- email
- family name
- gender
- given name
- locale
- middle name
- name
- nickname
- phone number
- picture
- preferred username
- profile
- zoneinfo
- updated at
- website

To configure and enable __standard__ user attributes in your app, you can run the Amplify `update auth` command and choose __Walkthrough all the auth configurations__. When prompted for __Specify read attributes__ and __Specify write attributes__, choose the attributes you'd like to enable in your app.

### Writing and updating standard attributes

You can create the user attributes on sign up or after sign up.

#### Creating user attributes on sign up

To set user attributes during sign up, you can populate the `attributes` field:

```js
await Auth.signUp({
  username: 'someuser', password: 'mycoolpassword',
  attributes: {
    email: 'someuser@somedomain.com', address: '105 Main St. New York, NY 10001'
  }
});
```

#### Managing user attributes after sign up

To manage user attributes after sign up, you can use the `updateUserAttributes` method of the __Auth__ class:

```js
async function updateUser() {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    'address': '105 Main St. New York, NY 10001'
  });
}
```

### Reading user attributes

To read user attributes, you can use the `currentAuthenticatedUser` method of the Auth class:

```js
async function getUserInfo() {
  const user = await Auth.currentAuthenticatedUser();
  console.log('attributes:', user.attributes);
}
```

## Custom attributes

To set a custom attribute, you must first open the Amazon Cognito dashboard:

```sh
amplify console auth

? Which console: User Pool
```

Next, click on __Attributes__ in the left hand navigation and click __Add custom attribute__.

### Writing and updating custom attributes

You can create the custom user attributes on sign up or after sign up. When managing custom attributes, the attribute needs to be prepended with `custom:`. 

#### Creating custom user attributes on sign up

To create a user attribute during sign up, you can populate the `attributes` field:

```js
await Auth.signUp({
  username: 'someuser', password: 'mycoolpassword',
  attributes: {
    email: 'someuser@somedomain.com', 'custom:favorite_ice_cream': 'chocolate'
  }
})
```

#### Managing custom user attributes after sign up

To manage custom user attributes after sign up, you can use the `updateUserAttributes` method of the __Auth__ class:

```js
async function updateUser() {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, {
    'custom:favorite_ice_cream': 'vanilla'
  });
}
```