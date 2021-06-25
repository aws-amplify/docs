_App.vue_

```html
<template>
	<div>
        <amplify-authenticator>
            <amplify-sign-up
                header-text="My Custom Sign Up Text"
                slot="sign-up"
                :handleSignUp.prop="handleSignUp"
            ></amplify-sign-up>
        </amplify-authenticator>
	</div>
</template>
<script>
import { Auth } from '@aws-amplify/auth';

export default {
	name: 'Authenticator',
	methods: {
		handleSignUp(data) {
			console.log(data);
			return Auth.signUp(data);
		},
	},
};
</script>
```