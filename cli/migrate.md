# Migration
This section covers the steps to migrate your projects initialized using the Amplify CLI version ( < 0.2.0) which doesn't support multiple environments and team workflows. Environment and team workflow support is in beta and can be installed using the following command

```
$ npm install -g @aws-amplify/cli@multienv
```

 **NOTE**: We recommend backing up your Amplify project directory first before performing a migration.

After installing this new version of the CLI, you can either 
1. Auto-migrate your project (initialized using CLI version < 0.2.0), or 
2. Manually migrate the project (For most projects, Auto-Migration is the best bet. However if you modified Cloudformation files in the ./amplify/backend/ directory, then you may need to perform Manual migration steps)

## Auto-migration
After updating the CLI, you can use the `amplify migrate` command to migrate your projects to be compatible with the current version of the CLI being used. 

```
The CLI will migrate your current project to an environment, named as 'NONE' and thereafter you can create any number of environments after the migration based on this environment.
```

**Note**: The CLI would also prompt you to migrate your project when running any other amplify CLI commands on an older project after installing the new version of the cli.

Please follow these instructions if you have functions or interactions category enabled.
### Functions
This is valid only if you have set up a Lambda function + CRUD operations with a DynamoDB table. If this is not valid to you, you can move to the next section.
* Open the `amplify/function/<function-name>/src/app.js` file. Modify the following contents

**Before**
```
let tableName = <table-name>;
```
**After**

```
let tableName = <table-name>;
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
```

Note: This would add environment support to your lambda function to use appropriate dynamo tables

### Interactions
* Open the `amplify/interactions/<bot-name>/src/index.js` file. modify the following contents

**Before**
```
let botParams = {
    "name": "BookTrip",
    .....

```
**After**
```
let botName = "BookTrip";
if(process.env.ENV && process.env.ENV !== "NONE") {
  botName = botName + '_' + process.env.ENV;
}
let botParams = {
        "name": botName,
        .......
```

## Manual migration
If you're planning to manually migrate your project, here is the list of steps that you would need to follow.
```
We will migrate your current project to an environment, named as 'NONE' and thereafter you can create any number of environments after the migration based on this environment.
```

### Core files

#### .gitignore
Update your `.gitignore` with the following contents

```
#amplify
amplify/\#current-cloud-backend
amplify/.config/local-*
amplify/backend/amplify-meta.json
aws-exports.js
awsconfiguration.json
node_modules
```
#### amplify/.config/aws-info.json


* Rename `amplify/.config/aws-info.json` to `amplify/.config/local-aws-info.json`
* Modify the contents of  `amplify/.config/local-aws-info.json` as follows:

**Before**
```
{
    "useProfile": true,
    "profileName": "default"
}
```

**After**
```
{
    "NONE": {
        "useProfile": true,
        "profileName": "default",
        "configLevel": "project"
    }
}
```
Note: You would need to add another configLevel attribute in your object. The other two attributes need to be copied as is.


### amplify/.config/local-env-info.json
This is a new file. From `amplify/.config/project-config.json` copy your `projectPath` and `defaultEditor` attributes and put it in this file, in the following format.

```
{
    "projectPath": "/Users/kaustavg/testfordoc",
    "defaultEditor": "sublime",
    "envName": "NONE"
}
```

Note: You need to add an additional attribute here - `envName`

### amplify/.config/project-config.json

* Remove `projectPath` and `defaultEditor` from the top-level JSON object
* You would also need to change the `frontendHandler` and `providers` attributes in the top level JSON.

**Before**
```
"frontendHandler": {
    "javascript": "/Users/kaustavg/testfordoc/node_modules/amplify-frontend-javascript"
}
```
**After**
```
"frontend": "javascript"
```
Note the attribute name has changed from `frontendHandler` to `frontend`


**Before**
```
 "providers": {
    "awscloudformation": "/Users/kaustavg/testfordoc/node_modules/amplify-provider-awscloudformation"
}
```
**After**
```
"providers": [
    "awscloudformation"
]
```

### .amplifyrc
* Rename the `.amplifyrc` file to `team-provider-info.json` and move it under `amplify/` directory.
* Change the contents as follows

**Before**
```
{
    "providers": {
        "awscloudformation": {
            "AuthRoleName": "testfordoc-20181127103702-authRole",
            "UnauthRoleArn": "arn:aws:iam::132393967379:role/testfordoc-20181127103702-unauthRole",
            "AuthRoleArn": "arn:aws:iam::132393967379:role/testfordoc-20181127103702-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "testfordoc-20181127103702-deployment",
            "UnauthRoleName": "testfordoc-20181127103702-unauthRole",
            "StackName": "testfordoc-20181127103702",
            "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/testfordoc-20181127103702/6d334ec0-f273-11e8-b2b5-500c28b03efd"
        }
    }
}
```

**After**
```
{
    "NONE": {
        "awscloudformation": {
            "AuthRoleName": "testfordoc-20181127103702-authRole",
            "UnauthRoleArn": "arn:aws:iam::132393967379:role/testfordoc-20181127103702-unauthRole",
            "AuthRoleArn": "arn:aws:iam::132393967379:role/testfordoc-20181127103702-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "testfordoc-20181127103702-deployment",
            "UnauthRoleName": "testfordoc-20181127103702-unauthRole",
            "StackName": "testfordoc-20181127103702",
            "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/testfordoc-20181127103702/6d334ec0-f273-11e8-b2b5-500c28b03efd"
        }
    }
}
```


### Category specific changes

Take a look at the categories you have as a part of your project

### Analytics
#### amplify/backend/analytics/<appname>/parameters.json
* Remove `IAMPrefix` key and modify the `authRoleName`, `unauthRoleName` and add `authRoleArn` keys as follows:

**Before**
```
{
    "appName": "testfordoc",
    "roleName": "pinpointLambdaRoledcdb8b6e",
    "cloudWatchPolicyName": "cloudWatchPolicydcdb8b6e",
    "pinpointPolicyName": "pinpointPolicydcdb8b6e",
    "authPolicyName": "pinpoint_amplify_dcdb8b6e",
    "unauthPolicyName": "pinpoint_amplify_dcdb8b6e",
    "authRoleName": "testfordoc-20181127103702-authRole",
    "unauthRoleName": "testfordoc-20181127103702-unauthRole",
    "IAMPrefix": "132393967379"
}
```
**After**
```
{
    "appName": "testfordoc",
    "roleName": "pinpointLambdaRoledcdb8b6e",
    "cloudWatchPolicyName": "cloudWatchPolicydcdb8b6e",
    "pinpointPolicyName": "pinpointPolicydcdb8b6e",
    "authPolicyName": "pinpoint_amplify_dcdb8b6e",
    "unauthPolicyName": "pinpoint_amplify_dcdb8b6e",
    "authRoleName": {
        "Ref": "AuthRoleName"
    },
    "unauthRoleName": {
        "Ref": "UnauthRoleName"
    },
    "authRoleArn": {
        "Fn::GetAtt": [
            "AuthRole",
            "Arn"
        ]
    }
}
```

#### amplify/backend/analytics/<app-name>/pinpoint-cloudformation-template.json
* Modify the `Parameters` attribute to add `authRoleArn` and `env` attributes and remove `IAMPrefix` attribute

**Before**
```
"Parameters": {
    "appName": {
        "Type": "String"
    },
    "appId": {
        "Type": "String",
        "Default": "NONE"
    },
    "roleName": {
        "Type": "String"
    },
    "cloudWatchPolicyName": {
        "Type": "String"
    },
    "pinpointPolicyName": {
        "Type": "String"
    },
    "authPolicyName": {
        "Type": "String"
    },
    "unauthPolicyName": {
        "Type": "String"
    },
    "authRoleName": {
        "Type":  "String"
    },
    "unauthRoleName": {
        "Type":  "String"
    },
    "IAMPrefix": {
        "Type":  "String"
    }
}
```
**After**
```
"Parameters": {
    "appName": {
        "Type": "String"
    },
    "appId": {
        "Type": "String",
        "Default": "NONE"
    },
    "roleName": {
        "Type": "String"
    },
    "cloudWatchPolicyName": {
        "Type": "String"
    },
    "pinpointPolicyName": {
        "Type": "String"
    },
    "authPolicyName": {
        "Type": "String"
    },
    "unauthPolicyName": {
        "Type": "String"
    },
    "authRoleName": {
        "Type": "String"
    },
    "unauthRoleName": {
        "Type": "String"
    },
    "authRoleArn": {
        "Type": "String"
    },
    "env": {
        "Type": "String"
    }
}
```

* Add Condition `ShouldNotCreateEnvResources` to your `Conditions` attribute

**Before**
```
"Conditions": {
    "ShouldCreatePinpointApp": {
        "Fn::Equals": [
            {
                "Ref": "appId"
            },
            "NONE"
        ]
    }
}
```
**After**
```
"Conditions": {
    "ShouldCreatePinpointApp": {
        "Fn::Equals": [
            {
                "Ref": "appId"
            },
            "NONE"
        ]
    },
    "ShouldNotCreateEnvResources": {
        "Fn::Equals": [
            {
                "Ref": "env"
            },
            "NONE"
        ]
    }
}
```

* Modify RoleName property of the LambdaExecutionRole Resource 

**Before**
```
 "Resources": {
    "LambdaExecutionRole": {
        "Condition": "ShouldCreatePinpointApp",
        "Type": "AWS::IAM::Role",
        "Properties": {
            "RoleName": {
                "Ref": "roleName"
            }
```
**After**
```
"LambdaExecutionRole": {
    "Condition": "ShouldCreatePinpointApp",
    "Type": "AWS::IAM::Role",
    "Properties": {
        "RoleName": {
            "Fn::If": [
                "ShouldNotCreateEnvResources",
                {
                    "Ref": "roleName"
                },
                {
                    "Fn::Join": [
                        "",
                        [
                            {
                                "Ref": "roleName"
                            },
                            "-",
                            {
                                "Ref": "env"
                            }
                        ]
                    ]
                }
            ]
        }
```

* Modify the `appName` property in the PinpointFunctionsOutputs Resource
**Before**
```
 "PinpointFunctionOutputs": {
    "Type": "Custom::LambdaCallout",
    "Condition": "ShouldCreatePinpointApp",
    "Properties": {
        "ServiceToken": {
            "Fn::GetAtt": [
                "PinpointFunction",
                "Arn"
            ]
        },
        "appName": {
            "Ref": "appName"
        }
    }
}
```
**After**
```
 "PinpointFunctionOutputs": {
    "Type": "Custom::LambdaCallout",
    "Condition": "ShouldCreatePinpointApp",
    "Properties": {
        "ServiceToken": {
            "Fn::GetAtt": [
                "PinpointFunction",
                "Arn"
            ]
        },
        "appName": {
            "Fn::If": [
                "ShouldNotCreateEnvResources",
                {
                    "Ref": "appName"
                },
                {
                    "Fn::Join": [
                        "",
                        [
                            {
                                "Ref": "appName"
                            },
                            "-",
                            {
                                "Ref": "env"
                            }
                        ]
                    ]
                }
            ]
        }
    }
}
```

* Modify the `Resource` attribute in `CognitoUnauthPolicy` Resource's policy document

**Before**
```
"CognitoUnauthPolicy": {
    "Type": "AWS::IAM::Policy",
    "Condition": "ShouldCreatePinpointApp",
    "Properties": {
      "PolicyName": {"Ref": "unauthPolicyName" },
      "Roles": [ 
        {"Ref": "unauthRoleName" }
      ],
      "PolicyDocument": {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
                "mobiletargeting:PutEvents",
                "mobiletargeting:UpdateEndpoint"
            ],
            "Resource": [
                {

                    "Fn::If": [
                        "ShouldCreatePinpointApp",
                        {

                            "Fn::Join": [
                                "",
                                [
                                  "arn:aws:mobiletargeting:*:",
                                  {
                                    "Ref": "IAMPrefix"
                                  },
                                  ":apps/",
                                  {
                                    "Fn::GetAtt": [
                                        "PinpointFunctionOutputs",
                                        "Id"
                                    ]
                                  },
                                  "*"
                                ]
                            ]
                        },
                    {

                    "Fn::Join": [
                        "",
                        [
                          "arn:aws:mobiletargeting:*:",
                                  {
                                    "Ref": "IAMPrefix"
                                  },
                                  ":apps/",
                                  {
                                    "Ref": "appId"
                                  },
                                  "*"
                                ]
                            ]
                        }
                    ]
                }
        
            ]
          }
        ]
      }
    }
}
```

**After**
```
"CognitoUnauthPolicy": {
    "Type": "AWS::IAM::Policy",
    "Condition": "ShouldCreatePinpointApp",
    "Properties": {
        "PolicyName": {
            "Ref": "unauthPolicyName"
        },
        "Roles": [
            {
                "Ref": "unauthRoleName"
            }
        ],
        "PolicyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "mobiletargeting:PutEvents",
                        "mobiletargeting:UpdateEndpoint"
                    ],
                    "Resource": [
                        {
                            "Fn::If": [
                                "ShouldCreatePinpointApp",
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:mobiletargeting:*:",
                                            {
                                                "Fn::Select": [
                                                    "4",
                                                    {
                                                        "Fn::Split": [
                                                            ":",
                                                            {
                                                                "Ref": "authRoleArn"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            ":apps/",
                                            {
                                                "Fn::GetAtt": [
                                                    "PinpointFunctionOutputs",
                                                    "Id"
                                                ]
                                            },
                                            "*"
                                        ]
                                    ]
                                },
                                {
                                    "Fn::Join": [
                                        "",
                                        [
                                            "arn:aws:mobiletargeting:*:",
                                            {
                                                "Fn::Select": [
                                                    "4",
                                                    {
                                                        "Fn::Split": [
                                                            ":",
                                                            {
                                                                "Ref": "authRoleArn"
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            ":apps/",
                                            {
                                                "Ref": "appId"
                                            },
                                            "*"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}

```

* Similarly modify the `CognitoAuthPolicy` resource's Policy document

**Before**
```
        "CognitoAuthPolicy": {
            "Type": "AWS::IAM::Policy",
            "Condition": "ShouldCreatePinpointApp",
            "Properties": {
              "PolicyName": {"Ref": "authPolicyName" },
              "Roles": [ 
                {"Ref": "authRoleName" }
              ],
              "PolicyDocument": {
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Effect": "Allow",
                    "Action": [
                        "mobiletargeting:PutEvents",
                        "mobiletargeting:UpdateEndpoint"
                    ],
                    "Resource": [
                        {

                            "Fn::If": [
                                "ShouldCreatePinpointApp",
                                {

                                    "Fn::Join": [
                                        "",
                                        [
                                          "arn:aws:mobiletargeting:*:",
                                          {
                                            "Ref": "IAMPrefix"
                                          },
                                          ":apps/",
                                          {
                                            "Fn::GetAtt": [
                                                "PinpointFunctionOutputs",
                                                "Id"
                                            ]
                                          },
                                          "*"
                                        ]
                                    ]
                                },
                                {

                                    "Fn::Join": [
                                        "",
                                        [
                                          "arn:aws:mobiletargeting:*:",
                                          {
                                            "Ref": "IAMPrefix"
                                          },
                                          ":apps/",
                                          {
                                            "Ref": "appId"
                                          },
                                          "*"
                                        ]
                                    ]
                                }
                            ]
                        }
                
                    ]
                  }
                ]
              }
            }
        }
    }
```

**After**
```
        "CognitoAuthPolicy": {
            "Type": "AWS::IAM::Policy",
            "Condition": "ShouldCreatePinpointApp",
            "Properties": {
                "PolicyName": {
                    "Ref": "authPolicyName"
                },
                "Roles": [
                    {
                        "Ref": "authRoleName"
                    }
                ],
                "PolicyDocument": {
                    "Version": "2012-10-17",
                    "Statement": [
                        {
                            "Effect": "Allow",
                            "Action": [
                                "mobiletargeting:PutEvents",
                                "mobiletargeting:UpdateEndpoint"
                            ],
                            "Resource": [
                                {
                                    "Fn::If": [
                                        "ShouldCreatePinpointApp",
                                        {
                                            "Fn::Join": [
                                                "",
                                                [
                                                    "arn:aws:mobiletargeting:*:",
                                                    {
                                                        "Fn::Select": [
                                                            "4",
                                                            {
                                                                "Fn::Split": [
                                                                    ":",
                                                                    {
                                                                        "Ref": "authRoleArn"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    ":apps/",
                                                    {
                                                        "Fn::GetAtt": [
                                                            "PinpointFunctionOutputs",
                                                            "Id"
                                                        ]
                                                    },
                                                    "*"
                                                ]
                                            ]
                                        },
                                        {
                                            "Fn::Join": [
                                                "",
                                                [
                                                    "arn:aws:mobiletargeting:*:",
                                                    {
                                                        "Fn::Select": [
                                                            "4",
                                                            {
                                                                "Fn::Split": [
                                                                    ":",
                                                                    {
                                                                        "Ref": "authRoleArn"
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    ":apps/",
                                                    {
                                                        "Ref": "appId"
                                                    },
                                                    "*"
                                                ]
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        }


```

### API (AppSync)

If you have an existing AppSync API configured via the API category, it will also be migrated when you run `amplify migrate`. If you created your project using the multienv branch of the Amplify CLI while it was in beta, the API will ask you to migrate the first time you try to compile the project (e.g. via `amplify api gql-compile` or `amplify push`).

The main purpose of the API migration is to restructure the API category such that it has its own set of stacks nested under the root Amplify stack. The new nested stacks structure is necessary to allow users to configure larger, more complex, and more customizable APIs using the Amplify CLI. After running the API migration you will see a new file `transform.conf.json` in your amplify API project directory. In this file, you will see something like this:

```
{
    "Migration": {
        "V1": {
            "Resources": [
                "TodoTable"
            ];
        }
    };
}
```

This file tells the CLI which resources existed before the migration so that any new project structures do not try to recreate those resources. You **should never change the "Migration" section of the transform.conf.json**. In the future, this file may be used for additional configuration but, for now, is strictly scoped to migration information.

The API migration occurs in two steps. It will do an intermediate stack update to prepare the existing deployment for the new structure while still retaining any resources that contain data (e.g. Amazon DynamoDB tables). After the intermediate deployment, the CLI will compile the new project structure and deploy the new nested structure. The migration will take a few minutes so please be patient and do not exit out of the migration script.

#### amplify/backend/api/<api-name>/parameters.json

After migration, you will see a new parameter:

```json
{
    "DynamoDBBillingMode": "PROVISIONED"
}
```

You may change the value of *DynamoDBBillingMode* to **PAY_PER_REQUEST** to change the billing mode of any DynamoDB tables created by *@model*.

#### amplify/backend/api/<api-name>/schema or amplify/backend/api/<api-name>/schema.graphql

You may now break up your schema into multiple files by replacing your *schema.graphql* with a *schema/* directory. Any *.graphql* files stored under the *schema/* directory will be included when you compile the project with `amplify api gql-compile` or `amplify push`. If you prefer, you may also continue to use a single *schema.graphql* file to configure your API.

#### amplify/backend/api/<api-name>/stacks

You may use this directory to deploy custom AWS CloudFormation stacks as part of your Amplify project. These stacks will be deployed as a child of the API category stack. The templates in the *stacks/* directory can expect a default set of parameters. When you init a new project, a blank stack will be placed in the *stacks/* directory for you to work off of. The migration process does not create this default stack, but to do this yourself, you can copy the stack below.

```json
{
	"AWSTemplateFormatVersion": "2010-09-09",
	"Description": "An auto-generated nested stack.",
	"Metadata": {},
	"Parameters": {
		"AppSyncApiId": {
			"Type": "String",
			"Description": "The id of the AppSync API associated with this project."
		},
		"AppSyncApiName": {
			"Type": "String",
			"Description": "The name of the AppSync API",
			"Default": "AppSyncSimpleTransform"
		},
		"env": {
			"Type": "String",
			"Description": "The environment name. e.g. Dev, Test, or Production",
			"Default": "NONE"
		},
		"S3DeploymentBucket": {
			"Type": "String",
			"Description": "The S3 bucket containing all deployment assets for the project."
		},
		"S3DeploymentRootKey": {
			"Type": "String",
			"Description": "An S3 key relative to the S3DeploymentBucket that points to the root\nof the deployment directory."
		}
	},
	"Resources": {
		"EmptyResource": {
			"Type": "Custom::EmptyResource",
			"Condition": "AlwaysFalse"
		}
	},
	"Conditions": {
		"HasEnvironmentParameter": {
			"Fn::Not": [
				{
					"Fn::Equals": [
						{
							"Ref": "env"
						},
						"NONE"
					]
				}
			]
		},
		"AlwaysFalse": {
			"Fn::Equals": [
				"true",
				"false"
			]
		}
	},
	"Outputs": {
		"EmptyOutput": {
			"Description": "An empty output. You may delete this if you have at least one resource above.",
			"Value": ""
		}
	}
}
```

#### amplify/backend/api/<api-name>/resolvers

Any files placed here will be deployed as part of the amplify project and made available such that you can reference them from custom stacks. You can also use this directory to overwrite the default behavior of any resolvers generated for you by the GraphQL Transform. For example, if you wanted to implement custom behavior for the request mapping template of the `Query.getPost` resolver created by an *@model*, you would write your own velocity logic in a file `Query.getPost.req.vtl`. At build time, this template will be used instead of the default.

#### amplify/backend/api/<api-name>/build

The API category will no longer overwrite anything outside of the *build* directory. When you run `amplify api gql-compile`, this directory will be overwritten with new deployment assets.

### API (API GW)

#### amplify/backend/api/<api-name>/parameters.json
This file is currently not present. Create this file with the following contents
```
{
    "authRoleName": {
        "Ref": "AuthRoleName"
    },
    "unauthRoleName": {
        "Ref": "UnauthRoleName"
    }
}
```

#### amplify/backend/api/<api-name>/<api-name>-cloudformation-template.json

* Modify the `Parameters` attribute to add `authRoleName`, `unauthRoleName` and `env` attributes and remove `IAMPrefix` attribute

**Before**
```
"Parameters": {
  "functiontestfordoce3828825Name": {
    "Type": "String",
    "Default": "functiontestfordoce3828825Name"
  },
  "functiontestfordoce3828825Arn": {
    "Type": "String",
    "Default": "functiontestfordoce3828825Arn"
  }
}
```
**After**
```
"Parameters": {
    "authRoleName": {
        "Type":  "String"
    },
    "unauthRoleName": {
        "Type":  "String"
    },
    "env": {
        "Type": "String"
    },
  "functiontestfordoce3828825Name": {
    "Type": "String",
    "Default": "functiontestfordoce3828825Name"
  },
  "functiontestfordoce3828825Arn": {
    "Type": "String",
    "Default": "functiontestfordoce3828825Arn"
  }
}
```

* Add Conditions block to the Cloudformation template
```
 "Conditions": {
    "ShouldNotCreateEnvResources": {
        "Fn::Equals": [
            {
                "Ref": "env"
            },
            "NONE"
        ]
    }
}
```

* Modify `Properties.Roles` attribute for `PolicyAPIFW<appName>auth Resource`:

**Before**
```
"Roles": [
    "testfordoc-20181127103702-authRole"
]
```
**After**
```
"Roles": [
    {"Ref": "authRoleName"}
]
```

* Now, if any of your Policies include the `/Prod/*` path, you need to replace it with the following

**Before**
```
{
    "Fn::Join": [
      "",
      [
        "arn:aws:execute-api:",
        {
          "Ref": "AWS::Region"
        },
        ":",
        {
          "Ref": "AWS::AccountId"
        },
        ":",
        {
          "Ref": "testfordocf25bc32c"
        },
        "/Prod/*",
        "/items/*"
      ]
    ]
}

```

**After**
```
 {
    "Fn::Join": [
      "",
      [
        "arn:aws:execute-api:",
        {
          "Ref": "AWS::Region"
        },
        ":",
        {
          "Ref": "AWS::AccountId"
        },
        ":",
        {
          "Ref": "testfordocf25bc32c"
        },
        "/",
        {
          "Fn::If": [
            "ShouldNotCreateEnvResources",
            "Prod", 
            {
              "Ref": "env"
            } 
          ]
        },
        "/*",
        "/items/*"
      ]
    ]
 }
```

* Modify the 'basePath' attribute of the `<api-name><uuid>` resource

**Before**
```
"basePath": "/Prod",
```

**After**
```
basePath": {
  "Fn::If": [
    "ShouldNotCreateEnvResources",
    "/Prod",
    {
      "Fn::Join": [
          "",
          [
              "/",
              {
                  "Ref": "env"
              }
          ]
      ]
    } 
  ]
}
```

* Modify `StageName` Attribute of `DeploymentAPIGW<app-name><uuid>` resource

**Before**
```
"StageName": "Prod",
```
**After**
```
"StageName": {
    "Fn::If": [
      "ShouldNotCreateEnvResources",
      "Prod", 
      {
        "Ref": "env"
      } 
    ]
 }
```

* Modify Outputs.RootURL.Value attribute

**Before**
```
"Value": {"Fn::Join": ["", ["https://", {"Ref": "testfordocf25bc32c"}, ".execute-api.", {"Ref": "AWS::Region"}, ".amazonaws.com/Prod"]]}
```

**After**
```
"Value": {"Fn::Join": ["", ["https://", {"Ref": "testfordocf25bc32c"}, ".execute-api.", {"Ref": "AWS::Region"}, ".amazonaws.com/", {"Fn::If": ["ShouldNotCreateEnvResources","Prod", {"Ref": "env"} ]}]]}
```

### Auth

To migrate auth CFN add the following to your cloud formation template. In a nutshell, the changes are to append `env` to the resource name.
The cloud formation file for Auth category is located at `<project-dir>/amplify/backend/auth/cognito######/cognito######-cloudformation-template.yml`. Add `env`, `authRoleName`, `unauthRoleName`, `authRoleArn` and `unauthRoleArn` to `Parameters` section of the CFN. 

```yaml

Parameters:

env:

Type: String

authRoleName:

Type: String

unauthRoleName:

Type: String

authRoleArn:

Type: String

unauthRoleArn:

Type: String

```

Add a `Conditions` section if its not present ad add `ShouldNotCreateEnvResources` 

```yaml

Conditions:

ShouldNotCreateEnvResources: !Equals [ !Ref env, NONE ]

```

Update the `SNSRole` -> `Properties` -> `RoleName` 



```yaml

Resources: 

#...

SNSRole:

#...

Properties: 

# ...

RoleName: !If [ShouldNotCreateEnvResources, !Ref roleName, !Join ['',[!Ref roleName, '-', !Ref env]]]

```



Update the `UserPool` -> `Properties` -> `UserPoolName` 

```yaml

Resources: 

#...

UserPool:

#...

Properties: 

# ...

UserPoolName: !If [ShouldNotCreateEnvResources, !Ref userPoolName, !Join ['',[!Ref userPoolName, '-', !Ref env]]]

```



Update `UserPoolClientRole` -> `Properties` -> `RoleName`

```yaml

Resources: 

# ...

UserPoolClientRole: 

#...

Properties:

#...

RoleName: !If [ShouldNotCreateEnvResources, !Ref userpoolClientLambdaRole, !Join ['',[!Ref userpoolClientLambdaRole, '-', !Ref env]]]

```



Update `UserPoolClientLambdaPolicy` -> `Properties` -> `Roles`

```yaml

Resources:

#...

UserPoolClientLambdaPolicy: 

#...

Properties:

#...

Roles: !If [ShouldNotCreateEnvResources, !Ref userpoolClientLambdaRole, !Join ['',[!Ref userpoolClientLambdaRole, '-', !Ref env]]]

```



Update `UserPoolClientLogPolicy` -> `Properties` -> `RoleName`

```yaml

Resources:

#...

MFALambdaRole: 

#...

Properties:

#...

Roles: !If [ShouldNotCreateEnvResources, !Ref mfaLambdaRole, !Join ['',[!Ref mfaLambdaRole , '-', !Ref env]]]

```



update `MFALogPolicy` -> `Properties` -> `Roles`

```yaml

Resources:

#...

MFALogPolicy: 

#...

Properties:

#...

Roles:

#...

- !If [ShouldNotCreateEnvResources, !Ref mfaLambdaRole, !Join ['',[!Ref mfaLambdaRole, '-', !Ref env]]]

```



Update `OpenIdLambdaRole` -> `Properties` -> `RoleName`

```yaml

Resources:

# ...

OpenIdLambdaRole: 

# ...

Properties:

#...

RoleName: !If [ShouldNotCreateEnvResources, !Ref openIdLambdaRoleName, !Join ['',[!Ref openIdLambdaRoleName, '-', !Ref env]]]

# ...

Policies:

PolicyDocument:

# ...

Resource: !If [ShouldNotCreateEnvResources, arn:aws:iam:::role/<existing openIdLambdaRoleName>, !Join ['',[arn:aws:iam:::role/< existing openIdLambdaRoleName>, '-', !Ref env]]]

```



Update `openIdLambdaRoleName` -> `Properties` -> `Roles`



```yaml

Resources:

# ...

OpenIdLambdaIAMPolicy:

# ...

Properties:

# ...

Roles:

- !If [ShouldNotCreateEnvResources, !Ref openIdLambdaRoleName, !Join ['',[!Ref openIdLambdaRoleName, '-', !Ref env]]]

```



Update `OpenIdLogPolicy` -> `Properties` -> `Roles`



```yaml

Resources:

#...

OpenIdLogPolicy:

# ...

Properties: 

# ...

Roles: 

- !If [ShouldNotCreateEnvResources, !Ref openIdLambdaRoleName, !Join ['',[!Ref openIdLambdaRoleName, '-', !Ref env]]]

```

Update `IdentityPool` -> `Properties` -> `IdentityPoolName`

```yaml

Resources:

#...

IdentityPool:

# ...

Properties: 

# ...

IdentityPoolName: !If [ShouldNotCreateEnvResources, '<%= props.identityPoolName %>', !Join ['',['<%= props.identityPoolName %>', '__', !Ref env]]]

```





#### Update parameters.json 

Update the parameters.json and change auth and unauth role name to use Refs

```json

"authRoleName": {

"Ref": "AuthRoleName"

},

"unauthRoleName": {

"Ref": "UnauthRoleName"

},

"authRoleArn": {

"Fn::GetAtt": [

"AuthRole",

"Arn"

]

},

"unauthRoleArn": {

"Fn::GetAtt": [

"UnauthRole",

"Arn"

]

}
```

## Function

### amplify/backend/function/<function-name>/<function-name>-cloudformation-template.json

* Modify to Parameters attribute in the CLoudformation to include the `env` attribute

**Before**
```
"Parameters": {
    "storagedynamo57a28a17Name": {
        "Type": "String",
        "Default": "storagedynamo57a28a17Name"
    },
    "storagedynamo57a28a17Arn": {
        "Type": "String",
        "Default": "storagedynamo57a28a17Arn"
    }
}
```
**After**
```
"Parameters": {
    "storagedynamo57a28a17Name": {
        "Type": "String",
        "Default": "storagedynamo57a28a17Name"
    },
    "storagedynamo57a28a17Arn": {
        "Type": "String",
        "Default": "storagedynamo57a28a17Arn"
    },
    "env": {
        "Type": "String"
    }
}
```
* Add Conditions block to the Cloudformation template
```
 "Conditions": {
    "ShouldNotCreateEnvResources": {
        "Fn::Equals": [
            {
                "Ref": "env"
            },
            "NONE"
        ]
    }
}
```

* Modify the `FunctionName` attribute of the `LambdaFunction` resource in the Cloudformation file

**Before**
```
"FunctionName": "testfordoce3828825",
```
**After**
```
"FunctionName": {
    "Fn::If": [
        "ShouldNotCreateEnvResources",
        "testfordoce3828825",
        {
            "Fn::Join": [
                "",
                [
                    "testfordoce3828825",
                    "-",
                    {
                        "Ref": "env"
                    }
                ]
            ]
        }
    ]
}
```

* Add an `Environment` attribute in the  `LambdaFunction` Resource property with the following contents

```
"Environment": {
    "Variables": {
        "ENV": {
            "Ref": "env"
        }
    }
}
```

* Modify the `RoleName` attribute of the `LambdaExecutionRole` Resource.

**Before**
```
"RoleName": "testfordocLambdaRole2cf9b47f",
```
**After**
```
"RoleName": {
    "Fn::If": [
        "ShouldNotCreateEnvResources",
        "testfordocLambdaRole2cf9b47f",
        {
            "Fn::Join": [
                "",
                [
                    "testfordocLambdaRole2cf9b47f",
                    "-",
                    {
                        "Ref": "env"
                    }
                ]
            ]
        }
    ]
}
```

* This change is valid only if you have set up a Lambda function + CRUD operations with a DynamoDB table. If this is not valid to you, you can move to the next section. Open the `amplify/function/<function-name>/src/app.js` file. Modify the following contents

**Before**
```
let tableName = <table-name>;
```
**After**

```
let tableName = <table-name>;
if(process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}
```

Note: This would add environment support to your lambda function to use appropriate dynamo tables

## Hosting
### amplify/backend/hosting/S3AndCloudFront/parameters.json
Create parameters.json that contains the hosting bucket name
{
    "bucketName": <hosting bucket name>
}
### amplify/backend/hosting/S3AndCloudFront/template.json
Insert into template.json the “Parameters” “Conditions” at the root level
```
    "Parameters": {
        "env": {
            "Type": "String"
        },
        "bucketName": {
            "Type": "String"
        }
    },
    "Conditions": {
        "ShouldNotCreateEnvResources": {
            "Fn::Equals": [
                {
                    "Ref": "env"
                },
                "NONE"
            ]
        }
    }
```
change the “Resources.S3Bucket.Properties.BucketName” to:
```
{
    "Fn::If": [
        "ShouldNotCreateEnvResources",
        {
            "Ref": "bucketName"
        },
        {
            "Fn::Join": [
                "",
                [
                    {
                        "Ref": "bucketName"
                    },
                    "-",
                    {
                        "Ref": "env"
                    }
                ]
            ]
        }
    ]
}
```

## Storage (S3)

### amplify/backend/storage/s3aeaffb53/parameters.json

* Modify the `authRoleName` and `unauthRoleName` attributes

**Before**
```
{
    "bucketName": "testfordoc204292c459b845b8b09bcda5719ba21a",
    "authPolicyName": "s3_amplify_aeaffb53",
    "unauthPolicyName": "s3_amplify_aeaffb53",
    "authRoleName": "testfordoc-20181127103702-authRole",
    "unauthRoleName": "testfordoc-20181127103702-unauthRole",
    "authPermissions": "rw",
    "unauthPermissions": "rw"
}
```

**After**
```
{
    "bucketName": "testfordoc204292c459b845b8b09bcda5719ba21a",
    "authPolicyName": "s3_amplify_aeaffb53",
    "unauthPolicyName": "s3_amplify_aeaffb53",
    "authRoleName": {
        "Ref": "AuthRoleName"
    },
    "unauthRoleName": {
        "Ref": "UnauthRoleName"
    },
    "authPermissions": "rw",
    "unauthPermissions": "rw"
}
```

### amplify/backend/storage/s3aeaffb53/s3-cloudformation-template.json
* Add `env` attribute to the Parameters object

**Before**
```
"Parameters": {
    "bucketName": {
        "Type": "String"
    },
    "authPolicyName": {
        "Type": "String"
    },
    "unauthPolicyName": {
        "Type": "String"
    },
    "authRoleName": {
        "Type": "String"
    },
    "unauthRoleName": {
        "Type": "String"
    },
    "unauthPermissions": {
        "Type": "String"
    },
    "authPermissions": {
        "Type": "String"
    }
},

```
**After**

```
"Parameters": {
    "bucketName": {
        "Type": "String"
    },
    "authPolicyName": {
        "Type": "String"
    },
    "unauthPolicyName": {
        "Type": "String"
    },
    "authRoleName": {
        "Type": "String"
    },
    "unauthRoleName": {
        "Type": "String"
    },
    "unauthPermissions": {
        "Type": "String"
    },
    "authPermissions": {
        "Type": "String"
    },
    "env": {
        "Type": "String"
    }
},

```

* Add Conditions block to the Cloudformation template
```
 "Conditions": {
    "ShouldNotCreateEnvResources": {
        "Fn::Equals": [
            {
                "Ref": "env"
            },
            "NONE"
        ]
    }
}
```

*  Modify the `BucketName` property of the `S3Bucket` resource

**Before**
```
"BucketName": {
    "Ref": "bucketName"
},

```
**After**
```
"BucketName": {
    "Fn::If": [
        "ShouldNotCreateEnvResources",
        {
            "Ref": "bucketName"
        },
        {
            "Fn::Join": [
                "",
                [
                    {
                        "Ref": "bucketName"
                    },
                    "-",
                    {
                        "Ref": "env"
                    }
                ]
            ]
        }
    ]
}
```

## Storage (DynamoDB)
### amplify/backend/storage/<table-name>/<table-name>-cloudformation-template.json

* Modify the `Parameters` object in the Cloudformaton file to include an `env` attribute

**Before**
```
"Parameters": {
    "partitionKeyName": {
        "Type": "String"
    },
    "partitionKeyType": {
        "Type": "String"
    },
    
    "tableName": {
        "Type": "String"
    }
}
```

**After**
```
"Parameters": {
    "partitionKeyName": {
        "Type": "String"
    },
    "partitionKeyType": {
        "Type": "String"
    },
    "tableName": {
        "Type": "String"
    },
    "env": {
        "Type": "String"
    }
}
```

* Modify the `TableName` property of the "DynamoDBTable" resource
**Before**
```
 "TableName": {
   "Ref": "tableName"
}

```
**After**
```
"TableName": {
    "Fn::If": [
        "ShouldNotCreateEnvResources",
        {
            "Ref": "tableName"
        },
        {
            "Fn::Join": [
                "",
                [
                    {
                        "Ref": "tableName"
                    },
                    "-",
                    {
                        "Ref": "env"
                    }
                ]
            ]
        }
    ]
}
```

### Notifications
Extract the Pinpoint project information from the amplify/backend/amplifyMeta.json file,
Insert the Pinpoint project information into Team Provider Info’s categories node:
```
 "categories": {
    "notifications": {
    "Pinpoint": {
        "Name": <Pinpoint-Project-Name>,
        "Id": <Pinpoint-Project-Id>,
        "Region": "us-east-1"
    }
    }
}
```
Insert the following in the `categories` attributes of the amplify/backend/backend-config.json file
```
 { 
    "categories": {
        "notifications": {
           <Pinpoint-Project-Name>: {
                "service": "Pinpoint",
                "channels": [<Enabled Pinpoint Channels>]
            }
        }
    }
}
```





