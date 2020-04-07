The S3Album component displays the image files from the provided S3 path.

Usage: ```<amplify-s3-album path="uploads"></amplify-s3-album>```

Props:

The S3Album component accepts a 'path' prop (mandatory). It can also accept a s3AlbumConfig prop object which is passed as the 'options' parameter to the .get request.  This can be used to set the 'level' of the objects being requested (i.e. 'protected', 'private', or 'public').

Events: None
