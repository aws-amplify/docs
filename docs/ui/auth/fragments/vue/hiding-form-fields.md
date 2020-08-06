_App.vue_
```html
<template>
  <div>
    <amplify-authenticator v-if="authState !== 'signedin'"></amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <amplify-sign-out></amplify-sign-out>
      <div>Hello, {{user.username}}</div>
    </div>
  </div>
</template>
```
```js
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'AuthStateApp',
  created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  data() {
    return {
        user: undefined,
        authState: undefined
        formFields: [
            { type: "username" },
            { type: "password" },
            { type: "email" }
        ]
    }
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
}
```