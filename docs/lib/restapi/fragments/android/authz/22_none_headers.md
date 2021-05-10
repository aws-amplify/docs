If you would like to add request headers, you can add it directly to the request

TODO: Android code snippets

<amplify-block-switcher>
<amplify-block name="Java">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```java
let headers: [String: String] = ["headerField": "headerValue"]
let request = RESTRequest(headers: headers)
```

</amplify-block>
<amplify-block name="Kotlin - Callbacks">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```kotlin
let headers: [String: String] = ["headerField": "headerValue"]
let request = RESTRequest(headers: headers)
```

</amplify-block>
<amplify-block name="Kotlin - Coroutines (Beta)">

This implementation uses `CompletableFuture<T>`, which requires `minSdkVersion >= 24`.

```kotlin
let headers: [String: String] = ["headerField": "headerValue"]
let request = RESTRequest(headers: headers)
```

</amplify-block>
<amplify-block name="RxJava">

```
let headers: [String: String] = ["headerField": "headerValue"]
let request = RESTRequest(headers: headers)
```
</amplify-block>
<amplify-block name="Kotlin (with RxJava)">

```
let headers: [String: String] = ["headerField": "headerValue"]
let request = RESTRequest(headers: headers)
```

</amplify-block>
</amplify-block-switcher>
