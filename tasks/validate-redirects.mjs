import Ajv from 'ajv';
import * as redirects from '../redirects.json' assert { type: 'json' };
const ajv = new Ajv({ formats: { 'uri-reference': true }, strict: false });

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
        format: 'uri-reference',
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

const validate = ajv.compile(schema);

const valid = validate(redirects.default);
if (!valid) {
  const invalidEntry =
    redirects.default[validate.errors[0].instancePath.slice(1, -7)];
  const loc = validate.errors[0].schemaPath;
  const error = loc.slice(loc.indexOf('properties') + 11, -8);

  console.log(
    'Please correct the error in the "' +
      error +
      '" property of the following entry:'
  );
  console.log(invalidEntry);
}

module.exports = {
  invalidRedirects: () => {
    return true;
  }
};
