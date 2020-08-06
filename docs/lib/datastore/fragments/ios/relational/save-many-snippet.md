<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

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

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let post = Post(title: "My post with comments",
                rating: 5,
                status: .active)
let editor = User(username: "Nadia")

let sink = Amplify.DataStore.save(post)
    .flatMap { _ in Amplify.DataStore.save(editor) }
    .flatMap { _ in Amplify.DataStore.save(PostEditor(post: post, editor: editor)) }
    .sink {
        if case let .failure(error) = $0 {
            print("Error saving post, user and postEditor: \(error.localizedDescription)")
        }
    }
    receiveValue: { _ in
        print("Saved user, post and postEditor!")
    }
```

</amplify-block>

</amplify-block-switcher>

<amplify-callout>

This example illustrates the complexity of working with multiple dependent persistence operations. The callback model is flexible but imposes some challenges when dealing with such scenarios. Prefer to use the Combine model if your app supports iOS 13 or higher. If not, the recommendation is that you use multiple functions to simplify the code.

</amplify-callout>
