Delete stored data from the storage bucket.

## Public level remove

```javascript
Storage.remove('test.txt')
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

## Protected level remove

```javascript
Storage.remove('test.txt', { level: 'protected' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

## Private level remove

```javascript
Storage.remove('test.txt', { level: 'private' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
```