## Model Generation

Modeling your data and *generating models* which are used by DataStore is the first step to get started. GraphQL is used as a common language across JavaScript, iOS, and Android for this process, and is also used as the network protocol when syncing with the cloud. GraphQL is also what powers some of the features such as Automerge in AppSync. Model generation can be done via an NPX script or from the command line with the Amplify CLI.

### Using NPX

The fastest way to get started is using the `amplify-app` npx script such as with [Create React app](https://create-react-app.dev):

```sh
npx create-react-app amplify-datastore --use-npm
cd amplify-datastore
npx amplify-app@latest
```

Once this completes open the GraphQL schema in the `amplify/backend/api/<datasourcename>/schema.graphql`. You can use the sample or the one below that will be used in this documentation:

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  rating: Int!
  status: PostStatus!
}
```

After saving the file press *Enter* in your terminal and run `npm run amplify-modelgen`.

You do not need an AWS account to run this and use DataStore locally, however if you wish to sync with the cloud it is recommended you [Install and configure the Amplify CLI](..)
{: .callout .callout--info}

### Manual Model Generation

If you do not wish to use the above NPX script you can do this manually by first installing the Amplify CLI:

```
npm i -g @aws-amplify/cli@latest
```

The Amplify CLI can generate models at any time with the following command:

```
amplify codegen models
```

## Schema updates

When a schema changes and Model generation re-runs, it will evaluate the changes and create a versioned hash if any changes are detected which impact the underlying on-device storage structure. For example types being added/deleted or fields becoming required/optional. DataStore evaluates this version on startup and if there are changes the local items on device will be removed and a full sync from AppSync will take place if you are syncing with the cloud. Local migrations on device are not supported. If you are syncing with the cloud the structure and items of that data in your DynamoDB table will not be touched as part of this process.

## Client pre-requisites

Install dependencies:

```sh
npm i @aws-amplify/core @aws-amplify/datastore
```

In addition to importing `Amplify`, `DataStore`, and `Predicates` into your application you must also import the generated Models. They will be named imports from the `./models` directory which match up to any GraphQL `type` or `enum` definitions from your schema:

```javascript
import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Post, PostStatus } from "./models";
```

## Client sample


```jsx=App.js
import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Post, PostStatus } from "./models";

//Use next two lines only if syncing with the cloud
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);

function onCreate() {
  DataStore.save(
    new Post({
      title: `New title ${Date.now()}`,
      rating: (function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      })(1, 7),
      status: PostStatus.ACTIVE
    })
  );
}

function onDeleteAll() {
  DataStore.delete(Post, Predicates.ALL);
}

async function onQuery() {
  const posts = await DataStore.query(Post, c => c.rating("gt", 4));

  console.log(posts);
}

function App() {
  useEffect(() => {
    const subscription = DataStore.observe(Post).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <input type="button" value="NEW" onClick={onCreate} />
          <input type="button" value="DELETE ALL" onClick={onDeleteAll} />
          <input type="button" value="QUERY rating > 4" onClick={onQuery} />
        </div>
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
    </div>
  );
}

export default App;

```

## API Reference   

For the complete API documentation for DataStore, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/datastore.html).