The Amplify CLI supports creating and interacting with two types of API categories: REST and GraphQL.

The API you will be creating in this step is a GraphQL API using AWS AppSync (a managed GraphQL service) and the database will be Amazon DynamoDB (a NoSQL database).

## Create a GraphQL API and database

To add the API, run the following command.

```sh
$ amplify add api

? Please select from one of the below mentioned services: GraphQL
? Provide API name: myapi
? Choose the default authorization type for the API: API Key
? Enter a description for the API key: demo
? After how many days from now the API key should expire: 7 (or your preferred expiration)
? Do you want to configure advanced settings for the GraphQL API: N
? Do you have an annotated GraphQL schema? N
? Do you want a guided schema creation? Y
? What best describes your project: Single object with fields
? Do you want to edit the schema now? Y
```

The CLI should open this schema in your text editor.

```graphql
# amplify/backend/api/myapi/schema.graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

The schema generated is for a Todo app. You'll notice a directive on the `Todo` type of `@model`. this directive is part of the GraphQL transform library of Amplify.

A type decorated with this directive will scaffold out the database table for the type (Todo table), the schema for CRUD (create, read, update, delete) and list operations, and the GraphQL resolvers needed to make everything work together.

### Test your API 

To test this out locally, you can run the `mock` command:

```sh
$ amplify mock api
```

This will open the GraphiQL explorer on a local port. From the test environment you can try out different operations locally, like queries and mutations, before deploying the backend.

### Code generation

To deploy this backend, run the `push` command:

```sh
$ amplify push

? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? Y
? Choose the code generation language target: javascript
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions? Y
? Enter maximum statement depth [increase from default if your schema is deeply nested]: 2
```

Now the API and database have been deployed and you can start interacting with it.

The API you have deployed is for a Todo app, including operations for creating, reading, updating, deleting, and listing todos.

## Connect frontend to API

For a user interface to interact with this API, you will create a way to list and create todos. To do this, you will create a form with a button to create todos and way to fetch and render a list of todos.

Open App.js and update it with the following code (If you are using Expo, you also need to be sure to include the `Amplify.configure` configuration as well):

```javascript
import React, { useEffect, useState } from 'react'
import {
  View, Text, StyleSheet, TextInput, Button
} from 'react-native'

import { API, graphqlOperation } from 'aws-amplify'
import { createTodo } from './src/graphql/mutations'
import { listTodos } from './src/graphql/queries'

const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

  async function addTodo() {
    try {
      const todo = { ...formState }
      setTodos([...todos, todo])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createTodo, {input: todo}))
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={val => setInput('name', val)}
        style={styles.input}
        value={formState.name} 
      />
      <TextInput
        onChangeText={val => setInput('description', val)}
        style={styles.input}
        value={formState.description}
      />
      <Button title="Create Todo" onPress={addTodo} />
      {
        todos.map((todo, index) => (
          <View key={todo.id ? todo.id : index} style={styles.todo}>
            <Text style={styles.todoName}>{todo.name}</Text>
            <Text>{todo.description}</Text>
          </View>
        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { height: 50, backgroundColor: '#ddd', marginBottom: 10, padding: 8 },
  todoName: { fontSize: 18 }
})

export default App
```

Let's walk through some of the functions:

__useEffect__ - When the component loads, the `useEffect` hook is called and it invokes the `fetchTodos` function.

__fetchTodos__ - Uses the Amplify `API` category to call the AppSync GraphQL API with the `listTodos` query. Once the data is returned, the items array is passed in to the `setTodos` function to update the local state.

__createTodo__ - Uses the Amplify API category to call the AppSync GraphQL API with the `createTodo` mutation. A difference between the `listTodos` query and the `createTodo` mutation is that `createTodo` accepts an argument containing the variables needed for the mutation.

## Run locally

Next, run the app and you should see the form rendered to the screen and be able to create and view the list of todos:

```sh
$ expo start

# or

$ npx react-native run-ios
```