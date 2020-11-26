```dart
Stream<SubscriptionEvent<Post>> stream =
    Amplify.DataStore.observe(Post.classType);
stream.listen((event) {
    print("Received event of type " + event.eventType.toString());
    print("Received post " + event.item.toString());
});
```
