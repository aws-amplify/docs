To work well with server-rendered pages, Amplify JS requires slight modifications from how you would use it in a client-only environment.

## Amplify

### Enabling SSR 

When using the Amplify CLI, the __aws-exports.js__ file gets created and updated automatically for you based upon the resources you have added and configured.

For client-only apps, `Amplify.configure(awsExports)` is all you need.

To enable SSR support, also provide `ssr: true`:

```js
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });
```

By providing `ssr: true`, Amplify persists credentials on the client in cookies so that subsequent requests to the server have access to them.

> **Note**: Once [vercel/next.js#16977](https://github.com/vercel/next.js/issues/16977) is resolved, you can hoist `Amplify.configure` into **pages/_app.js**.  Until then, be sure that all **pages/*** run `Amplify.configure({ ...awsExports, ssr: true })`.


### withSSRContext

Once an application has been configured with `ssr: true`, client-side credentials are passed to the server via cookies.

The `withSSRContext` utility creates an instance of `Amplify` scoped to a single request (`req`) using those cookie credentials.

For client-side code rendered in the browser, your page should continue using top-level imports as usual:

```js
import { Amplify, API } from "aws-amplify";
import awsExports from "../src/aws-exports";

Amplify.configure({ ...awsExports, ssr: true });

export default function HomePage({ posts = [] }) {
  const [posts, setPosts] = useState(posts);

  useEffect(() => {
    // 👇 Notice how the client correctly uses the top-level `API` import
    API.graphql({ query: listPosts }).then(({ data }) => setPosts(data.listPosts.items));
  }, [])

  return ( ... );
}
```

When on the server, use `withSSRContext({ req?: ServerRequest })`:

```js
import { Amplify, API, withSSRContext } from "aws-amplify";

export async function getServerSideProps({ req }) {
  // 👇 Notice how the server uses `API` from `withSSRContext`, instead of the top-level `API`.
  const SSR = withSSRContext({ req })
  const { data } = await SSR.API.graphql({ query: listPosts });

  return {
    props: {
      posts: data.listPosts.items
    }
  }
}
```

Server-side functions that _don't_ have a `req` object (e.g. Next.js' `getStaticProps` & `getStaticPaths`) should still use `withSSRContext()`.

## DataStore

### Serializing

For Next.js, returned `props` from the server have to be valid JSON. Because `DataStore.query(Model)` returns _instances_ of `Model`, we need the `serializeModel` helper to convert it to JSON instead:

```js
import { serializeModel } from '@aws-amplify/datastore/ssr';
import { Amplify, withSSRContext } from "aws-amplify";

...

export async function getServerSideProps({ req }) {
	const SSR = withSSRContext({ req });
	const posts = await SSR.DataStore.query(Post);

	return {
		props: {
      // 👇 This converts Post instances into serialized JSON for the client
      posts: serializeModel(posts),
		},
	};
}
```

### Deserializing

If your client-side code only reads from the server-side props and doesn't perform any updates to these models, then your client-side code won't need any changes.

However, if you receive models from the server and need to `DataStore.delete(model)` or `DataStore.save(...)` changes to them, you'll need the `deserializeModel` utility to convert them from server-friendly JSON back into model _instances_:

```js
import { deserializeModel } from '@aws-amplify/datastore/ssr';
import { Amplify, withSSRContext } from "aws-amplify";

import { Post } from "../src/models";

export default function HomePage(initialData) {
    // 👇 This converts the serialized JSON back into Post instances
    const [posts, setPosts] = useState(deserializeModel(Post, initialData.posts));

    ...
}
```

