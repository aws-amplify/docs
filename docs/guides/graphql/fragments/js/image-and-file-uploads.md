Storing and querying for files like images and videos is a common requirement for most applications, but how do you do this using GraphQL?

One option would be to Base64 encode the image and send as a string in the mutation. This comes with disadvantages like the encoded file being larger than the original binary, the operation being computationally expensive, and the added complexity around encoding and decoding properly.

Another option is to have a separate server (or API) for uploading files. This is the preferred approach and the technique that will be covered in this guide.

## How it all works

You typically would need a few things to make this work:

1. A GraphQL API
2. A storage service or database for saving your files
3. A database to store the GraphQL data including a reference to the location of the file

Take for example the following schema for a product in an E-commerce app:

```
type Product {
  id: ID!
  name: String!
  description: String
  price: Int
  image: ?
}
```

How could you use this `image` field and make it work with your app to store and reference an image?

#### For mutations

1. Store the image in S3
2. Send a mutation to create the Product in the GraphQL API using the image reference along with the other product data

#### For Queries

1. Query the product data from the API (including the image reference)
2. Get a signed URL for the image from S3 in another API call

Let's take a look at how to implement this using AWS Amplify, AWS AppSync, and Amazon S3.

<!-- ## Creating the client

In this guide the client code will be written in React, but you can use Vue, Angular, or any other JavaScript framework because the API calls the you will be writing are not React specific.

To get started, create a new JavaScript project, change into the directory and install the amplify and uuid dependencies:

```
npx create-react-app gqlimages
cd gqlimages
npm install aws-amplify @aws-amplify/ui-react uuid
``` -->

## Creating the services

To build this API, we need the following:

1. S3 bucket to store the image
2. GraphQL API to store the image reference and other data about the type
3. Authentication service to authenticate users (only needed in order to upload files to S3)

The first thing we will want to do is create the authentication service. To do so, we'll initialize an Amplify project and add authentication.


```sh
amplify init
amplify add auth

? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings?  No, I am done.
```

Next, we'll create the storage service (Amazon S3):

```sh
amplify add storage

? Please select from one of the below mentioned services: Content (Images, audio, video, etc.)
? Please provide a friendly name for your resource that will be used to label this category in the project: gqls3
? Please provide bucket name: <YOUR_UNIQUE_BUCKET_NAME>
? Who should have access: Auth and guest users
? What kind of access do you want for Authenticated users? create, update, read, delete
? What kind of access do you want for Guest users? read
```

Next you will be creating a GraphQL API with a type that has an image field. This image can only be accessed by someone using our app. If someone tries to fetch this image directly, they will not be able to view it.

For the image field, we'll create a GraphQL type type that holds all of the information we need in order to create and read private files from an S3 bucket, including the bucket name and region as well as the key we'd like to read from the bucket.

```sh
amplify add api

? Please select from one of the below mentioned services: GraphQL
? Provide API name: gqls3
? Choose the default authorization type for the API Amazon Cognito User Pool
Use a Cognito user pool configured as a part of this project.
? Do you want to configure advanced settings for the GraphQL API Yes, I want to make some additional changes.
? Configure additional auth types? Yes
? Choose the additional authorization types you want to configure for the API API key
API key configuration
? Enter a description for the API key: public
? After how many days from now the API key should expire (1-365): 354
? Configure conflict detection? No
? Do you have an annotated GraphQL schema? No
? Do you want a guided schema creation? Yes
? What best describes your project: Single object with fields (e.g., “Todo” with ID, name, description)
? Do you want to edit the schema now? Yes
```

When prompted, update the schema located at __/amplify/backend/api/gqls3/schema.graphql__ with the following:

```graphql
type Product @model
  @auth(rules: [
      { allow: owner, operations: [create, update, delete] },
      { allow: public, operations: [read] }
  ]) {
  id: ID!
  name: String!
  description: String
  price: Int
  image: String
}
```

<amplify-callout>

The above schema assumes a combination of Amazon Cognito User Pools and API key authentication types. It will allow authenticated users to create data and upload images, and both authenticated and unauthenticated users to read data and query images.

</amplify-callout>

Go back to the CLI and press __Enter__.

Next, deploy the services using the Amplify `push` command:

```sh
amplify push --y
```

### Interacting with the API from a client application

Now that the backend is created, how can we interact with it to upload and read images from it?

Here is the code that we could use to not only save files to our API, but also query and render them in the UI.

There are two main functions:

1. `createProduct` - (uploads the product image to S3 and saves the product data to AppSync in a GraphQL mutation)
2. `fetchProducts` - Queries the GraphQL API for all products


```javascript

```

To launch the app, run `npm start`.
