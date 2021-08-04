You can also use Amplify Geo with your existing Amazon Location Service resources if you'd like, there's just some manual setup that you need to do.

### Authorization permissions

If you set up your Cognito resources manually, the roles will need to be given permission to access the map and place indices.

There are two roles created by Cognito: an `Auth_Role` that grants signed-in-user-level access and an `Unauth_Role` that allows unauthenticated access to resources. Attach the corresponding policies to each role for proper access. Replace ```{account-id}``` and ```{enter Map/PlaceIndex name}``` with the correct ids and resource names.

Add the following policy for both the `Auth_Role` and `Unauth_Role`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "GetTiles",
      "Effect": "Allow",
      "Action": [
        "geo:GetMapTile",
        "geo:GetMapSprites",
        "geo:GetMapGlyphs",
        "geo:GetMapStyleDescriptor"
      ],
      "Resource": "arn:aws:geo:us-west-2:{account-id}:map/{enter Map name}"
    },
    {
      "Sid": "Search",
      "Effect": "Allow",
      "Action": [
        "geo:SearchPlaceIndexForPosition",
        "geo:SearchPlaceIndexForText"
      ],
      "Resource": "arn:aws:geo:us-west-2:{account-id}:place-index/{enter PlaceIndex name}"
    }
  ]
}
```

<inline-fragment platform="js" src="~/lib/geo/fragments/js/existing-resources.md"></inline-fragment>
