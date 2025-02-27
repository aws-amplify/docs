// mapping of api categories coming in from libraries to the associated categories in the docs
export const packageCategories = {
  'amplify-js': {
    ROOT_PACKAGE: 'aws-amplify',
    API_CATEGORIES: {
      auth: 'auth',
      storage: 'storage'
    },
    API_SUB_CATEGORIES: {
      analytics: 'analytics',
      'rest-api': 'api',
      'in-app-messaging': 'in-app-messaging'
    }
  }
};
