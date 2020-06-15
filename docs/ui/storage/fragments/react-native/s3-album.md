`S3Album` renders a list of `S3Image` objects:

![S3Album Example](~/images/s3album-react-native.png)

To display private objects, supply the `level` property:

```jsx
return (
    <S3Album level="private" path={path} />
);
```

You can use the `filter` property to customize the path of your album:

```jsx
return (
    <S3Album
        level="private"
        path={path}
        filter={(item) => /jpg/i.test(item.path)}
    />
);
```
