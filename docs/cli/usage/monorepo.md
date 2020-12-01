---
title: Monorepo project structure
description: Learn how to set up monorepo workflows with Amplify CLI
---

For a monorepo setup, it is recommended to have the Amplify CLI initialize a new backend at the root of on of your frontend projects. In a different frontend directory, you can run `amplify pull` and select the Amplify app you want to associate your frontend with. 

## Example
In this guide, you will learn the recommended Amplify project setup for monorepo.

### Step 1: Set up your monorepo project

To get started, have a monorepo setup with a couple of frontends. For our example, we'll have a monorepo setup with a React and an Angular app.

This project contains the frontend code for an angular and react Todo app. The repository has the following structure:
```
> monorepo-amplify
  > react
  > angular
```

### Step 2: Set up the Amplify backend

To set up a backend on AWS, we are going to use the Amplify CLI. The Amplify CLI is a command-line toolchain that simplifies provisioning AWS services. 

<amplify-block-switcher>

<amplify-block name="NPM">

```bash
npm install -g @aws-amplify/cli
```

</amplify-block>

<amplify-block name="cURL (Mac and Linux)">

```bash
curl -sL https://aws-amplify.github.io/amplify-cli/install | bash && $SHELL
```

</amplify-block>

<amplify-block name="cURL (Windows)">

```bash
curl -sL https://aws-amplify.github.io/amplify-cli/install-win -o install.cmd && install.cmd
```

</amplify-block>

</amplify-block-switcher>

First, [configure the CLI](~/cli/start/install.md#configure-the-amplify-cli) on your machine. Once configured, initialize a new backend project at the root of one of your frontend projects. While we could also initialize the project at the root level, the Amplify is best used attached to one of your projects. This allows you to set up continuous deployment pipelines of the frontend and backend together.

```
> cd monorepo-amplify/react
amplify init
? Enter a name for the project todoreact
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: build
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use #enter the profile you created
```

Add api and database
```
> amplify add api
? Please select from one of the below mentioned services: GraphQL
? Provide API name: todo
? Choose the default authorization type for the API API key
? Enter a description for the API key: 
? After how many days from now the API key should expire (1-365): 7
? Do you want to configure advanced settings for the GraphQL API No, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? (Y/n) Y
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? (Y/n) Y
```

Deploy to cloud
```
amplify push
✔ Successfully pulled backend environment dev from the cloud.

Current Environment: dev

| Category | Resource name | Operation | Provider plugin   |
| -------- | ------------- | --------- | ----------------- |
| Api      | todo          | Create    | awscloudformation |
? Are you sure you want to continue? Yes

The following types do not have '@auth' enabled. Consider using @auth with @model
	 - Todo
Learn more about @auth here: https://docs.amplify.aws/cli/graphql-transformer/directives#auth


GraphQL schema compiled successfully.

Edit your schema at /Users/nsswamin/workspace/Experiments/monorepo-amplify/react/amplify/backend/api/todo/schema.graphql or place .graphql files in a directory at /Users/nsswamin/workspace/Experiments/monorepo-amplify/react/amplify/backend/api/todo/schema
? Do you want to generate code for your newly created GraphQL API Yes
? Choose the code generation language target javascript
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.js
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
```

### Step 3a: Integrate backend with React app

Test the React app locally. Create a new to-do..
```
npm start
```

To verify the Todos got created, run `amplify console`. This will open up your backend env in the Amplify Console. Choose the **API** tab and under Data Sources click **View** on the Todotable. You should see the to-do record you just created.

### Step 3b: Integrate backend with Angular app

Now pivot to the Angular app.
```
cd ../angular
```

Let's reference the same backend in the Angular app. In order to do so, run the following commands
```
amplify pull
? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use work-lhr
? Which app are you working on? 
❯ todo 
  app2
  app3

(hit enter on all other options till the last question)

? Do you plan on modifying this backend? No
```

Generate client-side code for your other frontend

```
cp ../react/src/graphql/schema.json .
amplify add codegen --apiId XXXXXXXXX
? Choose the type of app that you're building javascript
? What javascript framework are you using angular
? Choose the code generation language target angular
? Enter the file name pattern of graphql queries, mutations and subscriptions src/graphql/**/*.graphql
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions Yes
? Enter maximum statement depth [increase from default if your schema is deeply nested] 2
? Enter the file name for the generated code src/app/API.service.ts
? Do you want to generate code for your newly created GraphQL API Yes
```