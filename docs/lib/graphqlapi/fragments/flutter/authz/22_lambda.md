To start, create a provider class inheriting from `FunctionAuthProvider`.

```dart
class CustomFunctionProvider extends FunctionAuthProvider {
    const CustomFunctionProvider();

    @override
    Future<String?> getLatestAuthToken() async => '[AWS-LAMBDA-AUTH-TOKEN]';
}
```

<inline-fragment platform="flutter" src="~/lib/graphqlapi/fragments/flutter/authz/2X_add_plugin.md"></inline-fragment>