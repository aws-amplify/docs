```dart
auth.events.startListening((hubEvent) {
  if (hubEvent["eventName"] == "SIGNED_OUT") {
    try {
      await Amplify.DataStore.clear();
      print("DataStore is cleared.");
    } catch (e) {
      print("Failed to clear DataStore.");
    }
  }
});
```
