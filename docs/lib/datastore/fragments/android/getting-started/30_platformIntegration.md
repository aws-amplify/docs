The `amplify-tools-gradle-plugin` Gradle plugin provides an integration layer between the Amplify CLI headless mode (i.e. no AWS credentials needed) and Android Studio. It integrates into the build process of the IDE to provide a seamless experience.

First, add the plugin to your project-level `build.gradle`.

Add the plugin as a dependency under the `buildscript`'s `dependencies` block:

```groovy
buildscript {
    repositories {
        mavenCentral()
        google()
        jcenter()
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:4.0.1'
        // Add this next line:
        classpath 'com.amplifyframework:amplify-tools-gradle-plugin:1.0.2'
    }
}
```

At the end of that same project-level `build.gradle`, apply the plugin:
```groovy
apply plugin: 'com.amplifyframework.amplifytools'
```

In Android Studio, go to the File menu and select **Sync Project with Gradle Files**.

Once that completes, you see will see new run/debug configurations available in the top menu bar of Android Studio. Look to the left of the green **Run** button. In the drop-down, you will see:

- `modelgen`
- `amplifyPush`

