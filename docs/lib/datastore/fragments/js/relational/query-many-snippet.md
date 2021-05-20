These many-to-many relationship models can be queried directly to return all models in the relationship:

```js
// All post editor relationships
const results = await DataStore.query(PostEditor);
```

This will return an array of `PostEditor`s with `Post` and `Editor` model instances attached. For example, without metadata, `results` from above would look like this:

```json
[
    {
        "id": "4b66cee3-1436-4d53-910f-7cfe0d955cd8",
        "post": {
            "id": "d2a96183-938f-4469-9873-944336fb9d9d",
            "title": "My first post"
        },
        "editor": {
            "id": "2cbfdd83-8353-4b0e-ae63-8f7d004c728f",
            "username": "Nadia"
        }
    }
]
```

This model instance contains both related models. Use `filter()` or `map()` to retrieve the related model instances:

```js
// All posts for a given editor
const postsByEditor = (await DataStore.query(PostEditor)).filter(
    pe => pe.editor.id === editor.id
).map(pe => pe.post);

// All editors on a given post
const editorsByPost = (await DataStore.query(PostEditor)).filter(
    pe => pe.post.id === post.id
).map(pe => pe.editor);

// All editors of posts where title contains "first"
const editorsOfFirstPosts = (await DataStore.query(PostEditor)).filter(
    pe => pe.post.title.includes("first")
).map(pe => pe.editor);

// All editors of posts where title is long
const editorsWithLongTitles = (await DataStore.query(PostEditor)).filter(
    pd => pe.post.title.length > 20
).map(pe => pe.editor);
```