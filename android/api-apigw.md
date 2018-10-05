# API
<div class="nav-tab create" data-group='create'>
<ul class="tabs">
    <li class="tab-link java current" data-tab="java">Java</li>
    <li class="tab-link kotlin" data-tab="kotlin">Kotlin</li>
</ul>
## Overview

Add RESTful APIs handled by your serverless Lambda functions. The CLI deploys your APIs and handlers using [Amazon API Gateway](http://docs.aws.amazon.com/apigateway/latest/developerguide/) and [AWS Lambda](http://docs.aws.amazon.com/lambda/latest/dg/).

## Set Up Your Backend

1. Complete the [Get Started](./get-started) steps before you proceed.

2. Use the CLI to add api to your cloud-enabled backend and app.

 In a terminal window, navigate to your project folder (the folder that typically contains your project level `build.gradle`), and add the SDK to your app. Note that the friendly name that specified for the `api` category will be the package name of the generated code.

	```bash
	$ cd ./YOUR_PROJECT_FOLDER
	$ amplify add api
	```

3. Choose `> REST` as your API service.

4. Choose `> Create a new Lambda function`.

5. Choose the `> Serverless express function` template.

6. Restrict API access? Choose `Yes`

7. Who should have access? Choose `Authenticated and Guest users`

8. When configuration of your API is complete, the CLI displays a message confirming that you have configured local CLI metadata for this category. You can confirm this by viewing status.

    ```bash
    $ amplify status
    | Category  | Resource name   | Operation | Provider plugin   |
    | --------- | --------------- | --------- | ----------------- |
    | Function  | lambda01234567  | Create    | awscloudformation |
    | Api       | api012345678    | Create    | awscloudformation |
    ```

9. To create your backend AWS resources run:

    ```bash
    $ amplify push
    ```

   Use the steps in the next section to connect your app to your backend.

## Connect to Your Backend

Use the following steps to add Cloud Logic to your app.

<div id="java" class="tab-content current">
1. Add the following to your `app/build.gradle`:

	```groovy
	dependencies {
		implementation 'com.amazonaws:aws-android-sdk-apigateway-core:2.6.+'
		implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }
		implementation ('com.amazonaws:aws-android-sdk-auth-userpools:2.6.+@aar') { transitive = true }
	}
	```

2. Get your API client name.

    The CLI generates a client code file for each API you add. The API client name is the name of that file, without the extension.

    The path of the client code file is `./src/main/java/YOUR_API_RESOURCE_NAME/YOUR_APP_NAME_XXXXClient.java`.

    So, for an app named `useamplify` with an API resource named `xyz123`, the path of the code file will be `./src/main/java/xyz123/useamplifyabcdClient.java`. The API client name will be `useamplifyabcdClient`.

    - Find the resource name of your API by running `amplify status`.
    - Copy your API client name to use when invoking the API in the following step.

3. Invoke a Cloud Logic API.

    The following code shows how to invoke a Cloud Logic API using your API's client class,
    model, and resource paths.

    ```java
    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.util.Log;

    import com.amazonaws.http.HttpMethodName;
    import com.amazonaws.mobile.client.AWSMobileClient;
    import com.amazonaws.mobile.client.AWSStartupHandler;
    import com.amazonaws.mobile.client.AWSStartupResult;
    import com.amazonaws.mobileconnectors.apigateway.ApiClientFactory;
    import com.amazonaws.mobileconnectors.apigateway.ApiRequest;
    import com.amazonaws.mobileconnectors.apigateway.ApiResponse;
    import com.amazonaws.util.IOUtils;
    import com.amazonaws.util.StringUtils;

    import java.io.InputStream;
    import java.util.HashMap;
    import java.util.Map;

    // TODO Replace this with your api friendly name and client class name
    import YOUR_API_RESOURCE_NAME.YOUR_APP_NAME_XXXXClient;

    public class MainActivity extends AppCompatActivity {
        private static final String TAG = MainActivity.class.getSimpleName();

        // TODO Replace this with your client class name
        private YOUR_APP_NAME_XXXXClient apiClient;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);

            // Initialize the AWS Mobile Client
            AWSMobileClient.getInstance().initialize(this, new AWSStartupHandler() {
                @Override
                public void onComplete(AWSStartupResult awsStartupResult) {
                    Log.d(TAG, "AWSMobileClient is instantiated and you are connected to AWS!");
                }
            }).execute();


            // Create the client
            apiClient = new ApiClientFactory()
                    .credentialsProvider(AWSMobileClient.getInstance().getCredentialsProvider())
                    .build(YOUR_API_CLIENT_NAME.class);

            callCloudLogic();
        }

        public void callCloudLogic() {
            // Create components of api request
            final String method = "GET";
            final String path = "/items";

            final String body = "";
            final byte[] content = body.getBytes(StringUtils.UTF8);

            final Map parameters = new HashMap<>();
            parameters.put("lang", "en_US");

            final Map headers = new HashMap<>();

            // Use components to create the api request
            ApiRequest localRequest =
                    new ApiRequest(apiClient.getClass().getSimpleName())
                            .withPath(path)
                            .withHttpMethod(HttpMethodName.valueOf(method))
                            .withHeaders(headers)
                            .addHeader("Content-Type", "application/json")
                            .withParameters(parameters);

            // Only set body if it has content.
            if (body.length() > 0) {
                localRequest = localRequest
                        .addHeader("Content-Length", String.valueOf(content.length))
                        .withBody(content);
            }

            final ApiRequest request = localRequest;

            // Make network call on background thread
            new Thread(new Runnable() {
                @Override
                public void run() {
                    try {
                        Log.d(TAG,
                                "Invoking API w/ Request : " +
                                        request.getHttpMethod() + ":" +
                                        request.getPath());

                        final ApiResponse response = apiClient.execute(request);

                        final InputStream responseContentStream = response.getContent();

                        if (responseContentStream != null) {
                            final String responseData = IOUtils.toString(responseContentStream);
                            Log.d(TAG, "Response : " + responseData);
                        }

                        Log.d(TAG, response.getStatusCode() + " " + response.getStatusText());

                    } catch (final Exception exception) {
                        Log.e(TAG, exception.getMessage(), exception);
                        exception.printStackTrace();
                    }
                }
            }).start();
        }
      }
    ```
</div>
<div id="kotlin" class="tab-content">
1. Add the following to your `app/build.gradle`:

	```groovy
	dependencies {
		implementation 'com.amazonaws:aws-android-sdk-apigateway-core:2.6.+'
		implementation ('com.amazonaws:aws-android-sdk-mobile-client:2.6.+@aar') { transitive = true }
		implementation ('com.amazonaws:aws-android-sdk-auth-userpools:2.6.+@aar') { transitive = true }
	}
	```

2. Get your API client name.

    The CLI generates a client code file for each API you add. The API client name is the name of that file, without the extension.

    The path of the client code file is `./src/main/java/YOUR_API_RESOURCE_NAME/YOUR_APP_NAME_XXXXClient.java`.

    So, for an app named `useamplify` with an API resource named `xyz123`, the path of the code file will be `./src/main/java/xyz123/useamplifyabcdClient.java`. The API client name will be `useamplifyabcdClient`.

    - Find the resource name of your API by running `amplify status`.
    - Copy your API client name to use when invoking the API in the following step.

3. Invoke a Cloud Logic API.

    The following code shows how to invoke a Cloud Logic API using your API's client class,
    model, and resource paths.

    ```kotlin
    import android.os.Bundle
    import android.support.v7.app.AppCompatActivity
    import android.util.Log
    import com.amazonaws.http.HttpMethodName
    import com.amazonaws.mobile.client.AWSMobileClient
    import com.amazonaws.mobileconnectors.apigateway.ApiClientFactory
    import com.amazonaws.mobileconnectors.apigateway.ApiRequest
    import com.amazonaws.util.IOUtils
    import com.amazonaws.util.StringUtils

    // TODO Replace this with your api friendly name and client class name
    import YOUR_API_RESOURCE_NAME.YOUR_APP_NAME_XXXXClient
    import kotlin.concurrent.thread

    class MainActivity : AppCompatActivity() {
        companion object {
            private val TAG = MainActivity.javaClass.simpleName
        }

        // TODO Replace this with your client class name
        private var apiClient: YOUR_APP_NAME_XXXXClient? = null

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)

            // Initialize the AWS Mobile Client
            AWSMobileClient.getInstance().initialize(this) { Log.d(TAG, "AWSMobileClient is instantiated and you are connected to AWS!") }.execute()

            // Create the client
            apiClient = ApiClientFactory().credentialsProvider(AWSMobileClient.getInstance().credentialsProvider)
                    // TODO Replace this with your client class name
                    .build(YOUR_APP_NAME_XXXXClient::class.java)

            callCloudLogic()
        }

        fun callCloudLogic() {
            val body = ""

            val parameters = mapOf("lang" to "en_US")
            val headers = mapOf("Content-Type" to "application/json")

            val request = ApiRequest(apiClient?.javaClass?.simpleName)
                    .withPath("/items")
                    .withHttpMethod(HttpMethodName.GET)
                    .withHeaders(headers)
                    .withParameters(parameters)

            if (body.isNotEmpty()) {
                val content = body.toByteArray(StringUtils.UTF8)
                request.addHeader("Content-Length", content.size.toString())
                        .withBody(content)
            }

            thread(start = true) {
                try {
                    Log.d(TAG, "Invoking API")
                    val response = apiClient?.execute(request)
                    val responseContentStream = response?.getContent()
                    if (responseContentStream != null) {
                        val responseData = IOUtils.toString(responseContentStream)
                        // Do something with the response data here
                        Log.d(TAG, "Response: $responseData")
                    }
                } catch (ex: Exception) {
                    Log.e(TAG, "Error invoking API")
                }
            }
        }
    }

    ```
</div>
