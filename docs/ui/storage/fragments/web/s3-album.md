## Installation

<docs-filter framework="react">

```
yarn add aws-amplify @aws-amplify/ui-react
```
</docs-filter>
<docs-filter framework="angular">

```
yarn add aws-amplify @aws-amplify/ui-angular
```
</docs-filter>
<docs-filter framework="ionic">

```
yarn add aws-amplify @aws-amplify/ui-angular
```
</docs-filter>
<docs-filter framework="vue">

```
yarn add aws-amplify @aws-amplify/ui-vue
```
</docs-filter>

## Usage

<docs-filter framework="react">

```jsx
import React from 'react';
import Amplify from 'aws-amplify';
import { AmplifyS3Album } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

const App = () => (
 <AmplifyS3Album />
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
<amplify-s3-album />
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
<amplify-s3-album />
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
  <amplify-s3-album />
</template>
```
</docs-filter>

<ui-component-props tag="amplify-s3-album" use-table-headers></ui-component-props>

## Customization

### Custom CSS Properties

`amplify-s3-album` provides the following CSS properties to modify the style at component level.

| Name           | Description                      | Default value                    |
| ---------------| ---------------------------------| ---------------------------------|
| `--overlay-bg-color`     | Used to set the image overlay color on hover | `rgba(0, 0, 0, 0.15)` |

```css
amplify-s3-album {
  --overlay-bg-color: rgba(0, 0, 0, 1);
}
```