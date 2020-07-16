You can use the device related features of Amazon Cognito UserPools by enabling the `Devices` features. Go to your Cognito UserPool, click on `Devices` in Left Navigation Menu and chose one of `User Opt In` or `Always`.

If you chose `Always` every device used by your application’s users is remembered.

You can read more about the device features in the following [blog](https://aws.amazon.com/blogs/mobile/tracking-and-remembering-devices-using-amazon-cognito-your-user-pools/).

## Terminology

* *Tracked*

When devices are tracked, a set of device credentials consisting of a key and secret key pair is assigned to every device. You can view all tracked devices for a specific user from the Amazon Cognito console device browser, which you can view by choosing a user from the Users panel. In addition, you can see some metadata (whether it is remembered, time it began being tracked, last authenticated time, etc.) associated with the device and its usage.


* *Remembered*

Remembered devices are also tracked. During user authentication, the key and secret pair assigned to a remembered device is used to authenticate the device to verify that it is the same device that the user previously used to sign in to the application. You can also see remembered devices from the Amazon Cognito console.


* *Not Remembered*

A not-remembered device is the flipside of being remembered, though the device is still tracked. The device is treated as if it was never used during the user authentication flow. This means that the device credentials are not used to authenticate the device. The new APIs in the AWS Mobile SDK do not expose these devices, but you can see them in the Amazon Cognito console.

## Remember Device

This option will mark the tracked device as `remembered`

```java
AWSMobileClient.getInstance().getDeviceOperations().updateStatus(true, new Callback<Void>() {
    @Override
    public void onResult(Void result) {
        Log.d(TAG, "onResult: ");
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "onError: ", e);
    }
});
```

## Update Device

This option will mark the tracked device as `not remembered`.

```java
AWSMobileClient.getInstance().getDeviceOperations().updateStatus(false, new Callback<Void>() {
    @Override
    public void onResult(Void result) {
        Log.d(TAG, "onResult: ");
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "onError: ", e);
    }
});
```

## Forget Device

This option will stop tracking the device altogether.

```java
AWSMobileClient.getInstance().getDeviceOperations().forget(new Callback<Void>() {
    @Override
    public void onResult(Void result) {
        Log.d(TAG, "onResult: ");
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "onError: ", e);
    }
});
```

> Note: Once you call `forget`, you can update the status of the device in the same auth session. The end user will have to sign in again to remember the device.

## Get Device Details

```java
AWSMobileClient.getInstance().getDeviceOperations().get(new Callback<Device>() {
    @Override
    public void onResult(Device result) {
        Log.d(TAG, "onResult: ");
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "onError: ", e);
    }
});
```

## List Devices

```java
AWSMobileClient.getInstance().getDeviceOperations().list(new Callback<ListDevicesResult>() {
    @Override
    public void onResult(ListDevicesResult result) {
        Log.d(TAG, "onResult: ");
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "onError: ", e);
    }
});
```