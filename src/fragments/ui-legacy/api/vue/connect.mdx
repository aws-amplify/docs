The Connect component can be used to execute a GraphQL query, subscription, or mutation. You can execute GraphQL queries by passing your queries in `query` or `mutation` attributes. For example:

```html
<template>
  <div class="home">
      <amplify-connect :query="listTodosQuery">
        <template slot-scope="{loading, data, errors}">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0">{{ errors }}</div>

          <div v-else-if="data">
            <TodoList :items="data.listTodos.items"></TodoList>
          </div>
        </template>
      </amplify-connect>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue';
import TodoList from '@/components/TodoList.vue';

const ListTodosQuery = `query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }`;

export default {
  components: {
    TodoList,
    ...components
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodosQuery);
    }
  }
}
</script>
```

You can also subscribe to changes in query data via the `subscription` and `onSubscriptionMsg` attributes:

```html
<template>
  <div class="home">
      <amplify-connect :query="listTodosQuery"
          :subscription="createTodoSubscription"
          :onSubscriptionMsg="onCreateTodo">
        <template slot-scope="{loading, data, errors}">
          <div v-if="loading">Loading...</div>

          <div v-else-if="errors.length > 0">{{ errors }}</div>

          <div v-else-if="data">
            <TodoList :items="data.listTodos.items"></TodoList>
          </div>
        </template>
      </amplify-connect>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue';
import TodoList from '@/components/TodoList.vue';

const ListTodosQuery = `query ListTodos {
    listTodos {
      items {
        id
        name
      }
    }
  }`;

  const OnCreateTodoSubscription = `subscription OnCreateTodo {
      onCreateTodo {
        id
        name
      }
    }`;

export default {
  name: 'home',
  components: {
    TodoList,
    ...components
  },
  computed: {
    listTodosQuery() {
      return this.$Amplify.graphqlOperation(ListTodosQuery);
    },
    createTodoSubscription() {
      return this.$Amplify.graphqlOperation(OnCreateTodoSubscription);
    }
  },
  methods: {
    onCreateTodo(prevData, newData) {
      console.log('New todo from subscription...');
      const newTodo = newData.onCreateTodo;
      prevData.data.listTodos.items.push(newTodo);
      return prevData.data;
    }
  }
}
</script>
```

The Connect component also supports mutations by passing a GraphQL query and (optionally) variables via the `mutation` attribute. Call the provided `mutate` method to trigger the operation. `mutation` returns a promise that resolves with the result of the GraphQL mutation, use `@done` to listen for it to complete.

```html
<template>
  <div>
    <amplify-connect :mutation="createTodoMutation"
        @done="onCreateFinished">
      <template slot-scope="{ loading, mutate, errors }">
        <input v-model="name" placeholder="item name" />
        <input v-model="description" placeholder="item description" />
        <button :disabled="loading" @click="mutate">Create Todo</button>
      </template>
    </amplify-connect>
  </div>
</template>

<script>
import { components } from 'aws-amplify-vue';

const CreateTodoMutation = `mutation CreateTodo($name: String!, $description: String) {
    createTodo(input: { name: $name, description: $description }) {
      id
      name
    }
  }`;

export default {
  name: 'NewTodo',
  components: {
    ...components
  },
  data() {
    return {
      name: '',
      description: ''
    }
  },
  computed: {
    createTodoMutation() {
      return this.$Amplify.graphqlOperation(CreateTodoMutation,
        { name: this.name, description: this.description });
    }
  },
  methods: {
    onCreateFinished() {
      console.log('Todo created!');
    }
  }
}
</script>
```
