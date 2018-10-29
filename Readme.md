# AWS Amplify Documentation

[![CircleCI](https://circleci.com/gh/aws-amplify/docs.svg?style=svg)](https://circleci.com/gh/aws-amplify/docs)

The main documentation repository for AWS Amplify. The documentation is new and feedback is welcome. Please feel free to [open an issue](https://github.com/aws-amplify/docs/issues/new).

 - [Amplify JS](https://aws-amplify.github.io/docs/js)
 - [Amplify Toolchain](https://aws-amplify.github.io/docs/cli)
 
 ## Contributing
 
The documentation is tested for spelling errors in CircleCI and against a custom dictionary [.spelling](https://github.com/aws-amplify/docs/blob/master/.spelling). Add the words here e.g. service names etc. that should be bypassed by the checker. The spelling is checked via the `npm test` command during the build. You can see failing builds / errors by clicking on the build badge above. There is also a grammar check that should be run locally via `npm run grammer`.

When contributing to documentation:

1. Fork this repository `git clone git@github.com:aws-amplify/docs`
2. Make your changes and run `npm test` and `npm run grammer` locally prior to creating a pull request
3. Fix any spelling/grammar issues and update `.spelling` as needed
4. Create a Pull Request here

