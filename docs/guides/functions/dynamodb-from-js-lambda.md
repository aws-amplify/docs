---
title: Calling DynamoDB from Lambda in Node.js
description: How to interact with a DynamoDB database from a Lambda function in Node.js
---

The easiest way to interact with DynamoDB from Lambda in a Node.js environment is to use the [DynamoDB document client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html). In this guide you will learn how to interact with a DynamoDB database from a Lambda function using the Node.js runtime.

You will learn how to perform [put](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property), [get](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property), [scan](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property), and [query](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property) operations.

### Creating an item in DynamoDB from Lambda

To create an item in DynamoDB you can use the `put` method:

```js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'your-table-name',
  /* Item properties will depend on your application concerns */
  Item: {
     id: '12345',
     price: 100.00
  }
}

async function createItem(){
  try {
    await docClient.put(params).promise();
  } catch (err) {
    return err;
  }
}

exports.handler = async (event) => {
  try {
    await createItem()
    return { body: 'Successfully created item!' }
  } catch (err) {
    return { error: err }
  }
};
```

### Getting an item by primary key in DynamoDB from Lambda

To get an item by primary key in DynamoDB you can use the `get` method. A `get` request returns a single item given the primary key of that item:

```js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'your-table-name',
  /* Item properties will depend on your application concerns */
  Key: {
    id: '12345'
  }
}

async function getItem(){
  try {
    const data = await docClient.get(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await getItem()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
```

### Scanning a table

A `scan` returns one or more items and item attributes by accessing every item in a table or a secondary index (limit of 1 MB of data).

```js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : 'your-table-name'
}

async function listItems(){
  try {
    const data = await docClient.scan(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await listItems()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
```

### Querying a table

A `query` returns one or more items and item attributes by querying items from a table by primary key or secondary index.

```js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: 'your-table-name',
  IndexName: 'some-index',
  KeyConditionExpression: '#name = :value',
  ExpressionAttributeValues: { ':value': 'shoes' },
  ExpressionAttributeNames: { '#name': 'name' }
}

async function queryItems(){
  try {
    const data = await docClient.query(params).promise()
    return data
  } catch (err) {
    return err
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await queryItems()
    return { body: JSON.stringify(data) }
  } catch (err) {
    return { error: err }
  }
}
```