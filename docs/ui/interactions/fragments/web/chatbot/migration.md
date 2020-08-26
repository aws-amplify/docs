## Migration

To migrate from the legacy chatbot component to the latest chatbot component, use the steps below:

### Usage

<docs-filter framework="react">

```diff
- import { ChatBot } from 'aws-amplify-react';
+ // on preview: `yarn add @aws-amplify/ui-react@ui-preview`
+ import { AmplifyChatbot } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyChatbot botName="yourBotName" />
- <ChatBot botName="yourBotName" />

);
```

If you were using `onComplete` prop previously, you need to use `eventListener` [described above](~/ui/interactions/chatbot.md#listening-to-chat-fulfillment).

</docs-filter>

<docs-filter framework="angular">

_app.module.ts_

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
- import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
+ // on preview: `yarn add @aws-amplify/ui-angular@ui-preview`
+ import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
- imports: [AmplifyAngularModule, BrowserModule],
+ imports: [AmplifyUIAngularModule, BrowserModule],
- providers: [AmplifyService],
+ providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

_app.component.html_

```diff
+ <amplify-chatbot bot-name="yourBotName" />
- <amplify-interactions bot="yourBotName"/>
```

</docs-filter>

<docs-filter framework="ionic">

_app.module.ts_

```diff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
- import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
+ // on preview: `yarn add @aws-amplify/ui-angular@ui-preview`
+ import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent],
- imports: [AmplifyAngularModule, BrowserModule],
+ imports: [AmplifyUIAngularModule, BrowserModule],
- providers: [AmplifyService],
+ providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

_app.component.html_

```diff
+ <amplify-chatbot bot-name="yourBotName" />
- <amplify-interactions framework="Ionic" bot="yourBotName"/>
```

</docs-filter>

<docs-filter framework="vue">

_main.ts_

```diff
import Vue from 'vue';
import App from "./App.vue";
- import Amplify, * as AmplifyModules from 'aws-amplify'
- import { AmplifyPlugin } from 'aws-amplify-vue'
+ // on preview: `yarn add @aws-amplify/ui-vue@ui-preview`
+ import '@aws-amplify/ui-vue';
+ import Amplify from 'aws-amplify';
+ import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

</docs-filter>
