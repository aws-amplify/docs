### Model the data with GraphQL transform

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow above will ask you some questions, like if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. Later on you can always change it. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database.

[Learn more about annotating GraphQL schemas and data modeling](https://aws-amplify.github.io/docs/cli-toolchain/graphql){:target="_blank"}.

## Creating the API with database

Create required backend resources for your configured api with the following command:

```bash
$ amplify push
```

### Code generation

Since you added an API the `amplify push` process will automatically prompt for codegen (select `y` when prompted for automatic query and code generation). Choose **Angular** which will create an `API.service.ts` file in the app directory.

### Testing your API

You can open the AWS console to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```bash
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Connect frontend to API

Update your `main.ts` to configure the library with `Amplify.configure()`:

```javascript
import PubSub from '@aws-amplify/pubsub';
import API from '@aws-amplify/api';
import awsconfig from './aws-exports';

API.configure(awsconfig);
PubSub.configure(awsconfig);
```

> Depending on your TypeScript version you may need to rename `aws-exports.js` to `aws-exports.ts` prior to importing, or enable the `allowJs` <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank">compiler option</a> in your tsconfig. 
{: .callout .callout--info}

Update `src/tsconfig.app.json` to include the "node" compiler option in *types*:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

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

After restarting your app using `ng serve` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs. 