If you don't have an existing project already, create a new Amplify project by running:
```bash
amplify init
```

The base structure for a DataStore app is created by adding a new GraphQL API to your app.

```console
# For new APIs
amplify add api

# For existing APIs
amplify update api
```

During the API configuration process select **GraphQL** as the API type and reply to the questions as follows. Make sure you respond **Yes, I want to make some additional changes** when prompted for **advanced settings** and turn on **conflict detection**. This setting is **required** when syncing data to the cloud since the conflict resolution strategy is what allows local data to be reconciled with data from the cloud backend.

```console
? Please select from one of the below mentioned services:
    `GraphQL`
? Provide API name:
    `BlogAppApi`
? Choose the default authorization type for the API
    `API key`
? Enter a description for the API key:
    `BlogAPIKey`
? After how many days from now the API key should expire (1-365):
    `365`
? Do you want to configure advanced settings for the GraphQL API
    `Yes, I want to make some additional changes.`
? Configure additional auth types?
    `No`
? Configure conflict detection?
    `Yes`
? Select the default resolution strategy
    `Auto Merge`
? Do you have an annotated GraphQL schema?
    `No`
? Choose a schema template
    `Single object with fields (e.g., “Todo” with ID, name, description)`
```

<amplify-callout warning>

**Troubleshooting:** Cloud sync will fail without the **conflict detection** configuration. In that case use `amplify update api` and choose **Enable DataStore for entire API** (this option will enable the conflict detection as described above).

</amplify-callout>