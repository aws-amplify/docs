Add the following dependency to your **app**'s `pubspec.yaml` along with others you added above in **Prerequisites**:

```yaml
dependencies:
  flutter:
    sdk: flutter
  amplify_storage_s3: '<1.0.0'
}
```

Don't forget to import it in your project:

```dart
// main.dart
import 'package:amplify_storage_s3/amplify_storage_s3.dart';
```
