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
    const data = await Auth.signUp(formData);
    return data;
}

<AmplifyAuthenticator>
    <AmplifySignUp slot="sign-up" handleSignUp={handleSignUp}></AmplifySignUp>
</AmplifyAuthenticator>
```