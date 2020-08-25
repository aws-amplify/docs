## Usage

<docs-filter framework="react">

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyChatbot } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
  <AmplifyChatbot
    botName="yourBotName"
    botTitle="My ChatBot"
    welcomeMessage="Hello, how can I help you?"
  />
);
```
</docs-filter>

<docs-filter framework="angular">

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

_app.component.html_

```html
<amplify-chatbot
  bot-name="yourBotName"
  bot-title="My ChatBot"
  welcome-message="Hello, how can I help you?"
/>
```
</docs-filter>

<docs-filter framework="ionic">

_app.module.ts_

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
  imports: [AmplifyUIAngularModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

_app.component.html_

```html
<amplify-chatbot
  bot-name="yourBotName"
  bot-title="My ChatBot"
  welcome-message="Hello, how can I help you?"
/>
```
</docs-filter>

<docs-filter framework="vue">

_main.js_

```js
import Vue from 'vue';
import App from './App.vue';
import '@aws-amplify/ui-vue';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

_App.vue_

```html
<template>
  <amplify-chatbot
    bot-name="yourBotName"
    bot-title="My ChatBot"
    welcome-message="Hello, how can I help you?"
  />
</template>
```
</docs-filter>

<ui-component-props tag="amplify-chatbot" use-table-headers></ui-component-props>

## Use Cases

### Setting Up Voice Chat
In order for voice input to work with Amazon Lex, you may have to enable output voice in [AWS Management Console](https://console.aws.amazon.com/console/home). Under the Amazon Lex service, click on your configured Lex chatbot and go to settings -> General and pick your desired output voice. 

### Listening to Chat Fulfillment
Once a conversation session is finished, `amplify-chatbot` emits a custom event `chatCompleted` that your app can listen to:

```js
  const chatbotElement = document.querySelector('amplify-chatbot');
  chatbotElement.addEventListener('chatCompleted', event => {
    const { data, err } = event.detail;
    if (data) console.log('Chat fulfilled!', JSON.stringify(data));
    if (err) console.error('Chat failed:', err);
  });
```
