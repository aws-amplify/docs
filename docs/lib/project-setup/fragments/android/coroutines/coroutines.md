Amplify provides an optional and separate API surface which is entirely focused on using Kotlin's [coroutines](https://developer.android.com/kotlin/coroutines) and [flows](https://developer.android.com/kotlin/flow).

To use it, import **`Amplify`** facade from `core-kotlin` instead of from `core`.

With the Coroutines APIs, most Amplify functions are expressed as `suspend` functions:

```kotlin
import com.amplifyframework.kotlin.core.Amplify
// ...

val post = Post.builder()
    .title("My First Post")
    .build()

lifecycleScope.launch {
    try {
        Amplify.DataStore.save(post) // This is suspending function!
        Log.i("AmplifyKotlinDemo", "Saved a post")
    } catch (failure: DataStoreException) {
        Log.e("AmplifyKotlinDemo", "Save failed", failure)
    }
}
```

Compared to the traditional callback API, this doesn't make a big difference when used for a single method call.

However, it greatly improves readability when chaining asynchronous calls. Moreover, you can use scopes, dispatchers, and other Kotlin coroutine primitives to get more control over your execution context.

Let's revisit our nested example where we saved `Post`, `Editor`, and `PostEditor`. With Amplify's coroutines interface, we can write these operations sequentially:


```kotlin
lifecycleScope.launch {
    try {
        Amplify.DataStore.save(post)
        Amplify.DataStore.save(editor)
        Amplify.DataStore.save(postEditor)
        Log.i("AmplifyKotlinDemo", "Post, Editor, and PostEditor saved")
    } catch (failure: DataStoreException) {
        Log.e("AmplifyKotlinDemo", "An item failed to save", failure)
    }
}
```

Compared to nesting these dependent calls in callbacks, this provides a much more readable pattern.

## Installation

Amplify's coroutine support is included in an optional module, `core-kotlin`. To start using the coroutine APIs, add the following dependency to your application's Gradle file:

Under **Gradle Scripts**, open **build.gradle (Module: [YourApplicationName])**.

Add the following line in `dependencies`:

```groovy
dependencies {
    // Add the below line in `dependencies`
    implementation 'com.amplifyframework:core-kotlin:0.1.0'
}
```

## Usage

Amplify tries to map the behavior of our callback-based APIs to Kotlin primitives in an intuitive way. Functions whose callbacks emit a single value (or error) are now expressed as suspending functions, returning the value instead. Functions whose callbacks emit a stream of values will now return Kotlin `Flow`s, instead.

## Special cases

Some APIs return an operation which can be cancelled. Examples include subscribing to an API or uploading or downloading objects from Storage.

### API subscriptions

The API category's `subscribe()` method exposes two `Flow`s: one for subscription data, and one for connection state. You can access these flows using the `connectionState()` and `subscriptionData()` accessor methods on the returned operation:

```kotlin
lifecycleScope.async {
    try {
        Amplify.API.subscribe(request)
            .catch { Log.e("AmplifyKotlinDemo", "Error on subscription", it) }
            .collect { Log.i("AmplifyKotlinDemo", "Data on subscription = $it") }
    } catch (error: ApiException) {
        Log.e("AmplifyKotlinDemo", "Failed to establish subscription", error)
    }
}
```

### Storage upload & download operations

The Storage category's `downloadFile()` and `uploadFile()` work largely the same way. `uploadFile()` and `downloadFile()` both return an operation that presents a suspending `result()` function alongside a `progress()` function that returns a `Flow`. The `result()` function can be used to obtain the result of the download, and `progress()`'s `Flow` can be used to monitor download/upload progress.

```java
// Download
val download = Amplify.Storage.downloadFile(remoteKey, localFile)

lifecycleScope.async {
    download
        .progress()
        .collect { Log.i("AmplifyKotlinDemo", "Download progress = $it") }
}
lifecycleScope.async {
    try {
        val result = download.result()
        Log.i("AmplifyKotlinDemo", "Download finished! ${result.file.path}")
    } catch (failure: StorageException) {
        Log.e("AmplifyKotlinDemo", "Download failed", failure)
    }
}

// Upload
val upload = Amplify.Storage.uploadFile(remoteKey, localFile)

lifecycleScope.async {
    upload
        .progress()
        .collect { Log.i("AmplifyKotlinDemo", "Upload progress = $it") }
}
lifecycleScope.async {
    try {
        val result = upload.result()
        Log.i("AmplifyKotlinDemo", "Upload finished! ${result.key}")
    } catch (failure: StorageException) {
        Log.e("AmplifyKotlinDemo", "Upload failed", failure)
    }
}
```

