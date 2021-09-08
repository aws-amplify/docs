Change the custom provider to retrieve the current session:

```dart
import 'package:amplify_api/amplify_api.dart';
import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';

class CustomOIDCProvider extends OIDCAuthProvider {
  const CustomOIDCProvider();

  @override
  Future<String?> getLatestAuthToken() async {
    final session = await Amplify.Auth.fetchAuthSession() as CognitoAuthSession;
    return session.userPoolTokens?.idToken;
  }
}
```

<inline-fragment platform="flutter" src="~/lib/graphqlapi/fragments/flutter/authz/2X_add_plugin.md"></inline-fragment>
