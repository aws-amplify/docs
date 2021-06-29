_App.jsx_

```jsx
const handleSignUp = (formData) => {
    const param = {
        ...formData,
        attributes: {
            ...formData.attributes,
            'custom:favorite_flavor': 'Cookie Dough'
        }
    }
    return Auth.signUp(param);
}

<AmplifyAuthenticator>
    <AmplifySignUp slot="sign-up" handleSignUp={handleSignUp}></AmplifySignUp>
</AmplifyAuthenticator>
```