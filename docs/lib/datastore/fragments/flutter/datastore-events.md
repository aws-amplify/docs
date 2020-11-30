```dart
datastorePlugin.events.listenToDataStore((msg) {
      print(msg);
    }
);
```

<amplify-callout>

Please note that all amplify-flutter DataStore Hub events are currently structured as serialized maps.  The event name is specified in an 'eventName' attribute within the map.

Support for custom types representing these events as well as automated instantiation of models within the event payloads is forthcoming.  

</amplify-callout>