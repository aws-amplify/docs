Amplify provides an optional and separate API surface which is entirely focused on using Kotlin's [coroutines](https://developer.android.com/kotlin/coroutines) and [flows](https://developer.android.com/kotlin/flow).

To use it, import **`Amplify`** facade from `core-kotlin` instead of from `core`. See the Installation notes below for more details.

With the Coroutines APIs, most Amplify functions are expressed as `suspend` functions. Suspending functions can be launched using one of the [lifecycle-aware coroutine scopes](https://developer.android.com/topic/libraries/architecture/coroutines#lifecyclescope) in the Android Architecture components:


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

Coroutines can greatly improve the readability of dependent, asynchronous calls. Moreover, you can use scopes, dispatchers, and other Kotlin coroutine primitives to get more control over your execution context.

Let's consider what happens when we have three dependent operations. We want to save a `Post`, then an `Editor`, and finally a `PostEditor`. With Amplify's coroutines interface, we can write these operations sequentially:


```kotlin
lifecycleScope.launch {
    try {
        listOf(post, editor, postEditor)
            .forEach { Amplify.DataStore.save(it) }
        Log.i("AmplifyKotlinDemo", "Post, Editor, and PostEditor saved")
    } catch (failure: DataStoreException) {
        Log.e("AmplifyKotlinDemo", "An item failed to save", failure)
    }
}
```

In Amplify's vanilla APIs, this would have created a large block of code with three nested callbacks.

## Installation

Amplify's coroutine support is included in an optional module, `core-kotlin`. 

1.  Under **Gradle Scripts**, open **build.gradle (Module: [YourApplicationName])**, and add the following line in `dependencies`:

    ```groovy
    dependencies {
        // Add the below line in `dependencies`
        implementation 'com.amplifyframework:core-kotlin:0.2.0'
    }
    ```

2. Wherever you use the **`Amplify`** facade, import `com.amplifyframework.kotlin.core.Amplify` instead of `com.amplifyframework.core.Amplify`:

    ```java
    import com.amplifyframework.kotlin.core.Amplify
    ```

## Usage

Amplify tries to map the behavior of our callback-based APIs to Kotlin primitives in an intuitive way. Functions whose callbacks emit a single value (or error) are now expressed as suspending functions, returning the value instead. Functions whose callbacks emit a stream of values will now return Kotlin `Flow`s, instead.

## Special cases

Some APIs return an operation which can be cancelled. Examples include realtime subscriptions to an API, and uploading/downloading objects from Storage.

### API subscriptions

The API category's `subscribe()` function uses both a suspend function _and_ a Flow. The function suspends until the API subscription is established. Then, it starts emitting values over the Flow.

```kotlin
lifecycleScope.async {
    try {
        Amplify.API.subscribe(request) // Suspends until subscription established
            .catch { Log.e("AmplifyKotlinDemo", "Error on subscription", it) }
            .collect { Log.i("AmplifyKotlinDemo", "Data on subscription = $it") }
    } catch (error: ApiException) {
        Log.e("AmplifyKotlinDemo", "Failed to establish subscription", error)
    }
}
```

### Storage upload & download operations

The Storage category's `downloadFile()` and `uploadFile()` functions are bit more complex. These APIs allow you to observe transfer progress, and also to obtain a result. Progress results are delivered over a Flow, returned from the `progress()` function. Completion events are delivered by a suspending `result()` function.

```kotlin
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
