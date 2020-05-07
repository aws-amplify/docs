### Step 5: Verify backend (Optional)
Optionally, you can see this empty cloud formation instance by going to the web based by issuing the command:
```
$ amplify console
```
Then using the navigation bar at the top to find **Cloud Formation**.

Select your newly created stack.  It may have a name like **amplify-myamplifyapp-dev-xxxxxx**.

Once selecting your stack, you should see something like the following:
![GSA](~/images/getting-started-amplify/60_1_verify.png)

This view represents the root stack that Amplify CLI created for your project.  As you provision additional categories for your application, Amplify will add its associated resources within this stack.
