## Add storage to your backend

```
amplify add storage
? Who should have access: Auth and guest users


? What kind of access do you want for Authenticated users?
◉ create/update
◉ read
◉ delete


? What kind of access do you want for Guest users?
◯ create/update
◉ read
◯ delete


? Do you want to add a Lambda Trigger for your S3 Bucket? No
```

## Update your data model

```js:amplify/backend/api/photoalbums/schema.graphql

type Album @model @auth(rules: [{allow: owner}]) {
    id: ID!
    name: String!
    photos: [Photo] @connection(name: "AlbumPhotos")
}

type Photo @model @auth(rules: [{allow: owner}]) {
    id: ID!
    album: Album @connection(name: "AlbumPhotos")
    bucket: String!
    fullsize: PhotoS3Info!
    thumbnail: PhotoS3Info!
}

type PhotoS3Info {
    key: String!
    width: Int!
    height: Int!
}
```

```
amplify push
```

## Add Photo Uploads

In order to handle file uploads, we'll need to allow the user to pick a photo, and upload it to S3. We'll then take the key given back to us from S3 and store it in our GraphQL API for use in the app.

Open up `src/App.js` and update with the folowing:

```javascript   
    import React, { useState, useEffect } from "react";
    import "./App.css";
    import { withAuthenticator, S3Image } from "aws-amplify-react";
    import { API, Storage, graphqlOperation } from "aws-amplify";
    import uuid from "uuid/v4";

    import { listPhotos } from "./graphql/queries";
    import { createPhoto, deletePhoto } from "./graphql/mutations";

    function App() {
        const [photos, setPhotos] = useState([]);
        const [file, setFile] = useState();

        useEffect(() => {
            const fetchPhotos = async () => {
            const result = await API.graphql(graphqlOperation(listPhotos));
            setPhotos(result.data.listPhotos.items);
            };

            fetchPhotos();
        }, [setPhotos]);

       const onFileSelected = e => {
         setFile(e.target.files[0]);
       };

       const uploadPhoto = async () => {
         const result = await Storage.put(`${uuid()}/${file.name}`, file);
         await API.graphql(
            graphqlOperation(createPhoto, {
              input: { url: result.key }
            })
          );
       };

       const createDeletePhotoHandler = photo => {
          return async () => {
            if (global.confirm("Are you sure?")) {
                Storage.remove(photo.url);
                API.graphql(graphqlOperation(deletePhoto, { input: { id: photo.id } }));
            }
          };
        };

        return (
            <div className="App">
                <div className="Photo-upload">
                    <input
                        type="file"
                        onClick={e => (e.target.value = null)}
                       onChange={onFileSelected}
                    />
                    <button disabled={!file} onClick={uploadPhoto}>
                        Upload Photo
                    </button>
                </div>
                <div className="Photo-gallery">
                    {!photos.length && <h2>No photos yet.</h2>}
                    {photos.map(photo => (
                    <div key={photo.id} className="Photo-container">
                        <S3Image className="Photo" imgKey={photo.url} />
                        <button onClick={createDeletePhotoHandler(photo)}>X</button>
                    </div>
                    ))}
                </div>
            </div>
        );
    }

    export default withAuthenticator(App, true);
```

We'll also need to install the `uuid` package we use to create unique names for the photos:

```bash
npm install uuid
```

Now let's update the styling just a bit, open `src/App.js` and add the following:

```js
    .App {
        text-align: center;
    }

    .App-logo {
        height: 40vmin;
        pointer-events: none;
    }

    @media (prefers-reduced-motion: no-preference) {
        .App-logo {
            animation: App-logo-spin infinite 20s linear;
        }
    }

    .App-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
    }

    .App-link {
        color: #61dafb;
    }

    @keyframes App-logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .Photo-gallery {
        display: flex;
    }

    .Photo-container {
        width: 250px;
        height: 250px;
        margin: 8px;
+       position: relative;
    }

    .Photo-container div {
        width: 100%;
        height: 100%;
    }

    .Photo-container button {
        position: absolute;
        top: 8px;
        right: 8px;
        padding: 8px;
        background-color: black;
        color: white;
        font-weight: bold;
        cursor: pointer;
        z-index: 2;
    }

    .Photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .Photo-upload {
        margin-top: 16px;
    }
```

If you upload a new photo, you should see it update immediately in the gallery, you can also remove photos as well with the button at the top right. If you want to test how it behaves with multiple users, open another browser tab, create a second user, and upload some photos. They should appear in the first tab as well.

Now that we have a fully functioning app, in the next step we'll deploy the application to the web!