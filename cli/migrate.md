




## Manual migration
If you're planning to manually migrate your project, here are the list of steps that you would need to follow:

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

* Remove `projectPath` and `defaultEditor` from the top level JSON object
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

* Modify RoleName propery of the LambdaExecutionRole Resource 

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
For AppSync, just run `amplify api gql-compile` to generate the Cloudformation file and resolvers based off your annotated schema.

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

* Modufy `Properties.Roles` attribute for `PolicyAPIFW<appName>auth Resource`:

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

* Now, if any of your Policies includes the `/Prod/*` path, you need to replace it with the following

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

To migrate auth CFN add the following to your cloud formation template. In a nutshell the changes are to append `env` to resource name.
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





#### Update parameter.json 

Update the parameter.json and change auth and unauth role name to use Refs

```JSON

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

* Modify the `TableNmae` property of the "DynamoDBTable" resource
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
Extract the Pinpoint project information from the mplify/backend/amplifyMeta.json file,
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





