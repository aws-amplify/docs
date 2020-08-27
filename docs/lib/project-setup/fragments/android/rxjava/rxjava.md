
The Amplify library for Android and ships with APIs that return results via callbacks, as in:

```java
Post post = Post.builder()
    .title("My First Post")
    .build();

Amplify.DataStore.save(post,
    saved -> Log.i("MyAmplifyApp", "Saved a post."),
    failure -> Log.e("MyAmplifyApp", "Save failed.", failure)
);
```

Amplify also provides APIs that expose [Reactive Extensions](http://reactivex.io/), a cross-platform library for asynchronous and event-based programs:

```java
RxAmplify.DataStore.save(post)
    .subscribe(
        () -> Log.i("MyAmplifyApp", "Saved a post."),
        failure -> Log.e("MyAmplifyApp", "Save failed.", failure)
    );
```

While this doesn't save much for a single invocation, it provides great readability benefits when chaining asynchronous calls, since you can use standard RxJava operators to compose complex functionality into readable chunks. Consider a relational model where the creation of a `Post` requires also a creation of an `User` for the editor, and a `PostEditor` object to link the two together:

```java
Post post = Post.builder()
    .title("My First Post")
    .build();

User editor = User.builder()
    .username("Nadia")
    .build();

PostEditor postEditor = PostEditor.builder()
    .post(post)
    .editor(editor)
    .build();
```

Using callbacks, you can save these objects via:

```java
Amplify.DataStore.save(post,
    savedPost -> {
        Log.i("MyAmplifyApp", "Post saved.");
        Amplify.DataStore.save(editor,
            savedEditor -> {
                Log.i("MyAmplifyApp", "Editor saved.");
                Amplify.DataStore.save(postEditor,
                    saved -> Log.i("MyAmplifyApp", "PostEditor saved."),
                    failure -> Log.e("MyAmplifyApp", "PostEditor not saved.", failure)
                );
            },
            failure -> Log.e("MyAmplifyApp", "Editor not saved.", failure)
        );
    },
    failure -> Log.e("MyAmplifyApp", "Post not saved.", failure)
);
```

With Amplify's RxJava interface we can merge these operations together:

```java
Completable.merge(
    RxAmplify.DataStore.save(post),
    RxAmplify.DataStore.save(editor)
).andThen(
    RxAmplify.DataStore.save(postEditor)
).subscribe(
    () -> Log.i("MyAmplifyApp", "Post, Editor, and PostEditor saved."),
    failure -> Log.e("MyAmplifyApp", "Item not saved.", failure)
);
```

Compared to nesting these dependent calls in callbacks, this provides a much more readable pattern.

## Installation

Amplify's RxJava bindings are included with Amplify in a separate library. To use them, add the dependency to your application's gradle file.

Under **Gradle Scripts**, open **build.gradle (Module: [YourApplicationName])**.

Add the following line in `dependencies`:

```groovy
dependencies {
    // Add the below line in `dependencies`
    implementation 'com.amplifyframework:rxbindings:1.1.2'
}
```

### Special cases

TK

#### `API.subscribe()`

TK

#### `Hub.on()`

The Amplify Hub category exposes `Hub.on()`, which returns an `Observable` for all events on a given channel. You can then apply the standard RxJava [`filter`](http://reactivex.io/documentation/operators/filter.html) operator to inspect only those events you care about.

#### `Storage` upload & download operations

TK

## Cancelling operations

TK