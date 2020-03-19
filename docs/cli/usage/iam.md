---
title: IAM Policy
description: Landing page for the Amplify CLI
--- 

The Amplify CLI requires the below IAM policies for performing actions across all categories. You can grant or restrict category permissions by including or removing items from the `Action` section as appropriate. For example, if you wish to restrict operations on the `Auth` category you can remove any of the lines starting with `cognito`.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "appsync:*",
                "apigateway:POST",
                "apigateway:DELETE",
                "apigateway:PATCH",
                "apigateway:PUT",
                "cloudformation:CreateStack",
                "cloudformation:CreateStackSet",
                "cloudformation:DeleteStack",
                "cloudformation:DeleteStackSet",
                "cloudformation:DescribeStackEvents",
                "cloudformation:DescribeStackResource",
                "cloudformation:DescribeStackResources",
                "cloudformation:DescribeStackSet",
                "cloudformation:DescribeStackSetOperation",
                "cloudformation:DescribeStacks",
                "cloudformation:UpdateStack",
                "cloudformation:UpdateStackSet",
                "cloudfront:CreateCloudFrontOriginAccessIdentity",
                "cloudfront:CreateDistribution",
                "cloudfront:DeleteCloudFrontOriginAccessIdentity",
                "cloudfront:DeleteDistribution",
                "cloudfront:GetCloudFrontOriginAccessIdentity",
                "cloudfront:GetCloudFrontOriginAccessIdentityConfig",
                "cloudfront:GetDistribution",
                "cloudfront:GetDistributionConfig",
                "cloudfront:TagResource",
                "cloudfront:UntagResource",
                "cloudfront:UpdateCloudFrontOriginAccessIdentity",
                "cloudfront:UpdateDistribution",
                "cognito-identity:CreateIdentityPool",
                "cognito-identity:DeleteIdentityPool",
                "cognito-identity:DescribeIdentity",
                "cognito-identity:DescribeIdentityPool",
                "cognito-identity:SetIdentityPoolRoles",
                "cognito-identity:UpdateIdentityPool",
                "cognito-idp:CreateUserPool",
                "cognito-idp:CreateUserPoolClient",
                "cognito-idp:DeleteUserPool",
                "cognito-idp:DeleteUserPoolClient",
                "cognito-idp:DescribeUserPool",
                "cognito-idp:UpdateUserPool",
                "cognito-idp:UpdateUserPoolClient",
                "dynamodb:CreateTable",
                "dynamodb:DeleteItem",
                "dynamodb:DeleteTable",
                "dynamodb:DescribeTable",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem",
                "dynamodb:UpdateTable",
                "iam:CreateRole",
                "iam:DeleteRole",
                "iam:DeleteRolePolicy",
                "iam:GetRole",
                "iam:GetUser",
                "iam:PassRole",
                "iam:PutRolePolicy",
                "iam:UpdateRole",
                "lambda:AddPermission",
                "lambda:CreateFunction",
                "lambda:DeleteFunction",
                "lambda:GetFunction",
                "lambda:GetFunctionConfiguration",
                "lambda:InvokeAsync",
                "lambda:InvokeFunction",
                "lambda:RemovePermission",
                "lambda:UpdateFunctionCode",
                "lambda:UpdateFunctionConfiguration",
                "s3:*",
                "amplify:*"
            ],
            "Resource": "*"
        }
    ]
}
```

## IAM Roles & MFA

You can optionally configure the Amplify CLI to assume an IAM role by defining a profile for the role in the shared `~/.aws/config` file. This is similar to how the [AWS CLI](https://aws.amazon.com/cli/) functions, including short term credentials. This can be useful when you have multiple developers using one or more AWS accounts, including team workflows where you want to restrict the category updates they might be permitted to make.

When prompted during the execution of `amplify init` or the `amplify configure project` command, you will select a configured profile for the role, and the Amplify CLI will handle the logic to retrieve, cache and refresh the temp credentials. If Multi-Factor Authentication (MFA) is enabled, the CLI will prompt you to enter the MFA token code when it needs to retrieve or refresh temporary credentials.

The Amplify CLI has its own mechanism of caching temporary credentials, it does NOT use the same cache of the AWS CLI. The temporary credentials are cached at `~/.amplify/awscloudformation/cache.json`. You can remove all cached credentials by removing this file.
If you only want to remove the cached temp credentials associated with a particular project, execute `amplify awscloudformation reset-cache` or it's alias `amplify aws reset-cache` in the project.

### Step by step guide to create and assume an IAM role
The following is a step by step guide on how to create an IAM role and make it available for the Amplify CLI.

The setup has three parts, we will use an example to demonstrate this capability.

Assume Biz Corp has decided to hire Dev Corp to develop its inventory management web portal, and Dev Corp is using the Amplify CLI to speed up the development process.

#### Part #1: Set up the role (Biz Corp)
1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console.
2. In the navigation pane of the console, choose `Roles` and then choose `Create role`.
3. Choose the `Another AWS account` role type.
4. For Account ID, type Dev Corp's AWS account ID (the account ID of the entity you want to grant access to your AWS resources).
5. Although optional, it is recommended to select `Require external ID` and enter the external id given to you by Dev Corp. (click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) for more details on external IDs).
6. If you want to restrict the role to users who sign in with multi-factor authentication (MFA), select `Require MFA`(click [here](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html) for more details on MFA).
7. Choose `Next: Permissions`.
8. Select permissions policies that you want the developers from Dev Corp to have when the role is assumed.
Note: You MUST grant the role permissions to perform CloudFormation actions and create associated resources (depending on the categories you use in your project) such as:
- Cognito User and Identity Pools
- S3 buckets
- DynamoDB tables
- AppSync APIs
- API Gateway APIs
- Pinpoint endpoints
- Cloudfront distributions
- IAM Roles
- Lambda functions
- Lex bots

9. Choose `Next: Tagging`, attach tags if you want (optional).
10. Choose `Next: Review`, type a name for your role, and optionally add the role description.
11. Enter the required fields such as the "Role name".
11. Choose `Create role`.
12. Give the Role Arn to Dev Corp.

#### Part #2: Set up the user to assume the role (Dev Corp)

**2.1 Create a policy that has permission to assume the role created above by Biz corp.**

1. Get the Role Arn from Biz Corp.
2. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console. (Assuming Dev corp has a separate AWS account).
3. In the navigation pane of the console, choose `Policies` and then choose `Create policy`.
4. Select the 'JSON' tab and paste the following contents in the pane, replacing `<biz_corp_rol_arn>` with the value previously noted.
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "<biz_corp_rol_arn>"
        }
    ]
}
```
3. Choose `Review policy`.
4. Type in the policy Name, and optionally add the policy description.
5. Choose `Create policy`.

**2.2 Attach the policy to the user**

1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console.
2. In the navigation pane of the console, choose `Users` and then choose `Add user`.
3. Type the `User name` for the new user.
4. Select Programmatic access for `Access type`.
5. Choose `Next: Permissions`.
6. On the Set Permissions Page, select `Attach existing policies directly`.
7. Select the policy created in 2.1.
9. Choose `Next: Tagging`, attach tags if you wish (optional).
10. Choose `Next: Review`.
11. Choose `Create User`.
12. Click `Download .csv` to download a copy of the credentials. You can, optionally, copy paste the Access Key ID and Secret Access Key and store it in a safe location. These credentials would be used in a later section.

**2.3 Assign MFA device (Optional)**

This must be set up if the Biz Corp selected to `Require MFA` when creating the role. This needs to be set up by Dev Corp users and in their respective AWS account.<br/>
We are using a virtual MFA device, such as the Google Authenticator app, in this example.

1. Sign in to the AWS Management Console and open the [IAM](https://console.aws.amazon.com/iam/) console.
2. In the navigation pane of the console, choose `Users` and select the user created above in 2.2.
3. Select the `Security Credentials` tab.
4. Next to the `Assigned MFA device` label, choose the `Manage` option.
5. In the Manage MFA Device wizard, choose `Virtual MFA device`, and then choose `Continue`.
7. Choose `Show QR code` if the MFA app supports QR code, and scan the QR code from your virtual device(Google Authenticator app in our case), if not, choose `Show secret key` and type it into the MFA app.
8. In the MFA code 1 box, type the one-time password that currently appears in the virtual MFA device. Wait for the device to generate a new one-time password. Then type the second one-time password into the MFA code 2 box. Then choose Assign MFA.
9. Copy the MFA device arn next to `Assigned MFA device`, which will be used in part 3.

#### Part #3: Set up the local development environment (Dev Corp)
1. On the local development system, create the following two files if they do not exist.<br/>
  `~/.aws/config`<br/>
  `~/.aws/credentials`<br/>
2. Insert the following contents into the `~/.aws/config` file:

```
[profile bizcorprole]
role_arn=<role_arn_from_part#1>
source_profile=devcorpuser
mfa_serial=<mfa_serial_from_part_2.3---optional>
external_id=<external_id_as_mentioned_in_part#1--optional>
region=us-east-1

[profile devcorpuser]
region=us-east-1
```

`mfa_serial` and `external_id` are optional, leave them out if they are not configured.

3. Insert the following contents into the `~/.aws/credentials` file:
```
[devcorpuser]
aws_access_key_id=<key_id_from_part_2.2>
aws_secret_access_key=<secret_access_key_from_part_2.2>
```

Now, when Dev Corp is trying to initialize an Amplify Project, the user can select the `bizcorprole` profile configured above, and based on the authentication method set up the user would be prompted with corresponding questions such as MFA codes. After this, the user would be able to successfully deploy/manage AWS resources in Biz corps account (based on the access policies set by the Biz corp).


You can take a look at [AWS IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user.html) and the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-role.html) documentation for more details on IAM role and its usage.
