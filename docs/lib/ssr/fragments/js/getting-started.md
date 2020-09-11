To work well with server-rendered pages, Amplify JS requires slight modifications from how you would use it in a client-only environment.

## Amplify

### Enabling SSR 

When using the Amplify CLI, the __aws-exports.js__ file gets created and updated automatically for you based upon the resources you have added and configured.

For client-only apps, `Amplify.configure(awsExports)` is all you need.

To enable SSR support, also provide `ssr: true`:

```js
import { Amplify } from "aws-amplify"
import awsExports from "../src/aws-exports"

Amplify.configure({ ...awsExports, ssr: true })
```

> **Note**: Once [vercel/next.js#16977](https://github.com/vercel/next.js/issues/16977) is resolved, you can hoist `Amplify.configure` into **pages/_app.js**.  Until then, be sure that all **pages/*** run `Amplify.configure({ ...awsExports, ssr: true })`.


### withSSRContext

Your page components should continue using top-level category imports for client-side code:

```js
import { Amplify, API } from "aws-amplify"

export default function HomePage({ posts = [] }) {
  const [posts, setPosts] = useState(posts)

  useEffect(() => {
    // 👇 Notice how the client correctly uses the top-level `API`
    API.graphql({ query: listPosts }).then(({ data }) => setPosts(data.listPosts.items))
  }, [])

  return ( ... )
}
```

However, when in server-only functions (e.g. Next.js' `getServerSideProps`, `getStaticProps`, & `getStaticPaths`), use `withSSRContext({ req?: ServerRequest })`:

```js
import { Amplify, API, withSSRContext } from "aws-amplify"

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

Server-side functions that _don't_ have a `req` object (e.g. `getStaticProps`) should still use `withSSRContext()`.

## DataStore

### Serialization

For Next.js, returned `props` from the server have to be valid JSON. Because `DataStore.query(Model)` returns _instances_ of `Model`, we need the `serializeModel` helper to convert it to JSON instead:

```js
import { serializeModel } from '@aws-amplify/datastore/ssr';
import { Amplify, withSSRContext } from "aws-amplify"

...

export async function getServerSideProps({ req }) {
	const SSR = withSSRContext({ req });
	const posts = await SSR.DataStore.query(Post);

	return {
		props: {
      // 👇 This converts Post intances into serializable JSON for the client
			posts: serializeModel(posts),
		},
	};
}
```

### Deserialization

If your client-side code only reads from the server-side props and doesn't perform any updates to these models, then your client-side code won't need any changes.

However, if you receive models from the server and need to `DataStore.delete(model)` or `DataStore.save(...)` changes to them, you'll need the `deserializeModel` utility to convert them from server-friendly JSON back into model _instances_:

```js
import { serializeModel } from '@aws-amplify/datastore/ssr';
import { Amplify, withSSRContext } from "aws-amplify"

import { Post } from "../src/models"

export default function HomePage(initialData) {
    // 👇 This converts the serialized JSON back into Post instances
  	const [posts, setPosts] = useState(deserializeModel(Post, initialData.posts));

    ...
}
```

