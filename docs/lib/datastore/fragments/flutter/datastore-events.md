```dart
StreamSubscription hubSubscription = Amplify.Hub.listen([HubChannel.DataStore], (hubEvent) {
    if (hubEvent.eventName == 'networkStatus') {
        setState(() {
            networkIsUp = hubEvent.payload.active;
        });
    }
});
```

<amplify-callout>

Setup your Hub Listener or Subscriber before calling Amplify.configure() to avoid missing some DataStore events.

</amplify-callout>
