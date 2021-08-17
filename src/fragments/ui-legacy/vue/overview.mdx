[![npm version](https://badge.fury.io/js/aws-amplify-vue.svg)](https://badge.fury.io/js/aws-amplify-vue)

The ```aws-amplify-vue``` package is a set of Vue components which integrates your Vue application with the AWS-Amplify library. The package supports Vue applications using version 2.5 or above, and was created using the Vue 3.0 CLI.

## Configuration

In your Vue app, install the following:

```bash
npm i aws-amplify
npm i aws-amplify-vue
```

Then, alter main.js:

```javascript
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

Vue.use(AmplifyPlugin, AmplifyModules)

// It's important that you instantiate the Vue instance after calling Vue.use!

new Vue({
  render: h => h(App)
}).$mount('#app')

```

In App.vue:

```
<script>
import { components } from 'aws-amplify-vue'

export default {
  name: 'app', 
  components: {
    ...<yourOtherComponents>,
    ...components
  }
}
</script>

```

## AmplifyEventBus

The aws-amplify-vue package implements a Vue EventBus for emitted and listening to events within its components. The events emitted by the components are listed within the documentation for each individual component.

To listen to these events within one of your components, import the EventBus:

```javascript
import { AmplifyEventBus } from 'aws-amplify-vue';
```

Then, register an event listener (potentially within a lifecycle hook):

```javascript
AmplifyEventBus.$on('authState', info => {
  console.log(`Here is the auth event that was just emitted by an Amplify component: ${info}`)
});
```

## AmplifyPlugin

The aws-amplify-vue package provides a Vue plugin to access the Amplify library. You installed the plugin when you set up your application:

```Vue.use(AmplifyPlugin, AmplifyModules)```

This makes the Amplify library available to the aws-amplify-vue components as well as your application. Please note that you can restrict the modules that are made available to the plugin by passing only specific modules in the second argument of ```Vue.use``` call.

### Using the AmplifyPlugin

To call the Amplify library, simply use ``this.$Amplify.`` followed by whichever module you wish to use.
