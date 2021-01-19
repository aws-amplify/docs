<inline-fragment src="~/ui/fragments/web/installation.md"></inline-fragment>

## Usage

<docs-filter framework="react">

```jsx
import React from "react";
import Amplify from "aws-amplify";
import {AmplifyS3TextPicker} from "@aws-amplify/ui-react";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

const App = () => <AmplifyS3TextPicker />;
```

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

_app.component.html_

```html
<amplify-s3-text-picker></amplify-s3-text-picker>
```

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module.md"></inline-fragment>

_app.component.html_

```html
<amplify-s3-text-picker></amplify-s3-text-picker>
```

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app.md"></inline-fragment>

_App.vue_

```html
<template>
  <amplify-s3-text-picker />
</template>
```

</docs-filter>

<ui-component-props tag="amplify-s3-text-picker" prop-type="attr" use-table-headers></ui-component-props>

## Migration

To migrate from using the `aws-amplify-<framework>` library to the latest `@aws-amplify/ui-<framework>` library use the steps below:

<inline-fragment src="~/ui/fragments/web/installation-diff.md"></inline-fragment>

### Usage

<docs-filter framework="react">

```diff
- import { S3Text } from 'aws-amplify-react';
+ import { AmplifyS3TextPicker } from '@aws-amplify/ui-react';

const App = () => (

+ <AmplifyS3TextPicker />
- <S3Text picker/>

);
```

</docs-filter>

<docs-filter framework="angular">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

_app.component.html_

```diff
+ <amplify-s3-text-picker></amplify-s3-text-picker>
- <s3-text picker></s3-text>
```

</docs-filter>

<docs-filter framework="ionic">

<inline-fragment src="~/ui/fragments/angular/configure-module-diff.md"></inline-fragment>

_app.component.html_

```diff
+ <amplify-s3-text-picker></amplify-s3-text-picker>
- <s3-text picker></s3-text>
```

</docs-filter>

<docs-filter framework="vue">

<inline-fragment src="~/ui/fragments/vue/configure-app-diff.md"></inline-fragment>

_App.vue_

```diff
 <template>
- <s3-text picker/>
+ <amplify-s3-text-picker/>
 </template>
```

</docs-filter>

If you want to use `S3Text` without `picker` property enabled, please see the documentation for [`S3Text`](~/ui/storage/s3-text.md).
