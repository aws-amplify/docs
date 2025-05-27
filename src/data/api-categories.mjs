// mapping of api categories coming in from libraries to the associated categories in the docs

export const REFERENCE_IMPORTS = {
  'amplify-js': [
    ['aws-amplify', 'auth'],
    ['aws-amplify', 'storage'],
    ['aws-amplify', 'analytics'],
    ['aws-amplify', 'api'],
    ['aws-amplify', 'in-app-messaging']
  ]
};

// Mapping to make reference page building direct
// { 'aws-amplify/auth': {repo: 'amplify-js', category: 'auth'}}
export const REFERENCE_IMPORTS_LOOKUP = Object.keys(REFERENCE_IMPORTS)
  .flatMap((repo) => {
    return REFERENCE_IMPORTS[repo].map((importName) => {
      const importPath = importName.join('/');
      const retObj = {};
      retObj[importPath] = {
        repo,
        category: importName[importName.length - 1]
      };
      return retObj;
    });
  })
  .reduce((retObj, curObj) => ({ ...retObj, ...curObj }), {});

export const ROOT_PACKAGE = 'aws-amplify';
