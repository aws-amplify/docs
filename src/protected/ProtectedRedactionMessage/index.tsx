import { Callout } from '@/components/Callout';

// WARNING: The messaging in this component should NOT be changed without the appropriate approvals
export const ProtectedRedactionGen1Message = () => (
  <Callout warning>
    <p>
      With versions of Amplify CLI <code>@aws-amplify/cli@12.12.2</code> and API
      Category
      <code>@aws-amplify/amplify-category-api@5.11.5</code>, an improvement was
      made to how relational field data is handled in subscriptions when
      different authorization rules apply to related models in a schema. The
      improvement redacts the values for the relational fields, displaying them
      as null or empty, to prevent unauthorized access to relational data. This
      redaction occurs whenever it cannot be determined that the child model
      will be protected by the same permissions as the parent model.
    </p>
    <p>
      Because subscriptions are tied to mutations and the selection set provided
      in the result of a mutation is then passed through to the subscription,
      relational fields in the result of mutations must be redacted.
    </p>
    <p>
      If an authorized end-user needs access to the redacted relational field
      they should perform a query to read the relational data.
    </p>
    <p>
      Additionally, subscriptions will inherit related authorization when
      relational fields are set as required. To better protect relational data,
      consider modifying the schema to use optional relational fields.
    </p>
    <p>
      Based on the security posture of your application, you can choose to
      revert to the subscription behavior before this improvement was made.
    </p>
    <p>
      To do so, use the <code>subscriptionsInheritPrimaryAuth</code> feature
      flag under <code>graphqltransformer</code> in the{' '}
      <code>amplify/backend/cli.json</code> file.
    </p>
    <ul>
      <li>
        If enabled, subscriptions will inherit the primary model authorization
        rules for the relational fields.
      </li>
      <li>
        If disabled, relational fields will be redacted in mutation response
        when there is a difference between auth rules between primary and
        related models.
      </li>
    </ul>
  </Callout>
);

// WARNING: The messaging in this component should NOT be changed without the appropriate approvals
export const ProtectedRedactionGen2Message = () => (
  <Callout warning>
    <p>
      With Amplify Data Construct <code>@aws-amplify/data-construct@1.8.4</code>
      , an improvement was made to how relational field data is handled in
      subscriptions when different authorization rules apply to related models
      in a schema. The improvement redacts the values for the relational fields,
      displaying them as null or empty, to prevent unauthorized access to
      relational data.
    </p>
    <p>
      This redaction occurs whenever it cannot be determined that the child
      model will be protected by the same permissions as the parent model.
    </p>
    <p>
      Because subscriptions are tied to mutations and the selection set provided
      in the result of a mutation is then passed through to the subscription,
      relational fields in the result of mutations must be redacted.
    </p>
    <p>
      If an authorized end-user needs access to the redacted relational fields,
      they should perform a query to read the relational data.
    </p>
    <p>
      Additionally, subscriptions will inherit related authorization when
      relational fields are set as required. To better protect relational data,
      consider modifying the schema to use optional relational fields.
    </p>
  </Callout>
);
