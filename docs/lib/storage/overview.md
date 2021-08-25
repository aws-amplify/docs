---
title: Concepts
description: Learn more about the foundational storage concepts for cloud-based application and how they work with Amplify Framework.
---

AWS Amplify storage module provides a simple mechanism for managing user content for your app in public, protected or private storage buckets. The storage category comes with built-in support for [Amazon S3 (Simple Storage Service)](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html). 

![Image](~/images/s3_overview.jpg)

## S3 Core Concepts 

Amazon S3 stores data as objects within container buckets. An object consists of a file and optionally any metadata that describes that file. To store an object in Amazon S3, you upload the file you want to store to a bucket. When you upload a file, you can set permissions on the object and any metadata.

Buckets are the containers for objects. You can have one or more buckets. For each bucket, you can control access to it (who can create, delete, and list objects in the bucket), view access logs for it and its objects, and choose the geographical region where Amazon S3 will store the bucket and its contents.

## Accessing AWS services

With storage, it's important to understand user-level access to storage assets. While Amplify helps with abstraction with provisioning your S3 buckets, it is important to understand the right level of control for your customers.

When you run `amplify add storage`, the CLI will configure appropriate IAM policies on the bucket using a Cognito Identity Pool Role. You will have the option of adding CRUD (Create, Update, Read and Delete) based permissions as well, so that Authenticated and Guest users will be granted limited permissions within these levels.
