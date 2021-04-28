#### Enable admin UI

If you have already set up the admin UI in a previous step, you can skip ahead to **Deploy data models** in this section. Otherwise, open the amplify console with the following command. 

<inline-fragment src="~/start/getting-started/fragments/flutter/blocks/add-api-enable-admin-ui.md"></inline-fragment>

#### Deploy data models

In order to enable content management capabilities for your API, an additional model deployment may be needed. From the Amplify admin UI:
1. Select **Content** from the sidebar. If you see a message along with a button prompting you to **Go to Data to deploy**, continue on to the next step. Otherwise, you can skip ahead to **Inspect data**
2. Click on **Go to Data to deploy**. You should see your data models represented here.
3. Click on **Save and deploy**
4. When prompted, click **Deploy** to deploy your data models for content management via admin UI.

#### Inspect data

From the Amplify admin UI, select **Content** from the sidebar. If you have added todos from your app, you should see them show up as part of the results!

#### Create data

Synchronization is bi-directional. Try creating a Todo entry:
1. Select **Content** from the sidebar
2. Click **Create todo** and fill in the form.
  - **name**: Sync app to cloud
  - **description**: This was created remotely!
  - **isComplete**: false (unchecked)
3. Click **Save Todo** on the form to save the new entry
