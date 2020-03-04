### Model the data with GraphQL transform

Add a GraphQL API to your app and automatically provision a database with the following command (accepting all defaults is OK):

```bash
$ amplify add api     #select GraphQL, API Key
```

The `add api` flow above will ask you some questions, like if you already have an annotated GraphQL schema. If this is your first time using the CLI select **No** and let it guide you through the default project **"Single object with fields (e.g., “Todo” with ID, name, description)"** as it will be used in the code generation examples below. Later on you can always change it. This process creates an AWS AppSync API and connects it to an Amazon DynamoDB database.

[Learn more about annotating GraphQL schemas and data modeling](https://aws-amplify.github.io/docs/cli-toolchain/graphql).

## Create GraphQL API and database

Create required backend resources for your configured api with the following command:

```bash
$ amplify push
```

### Code generation

Since you added an API the `amplify push` process will automatically prompt for codegen (select `y` when prompted for automatic query and code generation). For Ionic applications, choose **Angular** which will create an `API.service.ts` file in the app directory.

### Test your API

You can open the AWS console to run Queries, Mutation, or Subscription against you new API at any time directly by running the following command:

```bash
$ amplify console api
> GraphQL               ##Select GraphQL
```

This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Connect frontend to API

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

Note: If you are using Angular 6 or above, you may need to add the following to the top of your `src/polyfills.ts` file: 
```
(window as any).global = window;

(window as any).process = {
  env: { DEBUG: undefined },
};
```

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

> The code above imports only the API and PubSub category. To import the entire Amplify library use `import Amplify from 'aws-amplify'`. However, importing only the required categories is recommended as it will greatly reduce the final bundle size.

After restarting your app using `ng serve` go back to your browser and using dev tools you will see data being stored and retrieved in your backend from the console logs.