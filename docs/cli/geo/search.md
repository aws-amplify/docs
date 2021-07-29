---
title: Location Search
description: Use Amplify CLI to create and manage location search indices or place indices that are used to search for places in your application.
---

Amplify's `geo` category enables you to search by places, addresses and coordinates in your app with "place index" resources.
Since the `geo` category is in developer preview, you need to install Amplify CLI with the `@geo` tag in order to get the Geo functionality. You can use the following command to install this version globally.
```console
npm i -g @aws-amplify/cli@geo
```

## Setup a new Location Search Index

You can add a new location search index by running the following command from your project's root folder:

```bash
amplify add geo
```
```console
? Select which capability you want to add:
  Map (visualize the geospatial data)
> Location search (search by places, addresses, coordinates)
```
If you haven't set up the `auth` category already, the Amplify CLI will guide you to enable the auth category.

Next, set a name for the location search index:

```console
? Provide a name for the location search index (place index):
> MyPlaceIndex
```

## Location Search Access permissions

Next, configure the access permissions for your location search index and authorize users to search for places. You can scope permissions based on an individual user's authentication status.

```console
? Who can access this Search Index?
❯ Authorized users only
  Authorized and Guest users
```

Select `Authorized users only` if only authenticated users can search for places.

Select `Authorized and Guest users` if both authenticated and unauthenticated users can can search for places.

For more information, refer [link to location service page](https://docs.aws.amazon.com/location/latest/developerguide/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-search-for-place).

## Location Search Index Pricing Plan
Amazon Location Service offers three pricing plans namely, `RequestBasedUsage`, `MobileAssetTracking` and `MobileAssetManagement` that require no up-front commitment, and no minimum fee.
You select one of the following pricing plans for the Amazon Location Service resources you create for your application.
Amplify provides a set of questions to help you decide the pricing plan relevant to your application's use-case. 
These pricing plan related set of questions are presented to you when you add the first Geo resource to your application. 
Once you chose the pricing plan, it will be automatically used for the subsequent Geo resources added to your application.

```console
The following choices determine the pricing plan for Geo resources.

? Are you tracking commercial assets for your business in your app?
❯ No, I only need to track consumers personal mobile devices 
  Yes, I track commercial assets (For example, any mobile object that is tracked by a company in support of its business)

Successfully set RequestBasedUsage pricing plan for your Geo resources.
```

```console
? Are you tracking commercial assets for your business in your app?
  No, I only need to track consumers personal mobile devices 
❯ Yes, I track commercial assets (For example, any mobile object that is tracked by a company in support 
  of its business)

? Does your app provide routing or route optimization for commercial assets? (y/N) no

Successfully set MobileAssetTracking pricing plan for your Geo resources.
```

```console
? Are you tracking commercial assets for your business in your app?
  No, I only need to track consumers personal mobile devices 
❯ Yes, I track commercial assets (For example, any mobile object that is tracked by a company in support 
  of its business)

? Does your app provide routing or route optimization for commercial assets? (y/N) yes

Successfully set MobileAssetManagement pricing plan for your Geo resources.
```

We advice you to go through the [location service pricing](https://aws.amazon.com/location/pricing/) along with the [location service terms](https://aws.amazon.com/service-terms/) (_82.5 section_) to learn more about the pricing plan.

## Advanced Settings
You can optionally configure the data provider and result storage location for your location search index.

### Location Search data provider
You can select a data provider as the source for geocoding, reverse geocoding and searches.
Each provider gathers and curates their data using different means. They may also have varying expertise in different regions of the world.
The available data providers of geospatial data are shown. To learn more about data providers, please refer this [location service doc](https://docs.aws.amazon.com/location/latest/developerguide/what-is-data-provider.html).

```console
? Specify the data provider of geospatial data for this Search Index:
❯ Esri
  Here
```

`Esri` will be set as default data provider for the location search index, if you do not want to explicitly set this property.

### Location Search result storage location
You can specify how the results of a search operation will be stored by the caller.
```console
? Do you want to cache or store the results of search operations?
> No
```
`No` will be chosen as default if the developer does not want to explicitly set this property.

Refer [this location service doc](https://docs.aws.amazon.com/location-places/latest/APIReference/API_DataSourceConfiguration.html#locationplaces-Type-DataSourceConfiguration-IntendedUse) for more information. 

## Set a default Location Search Index
If you added more than one location search index via `amplify add geo`, the index that was added last will be the default. 
However, you can choose if the current search index should be the default one used in your application:

```console
? Do you want to set this search index as default?
> No
```
Answering `No` will retain the previously set default.

That's it! You can now search for places in your application. Follow the steps as listed [here]() for Javascript applications.
