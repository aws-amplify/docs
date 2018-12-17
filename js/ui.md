---
---

# UI Components

## Overview 

AWS Amplify provides drop-in UI components with a [style guide](https://aws-amplify.github.io/media/ui_library) for your apps. You can use UI components to integrate cloud features to your app quickly, without building the related user experience from scratch. 

AWS Amplify UI Components are available as:
- [Higher Order Components](https://reactjs.org/docs/higher-order-components.html) (HOC) for both React and React Native. 
 - Angular components
 - Ionic components

## Using UI Components 

To enable a UI component, you first need to import it in your app, and later render it using an HOC in your code (for React and React Native) or using a directive in your view template (for Angular and Vue).

### React and React Native

The UI components for React and React Native is bundled in 'aws-amplify-react' and 'aws-amplify-react-native' library support packages respectively. When you import those packages in your app, UI components will be available for your use.

A sample use of UI components with React:
```javascript
import { Authenticator } from 'aws-amplify-react';
...
export default withAuthenticator(App);
```

You can alternatively render UI components by [using directives directly](authentication#using-the-authenticator-component-directly).

**Importing UI components selectively:**

When working with React and React Native, you can import individual UI components rather than importing the whole package. This will help you to keep your bundle size small by excluding unnecessary code.

To import only the Authentication UI component from the 'aws-amplify-react' package, use: 
```javascript
import { Authenticator } from 'aws-amplify-react/dist/Auth'; 
```

### Using UI components in Angular,Ionic and Vue 

The UI components for Angular, Ionic and Vue is bundled in respective library support packages. When you import those packages in your app, UI components will be available for your use.

A sample use of UI components with Angular:
```javascript
import { Authenticator } from 'aws-amplify-angular';
```

Use the directive to render the UI component:
```html
...
  <amplify-authenticator></amplify-authenticator>
...
```

## Authentication UI Components

Authentication UI components provide user interface elements for user authentication purposes. By default, the UI components work with Amazon Cognito.

### Authenticator

The Authenticator is a drop-in UI component that provides:

 - User Sign-in
 - User Sign-up
 - User Sign-out
 - Forgot Password
 - Federated authentication
 - MFA (Multi-Factor Authentication), e.g. SMS, Email, and TOTP (Temporary One Time Password)
 - Confirm MFA Code's and Provide QR codes for TOTP

> React (aws-amplify-react) and React native (aws-amplify-react-native) provide HOCs for Authentication via [withAuthenticator]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication#using-components-in-react). Angular and Ionic provide components and service provider.


Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication#using-components-in-react--react-native), [Angular/Ionic]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/ionic#authenticator), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#authentication-components)

## Storage UI Components

Storage UI components provide user interface elements for uploading and displaying images. By default, those components works with Amazon S3.

### Photo Picker

The Photo Picker is a drop-in UI component that provides:

 - File chooser
 - Image UI preview
 - Image upload
 - Events for file selection and upload

Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#picker) or [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#photo-picker), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#storage-components)

### Album 

The Album is a drop-in UI component that provides:

 - Image listing
 - Events for image selection with URLs

Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#s3album) or [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#s3-album), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#storage-components)

## Interactions UI Component

Interactions UI Component provide drop-in UI for AI enabled chat bot interactions. By default, the component works with Amazon Lex.

### Chatbot

The Chatbot is a drop-in UI component that provides:

 - Conversational UI
 - Events for completed conversation

Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/interactions#using-with-react), [React Native]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/interactions#using-with-react-native), [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#interactions), [Ionic]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/ionic#interactions), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#interaction-components)
