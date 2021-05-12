## Set up your application

### Create a new Flutter application 

Create a new project using Flutter CLI:

```bash
flutter create amplified_todo
```

### Add Amplify to your application

Amplify for Flutter is distributed via **pub.dev**.

1. From your project root directory, find and modify pubspec.yaml and add the Amplify plugins to the project dependencies.

    ```yaml
    dependencies:
    flutter:
      sdk: flutter

    amplify_flutter: <1.0.0
    amplify_datastore: <1.0.0
    ```

2. Install the dependencies by running the following command. Depending on your development environment, you may perform this step via your IDE (or it may even be performed for you automatically).

    ```bash
    flutter pub get 
    ```

### Update target iOS platform

From your project root, navigate to the `ios/` directory and modify the `Podfile` using a text editor of your choice and update the target iOS platform to 13.0 or higher.

```bash
platform :ios, '13.0'
```

### Update target Android SDK version

From your project root, navigate to the `android/app/` directory and modify `build.gradle` using a text editor of your choice and update the target Android SDK version to 21 or higher:

```bash
minSdkVersion 21
```

You are ready to start building with Amplify! 🎉
