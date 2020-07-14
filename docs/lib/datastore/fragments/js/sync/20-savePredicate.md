```js
await DataStore.save(
  new Post({
    title: "My First Post",
    rating: 10,
    status: PostStatus.DRAFT
  }),
  (p) => p.title('beginsWith', '[Amplify]')
);
```

```swift
Amplify.DataStore.save(post, where: Post.keys.title.beginsWith("[Amplify]")) {
    switch $0 {
    case .success:
        print("Post updated successfully!")
    case .failure(let error)
        print("Could not update post, maybe the title has been changed?")
    }
}
```

