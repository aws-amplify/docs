module.exports = {
  invalidRedirects: () => {
    const Ajv = require('ajv');
    const redirects = require('../../../redirects.json');
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

    const errors = [];
    const validate = ajv.compile(schema);

    const validateEntries = (redirects) => {
      const valid = validate(redirects);

      if (!valid) {
        const error = validate.errors[0];
        const invalidEntry =
          JSON.stringify(redirects[error.instancePath.slice(1, -7)]);
        const loc = error.schemaPath.slice(error.schemaPath.indexOf('properties') + 11, -8);
        const errorMessage = '\n\n' + 'INVALID ENTRY: Please correct the error in the "' + loc +'" property of the following entry: \n' + invalidEntry + '\n' + 'ERROR MESSAGE: ' + error.message;
        errors.push(errorMessage);

        validateEntries(redirects.splice(parseInt(error.instancePath.slice(1, -7)) + 1));

      } 
    }
    validateEntries(redirects);

    return errors;
  }
}


