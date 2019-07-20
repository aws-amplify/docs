---
---

# Getting Started

Build an app using the Amplify Framework which contains:

- CLI toolchain for creating and managing your serverless backend
- JavaScript, iOS, and Android libraries to access your resources using a category based programming model
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue

**Use the drop-down menu at the top right to choose your framework**.

This page guides you through setting up a backend and integration into your web or React Native app. You will create a "Todo app" with a GraphQL API and to store and retrieve items in a cloud database, as well as receive updates over a realtime subscription. 

[GraphQL](http://graphql.org) is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites 

[Install and configure the Amplify CLI](..)

## Step 1. Create a New App

<div class="nav-tab create" data-group='create'>
<ul class="tabs">
    <li class="tab-link react current" data-tab="react">React</li>
    <li class="tab-link react-native" data-tab="react-native">React Native</li>
    <li class="tab-link angular" data-tab="angular">Angular</li>
    <li class="tab-link ionic" data-tab="ionic">Ionic</li>
    <li class="tab-link vue" data-tab="vue">Vue</li>
    <li class="tab-link purejs" data-tab="purejs">Vanilla JavaScript</li>
</ul>

<div id="purejs" class="tab-content">

Create a new ‘plain’ JavaScript <a href="https://babeljs.io/docs/en/learn/" target="_blank">ES2015</a> app with webpack. With the following commands, create the directory (`amplify-js-app`) and files for the app.

```bash
$ mkdir -p amplify-js-app/src && cd amplify-js-app
$ touch package.json index.html webpack.config.js src/app.js
```

The app directory structure should be:

```
- amplify-js-app
    - index.html
    - package.json
    - webpack.config.js
    - /src
        |- app.js
```

Add the following to the `package.json` file:

```javascript
{
  "name": "amplify-js-app",
  "version": "1.0.0",
  "description": "Amplify JavaScript Example",
  "dependencies": {
    "@aws-amplify/api": "latest",
    "@aws-amplify/pubsub": "latest"
  },
  "devDependencies": {
    "webpack": "^4.17.1",
    "webpack-cli": "^3.1.0",
    "copy-webpack-plugin": "^4.5.2",
    "webpack-dev-server": "^3.1.5"
  },
  "scripts": {
    "start": "webpack && webpack-dev-server --mode development",
    "build": "webpack"
  }
}
```

Install local development dependencies:

```
$ npm install
```

Add the following to the `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Amplify Framework</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            html, body { font-family: "Amazon Ember", "Helvetica", "sans-serif"; margin: 0; }
            a { color: #FF9900; }
            h1 { font-weight: 300; }
            .app { width: 100%; }
            .app-header { color: white; text-align: center; background: linear-gradient(30deg, #f90 55%, #FFC300); width: 100%; margin: 0 0 1em 0; padding: 3em 0 3em 0; box-shadow: 1px 2px 4px rgba(0, 0, 0, .3); }
            .app-logo { width: 126px; margin: 0 auto; }
            .app-body { width: 400px; margin: 0 auto; text-align: center; }
            .app-body button { background-color: #FF9900; font-size: 14px; color: white; text-transform: uppercase; padding: 1em; border: none; }
            .app-body button:hover { opacity: 0.8; }
        </style>
    </head>
    <body>
        <div class="app">
            <div class="app-header">
                <div class="app-logo">
                    <img src="https://aws-amplify.github.io/images/Logos/Amplify-Logo-White.svg" alt="AWS Amplify" />
                </div>
                <h1>Welcome to the Amplify Framework</h1>
            </div>
            <div class="app-body">
                <button id="MutationEventButton">Add data</button>
                <div id="MutationResult"></div>
                <div id="QueryResult"></div>
                <div id="SubscriptionResult"></div>
            </div>
        </div>
        <script src="main.bundle.js"></script>
    </body>
</html>
```

Add the following to the `webpack.config.js` file:

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        overlay: true,
        hot: true
    },
    plugins: [
        new CopyWebpackPlugin(['index.html']),
        new webpack.HotModuleReplacementPlugin()
    ]
};
```

Run the app:

```bash
$ npm start
```

Open a browser and navigate to <a href="http://localhost:8080" target="_blank">http://localhost:8080</a>. The 'Add data' button does not work yet. We'll work on that next.

</div>

<div id="react" class="tab-content current">

Use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap your application.

```bash
$ npm install -g create-react-app
$ create-react-app myapp && cd myapp
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm install --save @aws-amplify/api @aws-amplify/pubsub
$ npm start
```

To install React-specific Amplify UI components, run the following command:

```bash
$ npm install --save aws-amplify-react
```

See the [React Guide](https://aws-amplify.github.io/docs/js/react){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>
<div id="react-native" class="tab-content" >

Run following commands to install [Expo CLI](https://expo.io) to create and bootstrap your app (use defaults):

```bash
$ npm install expo-cli --global
$ expo init myAmplifyProject
$ cd myAmplifyProject
```

The project name is in camelCase to avoid problems when testing on a physical iOS phone.
{: .callout .callout--info}

Inside the app directory, install Amplify and run your app:

```bash
$ yarn add @aws-amplify/api @aws-amplify/pubsub
$ yarn start
```

While not needed in this getting started flow, Amplify provides React Native bridges when using the Auth category in the `aws-amplify-react-native` package. If you are using [Expo v25.0.0 or greater](https://blog.expo.io/expo-sdk-v25-0-0-is-now-available-714d10a8c3f7), those libraries are already included in your dependencies. Otherwise, you need to [link](https://facebook.github.io/react-native/docs/linking-libraries-ios.html) those libraries to your project.
{: .callout .callout--info}

Linking example for a project created with *react-native init*:

```bash
$ react-native init myReactNativeApp
$ cd myReactNativeApp
$ npm install --save aws-amplify
$ npm install --save aws-amplify-react-native
$ react-native link
```

To install React-specific Amplify UI components, run the following command:

```bash
$ npm install --save aws-amplify-react
```

See the [React Guide](https://aws-amplify.github.io/docs/js/react){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>
<div id="angular" class="tab-content">

Use the [angular-cli](https://github.com/angular/angular-cli) to bootstrap a new Angular app:

```bash
$ npm install -g @angular/cli
$ ng new myAmplifyProject
$ cd myAmplifyProject
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm install --save @aws-amplify/api @aws-amplify/pubsub
$ ng serve
```

See the [Angular Guide](https://aws-amplify.github.io/amplify-js/media/angular_guide){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>
<div id="ionic" class="tab-content">

Use the Ionic CLI to bootstrap a new Ionic app:

```bash
$ npm install -g ionic
$ ionic start myAmplifyProject blank --type=angular 
$ cd myAmplifyProject
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm install --save @aws-amplify/api @aws-amplify/pubsub
$ npm start
```

In addition to `aws-amplify` core, you can install the Angular Ionic modules which provide a service provider, helpers, and components:

```bash
$ npm install --save aws-amplify-angular
``` 

See the [Ionic Guide](https://aws-amplify.github.io/docs/js/angular){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>

<div id="vue" class="tab-content">

Use the Vue CLI to bootstrap a new Vue app (selecting the defaults will work for this project):

```bash

$ npm install -g @vue/cli
$ vue create myamplifyproject 
$ cd myamplifyproject
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm i --save @aws-amplify/api @aws-amplify/pubsub
$ npm run serve
```

To install Vue-specific Amplify UI components and the Amplify Vue plugin you can install the `aws-amplify-vue` package. See the [Vue Guide](https://aws-amplify.github.io/docs/js/vue){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>

## Step 2: Set Up Your Backend

In a terminal window, run the following command (accept defaults is OK, use 'test' environment name) from inside your project directory:

```bash
$ amplify init        #accept defaults
```

<div id="angular" class="tab-content">

When asked for the distribution directory, answer `dist/myAmplifyProject`. If you did not use the name in this tutorial, change "myAmplifyProject" with the name of your application. You can run an `ng build` and check your `dist` directory to see what the name is and re-run `amplify configure project` to change your dist directory setting.
{: .callout .callout--info}

</div>

**How it Works**: Rather than configuring each service through a constructor or constants file, Amplify supports configuration through a centralized file called `aws-exports.js` which defines all the regions and service endpoints to communicate. Whenever you run `amplify push`, this file is automatically created allowing you to focus on your application code. The Amplify CLI will place this file in the appropriate source directory configured with `amplify init`.

To verify that the CLI is set up for your app, run the following command:

```bash
  $ amplify status
  | Category | Resource name | Operation | Provider plugin |
  | -------- | ------------- | --------- | --------------- |
```

The CLI displays a status table with no resources listed. As you add feature categories to your app and run `amplify push`, backend resources created for your app are listed in this table.

You can update a category by running `amplify update <category-name>`. If you no longer want to use a service you can delete it with `amplify remove <category-name>`. Lastly, you can remove the whole project by running `amplify delete` (Warning: This will attempt to delete your entire project, locally and in the cloud, essentially resetting your project as if you never ran `amplify init`).
{: .callout .callout--warning}

## Step 3: Add API and Database

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow above will ask you some questions, like if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. Later on you can always change it. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database.

[Learn more about annotating GraphQL schemas and data modeling](https://aws-amplify.github.io/docs/cli-toolchain/graphql){:target="_blank"}.

Create required backend resources for your configured api with the following command:

```bash
$ amplify push
```

Since you added an API the `amplify push` process will automatically prompt for codegen (select `y` when prompted for automatic query and code generation). Accept the defaults choosing JavaScript, TypeScript, or Angular depending on your platform. 
<div id="react" class="tab-content">
For this tutorial choose **JavaScript**.
</div>
<div id="react-native" class="tab-content">
For this tutorial choose **JavaScript**.
</div>
<div id="purejs" class="tab-content">
For this tutorial choose **JavaScript**.
</div>
<div id="vue" class="tab-content">
For this tutorial choose **JavaScript**.
</div>
<div id="ionic" class="tab-content">
For Ionic applications, choose **Angular** which will create an `API.service.ts` file in the app directory.
</div>
<div id="angular" class="tab-content">
For Angular applications, choose **Angular** which will create an `API.service.ts` file in the app directory.
</div>

## Step 4: Integrate into your app

<div class="nav-tab install" data-group='install'>
<ul class="tabs">
    <li class="tab-link angular" data-tab="angular">Angular</li>
    <li class="tab-link ionic" data-tab="ionic">Ionic</li>
    <li class="tab-link purejs" data-tab="purejs">Vanilla JavaScript</li>
    <li class="tab-link react current" data-tab="react">React</li>
    <li class="tab-link react-native" data-tab="react-native">React Native</li>
    <li class="tab-link vue" data-tab="vue">Vue</li>
</ul>

<div id="purejs" class="tab-content">

Update your `src/app.js` file to configure the library with `Amplify.configure()` and add data to your database with a mutation by using `API.graphql()`:

```javascript
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'

import awsconfig from './aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);

async function createNewTodo() {
  const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
  return await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

const MutationButton = document.getElementById('MutationEventButton');
const MutationResult = document.getElementById('MutationResult');

MutationButton.addEventListener('click', (evt) => {
  MutationResult.innerHTML = `MUTATION RESULTS:`;
  createNewTodo().then( (evt) => {
    MutationResult.innerHTML += `<p>${evt.data.createTodo.name} - ${evt.data.createTodo.description}</p>`
  })
});
```

After restarting your app using `npm start` go back to your browser and click **ADD DATA**.  You'll see that your application is now submitting events to AppSync and storing records in DynamoDB. Next, update `src/App.js` to list all the items in the database by importing `listTodos` and update the page when a query runs on app start by immediately calling the function:

```javascript
// other imports
import { listTodos } from './graphql/queries'

const QueryResult = document.getElementById('QueryResult');

async function getData() {
  QueryResult.innerHTML = `QUERY RESULTS`;
  API.graphql(graphqlOperation(listTodos)).then((evt) => {
    evt.data.listTodos.items.map((todo, i) => 
    QueryResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`
    );
  })
}

getData();
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```javascript
// other imports
import { onCreateTodo } from './graphql/subscriptions'

const SubscriptionResult = document.getElementById('SubscriptionResult');

API.graphql(graphqlOperation(onCreateTodo)).subscribe({
  next: (evt) =>{
    SubscriptionResult.innerHTML = `SUBSCRIPTION RESULTS`
    const todo = evt.value.data.onCreateTodo;
    SubscriptionResult.innerHTML += `<p>${todo.name} - ${todo.description}</p>`
  }
});
```

The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `npm start` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>
<div id="react" class="tab-content current">

Update your `src/App.js` file to configure the library with `Amplify.configure()` and add data to your database with a mutation by using `API.graphql()`:

```javascript
import React, { useEffect, useReducer } from 'react'

import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'

import config from './aws-exports'
API.configure(config)             // Configure Amplify
PubSub.configure(config);

async function createNewTodo() {
  const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
  await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

function App() {
  return (
    <div className="App">
      <button onClick={createNewTodo}>Add Todo</button>
    </div>
  );
}

export default App;
```

Next, update `src/App.js` to list all the items in the database by importing `listTodos` and then using [Hooks](https://reactjs.org/docs/hooks-intro.html) to update the page when a query runs on app start by adding initial state and a `reducer` function as well as modifying your `App` function:

```javascript
// other imports
import { listTodos } from './graphql/queries'

const initialState = {todos:[]};
const reducer = (state, action) =>{
  switch(action.type){
    case 'QUERY':
      return {...state, todos:action.todos}
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }

  return (
    <div>
    <div className="App">
      <button onClick={createNewTodo}>Add Todo</button>
    </div>
    <div>{ state.todos.map((todo, i) => <p key={todo.id}>{todo.name} : {todo.description}</p>) }</div>
  </div>
  );
}

export default App
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```javascript
// other imports
import { onCreateTodo } from './graphql/subscriptions'

useEffect(() => {
  //...other code

  const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({type:'SUBSCRIPTION', todo})
      }
  })
  return () => subscription.unsubscribe()
}, [])
```

The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `npm start` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>
<div id="react-native" class="tab-content">
Update your `App.js` file to configure the library with `Amplify.configure()` and add data to your database with a mutation by using `API.graphql()`:

```javascript
import React, { useEffect, useReducer } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import API, { graphqlOperation } from '@aws-amplify/api'
import PubSub from '@aws-amplify/pubsub';
import { createTodo } from './graphql/mutations'

import config from './aws-exports'
API.configure(config)             // Configure Amplify
PubSub.configure(config)

async function createNewTodo() {
  const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
  await API.graphql(graphqlOperation(createTodo, { input: todo }))
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={createNewTodo} title='Create Todo' />
    </View>
  );
}
```

Next, update `App.js` to list all the items in the database by importing `listTodos` and then using [Hooks](https://reactjs.org/docs/hooks-intro.html) to update the page when a query runs on app start by adding initial state and a `reducer` function as well as modifying your `App` function:

```javascript
// other imports
import { listTodos } from './src/graphql/queries'

const initialState = {todos:[]};
const reducer = (state, action) =>{
  switch(action.type){
    case 'QUERY':
      return {...state, todos:action.todos}
    case 'SUBSCRIPTION':
      return {...state, todos:[...state.todos, action.todo]}
    default:
      return state
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    const todoData = await API.graphql(graphqlOperation(listTodos))
    dispatch({type:'QUERY', todos: todoData.data.listTodos.items});
  }

  return (
    <View style={styles.container}>
      <Button onPress={createNewTodo} title='Create Todo' />
      { state.todos.map((todo, i) => <Text key={todo.id}>{todo.name} : {todo.description}</Text>) }
    </View>
  );
}
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```javascript
// other imports
import { onCreateTodo } from './src/graphql/subscriptions'

useEffect(() => {
  //...other code

  const subscription = API.graphql(graphqlOperation(onCreateTodo)).subscribe({
      next: (eventData) => {
        const todo = eventData.value.data.onCreateTodo;
        dispatch({type:'SUBSCRIPTION', todo})
      }
  })
  return () => subscription.unsubscribe()
}, [])
```

The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app and running a mutation, using dev tools (developer menu tap "Debug JS Remotely) you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.


</div>
<div id="angular" class="tab-content">

Update your `main.ts` to configure the library with `Amplify.configure()`:

```javascript
import PubSub from '@aws-amplify/pubsub';
import API from '@aws-amplify/api';
import awsconfig from './aws-exports';

API.configure(awsconfig);
PubSub.configure(awsconfig);
```

Depending on your TypeScript version you may need to rename `aws-exports.js` to `aws-exports.ts` prior to importing, or enable the `allowJs` <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank">compiler option</a> in your tsconfig. 
{: .callout .callout--info}

Update `src/tsconfig.app.json` to include the "node" compiler option in *types*:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

Note: If you are using Angular 6 or above, you may need to add the following to the top of your `src/polyfills.ts` file: 
```
(window as any).global = window;

(window as any).process = {
  env: { DEBUG: undefined },
};
```
{: .callout .callout--info}

In your `src/app/app.component.ts` file, add the following imports and modifications to your class to to add data to your database with a mutation by using the `API.service` file which was generated when you ran `amplify add api`:

```javascript
import { APIService } from './API.service';

export class AppComponent {

  constructor(private apiService: APIService) {}

  createTodo() {
    this.apiService.CreateTodo({
        name: 'Angular',
        description: 'testing'
    });
  }
}
```

Add the following to your `src/app/app.component.html` to add a button which calls your `createTodo()` method:

```html
<button (click)="createTodo()">Add Todo</button>
```

Next, update the class to list all items in the database by running a `ListTodos` query when the app starts by implementing [OnInit](https://angular.io/api/core/OnInit) and storing the items in an array:

```javascript

export class AppComponent implements OnInit {
  todos: Array<any>;

  async ngOnInit() {
    this.apiService.ListTodos().then((evt) => {
      this.todos = evt.items;
    });
  }
  //Other code....
}
```

Add the following to your `src/app/app.component.html` to display any of the todos you have added:

```html
<ul>
  <li *ngFor="let item of todos">{% raw %}{{item.name}}{% endraw %} - {% raw %}{{item.description}}{% endraw %}</li>
</ul>
```

Finally, to subscribe to realtime data, update `ngOnInit` to setup a subscription on app start and update the `todos` array when new events are received:

```javascript
import { Component, OnInit } from '@angular/core';

export class AppComponent implements OnInit {

  async ngOnInit() {
    //Other code...

    this.apiService.OnCreateTodoListener.subscribe((evt) => {
      const data = (evt as any).value.data.onCreateTodo;
      this.todos = [...this.todos, data];
    });
  }
```

The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `ng serve` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>
<div id="ionic" class="tab-content">

Update your main.ts to configure the library:

```javascript
import PubSub from '@aws-amplify/pubsub';
import API from '@aws-amplify/api';
import awsconfig from './aws-exports';

API.configure(awsconfig);
PubSub.configure(awsconfig);
```

When working with underlying `aws-js-sdk`, the "node" package should be included in *types* compiler option. update your `src/tsconfig.app.json`:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

Note: If you are using Angular 6 or above or above, you may need to add the following to the top of your `src/polyfills.ts` file: 
```
(window as any).global = window;

(window as any).process = {
  env: { DEBUG: undefined },
};
```
{: .callout .callout--info}

In your `src/app/app.component.ts` file, add the following imports and modifications to your class to to add data to your database with a mutation by using the `API.service` file which was generated when you ran `amplify add api`:

```javascript
import { APIService } from './API.service';

constructor(
    //other variables
    private apiService: APIService
  ){  
    this.initializeApp();
  } 

  createTodo() {
    this.apiService.CreateTodo({
        name: 'ionic',
        description: 'testing'
    });
  }
```

Then, replace your `src/app/app.component.html` code with a button to add data:

```html
<ion-button (click)="createTodo()">Add Data</ion-button>
```

Next, update `initializeApp()` in `src/app/app.component.ts` to list all items in the database by running a query on start and populating a local variable called `todos`:

```javascript
export class AppComponent {
  todos: Array<any>;

  initializeApp() {
    this.platform.ready().then(() => {
      //other code
      this.apiService.ListTodos().then((evt) => {
        this.todos = evt.items;
      });
    });
  }
}
```

Add the following to your `src/app/app.component.html` to display any of the todos you have added:

```html
<ion-list>
  <ion-item *ngFor="let item of todos">
    {% raw %}{{item.name}}{% endraw %} - {% raw %}{{item.description}}{% endraw %}
  </ion-item>
</ion-list>
```

Finally, to subscribe to realtime data, update `initializeApp()` to setup a subscription on app start and update the `todos` array when new events are received:

```javascript
initializeApp() {
  this.platform.ready().then(() => {
    //other code
    this.apiService.OnCreateTodoListener.subscribe((evt) => {
      const data = (evt as any).value.data.onCreateTodo;
      this.todos = [...this.todos, data];
    });
  }
}
```

The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `ng serve` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>

<div id="vue" class="tab-content">

Update your `main.js` file to configure the library with `Amplify.configure()` like so:

```javascript
import Vue from 'vue'
import App from './App.vue'

import API from '@aws-amplify/api';
import PubSub from '@aws-amplify/pubsub';
import awsconfig from './aws-exports';
API.configure(awsconfig);
PubSub.configure(awsconfig);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Next, open `App.vue` add data to your database with a mutation by using `API.graphql()`:

```html
<template>
  <div id="app">
    <button @click="createNewTodo">Add Todo</button>
  </div>
</template>

<script>
import API, {  graphqlOperation } from '@aws-amplify/api';
// eslint-disable-next-line
import { createTodo } from "./graphql/mutations";

export default {
  name: 'app',
  methods :{
    async createNewTodo(){
      const todo = { name: "Use AppSync" , description: "Realtime and Offline"}
      await API.graphql(graphqlOperation(createTodo, { input: todo }))
    }
  }
};
</script>
```

To display the data, update `App.vue` to list all the items in the database by importing `listTodos` and then using the `created()` Vue lifecycle method to update the page when a query runs on page load:

```html
<template>
  <div id="app">
    <button @click="createNewTodo">Add Todo</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {% raw %}{{todo.name}}{% endraw %} - {% raw %}{{todo.description}}{% endraw %}
      </li>
    </ul>
  </div>
</template>

<script>
// other imports
import { listTodos } from './graphql/queries'

export default {
  name: 'app',
  data(){
    return {
      todos: []
    }
  },
  methods :{
    async createNewTodo(){ /* code above */}, 
    async getData(){
      const todoData = await API.graphql(graphqlOperation(listTodos))
      this.todos.push(...this.todos, ...todoData.data.listTodos.items);
    }
  },
  created(){
    this.getData()
  }
};

</script>
```

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subscription with `API.graphql()` like so:

```html
<script>
// other imports
import { onCreateTodo } from './graphql/subscriptions'

export default {
  name: 'app',
  data(){
    return {
      todos: []
    }
  },
  methods :{
    async createNewTodo(){  /* code above */ }, 
    async getData(){  /* code above */ },
    subscribe(){
      API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: (eventData) => {
          const todo = eventData.value.data.onCreateTodo;
          this.todos.push(todo);
        }
      })
    }
  },
  created(){
    this.getData()
    this.subscribe()
  }
};
</script>
```

The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `yarn serve` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.


</div>

## Step 5. Launch your App

<div class="nav-tab launch" data-group='launch'>
<ul class="tabs">
    <li class="tab-link angular" data-tab="javascript-web">Angular</li>
    <li class="tab-link ionic" data-tab="javascript-web">Ionic</li>
    <li class="tab-link purejs" data-tab="javascript-web">Vanilla JavaScript</li>
    <li class="tab-link react current" data-tab="javascript-web">React</li>
    <li class="tab-link react-native" data-tab="react-native">React Native</li>
    <li class="tab-link vue" data-tab="javascript-web">Vue</li>
</ul>

<div id="javascript-web" class="tab-content current">

Enable static web hosting for the app on Amazon S3. In a terminal window, change to the root directory of your app and run the following command:

```bash
$ amplify add hosting
```

Run the following command to publish the app:

```bash
$ amplify publish
```

Open the app and push the button to generate new items in your database.

🎉 Congratulations! Your app is built, published, and hosted on Amazon S3 and reading/writing realtime data with AWS AppSync and Amazon DynamoDB.

</div>

<div id="react-native" class="tab-content">

Open the app and push the button to generate new items in your database.

🎉 Congratulations! Your app is built, published, and hosted on Amazon S3 and reading/writing realtime data with AWS AppSync and Amazon DynamoDB.

</div>

## Next Steps

 What next? Here are some things to add to your app:

* [Authentication](./authentication)
* [User File Storage](./storage)
* [Serverless APIs](./api)
* [Analytics](./analytics)
* [Push Notification](./push-notifications)
* [AR/VR](./xr)

**Existing AWS Resources**

If you want to use your existing AWS resources with your app you will need to **manually configure** your app with your current credentials in your code, for example:

```javascript
import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', 
        // REQUIRED - Amazon Cognito Region
        region: 'XX-XXXX-X', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'XX-XXXX-X_abcd1234',
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: 'XX-XXXX-X_abcd1234', 
    }
});
```

In the configuration above, you are required to pass in an Amazon Cognito identity pool ID so that Amplify can retrieve base credentials for a user even in an unauthenticated state. 

**Configuration Parameters for existing AWS resources**
To see the configuration parameters for existing AWS resources, see the *Existing AWS Resources* section in the Amplify Developer Guide for each individual service:
[Amazon Cognito]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication#manual-setup),
[Amazon S3]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#manual-setup),
[Amazon Pinpoint]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/analytics#manual-setup),
[Amazon API Gateway]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/api#manual-setup)
{: .callout .callout--info}

**AWS SDK Interfaces**

For working with other AWS services you can use service interface objects directly via the JavaScript SDK clients. 

To work with service interface objects, your Amazon Cognito users' [IAM role](https://docs.aws.amazon.com/cognito/latest/developerguide/iam-roles.html) must have the appropriate permissions to call the requested services.
{: .callout .callout--warning}

You can call methods on any AWS Service interface object supported by the <a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/_index.html" target="_blank">AWS JavaScript SDK</a> by passing your credentials from *Auth* to the service call constructor. For example, to use Amazon Route53 in your app:

```javascript
import Route53 from 'aws-sdk/clients/route53';

...

Auth.currentCredentials()
  .then(credentials => {
    const route53 = new Route53({
      apiVersion: '2013-04-01',
      credentials: Auth.essentialCredentials(credentials)
    });

    // more code working with route53 object
    // route53.changeResourceRecordSets();
  })
```
