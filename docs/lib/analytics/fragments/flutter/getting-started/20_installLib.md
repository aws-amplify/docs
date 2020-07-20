In your Flutter project directory, open **pubspec.yaml**.  You will already have configured Amplify by following the steps in the Project setup walkthrough. 

Add Analytics by adding these libraries into your dependencies block: 

```yaml 
dependencies:

  # Should already be added during Project Setup walkthrough 
  amplify_core:
    path: ../../amplify_core

  # Add these lines in `dependencies` 
  amplify_analytics_pinpoint:
    path: ../
```