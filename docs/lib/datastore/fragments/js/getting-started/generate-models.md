### Automated model generation with NPX

The fastest way to get started is using the `amplify-app` npx script.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wH-UnQy1ltM">
</iframe>
<br/>

#### React

Start with [Create React app](https://create-react-app.dev)

```sh
npx create-react-app amplify-datastore --use-npm
cd amplify-datastore
npx amplify-app@latest
```  

#### React Native CLI

Start with the [React Native CLI](https://reactnative.dev/docs/getting-started).

```sh
npx react-native init AmplifyDatastoreRN
cd AmplifyDatastoreRN
npx amplify-app@latest
```

#### Generate models

Once the basic setup completes open the GraphQL schema located in `amplify/backend/api/<datasourcename>/schema.graphql`. You can use the previously [provided sample](#sample-schema) or the ones suggested by the Amplify CLI.

After saving the file press run:

```
npm run amplify-modelgen
```

### Manual Model Generation

If you do not wish to use the above NPX scripts you can do this manually by first [installing the Amplify CLI](~/cli/start/install.md) and then use the following command to generate models:

```
amplify codegen models
```
