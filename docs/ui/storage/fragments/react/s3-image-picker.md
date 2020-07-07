<amplify-authenticator></amplify-authenticator>

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3ImagePicker } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
 <AmplifyS3ImagePicker path="samples/"/>
);
```

<ui-component-props tag="amplify-s3-image-picker" use-table-headers></ui-component-props>

---