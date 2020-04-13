When a user starts a session (for example, by launching your mobile app), your mobile or web application can automatically register (or update) an endpoint with Amazon Pinpoint. The endpoint represents the device that the user starts the session with. It includes attributes that describe the device, and it can also include custom attributes that you define. Endpoints can also represent other methods of communicating with customers, such as email addresses or mobile phone numbers.

After your application registers endpoints, you can segment your audience based on endpoint attributes. You can then engage these segments with tailored messaging campaigns. You can also use the Analytics page in the Amazon Pinpoint console to view charts about endpoint registration and activity, such as New endpoints and Daily active endpoints.

You can assign a single user ID to multiple endpoints. A user ID represents a single user, while each endpoint that is assigned the user ID represents one of the user’s devices. After you assign user IDs to your endpoints, you can view charts about user activity in the console, such as Daily active users and Monthly active users.

## Adding Custom Endpoint Attributes

After you initialize the Amazon Pinpoint client in your application, you can add custom attributes to endpoints.

<div id="java" class="tab-content current">

```java
import com.amazonaws.mobileconnectors.pinpoint.analytics.AnalyticsEvent;

public void addCustomEndpointAttribute() {
    // Add a custom attribute to the endpoint
    TargetingClient targetingClient = pinpointManager.getTargetingClient();
    String[] interests = new String[] {"science", "politics", "travel"};
    targetingClient.addAttribute("interests", Arrays.asList(interests));
    targetingClient.updateEndpointProfile();
    Log.d(TAG, "Updated custom attributes for endpoint: " +
            targetingClient.currentEndpoint().getEndpointId());
}
```
</div>


## Assigning User IDs to Endpoints
Assign user IDs to endpoints by doing either of the following:

Manage user sign-up and sign-in with Amazon Cognito user pools.
Use the Amazon Pinpoint client to assign user IDs without using Amazon Cognito user pools.
Amazon Cognito user pools are user directories that make it easier to add sign-up and sign-in to your app. When the AWS Mobile SDKs for iOS and Android register an endpoint with Amazon Pinpoint, Amazon Cognito automatically assigns a user ID from the user pool. For more information, see Using Amazon Pinpoint Analytics with Amazon Cognito User Pools in the Amazon Cognito Developer Guide.

If you don’t want to use Amazon Cognito user pools, you can use the Amazon Pinpoint client in your application to assign user IDs to endpoints.

<div id="java" class="tab-content current">

```java
import com.amazonaws.mobileconnectors.pinpoint.targeting.TargetingClient;
import com.amazonaws.mobileconnectors.pinpoint.targeting.endpointProfile.EndpointProfileUser;
import com.amazonaws.mobileconnectors.pinpoint.targeting.endpointProfile.EndpointProfile;

public void assignUserIdToEndpoint() {
    TargetingClient targetingClient = pinpointManager.getTargetingClient();
    EndpointProfile endpointProfile = targetingClient.currentEndpoint();
    EndpointProfileUser endpointProfileUser = new EndpointProfileUser();
    endpointProfileUser.setUserId("UserIdValue");
    endpointProfile.setUser(endpointProfileUser);
    targetingClient.updateEndpointProfile(endpointProfile);
    Log.d(TAG, "Assigned user ID " + endpointProfileUser.getUserId() +
            " to endpoint " + endpointProfile.getEndpointId());
}
```
</div>

## Endpoint Limits

The limits applicable to the endpoints using the AWS Android SDK for Pinpoint and the Amazon Pinpoint Endpoint API
can be found [here](https://docs.aws.amazon.com/pinpoint/latest/developerguide/limits.html#limits-endpoint).
