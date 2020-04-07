## Example React application

`App.js`:

```jsx
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
      status: PostStatus.ACTIVE,
    })
  );
}

function onDeleteAll() {
  DataStore.delete(Post, Predicates.ALL);
}

async function onQuery() {
  const posts = await DataStore.query(Post, (c) => c.rating("gt", 4));

  console.log(posts);
}

function App() {
  useEffect(() => {
    const subscription = DataStore.observe(Post).subscribe((msg) => {
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

## Example React Native application  

`App.js`:

```jsx
/**
 * React Native DataStore Sample App
 */

import React, { Component } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

import Amplify from "@aws-amplify/core";
import { DataStore, Predicates } from "@aws-amplify/datastore";
import { Post, PostStatus, Comment } from "./src/models";

import awsConfig from "./aws-exports";
Amplify.configure(awsConfig);
let subscription;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.onQuery();
    subscription = DataStore.observe(Post).subscribe((msg) => {
      console.log("SUBSCRIPTION_UPDATE", msg);
      this.onQuery();
    });
  }

  componentWillUnmount() {
    subscription.unsubscribe();
  }

  onCreatePost() {
    DataStore.save(
      new Post({
        title: `New Post ${Date.now()}`,
        rating: (function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          // The maximum is exclusive and the minimum is inclusive
          return Math.floor(Math.random() * (max - min)) + min;
        })(5, 10),
        status: PostStatus.ACTIVE,
      })
    );
  }

  async onCreatePostAndComments() {
    const post = new Post({
      title: `New Post with comments ${Date.now()}`,
      rating: 5,
      status: PostStatus.ACTIVE,
    });

    await DataStore.save(post);

    for (let i = 0; i < 2; i++) {
      DataStore.save(
        new Comment({
          content: `New comment ${Date.now()}`,
          post,
        })
      );
    }
  }

  onQuery = async () => {
    const posts = await DataStore.query(Post, (c) => c.rating("gt", 2));
    console.log("QUERY_POSTS_RESULT", posts);
    const comments = await DataStore.query(Comment);
    this.setState({ posts });
    console.log("QUERY_COMMENTS_RESULT", comments);
  };

  onDelete = async () => {
    const deletedPosts = await DataStore.delete(Post, Predicates.ALL);
    console.log("DELETE_RESULT", deletedPosts);
  };

  render() {
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.text} onPress={this.onCreatePost}>
          Create Post
        </Text>
        <Text style={styles.text} onPress={this.onCreatePostAndComments}>
          Create Post & Comments
        </Text>
        <Text style={styles.text} onPress={this.onQuery}>
          Query Posts
        </Text>
        <Text style={styles.text} onPress={this.onDelete}>
          Delete All Posts
        </Text>
        {this.state.posts.map((post, i) => (
          <Text key={i}>{`${post.title} ${post.rating}`}</Text>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    paddingTop: 40,
    flex: 1,
  },
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default App;
```

## API Reference   

For the complete API documentation for DataStore, visit our [API Reference](https://aws-amplify.github.io/amplify-js/api/classes/datastore.html)
