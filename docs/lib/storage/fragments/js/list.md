List keys under a specified prefix, as well as `lastModified` timestamp.

## Public level list

```javascript
Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

The format of the result looks like this:

```json
[{
    eTag: ""30074401292215403a42b0739f3b5262"",
    key: "example.png",
    lastModified: "Thu Oct 08 2020 23:59:31 GMT+0800 (Singapore Standard Time)",
    size: 138256
  },
  // ...
]
```

Manually created folders will show up as files with a `size` of 0, but you can also match keys against a regex like `file.key.match(/\.[0-9a-z]+$/i)` to distinguish files vs folders. Since "folders" are a virtual concept in S3, any file may declare any depth of folder just by having a `/` in its name. If you need to list all the folders, you'll have to parse them accordingly to get an authoritative list of files and folders:

```js
  function processStorageList(result) {
    let files = []
    let folders = new Set()
    result.forEach(res => {
      if (res.size) {
        files.push(res)
        // sometimes files declare a folder with a / within then
        let possibleFolder = res.key.split('/').slice(0,-1).join('/')
        if (possibleFolder) folders.add(possibleFolder)
      } else {
        folders.add(res.key)
      }
    })
    return {files, folders}
  }
```

## Protected level list

To list current user's objects:

```javascript
Storage.list('photos/', { level: 'protected' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

To get other users' objects:

```javascript
Storage.list('photos/', { 
    level: 'protected', 
    identityId: 'xxxxxxx' // the identityId of that user
})
.then(result => console.log(result))
.catch(err => console.log(err));
```

## Private level list

```javascript
Storage.list('photos/', { level: 'private' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```
