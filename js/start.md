---
---

# Getting Started

Build an app using the Amplify Framework which contains:

- CLI toolchain for creating and managing a serverless backend, web hosting, and codegen 
- JavaScript, iOS, and Android libraries for access to your resources using a category based programming model
- Framework-specific UI component libraries for React, React Native, Angular, Ionic and Vue.

This page guides you through setting up an initial backend and integration into your web or React Native app. **Use the drop-down menu at the top right to choose your framework**.

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

```
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
  "dependencies": {},
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
<!doctype html>
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
                <button id="AnalyticsEventButton">Generate Analytics Event</button>
                <div id="AnalyticsResult"></div>
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

Open a browser and navigate to <a href="http://localhost:8080" target="_blank">http://localhost:8080</a>. The 'Generate Analytics Event' button does not work yet. We'll work on that next.

</div>

<div id="react" class="tab-content current">

Use [Create React App](https://github.com/facebookincubator/create-react-app) to bootstrap your application.

```bash
$ npm install -g create-react-app
$ create-react-app myapp && cd myapp
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm install --save aws-amplify
$ npm start
```

To install React-specific Amplify UI components, run the following command:

```bash
$ npm install --save aws-amplify-react
```

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
$ npm install --save aws-amplify
$ expo start
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
$ npm install --save aws-amplify
$ npm start
```

In addition to *aws-amplify* core, you can install the Angular module which provides a service provider, helpers, and components:

```bash
$ npm install --save aws-amplify-angular
``` 

See the [Angular Guide](https://aws-amplify.github.io/amplify-js/media/angular_guide){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>
<div id="ionic" class="tab-content">

Use the Ionic CLI to bootstrap a new Ionic app:

```bash
$ npm install -g ionic
$ ionic start myAmplifyProject tabs --type=angular 
$ cd myAmplifyProject
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm install --save aws-amplify
$ npm start
```

In addition to `aws-amplify` core, you can install the Angular Ionic modules which provide a service provider, helpers, and components:

```bash
$ npm install --save aws-amplify-angular
``` 

See the [Ionic Guide](https://aws-amplify.github.io/amplify-js/media/ionic_guide){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>

<div id="vue" class="tab-content">

Use the Vue CLI to bootstrap a new Vue app (selecting the defaults will work for this project):

```bash
$ npm install -g @vue/cli
$ vue create myAmplifyProject 
$ cd myAmplifyProject
```

Inside the app directory, install Amplify and run your app:

```bash
$ npm install --save aws-amplify
$ npm start
```

To install Vue-specific Amplify UI components and the Amplify Vue plugin, run the following command:

```bash
$ npm install --save aws-amplify-vue
```

See the [Vue Guide](https://aws-amplify.github.io/docs/js/vue){: target='_new'} for details and usage.
{: .callout .callout--action}

</div>

## Step 2: Set Up Your Backend

In a terminal window, navigate to your project folder and run the following command (accept defaults is OK, use 'test' environment name):

```bash
$ cd ./YOUR_PROJECT_FOLDER
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

You can update a category by running `amplify update <category-name>`. If you no longer want to use a service you can delete it with `amplify remove <category-name>`. Lastly, you can remove the whole project by running `amplify delete` (Warning: This will attempt to delete everything locally and in the cloud and reset your project as if you never ran `amplify init`).
{: .callout .callout--warning}

## Step 3: Add API and Database

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow above will ask you some questions, like if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. Later on you can always change it. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database.

Create required backend resources for your configured api with the following command:

```bash
$ amplify push
```

Since you added an API the `amplify push` process will automatically enter the codegen process and prompt you for configuration. Accept the defaults which generate a file named `API.js` or `API.ts` depending if you selected the TypeScript option.


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

Add the following to the `src/app.js` file:

```javascript
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

const AnalyticsResult = document.getElementById('AnalyticsResult');
const AnalyticsEventButton = document.getElementById('AnalyticsEventButton');
let EventsSent = 0;
AnalyticsEventButton.addEventListener('click', (evt) => {
    Analytics.record('Amplify Tutorial Event')
        .then( (evt) => {
            const url = 'https://'+awsconfig.aws_mobile_analytics_app_region+'.console.aws.amazon.com/pinpoint/home/?region='+awsconfig.aws_mobile_analytics_app_region+'#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            AnalyticsResult.innerHTML = '<p>Event Submitted.</p>';
            AnalyticsResult.innerHTML += '<p>Events sent: '+(++EventsSent)+'</p>';
            AnalyticsResult.innerHTML += '<a href="'+url+'" target="_blank">View Events on the Amazon Pinpoint Console</a>';
        });
});
```

> The code above imports only the Auth and Analytics categories. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.

After restarting your app using `npm start`, go back to `localhost:8080` in your browser and click 'Generate Analytics Event'.  You'll see that your application is now submitting events to Amazon Pinpoint.

</div>
<div id="react" class="tab-content current">

Update your `scr/App.js` file to configure the library with `Amplify.configure()` and add data to your database with a mutation by using `API.graphql()`:

```javascript
import React, { useEffect, useReducer } from 'react'
import Amplify from '@aws-amplify/core'
import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'

import config from './aws-exports'
Amplify.configure(config)             // Configure Amplify

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

Now if you wish to subscribe to data, import the `onCreateTodo` subscription and create a new subscription by adding subcription with `API.graphql()` like so:

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

The code above imports only the API category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `npm start`, go back to `localhost:3000` in your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>
<div id="react-native" class="tab-content">

Change your `src/App.js` file to the following:

```javascript
import React from 'react';
import { Linking, Button, StyleSheet, Text, View } from 'react-native';
import Auth from '@aws-amplify/auth';
import Analytics from '@aws-amplify/analytics';

import awsconfig from './aws-exports';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
      this.state = {resultHtml: <Text></Text>, eventsSent: 0};
    }

    handleAnalyticsClick() {
      Analytics.record('AWS Amplify Tutorial Event')
        .then( (evt) => {
            const url = 'https://'+awsconfig.aws_project_region+'.console.aws.amazon.com/pinpoint/home/?region='+awsconfig.aws_project_region+'#/apps/'+awsconfig.aws_mobile_analytics_app_id+'/analytics/events';
            let result = (
              <View>
                <Text>Event Submitted.</Text>
                <Text>Events sent: {++this.state.eventsSent}</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(url)}>
                  View Events on the Amazon Pinpoint Console
                </Text>
              </View>
            );
            this.setState({
                'resultHtml': result
            });
        });
    };

    render() {
      return (
        <View style={styles.container}>
          <Text>Welcome to your React Native App with Amplify!</Text>
          <Button title="Generate Analytics Event" onPress={this.handleAnalyticsClick} />
          {this.state.resultHtml}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: 'blue'
  }
});
```

The code above imports only the API category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app use dev tools to see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.


</div>
<div id="angular" class="tab-content">

After creating your backend a configuration file will be generated in your configured source directory you identified in the `amplify init` command.

Import the configuration file and load it in `main.ts`: 

```javascript
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
Amplify.configure(amplify);
```

Depending on your TypeScript version you may need to rename the `aws-exports.js` to `aws-exports.ts` prior to importing it into your app, or enable the `allowJs` <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank">compiler option</a> in your tsconfig. 
{: .callout .callout--info}

When working with underlying `aws-js-sdk`, the "node" package should be included in *types* compiler option. update your `src/tsconfig.app.json`:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts`, change your code to the following:

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AmplifyAngularModule
  ],
  providers: [
    AmplifyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

This imports the Amplify Module and Service.

Note: If you are using Angular 6 or above, you may need to add the following to the top of your `src/polyfills.ts` file: ```(window as any).global = window;```.
{: .callout .callout--info}

In your `src/app/app.component.ts` file, add the following import statements:

```javascript
import { AmplifyService } from 'aws-amplify-angular';
import awsconfig from '../aws-exports';
```

To add the analytics event recorder to your app, replace your ```AppComponent``` class with the following:

```javascript
export class AppComponent {
  title = 'amplify-angular-app';
  url = 'https://console.aws.amazon.com/pinpoint/home/?region='
        + awsconfig.aws_project_region + '#/apps/'
        + awsconfig.aws_mobile_analytics_app_id + '/analytics/events';
  eventsSent = 0;
  analyticsEventSent = false;

  constructor( private amplifyService: AmplifyService ) {}

  handleAnalyticsClick() {
    this.amplifyService.analytics().record('AWS Amplify Tutorial Event')
    .then( (evt) => {
        ++this.eventsSent;
        this.analyticsEventSent = true;
    });
  }
}
```

Then, add the following to your `src/app/app.component.html` file:

```html
<button (click)="handleAnalyticsClick()">Generate Analytics Event</button>
<div *ngIf="analyticsEventSent">
  <p>Event Submitted.</p>
  <p>Events sent: {% raw %}{{ eventsSent }}{% endraw %}</p>
  <a href="{% raw %}{{ url }}{% endraw %}" target="_blank">View Events on the Amazon Pinpoint Console</a>
</div>
```

The code above imports only the API category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `npm serve`, go back to `localhost:3000` in your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>
<div id="ionic" class="tab-content">

After creating your backend, the configuration file is copied to `/amplify/#current-cloud-backend/aws-exports.js`, and the source folder you have identified in the `amplify init` command.

To import the configuration file to your Ionic app, you will need to rename `aws-exports.js` to `aws-exports.ts`. You should make sure that your `package.json` scripts also rename the file upon build, so that any configuration changes which result in the download of an `aws-exports.js` from AWS Mobile Hub get changed over to the ts extension.

```javascript	
"scripts": {	
    "start": "[ -f src/aws-exports.js ] && mv src/aws-exports.js src/aws-exports.ts || ng serve; ng serve",	
    "build": "[ -f src/aws-exports.js ] && mv src/aws-exports.js src/aws-exports.ts || ng build --prod; ng build --prod"	
}	
```

Import the configuration file and load it in your `main.ts`, which is the entry point of your Ionic application. 

```javascript
import Amplify from 'aws-amplify';
import amplify from './aws-exports';
Amplify.configure(amplify);
```

When working with underlying `aws-js-sdk`, the "node" package should be included in *types* compiler option. update your `src/tsconfig.app.json`:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

In your [app module](https://angular.io/guide/bootstrapping) `src/app/app.module.ts`, change your code to the following:

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, AmplifyAngularModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

This imports the Amplify Module and Service.

Note: If you are using Angular 6 or above or above, you may need to add the following to the top of your `src/polyfills.ts` file: ```(window as any).global = window;```.
{: .callout .callout--info}

In your `src/app/app.component.ts` file, add the following import statements:

```javascript
import { AmplifyService } from 'aws-amplify-angular';
import awsconfig from '../aws-exports';
```

To add the analytics event recorder to your app, replace your ```AppComponent``` class with the following:

```javascript
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public amplifyService: AmplifyService
  ) {
    this.amplifyService = amplifyService;
    this.initializeApp();
  }

  url = 'https://' + awsconfig.aws_project_region + '.console.aws.amazon.com/pinpoint/home/?region='
        + awsconfig.aws_project_region + '#/apps/'
        + awsconfig.aws_mobile_analytics_app_id + '/analytics/events';
  eventsSent = 0;
  analyticsEventSent = false;

  handleAnalyticsClick() {
    this.amplifyService.analytics().record('AWS Amplify Tutorial Event')
    .then( (evt) => {
        ++this.eventsSent;
        this.analyticsEventSent = true;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
```

Then, replace your `src/app/app.component.html` code with the following:

```html
<ion-button (click)="handleAnalyticsClick()">Generate Analytics Event</ion-button>
<div *ngIf="analyticsEventSent">
  <p>Event Submitted.</p>
  <p>Events sent: {% raw %}{{ eventsSent }}{% endraw %}</p>
  <a href="{{ url }}" target="_blank">View Events on the Amazon Pinpoint Console</a>
</div>
```

The code above imports only the API category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `ng serve`, go back to `localhost:3000` in your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

```terminal
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

</div>

<div id="vue" class="tab-content">

After creating your backend a configuration file will be generated in your configured source directory you identified in the `amplify init` command.

Import the configuration file and load it in `main.js`, along with the `aws-amplify` and `aws-amplify-vue` packages: 

```javascript
import Vue from 'vue'
import App from './App.vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)

Vue.use(AmplifyPlugin, AmplifyModules)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Next, open `src/components/HelloWorld.vue`.

Add the following to the `<template>` element: 

```html
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <button v-on:click="handleAnalyticsClick">Generate Analytics Event</button>
    <div v-if="analyticsEventSent">
      <p>Event Submitted.</p>
      <p>Events sent: {{ eventsSent }}</p>
      <a v-bind:href="url" target="_blank">View Events on the Amazon Pinpoint Console</a>
    </div>
  </div>
```

Add the following to the `<script>` element:

```js
import awsconfig from '../aws-exports';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      url: `https:// ${awsconfig.aws_project_region}.console.aws.amazon.com/pinpoint/home/?region=${awsconfig.aws_project_region}#/apps/${awsconfig.aws_mobile_analytics_app_id}/analytics/events`,
      eventsSent: 0,
      analyticsEventSent: false
    }
  },
  methods: {
    handleAnalyticsClick: function() {
      this.$Amplify.Analytics.record('AWS Amplify Tutorial Event')
      .then(() => {
          ++this.eventsSent;
          this.analyticsEventSent = true;
      });
    }
  }
}
```

The code above imports only the API category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.
{: .callout .callout--info}

After restarting your app using `npm run serve`, go back to `localhost:3000` in your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. At any time you can open the AWS console for your new API directly by running the following command:

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
    <li class="tab-link purejs" data-tab="purejs">Vanilla JavaScript</li>
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
