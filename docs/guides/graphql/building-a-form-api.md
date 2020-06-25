---
title: Building a Form API with GraphQL
description: How to implement pagination with GraphQL 
---

In this guide you will learn how to build and interact with a Form API using Amplify and the
 [GraphQL Transform library](~/cli/graphql-transformer/directives.md).

The API that we will create is for a basic contact form. The form will allow the user to input their name and phone number.

### Getting started

To get started, create a new Amplify project:

```sh
amplify init

# Chooose your environment name and default text editor
# You can answer the defaults for the rest of the questions and then choose the AWS profile you'd like to use for this project.
```

Next, create a GraphQL API:

```sh
amplify add api

? Please select from one of the below mentioned services: GraphQL
? Provide API name: testgqlimages
? Choose the default authorization type for the API API key
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 365
? Do you want to configure advanced settings for the GraphQL API No, I am done.
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? Yes
```

The CLI should open the GraphQL schema, located at ____, in your text editor. Update the schema with the following and save the file:

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

In the above schema, we've overriding the default mutations and are specifying that only the `createContact` mutation be allowed to be created. By this this, the API does not allow users to update or delete contacts. For more fine grained authorization rules, check out the [@auth directive](~/cli/graphql-transformer/directives.md#auth).

</amplify-callout>

Next, deploy the API:

```sh
amplify push --y
```

### Interacting with the API from a client-side application

Now that the API has been deployed, you can interact with it from a client-side application.

#### Creating a new contact

```javascript
/* First import the API category from Amplify */
import { API } from 'aws-amplify';

/* Next, import the createContact mutation */
import { createContact } from './graphql/mutations';

/* Create a function that will create a new contact */
async function submitNewContact() {
  try {
    await API.graphql({
      query: createContact,
      variables: {
        input: {
          name: 'Chris',
          phone: '+1-555-555-5555'
        }
      }
    })
    console.log('New contact created!');
  } catch (err) {
    console.log({ err });
  }
}
```

#### Creating a form for dynamic user input

```javascript
/* First import the API category from Amplify */
import { API } from 'aws-amplify';

/* Next, import the createContact mutation */
import { createContact } from './graphql/mutations';

/* For a dynamic form, create some local state to hold form input. This is pseudocode and will differ based on your JavaScript framework. */
const formState = { name: '', phone: '' };

/* Create a function to update the form state. This is pseudocode and will differ based on your JavaScript framework.  */
function updateFormState(key, value) {
  formState[key] = value;
}

/* Create a function that will create a new contact */
async function submitNewContact() {
  try {
    await API.graphql({
      query: createContact,
      variables: {
        input: {
          name: formState.name,
          phone: formState,phone
        }
      }
    })
    console.log('New contact created!');
  } catch (err) {
    console.log({ err });
  }
}

/* Create the form inputs and button in the UI */
<input placeholder="phone" onChange={e => updateFormState('phone', e.target.value)} />
<input placeholder="name" onChange={e => updateFormState('name', e.target.value)} />
<button onClick={submitNewContact}>Create New Contact</button>
```

#### Querying for a list of contacts

```javascript
/* First import the API category from Amplify */
import { API } from 'aws-amplify';

/* Next, import the listContacts query */
import { listContacts } from './graphql/queries';

/* Create a function that will fetch the contacts */
async function getContacts() {
  try {
    const contactData = await API.graphql({
      query: listContacts
    })
    console.log('contacts: ', contactData);
  } catch (err) {
    console.log({ err });
  }
}
```
