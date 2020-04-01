List keys under path specified.

## Public level list

```javascript
Storage.list('photos/')
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

## Protected level list

To list current user's objects
```javascript
Storage.list('photos/', { level: 'protected' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

To get other users' objects
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
