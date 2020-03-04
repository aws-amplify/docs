---
title: Overview
description: Description
---

Authentication is a process to validate **who you are** (abbreviated as *AuthN*). The system which does this validation is referred to as an **Identity Provider** or **IdP**. This can be your own self-hosted IdP or a cloud service. Oftentimes, this IdP is a social provider such as Facebook, Google, or Amazon.
 Authorization is the process of validating **what you can access** (abbreviated as *AuthZ*). This is sometimes done by looking at tokens with custom logic, predefined rules, or signed requests with policies.

## Concepts

In the Amplify ecosystem, the most common Authentication method is either using Amazon Cognito User Pools independently or with a social provider to validate the identity of the user (known as *Federation*). 


[Amazon Cognito User Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html) is a full-featured user directory service to handle user registration, authentication, and account recovery. [Amazon Cognito Federated Identities or Identity Pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html) on the other hand, is a way to authorize your users to use AWS services.

Amplify interfaces with User Pools to store your user information, including federation with other OpenID providers like Facebook & Google, and it leverages Federated Identities to manage user access to AWS Resources, for example allowing a user to upload a file (to an S3 bucket). The Amplify CLI automates the [access control policies](https://todo.aws) for these AWS resources as well as provides [fine grained access controls via GraphQL](https://todo.aws) for protecting data in your APIs.

Authorization is often done in one of two ways:
	
1. Clients pass the tokens to the backend that perform custom logic to allow or deny actions
1. Clients sign the requests and the backend validates the signature, allowing or denying actions depending on predefined policy. The predefined rules are known as [IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) policies and automatically configured by the Amplify CLI.
	
The first mode is a common authorization method for REST or GraphQL APIs, while the second mode is necessary for interfacing with AWS services such as S3, Pinpoint, Sumerian, and others. 

### Sign-up and sign-in

For many apps, user sign-up and sign-in is all that is required. Once authenticated the app can talk to an API to access and mutate data. In this case, you can simply create a User Pool by running `amplify add auth` using the Amplify CLI and selecting the default setup. In your application you can use [`Auth.signUp`](#sign-up)  and [`Auth.signIn`](#sign-in) (or an Amplify UI component) to complete this process and retrieve tokens. The Amplify client will refresh the tokens calling [`Auth.currentSession`](#retrieve-current-session) if they are no longer valid. 
	
![Image](https://aws-amplify.github.io/docs/images/SimpleAuthZ.png)

### Social Provider Federation
	
Many apps also support login with a social providers such as Facebook, Google Sign-In, or Login With Amazon. [The preferred way to do this is via an OAuth](#oauth-and-federation-overview) redirect which lets users login using their social media account and a corresponding user is created in User Pools. With this design you do not need to include an SDK for the social provider in your app. Set this up by running `amplify add auth` and selecting the social provider  option. Upon completion you can use [`Auth.federatedSignIn()`](#oauth-and-hosted-ui) in your application to either show a pre-built "Hosted UI" or pass in a provider name (e.g. [`Auth.federatedSignIn({provider: 'Facebook'})`](#oauth-and-hosted-ui)) to interface directly and build out your own UI.
	
![Image](https://aws-amplify.github.io/docs/images/SocialAuthZ.png)
	
You can also get credentials directly from Identity Pools by passing tokens from a provider directly to `Auth.federatedSignIn()`. However you will have to use that provider's SDK directly in your app and manage token refresh and auth flows manually.
	

### Accessing AWS services

Some apps need to use AWS services which require [signing requests](https://docs.aws.amazon.com/general/latest/gr/signing_aws_api_requests.html). Examples of this would be storing images or videos on S3, or sending analytics to Pinpoint or Kinesis. Amplify automatically signs requests with short term credentials from a Cognito Identity Pool which automatically expire, rotate, and refresh by the Amplify client libraries. Setting up your backend with `amplify add auth` and calling [`Auth.signIn`](#sign-in) will automatically do this for you as well after the client authenticates. The diagram below shows how JWT tokens are returned from User Pools and AWS credentials from Identity Pools. You can access these at any time with [`Auth.currentSession()`](#retrieve-current-session) and `Auth.currentCredentials()`.
	
![Image](https://aws-amplify.github.io/docs/images/AWSAuthZ.png)





