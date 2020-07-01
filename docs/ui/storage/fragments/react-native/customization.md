### Customize Upload Path 

You can customize your upload path by defining prefixes:

```javascript
const customPrefix = {
    public: 'myPublicPrefix/',
    protected: 'myProtectedPrefix/',
    private: 'myPrivatePrefix/'
};

Storage.put('test.txt', 'Hello', {
    customPrefix: customPrefix,
    // ...
})
.then (result => console.log(result))
.catch(err => console.log(err));
```

For example, if you want to enable read, write and delete operation for all the objects under path *myPublicPrefix/*,  declare it in your IAM policy:

```json
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
        ],
        "Resource": [
            "arn:aws:s3:::your-s3-bucket/myPublicPrefix/*",
        ]
    }
]
```

If you want to have custom *private* path prefix like *myPrivatePrefix/*, you need to add it into your IAM policy:
```json
"Statement": [
    {
        "Effect": "Allow",
        "Action": [
            "s3:GetObject",
            "s3:PutObject",
            "s3:DeleteObject"
        ],
        "Resource": [
            "arn:aws:s3:::your-s3-bucket/myPrivatePrefix/${cognito-identity.amazonaws.com:sub}/*"
        ]
    }
]
```
This ensures only the authenticated users has the access to the objects under the path.