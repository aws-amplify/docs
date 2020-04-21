---
title: Relational Databases
description: The Amplify CLI currently supports importing serverless Amazon Aurora MySQL 5.6 databases running in the us-east-1 region. Learn how to create an Amazon Aurora Serverless database, import this database as a GraphQL data source and test it.
---

The Amplify CLI currently supports importing serverless Amazon Aurora MySQL 5.6 databases running in the us-east-1 region. The following instruction show how to create an Amazon Aurora Serverless database, import this database as a GraphQL data source and test it.

**First, if you do not have an Amplify project with a GraphQL API create one using these simple commands.**

```bash
amplify init
amplify add api
```

**Go to the AWS RDS console and click "Create database".**


![Create cluster](~/images/create-database.png)


**Select "Serverless" for the capacity type and fill in some information.**


![Database details](~/images/database-details.png)


**Click next and configure any advanced settings. Click "Create database"**


![Database details](~/images/configure-database.png)


**After creating the database, wait for the "Modify" button to become clickable. When ready, click "Modify" and scroll down to enable the "Data API"**


![Database details](~/images/data-api.png)


**Click continue, verify the changes and apply them immediately. Click "Modify cluster"**


![Database details](~/images/modify-after-data-api.png)


**Next click on "Query Editor" in the left nav bar and fill in connection information when prompted.**


![Database details](~/images/connect-to-db-from-queries.png)


**After connecting, create a database and some tables.**


![Database details](~/images/create-a-database-and-schema.png)

```sql
CREATE DATABASE MarketPlace;
USE MarketPlace;
CREATE TABLE Customers (
  id int(11) NOT NULL PRIMARY KEY,
  name varchar(50) NOT NULL,
  phone varchar(50) NOT NULL,
  email varchar(50) NOT NULL
);
CREATE TABLE Orders (
  id int(11) NOT NULL PRIMARY KEY,
  customerId int(11) NOT NULL,
  orderDate datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `customerId` (`customerId`),
  CONSTRAINT `customer_orders_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`)
);
```


**Return to your command line and run `amplify api add-graphql-datasource` from the root of your amplify project.**


![Add GraphQL Data Source](~/images/add-graphql-datasource.png)

**Push your project to AWS with `amplify push`.**

Run `amplify push` to push your project to AWS. You can then open the AppSync console with `amplify api console`, to try interacting with your RDS database via your GraphQL API.

**Interact with your SQL database from GraphQL**

Your API is now configured to work with your serverless Amazon Aurora MySQL database. Try running a mutation to create a customer from the [AppSync Console](https://console.aws.amazon.com/appsync/home) and then query it from the [RDS Console](https://console.aws.amazon.com/rds/home) to double check.

Create a customer:

```
mutation CreateCustomer {
  createCustomers(createCustomersInput: {
    id: 1,
    name: "Hello",
    phone: "111-222-3333",
    email: "customer1@mydomain.com"
  }) {
    id
    name
    phone
    email
  }
}
```

![GraphQL Results](~/images/graphql-results.png)

Then open the RDS console and run a simple select statement to see the new customer:

```sql
USE MarketPlace;
SELECT * FROM Customers;
```

![SQL Results](~/images/sql-results.png)

### How does this work?

The `add-graphql-datasource` will add a custom stack to your project that provides a basic set of functionality for working
with an existing data source. You can find the new stack in the `stacks/` directory, a set of new resolvers in the `resolvers/` directory, and will also find a few additions to your `schema.graphql`. You may edit details in the custom stack and/or resolver files without worry. You may run `add-graphql-datasource` again to update your project with changes in the database but be careful as these will overwrite any existing templates in the `stacks/` or `resolvers/` directories. When using multiple environment with the Amplify CLI, you will be asked to configure the data source once per environment.
