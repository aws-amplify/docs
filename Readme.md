# Amplify Framework Documentation

[![CircleCI](https://circleci.com/gh/aws-amplify/docs.svg?style=svg)](https://circleci.com/gh/aws-amplify/docs)

This is the main documentation repository for the Amplify Framework. The documentation is new. We welcome [feedback](https://github.com/aws-amplify/docs/issues/new) and contributions. [Get Started >>](https://aws-amplify.github.io/docs)
 
## Contributing
 
The documentation is tested for spelling errors in CircleCI and against a custom dictionary [.spelling](https://github.com/aws-amplify/docs/blob/master/.spelling). Add the words here e.g. service names etc. that should be bypassed by the checker. The spelling is checked via the `npm test` command during the build. You can see failing builds / errors by clicking on the build badge above. There is also a grammar check that should be run locally via `npm run grammar`.

### Prerequisites

- Node.js `8.x` or greater: check with `node --version`
- NPM or Yarn: check with `npm --version` or `yarn --version`
- Ruby and Bundler: `bundle --version`

### Step-by-step

When contributing to documentation:

1. Fork this repository `git clone git@github.com:aws-amplify/docs`
2. Install all the dependencies
  1. `yarn install` (or `npm install`)
  2. `bundle install`
3. Make your changes and verify them locally with `yarn start` (or `npm start`)
4. Run `npm run build` locally prior to creating a pull request
  1. Fix any spelling/grammar issues and update `.spelling` as needed.
5. Create a Pull Request here
