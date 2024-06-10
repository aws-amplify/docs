module.exports = {
  invalidRedirects: () => {
    const Ajv = require('ajv');
    const redirectsImport = require('../../../redirects.json');
    const ajv = new Ajv();

    const schema = {
      type: 'array',
      items: {
        type: 'object',
        required: ['source', 'target', 'status'],
        properties: {
          source: {
            description: 'The address the user requested.',
            type: 'string',
            pattern: '^/'
          },
          target: {
            description:
              'The address that actually serves the content that the user sees',
            type: 'string',
            pattern: '^[(https)(/)]'
          },
          status: {
            description:
              'Types include a permanent redirect (301), a temporary redirect (302), a rewrite (200), or not found (404).',
            type: 'string',
            pattern: '^[0-5-]+$'
          }
        }
      }
    };

    let redirects = redirectsImport;
    const errors = [];

    const validateEntries = (redirects) => {
      const validate = ajv.compile(schema);
      const valid = validate(redirects);

      if (!valid) {
        const error = validate.errors[0];
        const invalidEntry =
          JSON.stringify(redirects[error.instancePath.slice(1, -7)]);
        const loc = error.schemaPath.slice(error.schemaPath.indexOf('properties') + 11, -8);
        const errorMessage = '\n\n' + 'INVALID ENTRY: Please correct the error in the "' + loc +'" property of the following entry: \n' + invalidEntry + '\n\n' + 'ERROR MESSAGE: ' + error.message;

        errors.push(errorMessage)
        redirects = redirects.splice(error.instancePath.slice(1, -7))
        
        validateEntries(redirects)
      } else if (valid && errors.length > 0) {
        return errors.stringify();
      }
    }

    validateEntries(redirects);
  }
}


