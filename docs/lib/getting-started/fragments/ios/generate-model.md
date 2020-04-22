
The GraphQL schema is auto-generated can be found under `amplify/backend/api/amplifyDatasource/schema.graphql`.  
[Learn more](~/cli/graphql-transformer/overview.md) about annotating GraphQL schemas and data modeling.  

a. In this guide, use this schema:
```
type Task @model {
    id: ID!
    title: String!
    description: String
    status: String
}
type Note @model {
    id: ID!
    content: String!
}
```

b. Open `amplifyxc.config` and update `modelgen` to `true`
```
modelgen=true
```

c. Run build in Xcode (`CMD+B`). Amplify will automatically generate the Model files using the graphql schema. You should see the following Model files under `amplify/generated/models`  
```
AmplifyModels.swift
Note.swift
Note+Schema.swift
Task.swift
Task+Schema.swift
```
d. Drag the `models` directory over to your project, click on each file, and on the right panel, under `Target Membership`, check your app target to add it.  

e. Next, build the project.  