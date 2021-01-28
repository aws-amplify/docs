### Model the data with GraphQL transform

Add a [GraphQL API](https://docs.aws.amazon.com/appsync/latest/devguide/designing-a-graphql-api.html) to your app and automatically provision a database by running the following command from the root of your application directory:

```bash
amplify add api
```

Accept the **default values** which are highlighted below:

```console
? Please select from one of the below mentioned services:
# GraphQL
? Provide API name:
# RestaurantAPI
? Choose the default authorization type for the API:
# API Key
? Enter a description for the API key:
# demo
? After how many days from now the API key should expire:
# 7 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API:
# No
? Do you have an annotated GraphQL schema?
# No
? Choose a schema template:
# Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now?
# Yes
```

The generated schema is for a Todo app. Replace the GraphQL schema at `amplify/backend/api/RestaurantAPI/schema.graphql` with the following:

```graphql
type Restaurant @model {
  id: ID!
  name: String!
  description: String!
  city: String!
}
```

 You'll notice a directive on the `Restaurant` type of `@model`. This directive is part of Amplify's [GraphQL transformer](~/cli/graphql-transformer/model.md) functionality.

The GraphQL Transform Library provides custom directives you can use in your schema that allow you to do things like define data models, set up authentication and authorization rules, configure serverless functions as resolvers, and more.

A type decorated with the `@model` directive will scaffold out the database table for the type (Restaurant table), the schema for CRUD (create, read, update, delete) and list operations, and the GraphQL resolvers needed to make everything work together.

From the command line, press __enter__ to accept the schema and continue to the next steps.

## Creating the API with database

Create required backend resources for your configured api with the following command:

```bash
amplify push

? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API: Y
? Choose the code generation language target: angular
? Enter the file name pattern of graphql queries, mutations and subscriptions: src/graphql/**/*.graphql
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions: Y
? Enter maximum statement depth: 2
? Enter the file name for the generated code: src/app/API.service.ts
```

### Code generation

Once the deployment is complete, the CLI will create a new directory in `src/graphql` with all of the GraphQL operations you will need for your API. The CLI also created an `API.service.ts` file in the `app` directory that we will be using shortly.

Next, run the following command to check Amplify's status:

```bash
amplify status
```

This will give us the current status of the Amplify project, including the current environment, any categories that have been created, and what state those categories are in. It should look similar to this:

```console
Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | RestaurantAPI | No Change | awscloudformation |
```

### Testing your API

You can open the AWS console to run Queries, Mutation, or Subscription against your new API at any time directly by running the following command:

```bash
amplify console api
```

When prompted, select **GraphQL**. This will open the AWS AppSync console for you to run Queries, Mutations, or Subscriptions at the server and see the changes in your client app.

## Connect frontend to API

Open `src/main.ts` and add the following code to configure the Angular project with Amplify:

```javascript
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);
```

Update `tsconfig.app.json` to include the "node" compiler option in *types*:

```json
"compilerOptions": {
    "types" : ["node"]
}
```

<amplify-callout>Depending on your TypeScript version you may need to rename `aws-exports.js` to `aws-exports.ts` prior to importing, or enable the `allowJs` <a href="https://www.typescriptlang.org/docs/handbook/compiler-options.html" target="_blank">compiler option</a> in your tsconfig.</amplify-callout>

Next, define a `Restaurant` type. Create a new file at `src/types/restaurant.ts`:

```ts
export type Restaurant = {
  id : string,
  name : string,
  description : string,
  city: string
};
```

In your `src/app/app.component.ts` file, use the following code to add data to your database with a mutation by using the `API.service` file which was generated when you ran `amplify add api`:

```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from './API.service';
import { Restaurant } from '../types/restaurant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'amplify-angular-app';
  public createForm: FormGroup;

  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'city': ['', Validators.required]
    });
  }

  public onCreate(restaurant: Restaurant) {
    this.api.CreateRestaurant(restaurant).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }
}
```

Next, enable the Angular forms modules in `src/app/app.module.ts`:

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

/* new form imports */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyUIAngularModule,
    /* configuring form modules */
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Next, add a form that will be used for creating restaurants. Add the following to your `src/app/app.component.html`:

```html
<div class="form-body">
  <form autocomplete="off" [formGroup]="createForm" (ngSubmit)="onCreate(createForm.value)">
    <div>
      <label>Name: </label>
      <input type="text" formControlName="name" autocomplete="off">
    </div>
    <div>
      <label>Description: </label>
      <input type="text" formControlName="description" autocomplete="off">
    </div>
    <div>
      <label>City: </label>
      <input type="text" formControlName="city" autocomplete="off">
    </div>
    <button type="submit">Submit</button>
  </form>
</div>
```

Next, update your `AppComponent` class so that it will list all restaurants in the database when the app starts. To do so, implement [OnInit](https://angular.io/api/core/OnInit) add a `ListRestaurants` query in `src/app/app.component.ts`. Store the query results in an array.

```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIService } from './API.service';
import { Restaurant } from '../types/restaurant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'amplify-angular-app';
  public createForm: FormGroup;

  /* declare restaurants variable */
  restaurants: Array<Restaurant>;

  constructor(private api: APIService, private fb: FormBuilder) { }

  async ngOnInit() {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'city': ['', Validators.required]
    });

    /* fetch restaurants when app loads */
    this.api.ListRestaurants().then(event => {
      this.restaurants = event.items;
    });
  }

  public onCreate(restaurant: Restaurant) {
    this.api.CreateRestaurant(restaurant).then(event => {
      console.log('item created!');
      this.createForm.reset();
    })
    .catch(e => {
      console.log('error creating restaurant...', e);
    });
  }
}
```

Add the following to your `src/app/app.component.html` to display any of the restaurants you have added:

```html
<div *ngFor="let restaurant of restaurants">
  <div>{{ restaurant.city }}</div>
  <div>{{ restaurant.name }}</div>
  <div>{{ restaurant.description }}</div>
</div>
```

Finally, to subscribe to realtime data, update `ngOnInit` in `src/app/app.component.ts`. When the app starts, this code will set up a subscription. The subscription will update the `restaurants` array when new events are received (when a new restaurant is created):

```javascript
async ngOnInit() {
  this.createForm = this.fb.group({
    'name': ['', Validators.required],
    'description': ['', Validators.required],
    'city': ['', Validators.required]
  });
  this.api.ListRestaurants().then(event => {
    this.restaurants = event.items;
  });

  /* subscribe to new restaurants being created */
  this.api.OnCreateRestaurantListener.subscribe( (event: any) => {
    const newRestaurant = event.value.data.onCreateRestaurant;
    this.restaurants = [newRestaurant, ...this.restaurants];
  });
}
```

Next, run the app:

```sh
npm start
```

Now, open the app in 2 browser windows (both at http://localhost:4200/) so that you have your app running side by side. When creating a new item in one window, you should see it come through in the other window in real-time.
