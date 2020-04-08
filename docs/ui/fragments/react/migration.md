## FAQs

### How do I migrate to the new UI Component libary?

#### Installation

```diff
- yarn add aws-amplify-react
+ yarn add @aws-amplify/ui-react
```

#### Usage

```diff
- import { Authenticator } from 'aws-amplify-react';
+ import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyAuthenticator>
- <Authenticator>
    <div>
      My App
+     <AmplifySignOut />
    </div>
+ </AmplifyAuthenticator>;
- </Authenticator>
);
```