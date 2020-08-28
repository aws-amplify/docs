You can automatically track `Storage` operations on the following components: `AmplifyS3Album`, `AmplifyS3Text`, `AmplifyS3Image`, `AmplifyS3TextPicker`, `AmplifyS3ImagePicker` by providing a `track` prop:

<docs-filter framework="react">

```jsx
return <AmplifyS3Image track />
```
</docs-filter>

<docs-filter framework="angular">

```html
<amplify-s3-image track></amplify-s3-image>
```
</docs-filter>

<docs-filter framework="ionic">

```html
<amplify-s3-image track></amplify-s3-image>
```
</docs-filter>

<docs-filter framework="vue">

```html
<template>
    <amplify-s3-image track />
</template>
```
</docs-filter>

Enabling tracking will automatically send 'Storage' events to Amazon Pinpoint, and you will be able to see the results in AWS Pinpoint console under *Custom Events*. The event name will be *Storage*, and event details will be displayed in *attributes* , e.g. Storage -> Method -> Put.

