---
---

# UI Components

## Overview 

AWS Amplify provides drop-in UI components with a [style guide](https://aws-amplify.github.io/media/ui_library) for your apps that automatically integrate with your configured cloud services. 
- [Higher Order Components](https://reactjs.org/docs/higher-order-components.html) (HOC) for both React and React Native applications. 
 - Angular components
 - Ionic components

## Authentication

User interface elements that provide drop-in components for user authentication. By default these components will use Amazon Cognito.

### Authenticator

The Authenticator is a drop-in UI component that provides:

 - User Sign in
 - User Sign up
 - User Sign out
 - Forgot Password
 - Federated authentication
 - MFA (Multi-Factor Authentication) e.g. SMS, Email, and TOTP (Temporary One Time Password)
 - Confirm MFA Code's and Provide QR codes for TOTP

> React (aws-amplify-react) and React native (aws-amplify-react-native) provide HOCs for Authentication via [withAuthenticator]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication#using-components-in-react). Angular and Ionic provide components and service provider.


Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/authentication#using-components-in-react--react-native), [Angular/Ionic]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#authenticator), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#authentication-components)

## Storage 

User interface elements that provide drop-in components for image uploading and viewing. By default components will use Amazon S3.

### Photo Picker

The Photo Picker is a drop-in Ui component that provides:

 - File chooser
 - Image UI preview
 - Image upload
 - Events for file chosen and upload

Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#picker) or [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#photo-picker), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#storage-components)

### Album

The Album is a drop-in UI component that provides:

 - Image listing
 - Events for image selection with URLs

Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#s3album) or [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/storage#s3-album), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#storage-components)

## Interactions

User interface elements that provide drop-in components for AI enabled chat bot interactions. By default components will use Amazon Lex.

### Chatbot

The Chatbot is a drop-in UI component that provides:

 - Conversation UI
 - Events for conversation complete

Available for [React]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/interactions#using-with-react), [React Native]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/interactions#using-with-react-native), [Angular]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#interactions), [Ionic]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/angular#interactions), and [Vue]({%if jekyll.environment == 'production'%}{{site.amplify.docs_baseurl}}{%endif%}/js/vue#interaction-components)
