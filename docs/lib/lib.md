---
title: Libraries
description: Feature offerings
disableTOC: true
filterKey: platform
---

The Amplify open-source client libraries provide use-case centric, opiniated, declarative, and easy-to-use interfaces across different categories of cloud powered operations enabling mobile and web developers to easily interact with their backends. These libraries are powered by AWS services and offer a pluggable model which can be extended to use other providers. The libraries can be used with both new backends created using the Amplify CLI and/or existing backend resources that were not created using the Amplify CLI.  

## How are these different from the AWS Mobile SDKs?
The Amplify client libraries are use-case centric as compared to the Mobile SDKs which are service-centric. This enables you to focus on your use-case more rather than figuring out the AWS service nuances. For most AWS Services, the Mobile SDKs are auto-generated while the Amplify libraries are hand authored providing a highly abstracted category based programming model. You can also use the Mobile SDKs with the Amplify libraries using escape hatches if the use case you are trying to build is not available in Amplify libraries.

<inline-fragment platform="ios" src="~/fragments/lib/ios.md"></inline-fragment>
<inline-fragment platform="android" src="~/fragments/lib/android.md"></inline-fragment>
<inline-fragment platform="js" src="~/fragments/lib/js.md"></inline-fragment>
