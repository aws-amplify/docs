In your Flutter project directory, open **pubspec.yaml**.  

> You will already have configured Amplify by following the steps in the project setup. 

Add Analytics by adding these libraries into your dependencies block: 

```yaml 
dependencies:

  # Should already be added during Project Setup walkthrough 
  amplify_core:
    path: '<1.0.0'

  # Add these lines in `dependencies` 
  amplify_analytics_pinpoint:
    path: '<1.0.0'
```