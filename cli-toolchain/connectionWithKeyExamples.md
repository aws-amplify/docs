# @connection With @key Use-cases

Here are the 17 access patterns from https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-modeling-nosql.html that we can try and support in this example, and what the schema would look like:

![alt text](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/images/AccessPatternList.png "Access Patterns")

The following schema introduces the requisite keys and connections so that we can support all but the 17th access pattern depending on how one interprets the 17th pattern.


```
type Employee 
  @model
  @key(name: "newHire", fields: ["newHire", "id"])
  @key(name: "byName", fields: ["name", "id"])
  @key(name: "byTitle", fields: ["jobTitle", "id"])
  @key(name: "byWarehouse", fields: ["wareHouseID", "id"])
{
  id: ID!
  name: String!
  startDate: String!
  phoneNumber: String!
  wareHouseID: ID!
  jobTitle: String!
  newHire: Bool!
}

type WareHouse
  @model
{
  id: ID!
  employees: [Employee] @connection(keyName: "byWarehouse", fields: ["id"])
}

type Customer
  @model
  @key(name: "byRepresentative", fields: ["accountRepresentativeID", "id"])
{
  id: ID!
  name: String!
  phoneNumber: String
  accountRepresentativeID: ID!
  orders: [Order] @connection(keyName: "byCustomerByStatusByDate", fields: ["id"])
}

type AccountRepresentative
  @model
  @key(name: "bySalesPeriodByOrderTotal", fields: ["salesPeriod", "orderTotal"])
{
  id: ID!
  customers: [Customer] @connection(name: "byRepresentative", fields: ["id"])
  orders: [Order] @connection(name: "byRepresentativebyDate", fields: ["id"])
  orderTotal: Integer!
  salesPeriod: Integer!
}

type Order
  @model
  @key(name: "byCustomerByStatusByDate", fields: ["customerID", "status", "date"])
  @key(name: "byRepresentativebyDate", fields: ["accountRepresentativeID", "date"])
  @key(name: "byProduct", fields: ["productID", "id"])
{
  id: ID!
  customerID: ID!
  accountRepresentativeID: ID!
  productID: ID!
  status: String!
  amount: Integer!
  date: String!
}

type Inventory
  @model
  @key(fields: ["productID", "wareHouseID"])
{
  id: ID!
  productID: ID!
  wareHouseID: ID!
  inventoryAmount: Integer!
}

type Product
  @model
{
  id: ID!
  orders: [Order] @connection(keyName: "byProduct", fields: ["id"])
  inventories: [Inventory] @connection(fields: ["id"])
}
```

**1. Look up employee details by employee ID:**
This can simply be done by querying the employee model with an employee ID, no @key or @connection is needed to make this work.

```
query GetEmployee($id: ID!) {
  getEmployee(id: $id) {
    id
    name
    phoneNumber
    startDate
    jobTitle
  }
}
```

**2. Query employee details by employee name:**
The @key “byName” on the Employee made makes this access-pattern feasible. One can use this query:

```
query EmployeeByName($name: String!) {
  employeeByName(name: $name) {
    id
    name
    phoneNumber
    startDate
    jobTitle
  }
}
```

**3. Find an Employee’s phone number:**
Either of the previous queries would work to find an employee’s phone number as long as one has their ID or name.

**4. Find a customer’s phone number:**
A similar query to those given above but on the Customer model would give you a customer’s phone number.

**5. Get orders for a given customer within a given date range:**
There is a one-to-many relation that lets all the orders of a customer be queried. 

```
type Customer
  @model
  @key(name: "byRepresentative", fields: ["accountRepresentativeID", "id"])
{
  id: ID!
  name: String!
  phoneNumber: String
  accountRepresentativeID: ID!
  orders: [Order] @connection(keyName: "byCustomerByStatusByDate", fields: ["id"])
}

type Order
  @model
  @key(name: "byCustomerByStatusByDate", fields: ["customerID", "status", "date"])
  @key(name: "byRepresentativebyDate", fields: ["accountRepresentativeID", "date"])
  @key(name: "byProduct", fields: ["productID", "id"])
{
  id: ID!
  customerID: ID!
  accountRepresentativeID: ID!
  productID: ID!
  status: String!
  amount: Integer!
  date: String!
}
```

This relationship is created by having the @key names “byCustomerByStatusByDate” on the Order model that is queried by the connection on the orders field of the Customer model. A composite sort key with the status and date is used. The query one would need to get the orders to a customer within a date range would be:

```
query GetCustomer($id: ID!) {
  getCustomer(id: $id) {
    orders (statusDate: {status: {ge: "z"}, date: {between: {start: "2018-07-22", end: "2020-10-11"}}}) {
        items {
            id
            amount
            date
        }
    }
  }
}
```

**6. Show all open orders within a given date range across all customers:**
The @key “byCustomerByStatusByDate” enables you to run a query that would work for this access pattern.

```
query GetCustomer() {
  getCustomer {
    orders (statusDate: {status: {eq: "OPEN"}, date: {between: {start: "2018-07-22", end: "2020-10-11"}}}) {
        items {
            id
            amount
            date
        }
    }
  }
}
```

**7. See all employees hired recently:**
Having ‘@key(name: "newHire", fields: ["newHire", "id"])’ on the Employee model allows one to query by whether an employee has been hired recently. The issue with this method is that we cannot just sort all employees by start date or filter on start date without providing a Partition key, so one has to manually keep track of whether each employee is a newHire or not so that this can be queried directly.

```
query EmployeesNewHire() {
  employeesNewHire(newHire: "True") {
    id
    name
    phoneNumber
    startDate
    jobTitle
  }
}
```

**8. Find all employees working in a given warehouse:**
This needs a one to many relationship from warehouses to employees this can be done as follows:


```
type Warehouse
  @model
{
  id: ID!
  employees: [Employee] @connection(keyName: "byWarehouse", fields: ["id"])
}

type Employee 
  @model
  @key(name: "newHire", fields: ["newHire", "id"])
  @key(name: "byName", fields: ["name", "id"])
  @key(name: "byTitle", fields: ["jobTitle", "id"])
  @key(name: "byWarehouse", fields: ["warehouseID", "id"])
{
  id: ID!
  name: String!
  startDate: String!
  phoneNumber: String!
  wareHouseID: ID!
  jobTitle: String!
  newHire: Bool!
}
```

As can be seen from the @connection in the Warehouse model, this connection uses the “byWarehouse” key on the employee model. The relevant query would look like this:

```
query GetWarehouse($id: ID!) {
  getWarehouse(id: $id) {
    id
    employees{
        items {
            id
            name
            startDate
            phoneNumber
            jobTitle
        }
    }
  }
}
```

**9. Get all items on order for a given product:**
This access-pattern would use a one-to-many relation from products to orders:

```
type Product
  @model
{
  id: ID!
  orders: [Order] @connection(keyName: "byProduct", fields: ["id"])
  inventories: [Inventory] @connection(fields: ["id"])
}

type Order
  @model
  @key(name: "byStatusByDate", fields: ["status", "date"])
  @key(name: "byCustomerbyDate", fields: ["customerID", "date"])
  @key(name: "byRepresentativebyDate", fields: ["accountRepresentativeID", "date"])
  @key(name: "byProduct", fields: ["productID", "id"])
{
  id: ID!
  customerID: ID!
  accountRepresentativeID: ID!
  productID: ID!
  status: String!
  amount: Integer!
  date: String!
}
```

Hence one can get all orders of a given product with a query:

```
query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    orders{
        items {
            id
            status
            amount
            date
        }
    }
  }
}
```

**10. Get current inventories for a product at all warehouses:**
Since a product could be found in multiple warehouses and each warehouses could have many products, we need a many-to-many connection to deal with this case. This can be done with an intermediary model whose objects each keep track of the inventory of a given product in one warehouse. This inventory model also gives us a place to store the edge data which in this case is the amount of inventory of a product in a warehouse.

```
type Inventory
  @model
  @key(fields: ["productID", "wareHouseID"])
{
  id: ID!
  productID: ID!
  wareHouseID: ID!
  inventoryAmount: Integer!
}

type Product
  @model
{
  id: ID!
  orders: [Order] @connection(keyName: "byProduct", fields: ["id"])
  inventories: [Inventory] @connection(fields: ["id"])
}

type Warehouse
  @model
{
  id: ID!
  employees: [Employee] @connection(keyName: "byWarehouse", fields: ["id"])
}
```

However, since we only need to be able to get the inventories of a product at warehouses, we only need to query the connection from products to inventories and not the other way round (and we don’t need to connect all the way to the warehouses themselves). Hence there is a connection from Product to Inventories but not the other way. 

The query needed to get the inventories of a product in all warehouses would be:

```
query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    inventories{
        items {
            warehouseID
            inventoryAmount
        }
    }
  }
}
```

**11. Get customers by account representative:**
This uses a one-to-many connection between account representatives and customers:

```
type Customer
  @model
  @key(name: "byRepresentative", fields: ["accountRepresentativeID", "id"])
{
  id: ID!
  name: String!
  phoneNumber: String
  accountRepresentativeID: ID!
  orders: [Order] @connection(keyName: "byCustomerbyDate", fields: ["id"])
}

type AccountRepresentative
  @model
  @key(name: "bySalesPeriodByOrderTotal", fields: ["salesPeriod", "orderTotal"])
{
  id: ID!
  customers: [Customer] @connection(name: "byRepresentative", fields: ["id"])
  orders: [Order] @connection(name: "byRepresentativebyDate", fields: ["id"])
  orderTotal: Integer!
  salesPeriod: Integer!
}
```

The query needed would look like this:

```
query GetAccountRepresntative($id: ID!) {
  getAccountRepresntative(id: $id) {
    id
    customers{
        items {
            id
            name
            phoneNumber            
        }
    }
  }
}
```

**12. Get orders by account representative and date:**
This also uses a one-to-many connection except the query is run on a key that organizes orders by date for each account representative:

```
type AccountRepresentative
  @model
  @key(name: "bySalesPeriodByOrderTotal", fields: ["salesPeriod", "orderTotal"])
{
  id: ID!
  customers: [Customer] @connection(name: "byRepresentative", fields: ["id"])
  orders: [Order] @connection(name: "byRepresentativebyDate", fields: ["id"])
  orderTotal: Integer!
  salesPeriod: Integer!
}


type Order
  @model
  @key(name: "byStatusByDate", fields: ["status", "date"])
  @key(name: "byCustomerbyDate", fields: ["customerID", "date"])
  @key(name: "byRepresentativebyDate", fields: ["accountRepresentativeID", "date"])
  @key(name: "byProduct", fields: ["productID", "id"])
{
  id: ID!
  customerID: ID!
  accountRepresentativeID: ID!
  productID: ID!
  status: String!
  amount: Integer!
  date: String!
}
```

As can be seen in the AccountRepresentative model this connection uses the byRepresentativebyDate field on the Order model to create the connection needed. The query needed would look like this:

```
query GetAccountRepresntative($id: ID!) {
  getAccountRepresntative(id: $id) {
    id
    orders{
        items {
            id
            status
            amount
            date          
        }
    }
  }
}
```

**13. Get all items on order for a given product:**
This is the same as number 9.

**14. Get all employees with a given job title:**
Add @key(name: "byTitle", fields: ["jobTitle", "id"])  to the Employee model makes this access pattern quite easy.

**15. Get inventory by product by warehouse:**
Here having the inventories be held in a separate model is particularly useful since this model can have its own partition key and sort key such that the inventories themselves can be queried as is needed for this access-pattern.

```
type Inventory
  @model
  @key(fields: ["productID", "wareHouseID"])
{
  id: ID!
  productID: ID!
  wareHouseID: ID!
  inventoryAmount: Integer!
}
```

A query on this model would look like this:

```
query GetInventory($productID: ID!, $warehouseID: ID!) {
  getInventory(productID: $productID, warehouseID: $warehouseID) {
    id
    productID
    warehouseID
    inventoryAmount
  }
}
```

**16. Get total product inventory:**
How this would be done depends on the use case. If one just wants a list of all inventories in all warehouses, one could just run a list inventories on the Inventory model:

```
query ListInventorys() {
  listInventorys() {
    id
    productID
    warehouseID
    inventoryAmount
  }
}
```

**17. Get sales representatives ranked by order total and sales period:**
It's uncertain what this means. But if it involves getting all sales representatives sorted by one or more attributes (which is what it seems to be) that is not something that we can do in dynamoDB without an inefficient workaround like placing all the sales representatives into a single partition on a table/GSI.

