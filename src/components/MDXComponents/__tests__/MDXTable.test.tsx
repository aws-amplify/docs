import { render, screen } from '@testing-library/react';
import { MDXTable } from '../MDXTable';

describe('MDXTable', () => {
  it('should render table', () => {
    render(
      <MDXTable>
        <thead>
          <tr>
            <th align="left"></th>
            <th align="left">Amplify Authenticator</th>
            <th align="left">Amplify Libraries</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td align="left">
              <strong>Description</strong>
            </td>
            <td align="left">
              Open source drop-in UI component for authentication
            </td>
            <td align="left">
              Low-level building blocks for implementing authentication
            </td>
          </tr>
          <tr>
            <td align="left">
              <strong>Benefits</strong>
            </td>
            <td align="left">
              Automatically integrates with your existing Amplify configuration
              and allows you to easily add the entire authentication flow to
              your application. You can then customize themes to adjust colors
              and styling as needed.
            </td>
            <td align="left">
              Gives you full control over the UI and logic implementation.
            </td>
          </tr>
          <tr>
            <td align="left">
              <strong>Constraints</strong>
            </td>
            <td align="left">
              Dependent on Amplify CLI for provisioning resources.
            </td>
            <td align="left">
              Requires the building of screens and frontend logic to enable the
              sign-in and registration experiences.
            </td>
          </tr>
        </tbody>
      </MDXTable>
    );

    const tableHeading = screen.getByText('Amplify Authenticator');
    const scrollViewAriaLabel = screen.getByLabelText('Scrollable table');

    expect(tableHeading).toBeInTheDocument();
    expect(scrollViewAriaLabel).toBeInTheDocument();
  });
});
