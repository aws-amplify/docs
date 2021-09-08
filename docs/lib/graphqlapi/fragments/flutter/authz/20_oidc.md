To start, create a provider class inheriting from `OIDCAuthProvider`.

```dart
import 'package:amplify_api/amplify_api.dart';

class CustomOIDCProvider extends OIDCAuthProvider {
  const CustomOIDCProvider();

  @override
  Future<String?> getLatestAuthToken() async => '[OPEN-ID-CONNECT-TOKEN]';
}
```

<inline-fragment platform="flutter" src="~/lib/graphqlapi/fragments/flutter/authz/2X_add_plugin.md"></inline-fragment>
