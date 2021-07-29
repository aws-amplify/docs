---
title: Maps
description: Use Amplify CLI to create and manage maps to visualize geospatial data in your app.
---

Amplify's `geo` category enables you to create and manage map resources used to visualize geospatial data in your application.
Since the `geo` category is in developer preview, you need to install Amplify CLI with the `@geo` tag in order to get the Geo functionality. You can use the following command to install this version globally.
```console
npm i -g @aws-amplify/cli@geo
```

## Setup a new Map

You can add a new map by running the following command from your project's root folder:

```bash
amplify add geo
```
```console
? Select which capability you want to add:
> Map (visualize the geospatial data)
  Location search (search by places, addresses, coordinates)
```
If you haven't set up the `auth` category already, the Amplify CLI will guide you to enable the auth category.

Next, set a name for the map: 
```console
? Provide a name for the Map:
> StreetsMap
```

## Map Access permissions

Next, configure the access permissions for your Map resource and authorize users to render the map.
You can scope permissions based on an individual user's authentication status.

```console
? Who can access this Map?
❯ Authorized users only
  Authorized and Guest users
```

Select `Authorized users only` if only authenticated users are allowed to render the map.

Select `Authorized and Guest users` if both authenticated and unauthenticated users are allowed to render the map.

For more information, refer [link to location service page](https://docs.aws.amazon.com/location/latest/developerguide/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-get-map-tiles).

## Map Pricing Plan
Amazon Location Service offers three pricing plans namely, `RequestBasedUsage`, `MobileAssetTracking` and `MobileAssetManagement` that require no up-front commitment, and no minimum fee.
You select one of the following pricing plans for the Amazon Location Service resources you create for your application.
Amplify helps you determine the best pricing plan for you by guiding you through a set of questions.
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
You can optionally configure the style and data provider for the map.

### Map style & Map data provider
You can pick a style for the map resource. The available map styles along with the data provider of geospatial data are shown. To learn more about each of these map styles, please refer this [location service doc](https://docs.aws.amazon.com/location-maps/latest/APIReference/API_MapConfiguration.html).

```console
? Specify the map style:
❯ Streets (data provided by Esri) 
  Berlin (data provided by Here) 
  Topographic (data provided by Esri) 
  Navigation (data provided by Esri) 
  LightGrayCanvas (data provided by Esri) 
  DarkGrayCanvas (data provided by Esri)
```

`Streets (data provided by Esri) ` will be the default option that will be used to set Map style, if you do not want to explicitly set this property. 

### Set a default Map
If you added more than one map via `amplify add geo`, the map that was added last will be the default. 
However, you can choose if the current Map should be the default for your application:

```console
? Do you want to set this map as default?
> No
```
Answering `No` will retain the previously set default.

That's it! You can now render maps in your application. Follow the steps as listed [here]() for Javascript applications.
