The API category provides React components for working with GraphQL data using the Amplify GraphQL client. 

The `<Connect/>` component is used to execute a GraphQL query or mutation. You can execute GraphQL queries by passing your queries in `query` or `mutation` attributes:

## Queries

```javascript
import React, { Component } from 'react';
import Amplify, { graphqlOperation }  from "aws-amplify";
import { Connect } from "aws-amplify-react";

import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

class App extends Component {

    render() {

        const ListView = ({ todos }) => (
            <div>
                <h3>All Todos</h3>
                <ul>
                    {todos.map(todo => <li key={todo.id}>{todo.name} ({todo.id})</li>)}
                </ul>
            </div>
        );

        return (
            <Connect query={graphqlOperation(queries.listTodos)}>
                {({ data: { listTodos }, loading, errors }) => {
                    if (errors) return (<h3>Error</h3>);
                    if (loading || !listTodos) return (<h3>Loading...</h3>);
                    return (<ListView todos={listTodos.items} /> );
                }}
            </Connect>
        )
    }
} 

export default App;

```

## Subscription

Also, you can use the `subscription` and `onSubscriptionMsg` attributes to enable subscriptions:

```javascript

<Connect
    query={graphqlOperation(queries.listTodos)}
    subscription={graphqlOperation(subscriptions.onCreateTodo)}
    onSubscriptionMsg={(prev, { onCreateTodo }) => {
        console.log(onCreateTodo);
        return prev; 
    }}
>
    {({ data: { listTodos }, loading, error }) => {
        if (error) return (<h3>Error</h3>);
        if (loading || !listTodos) return (<h3>Loading...</h3>);
        return (<ListView todos={listTodos ? listTodos.items : []} />);
    }}
 </Connect>

```
## Mutations

For mutations, a `mutation` function needs to be provided with the `Connect` component. A `mutation` returns a promise that resolves with the result of the GraphQL mutation.

```jsx
import React, { Component } from 'react';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';
import * as subscriptions from './graphql/subscriptions';

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
        name: '',
        description: '',
    };
  }

  handleChange(name, event) {
      this.setState({ [name]: event.target.value });
  }

  async submit() {
    const { onCreate } = this.props;
    const input = {
      name: this.state.name,
      description: this.state.description
    }
    console.log(input);

    try {
    	await onCreate({input})
    } catch (err) {
    	console.error(err);
    }

  }

  render(){
    return (
        <div>
            <input
                name="name"
                placeholder="name"
                onChange={(event) => { this.handleChange('name', event)}}
            />
            <input
                name="description"
                placeholder="description"
                onChange={(event) => { this.handleChange('description', event)}}
            />
            <button onClick={this.submit}>
                Add
            </button>
        </div>
    );
  }
}

class App extends Component {
  render() {

    const ListView = ({ todos }) => (
      <div>
          <h3>All Todos</h3>
          <ul>
            {todos.map(todo => <li key={todo.id}>{todo.name}</li>)}
          </ul>
      </div>
    )

    return (
      <div className="App">
        <Connect mutation={graphqlOperation(mutations.createTodo)}>
          {({mutation}) => (
            <AddTodo onCreate={mutation} />
          )}
        </Connect>

        <Connect query={graphqlOperation(queries.listTodos)}
          subscription={graphqlOperation(subscriptions.onCreateTodo)}
          onSubscriptionMsg={(prev, {onCreateTodo}) => {
              console.log('Subscription data:', onCreateTodo)
              return prev;
            }
          }>
        {({ data: { listTodos }, loading, error }) => {
          if (error) return <h3>Error</h3>;
          if (loading || !listTodos) return <h3>Loading...</h3>;
            return (<ListView todos={listTodos.items} />);
        }}
        </Connect>
      </div>

    );
  }
}
```
