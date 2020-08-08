`S3Image` component renders an *Amazon S3 object key* as an image:

![S3Image](~/images/s3image.png)


```jsx
import React from 'react';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { withAuthenticator, S3Image } from 'aws-amplify-react-native';

Amplify.configure(awsconfig)

const App = () => {
  return (
    <S3Image imgKey={key} />
  );
}

export default withAuthenticator(App);
```

For private images, supply the `level` property:

```jsx
return (
    <S3Image level="private" imgKey={key} />
);
```

To initiate an upload, set the `body` property:

```jsx
return (
    <S3Image imgKey={key} body={this.state.image_body} />
);
```

Set the `resizeMode` property to determine how to resize the image if the frame doesn't match the image dimensions:

![S3Image resizeMode Example](~/images/s3image-resize-mode.png)
