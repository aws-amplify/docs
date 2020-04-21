## Create a new Vue app

Use the Vue CLI to bootstrap a new Vue app (selecting the defaults will work for this project):

```bash
npm install -g @vue/cli
vue create myamplifyproject
cd myamplifyproject
```

Run your app:

```bash
npm install
npm run serve
```

## Initialize a new backend

Now that we have a running Vue app, it's time to set up Amplify so that we can create the necessary backend services needed to support the app. From the root of the project, run:

```bash
amplify init
```

When you initialize Amplify you'll be prompted for some information about the app:

```bash
Enter a name for the project (todo)

# All AWS services you provision for your app are grouped into an "environment"
# A common naming convention is dev, staging, and production
Enter a name for the environment (dev)

# Sometimes the CLI will prompt you to edit a file, it will use this editor to open those files.
Choose your default editor

# Amplify supports JavaScript (Web & React Native), iOS, and Android apps
Choose the type of app that you're building (javascript)

What JavaScript framework are you using (vue)

Source directory path (src)

Distribution directory path (dist)

Build command (npm run-script build)

Start command (npm run-script serve)

# This is the profile you created with the `amplify configure` command in the introduction step.
Do you want to use an AWS profile
```

When you initialize a new Amplify project, a few things happen:

- It creates a top level directory called `amplify` that stores your backend definition. During the tutorial you'll add capabilities such as authentication, GraphQL API, storage, and set up authorization rules for the API. As you add features, the `amplify` folder will grow with infrastructure-as-code templates that define your backend stack. Infrastructure-as-code is a best practice way to create a replicable backend stack.
- It creates a file called `aws-exports.js` in the `src` directory that holds all the configuration for the services you create with Amplify. This is how the Amplify client is able to get the necessary information about your backend services.
- It modifies the `.gitignore` file, adding some generated files to the ignore list
- A cloud project is created for you in the AWS Amplify Console that can be accessed by running `amplify console`. The Console provides a list of backend environments, deep links to provisioned resources per Amplify category, status of recent deployments, and instructions on how to promote, clone, pull, and delete backend resources

## Install Amplify libraries

The first step to using Amplify in the client is to install the necessary dependencies:

```
npm install aws-amplify @aws-amplify/ui-vue
```

The `@aws-amplify/ui-vue` package is a set of Vue-specific UI components that make it easy to integrate functionality like end-to-end authentication flows.

## Set up frontend

Next, we need to configure Amplify on the client so that we can use it to interact with our backend services.

Open __src/main.js__ and add the following code below the last import:

```js
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);
```

Now Amplify has been successfully configured. As you add or remove categories and make updates to your backend configuration using the Amplify CLI, the configuration in __aws-exports.js__ will update automatically.

