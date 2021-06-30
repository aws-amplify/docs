_App.jsx_

```jsx
import { Auth } from 'aws-amplify';

const handleSignUp = async (formData) => {
    const param = {
        ...formData,
        attributes: {
            ...formData.attributes,
            'custom:favorite_flavor': 'Cookie Dough'
        }
    }
    const data = await Auth.signUp(param);
    return data;
}

<AmplifyAuthenticator>
    <AmplifySignUp slot="sign-up" handleSignUp={handleSignUp}></AmplifySignUp>
</AmplifyAuthenticator>
```