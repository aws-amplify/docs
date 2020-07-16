`S3Image` component renders an *Amazon S3 object key* as an image:

```jsx
import { S3Image } from 'aws-amplify-react';

render() {
    return <S3Image imgKey={key} />
}
```

For private images, supply the `level` property:

```jsx
return <S3Image level="private" imgKey={key} />
```

To show another user's protected image, supply that user's `identityId` property as well:

```jsx
return <S3Image level="protected" identityId={identityId} imgKey={key} />
```

To initiate an upload, set the `body` property:

```jsx
import { S3Image } from 'aws-amplify-react';

render() {
    return <S3Image imgKey={key} body={this.state.image_body} />
}

```

To hide the image shown in the S3Image, set `hidden`:

```jsx
import { S3Image } from 'aws-amplify-react';

render() {
    return <S3Image hidden imgKey={key} />
}
```

**Image URL**

`S3Image` converts path to actual URL. To get the URL, listen to the `onLoad` event:

```jsx
<S3Image imgKey={key} onLoad={url => console.log(url)} />
```

**Photo Picker**

Set `picker` property to true on `S3Image`. A `PhotoPicker` let the user pick a picture from the device. After users picks an image, the image will be uploaded with `imgKey`.

```jsx
<S3Image imgKey={key} picker />
```

When you set `path`, the *key* for the image will be the combination of `path` and image file name.

```jsx
<S3Image path={path} picker />
```

To generate a custom key value, you can provide a callback:

```jsx
function fileToKey(data) {
    const { name, size, type } = data;
    return 'test_' + name;
}

...
<S3Image path={path} picker fileToKey={fileToKey} />
```

<amplify-callout>

`S3Image` will escape all spaces in key values to underscore. For example, 'a b' will be converted to 'a_b'.

</amplify-callout>
