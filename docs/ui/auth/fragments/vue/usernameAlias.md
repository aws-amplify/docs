_main.ts_

```js
import Vue from 'vue';
import App from './App.vue';
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

_App.vue_

```html
<template>
  <amplify-authenticator username-alias="email">
    <div>
      My App
      <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>
</template>
```