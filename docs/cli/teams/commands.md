---
title: Commands
description: Use these Amplify CLI commands to manage a team workflow with multiple environments.
---

* amplify env add <br>
Adds a new environment to your Amplify Project
* amplify env list [--details] [--json] <br>
Displays a list of all the environments in your Amplify project
* amplify env remove <env-name> <br>
Removes an environment from the Amplify project
* amplify env get --name <env-name> <br>
Displays the details of the environment specified in the command 
* amplify env pull <br>
Pulls your environment from the cloud without impacting any local backend edits. Add the `--restore` flag to overwrite your local backend edits  (operates like the `amplify pull` command).
* amplify env import<br>
Imports an already existing Amplify project environment stack to your local backend. Here's a sample usage of the same

```
#!/bin/bash
set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"Region\": \"us-east-1\",\
\"DeploymentBucketName\": \"mytestproject-20181106123241-deployment\",\
\"UnauthRoleName\": \"mytestproject-20181106123241-unauthRole\",\
\"StackName\": \"mytestproject-20181106123241\",\
\"StackId\": \"arn:aws:cloudformation:us-east-1:132393967379:stack/mytestproject67-20181106123241/1c03a3e0-e203-11e8-bea9-500c20ff1436\",\
\"AuthRoleName\": \"mytestproject67-20181106123241-authRole\",\
\"UnauthRoleArn\": \"arn:aws:iam::132393967379:role/mytestproject67-20181106123241-unauthRole\",\
\"AuthRoleArn\": \"arn:aws:iam::132393967379:role/mytestproject67-20181106123241-authRole\"\
}"
PROVIDER_CONFIG="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"


AWS_CONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\"\
}"

amplify env import \
--name dev \
--config $PROVIDER_CONFIG \
--awsInfo $AWS_CONFIG \
--yes

```

You can get the `AWSCLOUDFORMATIONCONFIG` from the `team-provider-info.json` file from your existing Amplify project.