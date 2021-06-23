To update a single user attribute, call updateUserAttribute:

```dart
try {
  var res = await Amplify.Auth.updateUserAttribute(
    userAttributeKey: 'email',
    value: 'email@email.com',
  );
  if (res.nextStep.updateAttributeStep == 'CONFIRM_ATTRIBUTE_WITH_CODE') {
    var destination = res.nextStep.codeDeliveryDetails.destination;
    print('Confirmation code sent to $destination');
  } else {
    print('Update completed');
  }
} on AmplifyException catch (e) {
  print(e.message);
}
```

To update a single user attribute, call `updateUserAttribute`:

```dart
var attributes = [
  AuthUserAttribute(userAttributeKey: 'email', value: 'email@email.com'),
  AuthUserAttribute(userAttributeKey: 'last_name', value: 'MyLastName')
];
try {
  var res = await Amplify.Auth.updateUserAttributes(attributes: attributes);
  if (res.nextStep.updateAttributeStep == 'CONFIRM_ATTRIBUTE_WITH_CODE') {
    var destination = res.nextStep.codeDeliveryDetails.destination;
    print('Confirmation code sent to $destination');
  } else {
    print('Update completed');
  }
} on AmplifyException catch (e) {
  print(e.message);
}
```