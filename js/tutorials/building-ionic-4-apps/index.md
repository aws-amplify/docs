---
---

Building a 'Todo List' mobile app with AWS Amplify and Ionic 4
===========

Overview
--------

In this tutorial, you will create an Ionic 4 ‘Todo List’ app that connects to a serverless backend via the Amplify Framework.

The Amplify Framwework and the Amplify CLI enable frontend developers to build apps quickly with a simplified workflow to provision and integrate backend resources.  In this tutorial, you will learn how to create a cloud-enabled web app from the scratch with Ionic and AWS Amplify.

**By completing this tutorial, you will be able to:**
- Bootstrap an Ionic 4 app with Ionic CLI, and customize the starter app 
- Install and configure the Amplify Framework in your app
- Create and manage your app's backend with the Amplify CLI
- Integrate authentication to your app
- Create and deploy a GraphQL backend for your app and use it in your app

**The final app:**

By the end of the tutorial, you will have an Ionic 4 app with which will have features such as user authentication (sign-in and sign-out) with Amazon Cognito, tracking in-app analytics with Amazon Pinpoint and storing application data to a serverless GraphQL backend with AWS AppSync.

![](images/app-todo-final-home.png){: class="screencap" style="max-height:500px;"}

## {{site.data.concepts.prerequisites_js.header}}

{{site.data.concepts.prerequisites_js.html}}

## Source Code

You can directly copy and paste code snippets from the tutorial as you are following the steps. Alternatively, if you would like to get right to the source code for the final version of the tutorial's code, please visit the [Github Repo](https://github.com/mbahar/amplify-ionic-tutorial).  

## Content

Here is the sequence of the tutorial:
- [Getting Ready: Install and Configure Amplify CLI](#install-and-configure-aws-amplify)
- [Part 1: Creating the App](#part-1-create-an-ionic-4-app)
- [Part 2: Adding Cloud Features](#part-2-working-with-aws-mobile-cli)
- [Part 3: Enabling GraphQL Backend](#part-3-adding-authentication)

## Install Amplify CLI

Amplify CLI is the command line tool that you will use to create and manage the backend for your Ionic app. Through the tutorial, you will use Amplify CLI or simplifying many operations when building your app. The CLI enables you to provision and configure you app's backend quickly, without leaving the command line!

**Installing and Configuration the CLI:**

To use Amplify CLI with your project, you need to install it your local machine and configure it with your AWS credentials. Configuration is a one-time effort; once you configure the CLI you can work on multiple project on your local machine. Since the CLI will create backend resources for you, it needs to utilize an AWS account with appropriate IAM permissions. During the configuration step, a new IAM role will be automatically created on your AWS account.  

To install and configure Amplify CLI, run the following commands:
```bash
$ npm install -g @aws-amplify/cli
$ npm amplify configure
```

**Amplify CLI and AWS Console**

The backend resources that will be created by the CLI will also be available to you through the AWS Console, e.g.: you can access your Amazon Cognito User Pool on the AWS Console when new users register on your app. Nevertheless, for the purposes of this tutorial, you won't need to visit AWS Console.

To learn about Amplify CLI, visit the [CLI developer documentation](../cli/init){: target='_new'}.
{:.callout .callout--info}

# Part 1: Create an Ionic 4 App

This section will introduce Ionic basics, and you will learn how to bootstrap a new Ionic app with the Ionic CLI. In subsequent parts of the tutorial, you will add cloud functionality to your application.

The source code for this section of the tutorial can be found in *tutorial-part-1* branch of the [project Github repo](https://github.com/aws-samples/aws-amplify-ionic-sample/tree/tutorial-part-1).
{: .callout}

## What is Ionic?

Ionic is a web development framework that allows developers to create cross-platform applications that run on mobile platforms such as iOS and Android, on the desktop using Electron.js, or in the browser as a progressive web app. Ionic applications have the ‘look-and-feel’ of native apps and also offer the ability (via Apache Cordova plugins) to access mobile OS features such as cameras, contact lists, etc.

Apache Cordova is an open source mobile development platform that runs web code (HTML, CSS, and JavaScript) in a WebView wrapped in a mobile app shell.  Since it is native code, it can be distributed on the app stores just like any other mobile app and presented as an app on mobile platforms.

## Install the Ionic CLI and Create the Base Project

The easiest way to create an Ionic 4 application is with the Ionic Command Line Interface (CLI). To install the Ionic CLI, run the following command in your terminal:

```bash
$ npm install -g ionic cordova
```

After installation, go to a location where you wish to start your new project and execute the following command to create a new Ionic app that uses a tabbed navigation template:

```bash
$ ionic start fancy-todos tabs --type=angular
```
Ionic CLI will prompt some questions for you:

```bash
? Integrate your new app with Cordova to target native iOS and Android?
? Install the free Ionic Pro SDK and connect your app?  
```

If you want your application to run as an iOS or Android app as well as a browser-based one, select ‘y’ when asked for Cordova integration. You will then prompted for Ionic Pro SDK; you can select ‘y’ if you wish, but it is not necessary for this tutorial.

To be sure that you're using the correct version of Ionic, navigate into the project directory and execute 'ionic info'. The Ionic Framework value should be greater than 4.
{: .callout}

## Install Amplify Framework Libraries

Now, you have a new Ionic project called *fancy-todos*! You can switch to your project's root folder and install required Amplify Framework libraries.

```bash
$ cd fancy-todos 
```

Amplify Framework provides npm packages for installation. *aws-amplify* is the core package and *aws-amplify-angular* include UI components and Angular service that you can use with Ionic app. 

Run the following commands to install required packages:
```bash
$ npm install aws-amplify
$ npm install aws-amplify-angular
```

Note that we have installed required packages in this step but we have not configured and backend services. 

## Working with Ionic

Before start working with Ionic, lets take a step back and explain our app building strategy;  we will first build a fully working Ionic app (with local/mock data) and later we will connect it to the cloud. This strategy will help you better understand the building blocks of an Ionic app how we can quickly enable cloud features with Amplify for new or existing applications.

**Angular Components:**

Previous versions of Ionic made use of the Angular framework, and Ionic 4 is no exception. Angular provides a component-based architecture in which the application consists of *components*, and *components* are executed in the context of a *module*.

Each component typically consists of an HTML template, a module file, a component file, an SCSS (SASS stylesheet) file and a .spec file that includes tests. This file organization encourages developers to write code that is easy to understand, extend, and debug.

As an example, when we will build our HomeTab module - that will also host our auth feature - the associated folder structure will be like this:
```
/src
  /app
    /HomeTab
      - homeTab.module.ts
      - homeTab.page.html
      - homeTab.page.scss
      - homeTab.page.ts
```

Remember that you have created a ‘tabs’ starter app with Ionic CLI. So, each of our tabs will be a separate module, which in turn consists of one component each. Just check your *src/app/* folder to see what other modules are created by the Ionic CLI.

**Why do you need modules?**

Modules provide a nice abstraction for the different parts of your code, and they help you to organize your code as your application grows bigger. Through this tutorial, what you will create the following building blocks for your Ionic app:
- **HomeTab** module where we will render Amplify Auth UI
- **ListTab** module where our Todos will be listed  
- **ListItemModal** component which will provide the UI for creating/editing todo items  

**Testing your Ionic App**

You can test your Ionic app in a browser by running:
```
$ ionic serve
```

When you run your app at this stage, you will see the default view of the starter app:

![](images/ionic-starter-app.png){: class="screencap" style="max-height:500px;"}

Our goal is to customize the start app's tabs, so that first tab (Home Page) will be the login screen and the second tab (Todo List) will include the list of todo items. You will be basically creating your components and replacing your components on tabs.

## Code Utilities 

Before moving on to building our modules, let's create some pieces of code that you will help us a lot in our app.

### Define the Data Model

It is always a good idea to define our data model before start working with data. In our case, the main data structures are *ToDoItem* which consists of a an ID, a title, a description, and a status. Also, *ToDoList* is the collection *ToDoItem*s. 

We will use class definitions to structure our data. Create a new directory *src/app/classes*, and then copy the following code into a new file *src/app/classes/item.class.ts*. The class code will define the model for the ToDo list item.

src/app/classes/item.class.ts
```javascript
import { v4 as uuid } from 'uuid';

export class ToDoList {
  userId: any;
  items: Array<ToDoItem>

  constructor(params){
    this.items = params.items || [];
    this.userId = params.userId;
  }
}

export class ToDoItem {
  id: string;
  title: string;
  description: string;
  status: any;

  constructor(params){
    this.id = uuid();
    this.title = params.title;
    this.description = params.description;
    this.status = 'new';
  }
}
```

### A Helper for the Auth State

Another helpful piece of code in your app would be a class (or 'service' in Angular terminology) that returns the current user authentication state. You can use this service to control what authenticated or authenticated users can do in your application. For example, in our Todo app, all unauthenticated users will be able to access to *Home Tab*, but only authenticated users will be able to access the *Todo List* tab. 

You can provide this logic in your app in many different ways, but with Ionic, you can use *Events* service for subscribing to authentication status changes. Also, this requires the module who is responsible for the auth - this is HomeTab module - will publish *data:AuthState* messages in the first place.

Create the file  *src/app/services/auth-route-guard.ts* with the following code:

```javascript
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Events } from '@ionic/angular'

@Injectable()
export class AuthGuardService implements CanActivate {

  signedIn: boolean = true;

  constructor(public router: Router, public events: Events) {
    this.events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn){
        this.signedIn = true;
      } else {
        this.signedIn =false
      }
    })
  }

  canActivate() {
    return this.signedIn;
  }
}
```

In order to use *AuthGuardService* in another module, you need to import it explicitly. For example, in our app, we want to disable 'Todo List' tab for unauthenticated users. To enable this, perform the following two modification in  *src/app/tabs/tabs.module.ts* file:

  1 - Import `AuthGuardService`:
  ```javascript
    // 1 - Importing AuthGuardService
    import { AuthGuardService } from '../../services/auth-route-guard';
    //
  ```

  2 - Add *AuthGuardService* as a provider in module definition:
  ```javascript

  @NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      TabsPageRoutingModule
    ],
    declarations: [TabsPage],
    providers: [AuthGuardService] // Add this line

  })
```

Now, *AuthGuardService* is available in Tabs module, we will later use the service to disable 'Todo List' tab in unauthenticated state. You’ll notice that  *AuthGuardService*'s `signedIn` property always returns *true* for now. Don't worry, we will address this later by integrating cloud based authentication with Amplify.

### Add Global Shim

Angular 6 has removed a shim for the global object used by many NPM modules, including some dependencies for Amplify. To accommodate for this change, add the following to your application's <HEAD> tag in *src/index.html*:

```html
<script>
    if (global === undefined) {
        var global = window;
    }
</script>
```

##  Create your Modules

In this section, you will create the modules that you will use in your Ionic app. 

### Create HomePage Module

*HomePage* is the first module that you will create for our Ionic app. You will use this module to display a sign-in/sign-up form form the user in the 'Home Page' tab. In Part 2, you will replace the mock functionality we will build here, with Amplify Framework's UI component for auth to build up the actual user interface.

Remember that each module has its own folder structure. So let's start by creating the new folder *src/app/homeTab*, and create a module definition file  *src/app/homeTab/homeTab.page.ts* with the following code:

```javascript
import { Component, AfterContentInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AuthGuardService } from '../../services/auth-route-guard'

@Component({
  selector: 'app-page-home',
  templateUrl: 'homeTab.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterContentInit{

  authState: any;
  // including AuthGuardService here so that it's available to listen to auth events
  authService: AuthGuardService

  constructor(public events: Events, public guard: AuthGuardService) {
    this.authState = {loggedIn: false};
    this.authService = guard;
  }

  ngAfterContentInit(){
    this.events.publish('data:AuthState', this.authState)
  }

  login() {
    this.authState.loggedIn = true;
    this.events.publish('data:AuthState', this.authState)
  }

  logout() {
    this.authState.loggedIn = false;
    this.events.publish('data:AuthState', this.authState)
  }

}
```

Note that our *HomePage* component has authentication methods, but those methods do not yet provide a real authentication functionality, they just set the authentication state *true* or *false*. In Part 2, we will replace them with Amplify Framework's high-level APIs for auth.

#### Create the Home Page View

Our Home Page will display a sign-in/sign-out form. In the final app the auth UI will be generated by Amplify UI components, but for now, let's add some buttons to the Home Page view, so we can test the auth states on our apps. 

Create the view file *src/app/homeTab/homeTab.page.html* with the following code:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Login</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content padding>
  <ion-button (click)="login()">Login!</ion-button>
  <ion-button (click)="logout()">Logout!</ion-button>
  Logged In? {{authState.loggedIn}}
</ion-content>
```

The page will include two action buttons that will help us test the auth states.

#### Customize Tab Navigation

Now, you need to add the tab buttons 'Home Page' and 'Todo List' to the tabbed navigation, so we can navigate our custom pages. 

Replace the content of the page *src/app/tabs/tabs.page.html* with the following markup:
```html
<ion-tabs>
  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home">
      <ion-icon name="home"></ion-icon>
      <ion-label>Home Page</ion-label>
    </ion-tab-button>
    <ion-tab-button tab="list">
      <ion-icon name="send"></ion-icon>
      <ion-label>Todo List</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>
```

Note that, despite we did not created the *listTab* module yet, we provide the navigation to this module with this change. The 'Todo List' tab will not be active until we created the *listTab* module and update tab routes for this module.

#### Update Tab Routes

To display our HomePage content in the 'Home' tab, we need to update the route configuration in the *Tabs* module.

Apply the following two modifications to *src/app/tabs/tabs.router.module* file:

  1-  Import *AuthGuardService*, so we can use our custom auth logic when working with tabs(like disabling a tab when the user is not signed-in):
  ```javascript
  //...
  import { AuthGuardService } from '../services/auth-route-guard';
  //...
  ```
  2- Add a route definition for '/home':
  ```javascript
  //...
  const routes: Routes = [
    {
      path: 'tabs',
      component: TabsPage,
      children: [
        {
          path: 'home',
          children: [
            {
              path: '',
              loadChildren: '../homeTab/homeTab.module#HomeTabModule'
            }
          ]
        },
        {
  //...
  ```

Now, your app will display your new *HomeTab* module when you click *Home Page* tab. Run you app to see how it works;

```bash
$ ionic serve 
```

### ListPage Module

We will now create the *ListTab* module the same way we have created *HomeTab* module in the previous section. *ListTab* module will render the Todo List for the user. The module will also allow users to create or edit individual Todo items through a modal UI. The user will be able to delete items and mark items as complete.

Remember that each module has its own folder structure. 
So, let's start a new directory *src/app/listTab* for our module.

#### Create the ListPage component

To define the component, create a new file *src/app/listTab/listTab.page.ts*. This file will define the functionality of the our listing page.

```javascript
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
// We will un-comment this when ListItemModal is ready 
// import { ListItemModal } from './list.item.modal';
import { ToDoItem, ToDoList } from '../../classes/item.class';

@Component({
  selector: 'app-list-page',
  templateUrl: 'listTab.page.html',
  styleUrls: ['listTab.page.scss']
})
export class ListPage implements OnInit {

  modal: any;
  data: any;
  user: any;
  itemList: ToDoList;
  signedIn: boolean;

  constructor(
    public modalController: ModalController,
    events: Events

  ) {

    // Listen for changes to the AuthState in order to change item list appropriately
    events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn){
        this.getItems();
      } else {
        this.itemList.items = [];
      }
    })
  }

  async ngOnInit(){
    this.getItems();
  }

  async modify(item, i) {
    let props = {
      itemList: this.itemList,
      /*
        We pass in an item parameter only when the user clicks on an existing item
        and therefore populate an editItem value so that our modal knows this is an edit operation.
      */
      editItem: item || undefined
    };

    // Create the modal
    this.modal = await this.modalController.create({
      // We will un-comment this when ListItemModal is ready
      // component: ListItemModal,
      componentProps: props
    });
    // Listen for the modal to be closed...
    this.modal.onDidDismiss
    .then((result) => {
      if (result.data.newItem){
        // ...and add a new item if modal passes back newItem
        result.data.itemList.items.push(result.data.newItem)
      } else if (result.data.editItem){
        // ...or splice the items array if the modal passes back editItem
        result.data.itemList.items[i] = result.data.editItem
      }
      this.save(result.data.itemList);
    })
    return this.modal.present()
  }

  delete(i){
    this.itemList.items.splice(i, 1);
    // this.save(this.itemList);
  }

  complete(i){
    this.itemList.items[i].status = "complete";
    // this.save(this.itemList);
  }

  save(list){
    // Use AWS Amplify to save the list...
    // this.itemList = list;
  }

  getItems(){
    this.itemList = {
      userId: 1,
      items: [
        new ToDoItem({
          id: '1',
          title: 'Test item 1',
          description: 'my test item',
          status: 'complete'
        }),
        new ToDoItem({
          id: '2',
          title: 'Test item 2',
          description: 'my other test item',
          status: 'pending'
        }),
        new ToDoItem({
          id: '3',
          title: 'Test item 3',
          description: 'my other test item',
          status: 'pending'
        })
      ]
    }
  }
}
```

You may notice that we are using dummy data to populate our Todo list. In Part 3, we will switch it with real backend data using an AWS AppSync query.

#### Create the ListPage View

The ListPage component will list the todo items, so you need an HTML view for rendering the those items. 
Create the file */src/app/listTab/listTab.page.html* with the following HTML markup:

```html
<ion-header>
  <ion-toolbar>
    <ion-title *ngIf="user">User</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="modify(null)">Add Item</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content *ngIf="itemList">
    <ion-card *ngFor="let item of itemList.items; index as i">
      <ion-card-title class="hover card-title" (click)="modify(item)">{{item.title}}</ion-card-title>
      <ion-card-content>{{item.description}}</ion-card-content>
        <ion-buttons slot="end">
          <ion-button (click)="delete(item)">
              <ion-icon name="trash" size="small"></ion-icon>Delete</ion-button>
          <ion-button (click)="complete(item)">
              <ion-icon name="checkmark-circle"  size="small" [ngClass]="{'complete': item.status=='complete'}"></ion-icon>Mark Complete
          </ion-button>
        </ion-buttons>
    </ion-card>
</ion-content>
```

**List Component styling**

You can also customize the styling of the component by editing the styles in *src/app/listTab/listTab.page.scss* file. Add following styles to the file:

```css
.hover {
  cursor: pointer;
}
.complete {
  color: green;
}
.card-title {
  margin: 12px 0 0 12px !important;
}
```

#### Create a module definition

A module definition exposes your components to the rest of the application. 
To create a module definition, create a new file *src/app/listTab/listTab.module.ts* with the following content:

```javascript
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListTab } from './listTab.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ListTab }])
  ],
  declarations: [ListTab],
  entryComponents: [ ListTab ]
})

export class ListTabModule {}
```

#### Enable Routes for ListTabModule

Remember that we have updated the tabbed navigation by editing the file */app/tabs/tabs.page.html*, but we did not defined any route configurations yet. Unless we do it, our modules's content will not be displayed when the user clicks to a tab.

**How tab routing works?**

Clicking to the 'Todo List' tab button will change your app's route to 'tabs/list'. So, you need to handle the route change, and let your module be rendered as the tab content. 

In a tabbed Ionic app, page routing is handled by *tabs router module* with the route definitions in the *src/app/tabs/tabs.router.module* file.

Add your route definition in *src/app/tabs/tabs.router.module* file as follows:

```javascript
//...
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../homeTab/homeTab.module#HomeTabModule'
          }
        ]
      },
      // Add this part
      { 
        path: 'list',
        canActivate: [AuthGuardService],
        children: [
          {
            path: '',
            loadChildren: '../listTab/listTab.module#ListTabModule'
          }
        ]
      },
//...
//...
```

This modification will handle the 'tabs/list' route and will load your will load your *ListTab* module on route change.

### Run and test your app

Now you are ready to test your app! Execute one of the following commands from your project root, and you should see your app with the ‘Home Page’ tab visible in the footer.

To run your app in web browser :

```bash
$ ionic serve
```

To run your app in iOS simulator:

```bash
$ ionic cordova run ios -l
```

Note:  If you attempt to run your app in the iOS emulator but only see a blank screen, try running:

```bash
$ ionic cordova plugin rm cordova-plugin-ionic-webview
$ ionic cordova plugin add cordova-plugin-ionic-webview@2.0.0-beta.1
```

You will see that our buttons on the home page simulates login and logout functionality, and the auth state is update across the app respectively. 

![](images/mock-app-home-page.png){: class="screencap" style="max-height:500px; float:none;"}

Note that 'Todo List' tab is only displayed when the user is logged in. This is intentional, because in *app/tabs/tabs.router.module.ts*, we have set `canActivate` property with *AuthGuardService*, the service responsible for sharing the auth state across the app.  

![](images/mock-app-list-page.png){: class="screencap" style="max-height:500px; float:none;"}

Since you have not a cloud backend enabled yet, your app only lists items that are loaded statically in *ListTab* module with `getItems()` method. In the following steps, we will switch this method to work with AWS AppSync.

### Adding a Modal to Create Tasks 

We have one more missing functionality in order to complete our app's UI; we need a user interface to create Todo items.

#### Create a Modal

To create a modal, you need to implement a component and a view for this component. Since the modal will be related to ListTab, you can create the modal as a new component in the ListTab module. This will help keep things organized...

First, create the file *src/app/listTab/listTab.item.modal.ts* with the following code:

```javascript
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToDoItem, ToDoList } from '../classes/item.class';

@Component({
  selector: 'item-modal',
  templateUrl: 'list.item.modal.html',
})
export class ListItemModal implements OnInit {

  itemList: ToDoList;
  editItem: ToDoItem;
  user: string;
  item: ToDoItem;

  constructor(private modalController: ModalController) {}

  ngOnInit(){
    /*
      If you pass in an 'editItem' property, then you create a copy to store changes to the existing item
      so that the original is not modified unless the user saves.
    */
    this.item = this.editItem ? Object.assign({}, this.editItem) : new ToDoItem({})
  }

  save() {
    this.modalController.dismiss({
      itemList: this.itemList,
      /*
        You pass back either a newItem or editItem value depending on whether an edit operation is taking place
        so that the list module can decide whether to insert into the items array or splice into it.
      */
      newItem: !this.editItem ? this.item : null,
      editItem: this.editItem ? this.item : null
    });
  };

  cancel(){
    this.modalController.dismiss({itemList: this.itemList})
  }
}
```

And then create the view file for the modal *src/app/listTab/listTab.item.modal.html*:

```html
<ion-header>
    <ion-toolbar>
      <ion-title>Edit Item</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list lines="true">
      <ion-item>
        <ion-label color="primary">ToDo Title </ion-label>
        <ion-input placeholder="title" [(ngModel)]="item.title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label color="primary">ToDo Description </ion-label>
        <ion-input placeholder="description" [(ngModel)]="item.description"></ion-input>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer>
    <ion-button class="save-btn" (click)="save()">Save</ion-button>
    <ion-button class="dismiss-btn" (click)="cancel()">Cancel</ion-button>
  </ion-footer>
```

#### Define modal in your list module

To use your modal in ListTab module (remember, the modal will open when the user clicks 'Add Item' button in the ListTab), 
add following code to *src/app/listTab/listTab.module.ts*:

Import ListItemModal:
```javascript
//..
import { ListItemModal } from './listTab.item.modal';
//..
```

Also, add `ListItemModal` in *declarations* and *entryComponents*:

```js
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ListTab }])
  ],
  declarations: [ListTab, ListItemModal],
  entryComponents: [ ListTab, ListItemModal ]
})

```

####  Import the modal in your list page

To use your new modal in your list component, you also need to import the modal into your component in *src/app/listTab/listTab.page.ts* file.
Just uncomment the lines marked as:
```js
// We will un-comment this when ListItemModal is ready
import { ListItemModal } from './list.item.modal';

// We will un-comment this when ListItemModal is ready
component: ListItemModal,
```

This will enable our model to be opened from our ListTab page. Remember that we have an 'Add Item' button the listTab page for this purpose.

####  Test the Modal 

Now, run the app and check out the List page (as a logged-in user). The app's data will not be persistent, but you can test the UI.

![](images/mock-app-create-page.png){: class="screencap" style="max-height:500px; float:none;"}

Congratulations! You have created and Ionic app with basic functionality. In Part 2, you will start implementing cloud features for your app.

# Part 2: Adding Cloud Features

In this section, you will cloud enable your Ionic app using the Amplify CLI. The Amplify CLI is a command line tool that enables you to provision AWS resources and connect them to your application quickly.

## Initialize Your Backend

To start working with Amplify CLI for your Ionic app, run the following command in your project's root folder:
```bash
$ amplify init  
```

The CLI guides you through some options for your project. Select 'Ionic' as your framework:
```console
  Please tell us about your project
  ? What javascript framework are you using
    react
    react-native
    angular
  ❯ ionic
    vue
    none
```

When the CLI successfully configures your backend, your backend configuration will be saved to '/amplify' folder. You don't need to manually edit the content of this folder as it is maintained automatically by the CLI.

## Adding Analytics

Let's add our first backend feature to our app, and this will be Analytics. Note that, adding analytics won't change the user experience in your app, but it will provide valuable metrics that you can track with Amazon Pinpoint dashboard.  

While enabling analytics, you will learn how to use Amplify CLI and configure your app to work with Amplify Framework. Generally speaking, when you deploy your backend with *amplify push* command, here is what happening under the hood:

1 - The CLI creates and provisions related resources on your account
2 - The CLI updates your '/amplify' folder, which has all the relevant information about your backend on AWS
2 - The CLI updates the configuration file `aws-exports.js` with latest resource credentials

As a front-end developer, you only need to import the auto generated *aws-exports.js* configuration file in your Ionic app, and configure your app with *Amplify.configure()* method call.

To add analytics to your application, simply run the following commands:

```bash
$ amplify add analytics
$ amplify push
```

### Working with The Configuration File 

After successfully executing the *push* command, the CLI creates your configuration file *aws-exports.js* in your '/src' folder. The next step is to import `aws-exports.js` configuration file into your app.

Note that the file extension for the Amplify configuration file is '.js'. Since we are using TypeScript in our Ionic app, you need to change the name of the aws-exports file to *aws-exports.ts*, so you can import it. This could be a bit tricky while you are adding new cloud features; you need to rename the latest version of *aws-exports.js* every time your backend is updated. Consider using a task-runner that will make this operation for you.
{: .callout .callout--info}

To configure your app, open *src/main.ts* and make the following changes in code:

```javascript
import Amplify, { Analytics } from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```

### Monitoring App Analytics

Refresh you application a couple of times and then you will be receiving usage metric in Amazon Pinpoint console. That’s it! No additional code is needed. Your application will now collect and send a default set of analytics data to Amazon Pinpoint, and you can add your custom tracking metrics as needed.

![](images/app-analytics-console.png){: class="screencap" style="max-height:500px;"}

Since your application doesn’t have much functionality at the moment, only 'session start' events are tracked. As you add more functionality to your app like authorization and storage, AWS Amplify will automatically report related analytics events to Amazon Pinpoint for you, so you will know how your users are interaction with your app.

## Adding Authentication

Now that you know how to utilize Amplify CLI to enable backend services, you can add new features to your Ionic app easily.

User authentication will be the next feature you will adding to your app. Our *HomeTab* module has login/logout buttons to control the auth state. Now, you will replace them with a secure and scalable auth experience. Doing that will be very easy with Amplif Authentication category and ready-to-use UI components. 

If you have been following the tutorial from the start, and enabled Analytics in the previous step, *auth* is already enabled for your app (Analytics needs secure credentials for reporting metrics). In this case, you just need to run *update auth* command to create a User Pool that will store your registered users:
```bash
$ amplify update auth
$ amplify push
```

If you have not enabled Analytics before, you will be using auth features for the first time.
Run the following command:

```bash
$ amplify add auth
$ amplify push
```

AWS Amplify's Authentication category works with Amazon Cognito, a cloud-based authentication and federation service that enables you to manage user access to your applications. 
{:.callout .callout--info}

### Enable UI Components for Auth

One of the best parts of working with Amplify Framework is you don't need to implement common features - like like user authentication - from the scratch. Amplify provides UI components that you can re-use in your app with just a few lines of code. 

Note that UI components are bundled in *aws-amplify-angular* package, and the package should be installed beforehand.
{:.callout .callout--info}

Now, let's place the auth UI components in our home page. To do that, you need to import related modules in your *HomeTab* module.

Make the following changes in file *src/app/homeTab/homeTab.module.ts*:

  1- Import UI components:
  ```js
  //..
  // add necessary UI components and services 
  import { AmplifyAngularModule, AmplifyIonicModule, AmplifyService } from 'aws-amplify-angular'
  //...
  ```

  2- Add *AmplifyService* provider in your Module definition:
  ```js
  @NgModule({
    imports: [
      IonicModule,
      CommonModule,
      FormsModule,
      AmplifyAngularModule,
      AmplifyIonicModule,
      RouterModule.forChild([{ path: '', component: HomePage }])
    ],
    declarations: [HomePage],
    providers: [AmplifyService] // Add this line
    //
  })
  export class HomePageModule {}
  ```

This configuration enables your *HomeTab* module to use Amplify UI components.

### Rendering the Auth UI

Now, you can use Amplify UI components in your views. UI components render a pre-built sign-in and sign-out UI for your app with full fledged auth functionality like user registration, password reminders and Multi-factor Authentication.

Previously, we have placed authentication buttons on the home page that simulates the auth states. To replace these buttons with the actual auth inputs, 
open *src/app/homeTab/homeTab.page.html* and replace the content with the following markup:

```html
<ion-header>
  <ion-toolbar>
    <ion-title>Login</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content padding>
    <amplify-authenticator framework="ionic"></amplify-authenticator>
</ion-content>
```

The `amplify-authenticator` directive renders UI elements for auth. Now, refresh your app and visit Home tab, you will see a login form that also provide sign-up options.

### Enable UI Styling

To change the look and feel of your UI components, you can update *src/global.scss* file which includes global style rules for your app. For now, import default styles from *aws-amplify-angular* module to make sure that your authenticator component (and other AWS Amplify UI components) are styled properly with the Amplify default theme:

Add the following import statement in *src/global.scss*:
```javascript
@import '../node_modules/aws-amplify-angular/theme.css'; 
```

### Updating Auth State 

Do you also remember that we have modules that are listening to *data:AuthState* events? *HomePage* component will be the place where we originate *data:AuthState* messages. It will work as follows:

1. When the auth state changes - via Amplify auth module - , HomePage* will capture the change event and broadcast a new custom event *data:AuthState* 
2. The other modules who listens to this *data:AuthState* event will update their states accordingly
3. Since *AuthGuardService* is the state machine for all the modules we build, we will able to take necessary actions in the UI

*Capturing auth state changes:*

*amplifyService* provides a subscription to track auth state changes. What we need to do is the subscribe to this service and get notified every time an auth event happens; such as sign-in and sign-out. 

Replace the content of module *app/homeTab/homeTab.page.ts* with the following code: 

```js

import { Component, AfterContentInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { AuthGuardService } from '../../services/auth-route-guard'
import { AmplifyService }  from 'aws-amplify-angular';


@Component({
  selector: 'app-page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements AfterContentInit{

  authState: any;
  // including AuthGuardService here so that it's available to listen to auth events
  authService: AuthGuardService
  amplifyService: AmplifyService

  constructor(
    public events: Events,
    public guard: AuthGuardService,
    public amplify: AmplifyService
  ) {
    this.authState = {loggedIn: false};
    this.authService = guard;
    this.amplifyService = amplify;
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.authState.loggedIn = authState.state === 'signedIn';
      this.events.publish('data:AuthState', this.authState)
    });
  }

  ngAfterContentInit(){
    this.events.publish('data:AuthState', this.authState)
  }
}

```

Since the code that listens *data:AuthState* events are already included in our modules, this update will integrate our app's auth states with Amplify auth feature. Now you can test and see that 'Todo List' tab is only accessible when the user is logged in.

## Run and Test Your Auth Flow

Now run the *serve* command to test your app in a browser.
```bash
ionic serve
```
Or, run your app in iOS emulator:
```bash
ionic cordova run ios -l
```

Once your application loads, click on the ‘Home’ tab, and you should see login/signup controls that use ionic-specific buttons and input fields.

![](images/app-login-page.png){: class="screencap" style="max-height:500px;"}

Your app now authenticates users with Amazon Cognito, allowing you to control access to data and to access information about the user. Your users should now be able to sign-up and subsequently sign-in.

**Where are the registered users stored?**

When a new user registers through the auth UI component, it will be stored in your Cognito User Pool. You can visit your Amazon Cognito console and see the list of registered users be selecting you User Pool.

![](images/app-register-page.png){: class="screencap" style="max-height:500px;"}

**Disabling Multi-factor Authentication**

As you may noticed, Multi-factor Authentication is enabled by default for you auth flow, which requires users to validate their phone number with an SMS message. You can change this by configuring your [Amazon Cognito User Pool](https://console.aws.amazon.com/cognito/home) settings.

Please note that the phone numbers should be entered in the format of
"+<country-code><area-code><phone-number>".

**Disabling Ionic UI**

`<amplify-authenticator>` component enables rendering Ionic UI components when used with *framework="ionic"* attribute. You can disable this by removing *framework="ionic"* attribute in *src/app/pages/home/homeTab.page.html*:

```html
<amplify-authenticator></amplify-authenticator>
```

After the application reloads, the login controls will have the simpler Angular look-and-feel, instead of Ionic UI:

If you don’t want to use the Ionic versions of AWS Amplify's UI components, you do not need to import the *AmplifyIonicModule*.
{: .callout .callout--info}

# Part 3: Enabling GraphQL Backend 

So far, your Todo app has the auth feature that is powered by a user registry on the cloud (Cognito User Pools), but the Todo list is not stored on the cloud yet. In this part, you will integrate your app with a GraphQL API (powered by AWS AppSync) that will store your Todo list on a NoSQL database (Amazon DynamoDB).

The Amplify CLI will help you when creating the backend and you will do it quickly without leaving the command line. First, you need to create a GraphQL backend.  

## Create a GraphQL API

In the root folder of your app, run the following command:

```bash
$ amplify add api
```

and, select *GraphQL* as the service type:

```console
? Please select from one of the below mentioned services (Use arrow keys)
❯ GraphQL
  REST
```

API category supports GraphQL and REST endpoints. For this tutorial we will create our backend data on GraphQL, which uses AWS AppSync under the hood.
{: .callout .callout--info}

When you select `GraphQL` as the service type, the CLI offers you options to create a schema. A schema is a data model description format in GraphQL. Select *Single object with fields* when prompted *What best describes your project?*. This option will create a backend data model which we can modify and use in our app:

```console
? Please select from one of the below mentioned services GraphQL
? Provide API name: fancytodos
? Choose an authorization type for the API Amazon Cognito User Pool
Use a Cognito user pool configured as a part of this project
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? true
? What best describes your project:
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? (Y/n) y
? Do you want to edit the schema now? No
```

When CLI creates the GraphQL schema, it is copied in */amplify/backend/api/fancytodos/schema.graphql* file for you to review and edit.

### Editing the Data Model (GraphQL Schema)

The default schema created by the CLI is as follows:

```js
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

If you have noticed, this schema is a bit different from our *ToDoItem* data model. Remember that we have defined our *ToDoItem* class in */app/classes/item.class.ts*.  When you check the file, you will see that we have a *title* property instead of *name*, and we have an additional *status* property.  

Luckily, when working with AWS AppSync, updating a schema (and thus updating your whole backend data structure!) is very easy. Just edit your local schema file which is located at */amplify/backend/api/fancytodos/schema.graphql* to match the following: 

```js
type Todo @model {
  id: ID!
  title: String!
  description: String
  status: String!
}
```

Now, if you run *amplify status* you will see that your changes to the schema file is noticed by the CLI, and you have an 'Update' operation is waiting to be deployed in your next deployment (amplify push):

```console
$ amplify Status 

| Category  | Resource name   | Operation | Provider plugin   |
| --------- | --------------- | --------- | ----------------- |
| Api       | fancytodos      | Update    | awscloudformation |
| Auth      | cognito5aafbab5 | No Change | awscloudformation |
| Analytics | fancytodos      | No Change | awscloudformation |
```

Now, update your backend to deploy your schema changes:
```bash
$ amplify push
```

Again, don't forget to rename 'aws-export.js' configuration file to 'aws-export.ts' after running your *push* command, as the configuration file is update when you add services.
{: .callout .callout--info}

The beauty of GraphQL - and AWS AppSync - is that it gives you a simple data model to work with and you can extend it as you wish. Under the hood, our `Todo` data model is stored on Amazon DynamoDB, and when you change your schema, additional data fields will be automatically available to you! 

You have simply extended your data model  by editing our local GraphQL schema, and deployed your backend with 'amplify push'.  

## Using Queries and Mutations

When working with a GraphQL API, you pass queries - or mutations - to the endpoint. Queries are responsible for read operations, and mutations perform create or update operations. A query/mutation has a simple, JSON-like format, but you don't need to write those by yourself. Instead the Amplify CLI will auto-generate those for you.

### Auto-Generating Queries/Mutations

Run the following command to enable code generation for your project:
```bash
$ amplify add codegen
```

Run the following command to generate queries and mutations:

```bash
amplify codegen statements --nodownload
```
 
The CLI creates and saves your generated queries/mutations under '/graphql' folder (unless you change the folder when prompted).
Here is the *listTodos* sample query that will bring all of your todos:

```js
export const listTodos = `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
    }
    nextToken
  }
}
`;
```

When you check the */graphql* folder, you will see that the CLI has generated all the necessary queries/mutations that you will need in your Todo app. You will use them to perform CRUD (create-read-update-delete) operations on your data:

type | operations
--- | ---
query | getTodo , listTodos
mutation | createTodo , updateTodo , deleteTodo

### Running Queries/Mutations

To run a query/mutation, you simply import it in your app and use Amplify API category to perform the operation:

```js
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';


const allTodos = await API.graphql(graphqlOperation(queries.listTodos));
console.log(allTodos);
```

So, in order to make our our app's data persistent, we will use the auto-generated queries and mutations in the ListTab module.

## Connecting to GraphQL Backend

At that stage, your GraphQL API and related backend resources (an Amazon DynamoDB table that stores the todos data) have been deployed to the cloud. Now, you can add CRUD functionality to your application which will enable managing todo's in your app.

Remember that the todo list would be displayed in *listTab* page. So, you need to bind the data from your backend data to this page, and enable basic CRUD functionality. 

To accomplish this, you need to update *src/app/listTab/listTab.page.ts* to match the following code:

```javascript
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { ListItemModal } from './listTab.item.modal';
import { ToDoItem, ToDoList } from '../classes/item.class';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import * as queries from '../../.././graphql/queries';
import * as mutations from '../../.././graphql/mutations';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-list-page',
  templateUrl: 'listTab.page.html',
  styleUrls: ['listTab.page.scss']
})
export class ListTab implements OnInit {

  modal: any;
  data: any;
  user: any;
  itemList: ToDoList;
  signedIn: boolean;

  constructor(
    public modalController: ModalController,
    events: Events
  ) {

    // Listen for changes to the AuthState in order to change item list appropriately
    events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn){
        this.getItems();
      } else {
        this.itemList.items = [];
      }
    })
  }

  async ngOnInit(){
    this.getItems();
  }

  async modify(item, i) {
    let props = {
      itemList: this.itemList,
      /*
        We pass in an item parameter only when the user clicks on an existing item
        and therefore populate an editItem value so that our modal knows this is an edit operation.
      */
      editItem: item || undefined
    };

    // Create the modal
    let modal = await this.modalController.create({
      component: ListItemModal,
      componentProps: props
    });

    modal.onDidDismiss()
    .then((result) => {
      if (result.data.newItem){
        this.create(result.data.newItem);
      } else if (result.data.editItem){
        this.edit(result.data.editItem);
      }
    });
    return modal.present();
  }

  delete(item){
    console.log (item)
    API.graphql(graphqlOperation(mutations.deleteTodo, { input: { 'id': item.id } } ));
    this.getItems();
  }

  complete(item){
    API.graphql(graphqlOperation(mutations.updateTodo, { input: item }));
    this.getItems();
  }

  create(item){
    API.graphql(graphqlOperation(mutations.createTodo, {input: item }));
    this.getItems();
  }

  edit(item){
    API.graphql(graphqlOperation(mutations.updateTodo, { input: item }));
    this.getItems();
  }

  async getItems(){
    let allItems =  await API.graphql(graphqlOperation(queries.listTodos));
    allItems = allItems.data.listTodos.items;
    let items = Array();

    allItems.forEach (function(value){
      items.push (new ToDoItem(value));
    });

    this.itemList = {
      userId: 1,
      items: items
    };

  }

}
```

As you may noticed, you have just implemented queries and mutations with your CRUD functions. Now, you can test that your app's data is persisted using your GraphQL backend.

**Inspecting a GraphQL Mutation**

Let's see what is happening under the hood. Run you app and add a new item while you monitor the network traffic in your browser's developer tools. Here is what you will see for a mutation call:
![](images/app-graphql-call.png){: class="screencap" style="max-height:500px;"}

When you check the request header, you will notice that the Request Payload has the todo item data in JSON format.

**Congratulations! You now have a cloud-powered Ionic app!**

You’ve added persisted your app's data using AWS AppSync and Amazon DynamoDB.  

## What's next

Here are couple of ideas for you if you are willing to improve your app even more.

**Using AppSync Subscriptions**

You can add AWS AppSync subscriptions to enable real-time data. Think of you share you todo list with your friends and all of you creat/edit items at the same time.

**Display User Specific Content**

When a user is logged in, you may like to use the user's profile information in your app - like displaying a the user name, or number of uncompleted tasks.  

 
