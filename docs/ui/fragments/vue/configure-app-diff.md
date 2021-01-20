_main.js_

```diff
import Vue from 'vue';
import App from "./App.vue";
- import Amplify, * as AmplifyModules from 'aws-amplify'
- import { AmplifyPlugin } from 'aws-amplify-vue'
+ import '@aws-amplify/ui-vue';
+ import Amplify from 'aws-amplify';
+ import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```