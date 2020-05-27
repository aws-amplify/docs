```js
try {
  const posts = await DataStore.query(Post);
  console.log("Posts retrieved successfully!", posts);
} catch (error) {
  console.log("Error retrieving posts", error);
}
```
