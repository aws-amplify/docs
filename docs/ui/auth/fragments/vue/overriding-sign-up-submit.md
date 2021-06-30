_App.vue_

```html
<template>
	<div>
        <amplify-authenticator>
            <amplify-sign-up
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
			const param = {
				...formData,
				attributes: {
					...formData.attributes,
					'custom:favorite_flavor': 'Cookie Dough'
				}
			}
			return Auth.signUp(param);
		},
	},
};
</script>
```