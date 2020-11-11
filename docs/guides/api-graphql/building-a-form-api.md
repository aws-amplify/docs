---
title: Building a Form API with GraphQL
description: How to implement pagination with GraphQL
---

In this guide you will learn how to build and interact with a Form API using Amplify.

The API that we will create is for a basic contact form. The form will allow the user to input their name and phone number, and for us to query for the list of contacts.

### Getting started

To get started, create a new Amplify project:

```sh
amplify init

# Choose your environment name and default text editor
# You can answer the defaults for the rest of the questions and then choose the AWS profile you'd like to use for this project.
```

Next, create a GraphQL API:

```sh
amplify add api

? Please select from one of the below mentioned services: GraphQL
? Provide API name: contactapi
? Choose the default authorization type for the API API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365
? Do you want to configure advanced settings for the GraphQL API: No, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields
? Do you want to edit the schema now? Yes
```

The CLI should open the GraphQL schema, located at __amplify/backend/api/contactapi/schema.graphql__, in your text editor. Update the schema with the following and save the file:

```graphql
type Contact @model(mutations: {
  create: "createContact"
}) {
  id: ID!
  name: String!
  phone: String!
}
```

<amplify-callout>

In the above schema, we've overriding the default mutations and are specifying that only the `createContact` mutation be allowed to be created. By this this, the API does not allow users to update or delete contacts. For more fine grained authorization rules, check out the [@auth directive](~/cli/graphql-transformer/auth.md).

</amplify-callout>

Next, deploy the API:

```sh
amplify push --y
```

### Interacting the API

To create a new contact, you can use the `createContact` mutation:

```graphql
mutation createContact {
  createContact(input: {
    name: "Chris"
    phone: "+1-555-555-5555"
  }) {
    id
    name
    phone
  }
}
```

To query for a list of contacts, you can use the `listContacts` query:

```graphql
query listContacts {
  listContacts {
    items {
      id
      name
      phone
    }
  }
}
```

<inline-fragment platform="js" src="~/guides/api-graphql/fragments/js/building-a-form-api.md"></inline-fragment>
