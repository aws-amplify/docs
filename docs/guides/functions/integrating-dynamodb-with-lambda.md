---
title: Integrating DynamoDB with Lambda
description: How to integrate a DynamoDB table with a Lambda function
---

In this guide you will learn how to do three things:

1. Create a new Lambda function and DynamoDB database that are integrated together
2. Create a new DynamoDB Database and integrate it with an existing Lambda function
3. Create a new Lambda function and integrate it with an an existing DynamoDB database

### Creating a new Lambda function and DynamoDB database that are integrated

The first thing you will need to do will be to create the DynamoDB table:

```sh
amplify add storage

? Please select from one of the below mentioned services: NoSQL Database
? Please provide a friendly name for your resource that will be used to label this category in the project: testtable
? Please provide table name: testtable

# You can now add columns to the table.
? What would you like to name this column: id
? Please choose the data type: String
? Would you like to add another column? N
? Please choose partition key for the table: id
? Do you want to add a sort key to your table? N
? Do you want to add global secondary indexes to your table? N
? Do you want to add a Lambda Trigger for your Table? N
```

Next, create the function:

```sh
amplify add function

? Provide a friendly name for your resource to be used as a label for this category in the project: mylambda
? Provide the AWS Lambda function name: mylambda
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources created in this project from your Lambda function? Y
? Select the category: storage
? Select the operations you want to permit for testtable: create, read, update, delete
? Do you want to invoke this function on a recurring schedule? N
? Do you want to edit the local lambda function now? N
```

Deploy the function and database:

```sh
amplify push
```

Your function and database are now ready to use!

To learn how to interact with DynamoDB from Lambda, check out [Calling DynamoDB from Lambda in Node.js](~/guides/functions/dynamodb-from-js-lambda.md).

### Creating a new DynamoDB Database and integrate with an existing Lambda function

First, create the database using the __storage__ category:

```sh
amplify add storage

? Please select from one of the below mentioned services: NoSQL Database
? Please provide a friendly name for your resource that will be used to label this category in the project: testtable
? Please provide table name: testtable

# You can now add columns to the table.
? What would you like to name this column: id
? Please choose the data type: String
? Would you like to add another column? N
? Please choose partition key for the table: id
? Do you want to add a sort key to your table? N
? Do you want to add global secondary indexes to your table? N
? Do you want to add a Lambda Trigger for your Table? N
```

Next, update the function permissions:

```sh
amplify update function

? Please select the Lambda Function you would want to update: <your-function>
? Do you want to update permissions granted to this Lambda function to perform on other resources in your project? Y
? Select the category: storage
? Select the operations you want to permit for testtable: create, read, update, delete
? Do you want to invoke this function on a recurring schedule? N
? Do you want to edit the local lambda function now? N
```

Deploy the database and updates to the Lambda permissions:

```sh
amplify push
```

Your function and database are now ready to use!

### Creating a new Lambda function and integrate with an an existing DynamoDB database

To create a new Lambda function integrated with an existing DynamoDB database, you need to grant access to the database in the creation process of the function:

```sh
amplify add function

? Provide a friendly name for your resource to be used as a label for this category in the project: mylambda
? Provide the AWS Lambda function name: mylambda
? Choose the function runtime that you want to use: NodeJS
? Choose the function template that you want to use: Hello World
? Do you want to access other resources created in this project from your Lambda function? Y
? Select the category: storage

# Select the database you'd like to grant permissions to or go to the next step if there is only one database in the project

? Select the operations you want to permit for <your-table-name>: create, read, update, delete
? Do you want to invoke this function on a recurring schedule? N
? Do you want to edit the local lambda function now? N
```

Deploy the function:

```sh
amplify push
```

Your function and database are now ready to use!

To learn how to interact with DynamoDB from Lambda, check out [Calling DynamoDB from Lambda in Node.js](~/guides/functions/dynamodb-from-js-lambda.md).