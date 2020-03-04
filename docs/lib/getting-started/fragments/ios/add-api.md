a. Run `amplify configure` from the root of your application folder to set up Amplify with your AWS account. 

b. Click on `amplifyxc.config` and update `push` to `true`
```
push=true
```  

c. AppSync offers server-side conflict resolution that does the heavy lifting of managing data conflicts. This is only supported when using Amplify DataStore. So for now, disable conflict resolution.
Click on `amplify/backend/api/amplifyDatasource/transform.conf.json` and delete the `ResolverConfig` section. Remove this section:
```
"ResolverConfig": {
    "project": {
        "ConflictHandler": "AUTOMERGE",
        "ConflictDetection": "VERSION"
    }
}
```

d. Run build in Xcode (`CMD+B`). This starts provisioning the backend cloud resources.  
   Optional: You can view the provisioned backend in the AppSync console by running the command `amplify console api` and choosing `GraphQL`. 

e. Open `amplifyconfiguration.json` and you should see the `api` section containing your backend like the following:
```json
{
    "api": {
        "plugins": {
            "awsAPIPlugin": {
                "amplifyDatasource": {
                    "endpointType": "GraphQL",
                    "endpoint": "https://<YOUR-GRAPHQL-ENDPOINT>.appsync-api.us-west-2.amazonaws.com/graphql",
                    "region": "us-west-2",
                    "authorizationType": "API_KEY",
                    "apiKey": "da2-abcdefghijklmnoprst"
                }
            }
        }
    }
}
```