## Migration

To migrate from the legacy chatbot component to the latest chatbot component, use the steps below:

<inline-fragment src="~/ui/fragments/web/installation-diff.md"></inline-fragment>

### Usage

<docs-filter framework="react">

```diff
- import { ChatBot } from 'aws-amplify-react';
+ import { AmplifyChatbot } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyChatbot botName="yourBotName" />
- <ChatBot botName="yourBotName" />

);
```

If you were using `onComplete` prop previously, you need to use `eventListener` [described above](~/ui/interactions/chatbot.md#listening-to-chat-fulfillment).

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

_app.component.html_

```diff
+ <amplify-chatbot bot-name="yourBotName"></amplify-chatbot>
- <amplify-interactions bot="yourBotName"/></amplify-interactions>
```

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

_app.component.html_

```diff
+ <amplify-chatbot bot-name="yourBotName"></amplify-chatbot>
- <amplify-interactions framework="Ionic" bot="yourBotName"></amplify-interactions>
```

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app-diff.md"></inline-fragment>

</docs-filter>
