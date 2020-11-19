Add the following dependency to your **app**'s `pubspec.yaml` along with others you added above in **Prerequisites**:

```yaml
dependencies:
  flutter:
    sdk: flutter
  amplify_storage_s3: '<1.0.0'
  # reminder: amplify_auth_cognito should also be installed
```

Don't forget to import it in your project:

```dart
// // main.dart
// reminder: import 'package:amplify_auth_cognito/amplify_auth_cognito.dart';
import 'package:amplify_storage_s3/amplify_storage_s3.dart';
```
