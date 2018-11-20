# Managing multiple environments of your project and managing an Amplify Project within a team or outside a team using the Amplify CLI & Git

When initializing the project using the steps method above, as a part of the `amplify init` command, you were asked to provide a name for your environment. Let's assume that you input `dev` as your environment name in the steps above. In this section, we'll walk you through the steps you need to manage another environment (we'll be creating a `prod` environment) as a part of your Amplify project.

This feature is still in beta and you have to install this beta version, please use following:

```
npm install -g @aws-amplify/cli@multienv

```
## Setting up dev/prod environments 

First, you would need to create a Github/Gitlab repository for your project if you haven't already.
We recommend managing separate Git branches for your different environments (try to have the same branch name as your environment name to avoid confusion).
From the root of your project, execute the following commands:
```
$ git init
$ git checkout -b dev
$ git add <all project related files>
$ git commit -m <commit-message>
$ git remote add origin git@github.com:<repo-name>
$ git push -u origin dev
```
Note: When you initialize a project using the Amplify CLI, it appends(if a gitignore file exists at the root of the project) or creates one for you (if a gitignore file doesn't exist at the root of your project), with a list of recommended files to check in, into the GitHub repository.

Once you have your 'dev' branch setup in Git, lets set up a 'prod' environment in your Amplify project and then we'll walk through the steps to create a corresponding git branch for it.

```
$amplify init
? Do you want to use an existing environment? false
? Enter a name for the environment prod
// Provide AWS Profile info
```

This will set up another environment for the project in the cloud. The backend-configs and resources are now cloned from the dev environment. Run `amplify push` to provision all the AWS resources for your new environment (prod).

Now lets first push the changes to our 'dev' branch (you would just see changes to the team-provider-info.json file - when running a `git status` command, which has cumulative stack information for all the project environments). Then, let's create a new git branch - 'prod' corresponding to the new environment we just created and push the resources in the prod environment.

```
$ git add .
$ git commit -m "Creation of a prod amplify environment"
$ git push -u origin dev
$ git checkout -b prod
$ git push -u origin prod
```

## Team workflow

### Sharing a project within a team
Now, you have two independent environments (dev & prod) in the cloud and have corresponding git branches with your amplify backend infrastructure code on Github. Now, let's walk through the case when a team member wants to work on the same Amplify project and push backend related changes which you, later on, might want to pull.

```
$ git clone <git-repo>
$ cd <project-dir>
$ git checkout dev
$ amplify init
? Do you want to use an existing environment? true
? Choose the environment you would like to use: 
❯ dev 
prod
// The rest of init steps
// Add/update any backend configurations using amplify add/update <category>
$ amplify push
$ git push -u origin dev
```

Now, let's suppose the team-member wants to move these changes to prod. 

```
$ git checkout prod
$ amplify init
? Do you want to use an existing environment? true
? Choose the environment you would like to use: 
 dev 
❯ prod
$ git merge dev
$ amplify push
$ git push -u origin prod
```

Now, suppose you want to pull in changes which your team member pushed. Let's pull in the changes in dev branch & environment. You can do the same for the prod branch & environment

```
$ cd <your-project>
$ git checkout dev
$ $ amplify init
? Do you want to use an existing environment? true
? Choose the environment you would like to use: 
❯ dev 
prod
$ amplify env pull
$ git pull origin dev
```

### Sharing project outside the team
If you observe the amplify/ dir file-structure, we store the team-provider-info.json file in it, which looks something like the following:

```json
{
    "dev": {
        "awscloudformation": {
            "AuthRoleName": "multenvtest-20181115101929-authRole",
            "UnauthRoleArn": "arn:aws:iam::132393967379:role/multenvtest-20181115101929-unauthRole",
            "AuthRoleArn": "arn:aws:iam::132393967379:role/multenvtest-20181115101929-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "multenvtest-20181115101929-deployment",
            "UnauthRoleName": "multenvtest-20181115101929-unauthRole",
            "StackName": "multenvtest-20181115101929",
            "StackId": "arn:aws:cloudformation:us-east-1:132393967379:stack/multenvtest-20181115101929/fc7b1010-e902-11e8-a9bd-50fae97e0835"
        }
    },
    "prod": {
        "awscloudformation": {
            "AuthRoleName": "multenvtest-20181115102119-authRole",
            "UnauthRoleArn": "arn:aws:iam::345090917734:role/multenvtest-20181115102119-unauthRole",
            "AuthRoleArn": "arn:aws:iam::345090917734:role/multenvtest-20181115102119-authRole",
            "Region": "us-east-1",
            "DeploymentBucketName": "multenvtest-20181115102119-deployment",
            "UnauthRoleName": "multenvtest-20181115102119-unauthRole",
            "StackName": "multenvtest-20181115102119",
            "StackId": "arn:aws:cloudformation:us-east-1:345090917734:stack/multenvtest-20181115102119/3e907b70-e903-11e8-a18b-503acac41e61"
        }
    }
}
```

This file is to be shared between team members, so that they have the ability to push/provision resources to the same Cloudformation stack and that way teams can work in a push/pull way and can always be in sync with the latest state of the project in the cloud.

Note: Team members would only be able to push to a stack only if they have the correct credentials (access key/secret keys) to do so.

If you want to share a project publicly and open source your serverless infrastructure, you can remove or put the amplify/team-provider-info.json file in gitignore file.

## Quick Tips
* git and amplify cli should work hand in hand (ideally a CI tool should be used to automate this process - amplify CLI now provides headless support for its init/push commands. Check out https://github.com/aws-amplify/amplify-cli/tree/multienv/packages/amplify-cli/sample-headless-scripts for examples)
* git checkout <branch-name> & amplify init (to initialize the env based on the git branch) should go hand in hand 
* git pull & git env pull should go hand in hand
* git push & amplify push should go hand in hand

## Some other  helpful Environment related commands
* amplify env list [--details] [--json]
* amplify env add (to add an external CFN stack to the project)
* amplify env remove <env-name> (to remove an existing environment locally and from the cloud)
* amplify env get --name <env-name>
* amplify env pull --restore (to restore the local backend  configs to the current state of the environment/resources in the cloud)
