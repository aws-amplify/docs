_App.vue_
```html
<template>
  <div>
    <div v-if="authState !== 'signedin'">You are signed out.</div>
    <amplify-authenticator>
      <div v-if="authState === 'signedin' && user">
        <div>Hello, {{user.username}}</div>
      </div>
      <amplify-sign-out></amplify-sign-out>
    </amplify-authenticator>
  </div>
</template>
```
<amplify-block-switcher>
<amplify-block name="Vue 3">

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
    }
  },
  beforeUnmount() {
    return onAuthUIStateChange;
  }
}
```

</amplify-block>
<amplify-block name="Vue 2">

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
    }
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
}
```

</amplify-block>
</amplify-block-switcher>
