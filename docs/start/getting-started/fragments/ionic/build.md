## What we'll build

In this tutorial, we’ll use React to build a photo sharing app that lets users upload photos to a shared photo gallery. We’ll use a GraphQL API (AWS AppSync) to access data stored in a NoSQL database (Amazon DynamoDB). In addition, we’ll demonstrate how to authenticate users, communicate with our API, manage photo uploads, and set up continuous deployment and hosting.

The app includes the following views:

A login view
A photo gallery view
A photo upload view

[GraphQL](http://graphql.org) is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.
