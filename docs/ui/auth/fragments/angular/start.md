## Prerequisites
* [Setup AWS Account & Install Amplify CLI](~/start/getting-started/installation.md)

## Create a new Angular app

<inline-fragment src="~/ui/auth/fragments/angular/new-angular-app.md"></inline-fragment>

## Initialize Amplify project

```console
amplify init
```

> See [Typical Workflows](~/cli/start/workflows.md) for more information about initializing an Amplify project with Amplify CLI

## Add Auth Category

```console
amplify add auth
```

> See [Auth Overview](~/cli/auth/overview.md) for more information about setting up an Auth backend with Amplify CLI

## Push changes to your cloud backend

```console
amplify push
```

## Modify Angular App files

<inline-fragment src="~/ui/auth/fragments/angular/auth-state-management.md"></inline-fragment>

## Run the application
```
ng serve --open
```