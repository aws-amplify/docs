The Photo Picker component will render a file upload control that will allow choosing a local image and uploading it to Amazon S3. Once an image is selected, a base64 encoded image preview will be displayed automatically. To render photo picker in an Angular view, use *amplify-photo-picker* component:

```html
<amplify-photo-picker 
    framework="Ionic"
    path="pics"
    (picked)="onImagePicked($event)"
    (loaded)="onImageLoaded($event)">
</amplify-photo-picker>
```

 - `(picked)` - Emitted when an image is selected. The event will contain the `File` object which can be used for upload.
 - `(loaded)` - Emitted when an image preview has been rendered and displayed.
 - `path` - An optional S3 image path (prefix).
 - `storageOptions` - An object passed within the ‘options’ property in the Storage.put request. This can be used to set the permissions ‘level’ property of the objects being uploaded i.e. ‘private’, ‘protected’, or ‘public’.

 [Learn more about S3 permissions.](~/lib/storage/configureaccess.md)
