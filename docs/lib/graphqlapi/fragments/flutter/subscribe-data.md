Subscribe to mutations for creating real-time clients:

<amplify-block-switcher>
<amplify-block name="Java">

```java
 ApiOperation subscription = Amplify.API.subscribe(
        ModelSubscription.onCreate(Todo.class),
        onEstablished -> Log.i("ApiQuickStart", "Subscription established"),
        onCreated -> Log.i("ApiQuickStart", "Todo create subscription received: " + ((Todo) onCreated.getData()).getName()),
        onFailure -> Log.e("ApiQuickStart", "Subscription failed", onFailure),
        () -> Log.i("ApiQuickStart", "Subscription completed")
);

// Cancel the subscription listener when you're finished with it
subscription.cancel();
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
val subscription: ApiOperation<*>? = Amplify.API.subscribe(
        ModelSubscription.onCreate(Todo::class.java),
        { Log.i("ApiQuickStart", "Subscription established") },
        { onCreated -> Log.i("ApiQuickStart", "Todo create subscription received: " + onCreated.data.name) },
        { onFailure -> Log.e("ApiQuickStart", "Subscription failed", onFailure) },
        { Log.i("ApiQuickStart", "Subscription completed") }
)

// Cancel the subscription listener when you're finished with it
subscription!!.cancel()
```

</amplify-block>
<amplify-block name="RxJava">

```java
RxSubscriptionOperation<? extends GraphQLResponse<?>> subscription =
        RxAmplify.API.subscribe(request);

subscription
        .observeConnectionState()
        .subscribe(connectionStateEvent -> Log.i("ApiQuickStart", String.valueOf(connectionStateEvent)));

subscription
        .observeSubscriptionData()
        .subscribe(
            data -> Log.i("ApiQuickStart", data),
            exception -> Log.e("ApiQuickStart", "Subscription failed.", exception),
            () -> Log.i("ApiQuickStart", "Subscription completed.")
        );

// Cancel the subscription listener when you're finished with it
subscription.cancel();
```

</amplify-block>
</amplify-block-switcher>
