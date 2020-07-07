<amplify-authenticator></amplify-authenticator>

## Installation

```
yarn add aws-amplify @aws-amplify/ui-react
```

## Usage

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
 <AmplifyS3Image imgKey="example.png" />
);
```

<ui-component-props tag="amplify-s3-image" use-table-headers></ui-component-props>

---

## Use Cases

#### Getting images from different access level

Anyone can access the images from S3 bucket which has a public access.

```jsx

const App = () => (
 <AmplifyS3Image level="public" imgKey="example.png" />
);

```

Protected images from S3 bucket can be accessed not only by the  
```jsx
const App = () => (
 <AmplifyS3Image level="protected" imgKey="example.png" identityId="identityId"/>
);
```


```jsx
const App = () => (
 <AmplifyS3Image level="private" imgKey="example.png" />
);
```