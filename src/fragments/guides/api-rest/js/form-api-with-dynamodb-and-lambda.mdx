In this guide, you will learn how to deploy a form API backed by Lambda and DynamoDB.

The form that we will be creating is a contact form that will capture the user's name and phone number. By the end of this guide, you should be able to create and fetch form entries.

### Initializing the Amplify project

To get started, create a new Amplify project:

```sh
amplify init

# Choose your environment name and default text editor
# You can answer the defaults for the rest of the questions and then choose the AWS profile you'd like to use for this project.
```

### Creating the database

Next, add the DynamoDB table:

```sh
amplify add storage

? Please select from one of the below mentioned services: NoSQL Database
? Please provide a friendly name for your resource that will be used to label this category in the project: formtable
? Please provide table name: formtable
? What would you like to name this column: id
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: name
? Please choose the data type: string
? Would you like to add another column? Yes
? What would you like to name this column: phone
? Please choose the data type: string
? Would you like to add another column? N
? Please choose partition key for the table: id
? Do you want to add a sort key to your table? N
? Do you want to add global secondary indexes to your table? N
? Do you want to add a Lambda Trigger for your Table? N
```

### Creating the API

Now that the table has been created, create the API and function that will connect with the table:

```sh
amplify add api

? Please select from one of the below mentioned services: REST
? Provide a friendly name for your resource to be used as a label for this category in the project: formapi
? Provide a path (e.g., /book/{isbn}): /contact
? Choose a Lambda source Create a new Lambda function
? Provide a friendly name for your resource to be used as a label for this category in the project: formfunction
? Provide the AWS Lambda function name: formfunction
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Serverless ExpressJS function (Integration with API Gateway)
? Do you want to access other resources created in this project from your Lambda function? Yes
? Select the category storage
Storage category has a resource called formtable
? Select the operations you want to permit for formtable create, read
? Do you want to invoke this function on a recurring schedule? N
? Do you want to edit the local lambda function now? N
? Restrict API access: N
? Do you want to add another path? N
```

The API endpoint has been configured and some boilerplate function code has been created.

### Updating the function code

Next, open the function code located at __amplify/backend/function/formfunction/src/app.js__ in your text editor and replace its contents:

```js
// from REST API + DynamoDB template
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var bodyParser = require('body-parser')
var express = require('express')
var app = express()
var cors = require('cors') // ADDED - for avoiding CORS in local dev
app.use(cors())  // ADDED - for avoiding CORS in local dev
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

/* 1. Import the AWS SDK and create an instance of the DynamoDB Document Client */
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

/* 2. create a function that will generate a unique ID for each entry in the database */
function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/* 3. Update the app.get request with the following code for reading all contacts */
app.get('/contact', function(req, res) {
  var params = {
    TableName: process.env.STORAGE_FORMTABLE_NAME // TODO: UPDATE THIS WITH THE ACTUAL NAME OF THE FORM TABLE ENV VAR (set by Amplify CLI)
  }
  docClient.scan(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ data })
  })
});

/* 4. Update the app.post request with the following code for creating a new contact */
app.post('/contact', function(req, res) {
  var params = {
    TableName : process.env.STORAGE_FORMTABLE_NAME, // TODO: UPDATE THIS WITH THE ACTUAL NAME OF THE FORM TABLE ENV VAR (set by Amplify CLI)
    Item: {
      id: id(),
      name: req.body.name,
      phone: req.body.phone
    }
  }
  docClient.put(params, function(err, data) {
    if (err) res.json({ err })
    else res.json({ success: 'Contact created successfully!' })
  })
});

// from REST API + DynamoDB template
app.listen(3000, function() {
    console.log("App started")
});

module.exports = app
```

Now the API has been created and you can begin interacting with it to send `get`  and `post` requests for creating and reading contacts!

### Creating a new contact in a client-side web application

Now that the API has been deployed, you can interact with it from a client-side application.

#### Creating a new contact

```js
/* Import the Amplify API category */
import { API } from 'aws-amplify';

/* Next, create a function for calling the REST API to create a new contact */
async function createContact() {
  const data = {
    body: {
      name: 'Chris',
      phone: '+1-555-555-5555'
    }
  };
  const apiData = await API.post('formapi', '/contact', data);
  console.log({ apiData });
}
```

#### Creating a form for dynamic user input

```js
/* Import the Amplify API category */
import { API } from 'aws-amplify';

/* Next, create a function for calling the REST API to create a new contact */
async function createContact() {
  const data = {
    body: {
      name: formState.name,
      phone: formState.phone
    }
  };
  const apiData = await API.post('formapi', '/contact', data);
  console.log({ apiData });
}

/* Create some type of local state to hold the form input. This is pseudocode and will differ based on your JavaScript framework. */
const formState = { phone: '', name: '' };

/* Create a function to update the form state. This is pseudocode and will differ based on your JavaScript framework.  */
function updateFormState(key, value) {
  formState[key] = value;
}

/* Create the form inputs and button in the UI */
<input placeholder="phone" onChange={e => updateFormState('phone', e.target.value)} />
<input placeholder="name" onChange={e => updateFormState('name', e.target.value)} />
<button onClick={createContact}>Create New Contact</button>
```

### Querying for all contacts

```js
/* First, import the Amplify API category */
import { API } from 'aws-amplify';

/* Next, add the function code for calling the API to create a contact */
async function fetchContacts() {
  const contactData = await API.get('formapi', '/contact');
  console.log({ contactData });
}
```
