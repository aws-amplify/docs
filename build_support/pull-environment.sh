#!/bin/sh
set -e
IFS='|'

FRONTENDCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"client/www\",\
\"BuildCommand\":\"yarn export\",\
\"StartCommand\":\"yarn start\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"none\",\
\"config\":$FRONTENDCONFIG\
}"
AMPLIFY="{\
\"appId\":\"$APP_ID\",\
\"envName\":\"$ENV_NAME\",\
\"defaultEditor\":\"code\",\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"default\",\
\"region\":\"$AWS_REGION\"\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

echo y | amplify pull --amplify $AMPLIFY --frontend $FRONTEND --providers $PROVIDERS