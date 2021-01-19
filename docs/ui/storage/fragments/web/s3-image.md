<inline-fragment src="~/ui/fragments/web/installation.md"></inline-fragment>

## Usage

<docs-filter framework="react">

```jsx
import React from "react";
import Amplify from "aws-amplify";
import {AmplifyS3Image} from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => <AmplifyS3Image imgKey="example.png" />;
```

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

_app.component.html_

```html
<amplify-s3-image img-key="example.png"></amplify-s3-image>
```

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

_app.component.html_

```html
<amplify-s3-image img-key="example.png"></amplify-s3-image>
```

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app.md"></inline-fragment>

_App.vue_

```html
<template>
  <amplify-s3-image img-key="example.png" />
</template>
```

</docs-filter>

<ui-component-props tag="amplify-s3-image" prop-type="attr" use-table-headers></ui-component-props>

<ui-component-props tag="amplify-s3-image" prop-type="css" use-table-headers></ui-component-props>

```css
amplify-s3-image {
  --height: 200px;
  --width: 400px;
}
```

## Use Cases

### Getting files from protected access level

Protected files from S3 bucket can be accessed by anyone other than the owner by using the `identityId` of the owner.

<docs-filter framework="react">

```jsx
const App = () => (
  <AmplifyS3Image
    level="protected"
    imgKey="example.png"
    identityId="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
  />
);
```

</docs-filter>

<docs-filter framework="angular">

_app.component.html_

```html
<amplify-s3-image
  level="protected"
  img-key="example.png"
  identity-id="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
></amplify-s3-image>
```

</docs-filter>

<docs-filter framework="ionic">

_app.component.html_

```html
<amplify-s3-image
  level="protected"
  img-key="example.png"
  identity-id="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
></amplify-s3-image>
```

</docs-filter>

<docs-filter framework="vue">

_App.vue_

```html
<template>
  <amplify-s3-image
    level="protected"
    img-key="example.png"
    identity-id="us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXX"
  />
</template>
```

</docs-filter>

## Migration

To migrate from using the `aws-amplify-<framework>` library to the latest `@aws-amplify/ui-<framework>` library use the steps below:

<inline-fragment src="~/ui/fragments/web/installation-diff.md"></inline-fragment>

### Usage

<docs-filter framework="react">

```diff
- import { S3Image } from 'aws-amplify-react';
+ import { AmplifyS3Image } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3Image imgKey="example.png" />
- <S3Image imgKey="example.png" />

);
```

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

_app.component.html_

```diff
+ <amplify-s3-image img-key="example.png"></amplify-s3-image>
- <s3-image img-key="example.png"></s3-image>
```

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

_app.component.html_

```diff
+ <amplify-s3-image img-key="example.png"></amplify-s3-image>
- <s3-image img-key="example.png"></s3-image>
```

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app-diff.md"></inline-fragment>

_App.vue_

```diff
 <template>
- <s3-image img-key="example.png" />
+ <amplify-s3-image img-key="example.png" />
 </template>
```

</docs-filter>

If you were using `S3Image` with `picker` property enabled, please see the documentation for [`S3ImagePicker`](~/ui/storage/s3-image-picker.md).
