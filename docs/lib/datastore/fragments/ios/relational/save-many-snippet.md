```swift
let post = Post(title: "My post with comments",
                rating: 5,
                status: .active)
let editor = User(username: "Nadia")

Amplify.DataStore.save(post) { postResult in
    switch postResult {
    case .failure(let error):
        print("Error adding post - \(error.localizedDescription)")
    case .success:
        Amplify.DataStore.save(editor) { editorResult in
            switch editorResult {
            case .failure(let error):
                print("Error adding user - \(error.localizedDescription)")
            case .success:
                let postEditor = PostEditor(post: post, editor: editor)
                Amplify.DataStore.save(postEditor) { postEditorResult in
                    switch postEditorResult {
                    case .failure(let error):
                        print("Error saving postEditor - \(error.localizedDescription)")
                    case .success:
                        print("Saved user, post and postEditor!")
                    }
                }
            }
        }
    }
}
```

<amplify-callout>

This example illustrates the complexity of working with multiple dependent persistence operations. The callback model is flexible but imposes some challenges when dealing with such scenarios.

We are aware of this limitation and we are evaluating possible solutions. In the meantime, the recommendation is that you use multiple functions to simplify the code and feel free to provide feedback and ideas in our [GitHub Issues](https://github.com/aws-amplify/amplify-ios/issues).

</amplify-callout>
