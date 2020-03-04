### Data requirements

For this app, we have the following requirements:

1. A photo album screen that shows a list of photos
2. Ability to view details on a particular photo
3. Ability to store data about uploaded photos

### Model the data with the GraphQL Transform

Given these requirements, we'll need to be able to display a list of photos and upload photos, meaning there will definitely be a Photo entity in the app. In GraphQL we would use a `type` to define that entity, like so:

```graphql
type Photo {
  id: ID!
  url: String!
  description: String!
}
```

Because we're using Amplify, we can use the GraphQL Schema Definition Language (SDL) and custom Amplify directives to define our backend requirements for our API. The GraphQL Transform library then converts your SDL definition into a set of fully descriptive AWS CloudFormation templates that implement your data model.

Since we know we need to store data about the uploaded photos, we first need to define our `Photo` type as a model:

```graphql
type Photo @model {
  id: ID!
  url: String!
  description: String!
}
```

The `@model` directive let's Amplify know we intend for this type to have data that needs to be stored. This will create a DynamoDB table for us and make all GraphQL operations available in the API.

Next, we need to set up some authorization rules around the photos. Only the uploader should be able to remove a photo, but everyone should be able to view them. We can use the `@auth` directive to set up our authorization strategy:

```graphql
type Photo
  @model(subscriptions: { level: public })
  @auth(rules: [{ allow: owner, queries: null }]) {
  id: ID!
  url: String!
  description: String!
}
```

We also updated the `@model` directive to specify we wanted subscriptions for photos to be available to everyone, this way, when photos are added or removed by other users, we can get those udpates in realtime in our app. When we create the API we'll use this type definition in our schema.

## Create GraphQL API and database

Now that the data is modeled, it's time to create the GraphQL API. From the root of the project, runthe following:

```bash
$ amplify add api
```

You'll be prompted for some information so that Amplify can create the right infrastructure to support your API. For each question, choose the options listed below:

```bash
# Amplify supports both REST and GraphQL APIs
Please select from one of the below mentioned services (GraphQL)

Provide API name (photoshare)

# Because we have user specific behavior in our app we need to authenticate users
Choose an authorization type for the API (Cognito User Pool)

# Because we use a schema to create the backend you can share these schemas and use them as boilerplates
Do you have an annotated GraphQL schema (No)

# Since we don't have a schema we want a guided creation
Do you want a guided schema creation (Yes)

# We only have one data type so we don't need to handle any data relationships
What best describes your project (Single object with fields (e.g., “Todo” with ID, name, description))

# This option will open a `schema.graphql` file in our editor
# Replace the TODO example type with the Photo type from above
# Save the file and then come back to the terminal
Do you want to edit the schema now (Yes)

# Once you have updated the schema.graphql file and saved it, press enter
Press enter to continue
```

Now that the API has been successfully created. We need to push our updated configuration to the cloud so our API can be deployed:

```bash
amplify push
```

When you run `amplify push`, you'll have the option to have all the GraphQL operations found in your schema generated for you. Choose the following options:

```bash
Do you want to generate code for your newly created GraphQL API (Yes)

Choose the code generation language target (javascript)

Enter the file name pattern of graphql queries, mutations and subscriptions (src/graphql/**/*.js)

Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Yes)

Enter maximum statement depth [increase from default if your schema is deeply nested] (2)
```

## Connect frontend to API

We don't have any photos uploaded yet, but we're going to set up the query for listing the photos so we can see them once we can upload.

Open up `src/App.js` and modify it with the following:

```javascript
  import React, { useState, useEffect } from "react";
  import "./App.css";
  import { withAuthenticator } from "aws-amplify-react";
  import { API, graphqlOperation } from 'aws-amplify'

  import { listPhotos } from './graphql/queries'

  function App() {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
      const fetchPhotos = async () => {
        const data = await API.graphql(graphqlOperation(listPhotos))
        setPhotos(data.listPhotos.items)
      }

      fetchPhotos()
    }, [setPhotos])

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <div className="Photo-gallery">
          {!photos.length && <h2>No photos yet.</h2>}
          {photos.map(photo => (
            <div key={photo.id} className="App-photo-container">
              <img className="App-photo" src={photo.url} alt={photo.description} />
             </div>
           ))}
         </div>
     </div>
    );
  }

  export default withAuthenticator(App, true);
```

Because we don't have any photos stored, at this point you should see "No photos yet" when you run the app. In the next step we'll set up storage for our photos and handle uploads!
