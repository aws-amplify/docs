When using a third-party OIDC auth provider, you are required to subclass `OIDCAuthProvider` and configure the API plugin with an instance of this class. The responsibility of the auth provider is to return the JWT token that was minted by your OIDC service. To do this:

* Create a class which extends `OIDCAuthProvider`

```dart
import 'package:amplify_api/amplify_api.dart';

class CustomOIDCProvider extends OIDCAuthProvider {
  const CustomOIDCProvider();

  @override
  Future<String?> getLatestAuthToken() async {
    ...
  }
}
```

* Register your instance of `APIAuthProvider` prior to calling `Amplify.configure()`:

```dart
final datastorePlugin =
    AmplifyDataStore(modelProvider: ModelProvider.instance);
await Amplify.addPlugin(datastorePlugin);
await Amplify.addPlugin(AmplifyAPI(
    authProviders: const [
        CustomOIDCProvider(),
    ],
));
await Amplify.configure(amplifyconfig);
```
