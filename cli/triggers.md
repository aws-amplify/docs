# Lamba Triggers

Certain AWS Services can [invoke Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/lambda-services.html) in response to lifecycle events.  The Amplify CLI provides trigger templates for common use cases.

## Auth

The CLI Auth workflow provides the following Lambda trigger templates:

### Custom Auth Challenge with Goolge reCaptcha

Captchas allow front end applications to guards against bots or other unwanted page interactions by presenting a challenge that is designed to require human intervention.  The Google reCaptcha service is a popular implementation of captcha.  

This template will configure three triggers: CreateAuthChallenge, DefineAuthChallenge and VerifyAuthChallengeResponse.