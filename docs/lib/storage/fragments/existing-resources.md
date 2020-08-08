An existing Amazon S3 bucket can be used with the Amplify Libraries by referencing it in your `amplifyconfiguration.json` file.

```json
{
    "storage": {
        "plugins": {
            "awsS3StoragePlugin": {
                  "bucket": "[BUCKET NAME]",
                  "region": "[REGION]"
            }
        }
    }
}
```

- **bucket**: Name of the bucket to use for storage
- **region**: AWS Region where the bucket is provisioned (e.g. *us-east-1*)