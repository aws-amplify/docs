---
title: Lambda layer behavior updates
description: Amplify has updated the way Lambda layer versions are managed with Amplify CLI version 5.0.0.
---

Amplify has updated the way [Lambda layer](~/cli/function/layers.md) versions are managed with Amplify CLI version 5.0.0. Amplify CLI enables you to configure Lambda layers to pull common code & assets for your Lambda functions into a centralized location. 

In order to take advantage of the newest features and bug fixes, a one-way migration is required for layers created with an older Amplify CLI version. All developers working on a common Amplify project and any CI/CD pipelines should [upgrade to the latest version of Amplify CLI](~/cli/usage/upgrade.md).

## How to initiate layer migration

Any update to an existing Lambda layer triggers a migration for that layer upon `amplify push`. Once the layers are migrated, the layers CANNOT be used with Amplify CLI below version 5.0.0.

## Changes to layer behavior

Starting with the Amplify CLI version 5.0.0 and above, the following changes are coming to Lambda layers:
- Ability to pin a function to always use the latest layer version of a Lambda layer
- Layers auto-installs and packages dependencies listed within `package.json` or `Pipfile`
- Ability to customize layer version descriptions
- Ability to delete individual Lambda layer versions
- _Bug fix:_ Layer version updates are now managed globally, preventing multiple team members from creating conflicting layer versions
