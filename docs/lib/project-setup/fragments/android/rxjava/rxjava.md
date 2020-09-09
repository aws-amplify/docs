
The Amplify library for Android ships with APIs that return results via callbacks, as in:

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
Post post = Post.builder()
    .title("My First Post")
    .build();

RxAmplify.DataStore.save(post)
    .subscribe(
        () -> Log.i("MyAmplifyApp", "Saved a post."),
        failure -> Log.e("MyAmplifyApp", "Save failed.", failure)
    );
```

While this doesn't save much for a single invocation, it provides great readability benefits when chaining asynchronous calls, since you can use standard RxJava operators to compose complex functionality into readable chunks.

Consider a relational model where the creation of a `Post` also requires the creation of a `User` for the editor, and a `PostEditor` object to link the two together:

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

Amplify's RxJava bindings are included with Amplify. To use them, add the dependency to your application's gradle file.

Under **Gradle Scripts**, open **build.gradle (Module: [YourApplicationName])**.

Add the following line in `dependencies`:

```groovy
dependencies {
    // Add the below line in `dependencies`
    implementation 'com.amplifyframework:rxbindings:1.3.1'
}
```

## Usage

Amplify strives to provide an intuitive interface for APIs that expose RxJava functionality by using the counterpart callback API signature, minus the result callbacks. The majority of APIs return an RxJava `Single`, `Observable`, or `Completable`. 

### Special cases

Some APIs return an operation which is cancellable such as subscribing to an API or uploading or downloading objects from Storage.

#### `API.subscribe()`

The `API.subscribe()` method exposes two `Observable` streams for subscription data and connection state accessible via `observeConnectionState()` and `observeSubscriptionData()` on the operation respectively.

```java
RxSubscriptionOperation<? extends GraphQLResponse<?>> subscription =
      RxAmplify.API.subscribe(request);

subscription
      .observeConnectionState()
      .subscribe(
        connectionStateEvent -> Log.i("StatusObserver", String.valueOf(connectionStateEvent))
      );

subscription
      .observeSubscriptionData()
      .subscribe(
          data -> Log.i("SubscriptionObserver", data),
          exception -> Log.e("SubscriptionObserver", "Subscription failed.", exception),
          () -> Log.i("SubscriptionObserver", "Subscription completed.")
      );
```

#### `Storage` upload & download operations

Similarly, `Storage.download()` and `Storage.upload()` return an operation which provide two `Observable` objects for download/upload progress and for the result of the operation.

```java
// Download
RxProgressAwareSingleOperation<StorageDownloadFileResult> download =
      RxAmplify.Storage.downloadFile(remoteKey, localFile);

download
      .observeProgress()
      .subscribe(
        progress -> Log.i("ProgressObserver", progress.toString())
      );

download
      .observeResult()
      .subscribe(
        result -> Log.i("ResultObserver", result.getFile().getPath()),
        exception -> Log.e("ResultObserver", "", exception)
      );

// Upload
RxProgressAwareSingleOperation<StorageUploadFileResult> upload =
      RxAmplify.Storage.uploadFile(remoteKey, localFile);

upload
      .observeProgress()
      .subscribe(
        progress -> Log.i("ProgressObserver", progress.toString())
      );

upload
      .observeResult()
      .subscribe(
        result -> Log.i("ResultObserver", result.getKey()),
        exception -> Log.e("ResultObserver", "", exception)
      );
```
