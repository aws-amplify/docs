```dart
auth.events.startListening((hubEvent) {
  switch(hubEvent["eventName"]) {
    case "SIGNED_IN": {
      print("USER IS SIGNED IN");
    }
    break;
    case "SIGNED_OUT": {
      print("USER IS SIGNED OUT");
    }
    break;
    case "SESSION_EXPIRED": {
      print("USER IS SIGNED IN");
    }
    break;
  }
});
```