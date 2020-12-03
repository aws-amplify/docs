```dart
AmplifyDataStore.events.listenToDataStore((event) {
    if (event["eventName"] == "networkStatus") {
        setState(() {
            networkIsUp = event["active"];
        });
    }
});
```

<amplify-callout>

All Flutter DataStore Hub events are currently structured as serialized maps. The event name is specified in an 'eventName' attribute within the map.

Coming soon: Support for custom event types and automated model instantiation within the event payload.

</amplify-callout>

<amplify-callout>

Setup your Hub Listener or Subscriber before calling Amplify.configure() to avoid missing some DataStore events.

</amplify-callout>
