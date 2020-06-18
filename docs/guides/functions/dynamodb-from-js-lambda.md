---
title: Calling DynamoDB from Lambda in Node.js
description: How to interact with a DynamoDB database from a Lambda function in Node.js
---

The easiest way to interact with DynamoDB from Lambda in a Node.js environment is to use the [DynamoDB cocument client](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html). In this guide you will learn how to interact with a DynamoDB database from a Lambda function using the Node.js runtime.

You will learn how to perform [put](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property), [get](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property), [scan](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property), and [query](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property) operations.

## Creating an item in DynamoDB from Lambda

To create an item in DynamoDB you can use the `put` method:

```js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : "your_table_name",
  Item: {
     id: '001',
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
    return { body: "Successfully created item!" }
  } catch (err) {
    return { error: err }
  }
};
```

## Getting an item by ID in DynamoDB from Lambda

To get an item by ID in DynamoDB you can use the `get` method:

```js
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName : "your_table_name",
  Key: {
    id: "12345"
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