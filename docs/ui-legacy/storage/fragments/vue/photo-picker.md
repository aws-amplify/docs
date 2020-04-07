The PhotoPicker component provides your users to select and preview a file for upload to S3.

Usage: ```<amplify-photo-picker></amplify-photo-picker>```

Config:
```
<amplify-photo-picker v-bind:photoPickerConfig="photoPickerConfig"></amplify-photo-picker>
```

<inline-fragment framework="vue" src="~/ui-legacy/fragments/photo-picker-attributes.md"></inline-fragment>

The storageOptions prop object is passed as the 'options' parameter to the .put request.  This can be used to set the 'level' of the objects being uploaded (i.e. 'protected', 'private', or 'public').

Events:

* ```AmplifyEventBus.$emit('fileUpload', img)```: Emitted when a file is uploaded (includes the image path)


### S3Album

The S3Album component displays the image files from the provided S3 path.

Usage: ```<amplify-s3-album path="uploads"></amplify-s3-album>```

Props:

The S3Album component accepts a 'path' prop (mandatory). It can also accept a s3AlbumConfig prop object which is passed as the 'options' parameter to the .get request.  This can be used to set the 'level' of the objects being requested (i.e. 'protected', 'private', or 'public').



Events: None