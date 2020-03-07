## What we'll build

In this tutorial, we'll use Swift to create a "Notes app" with a GraphQL API to store and retrieve items in a cloud database, as well as receive updates over a realtime subscription.

[GraphQL](http://graphql.org) is a data language that was developed to enable apps to fetch data from APIs. It has a declarative, self-documenting style. In a GraphQL operation, the client specifies how to structure the data when it is returned by the server. This makes it possible for the client to query only for the data it needs, in the format that it needs it in.

## Prerequisites

- [Install Node](https://nodejs.org/en/)
- [Install Xcode](https://developer.apple.com/xcode/downloads/) version 10.2 or later.
- This guide assumes that you are familiar with iOS development and tools. If you are new to iOS development, you can follow [these steps](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/BuildABasicUI.html) to create your first iOS application using Swift.
- **Note:** This guide is designed for a *Storyboard* iOS application. Ensure that you select *Storyboard* in the *User Interface* dropdown. ![image](images/storyboard-selection.png) 