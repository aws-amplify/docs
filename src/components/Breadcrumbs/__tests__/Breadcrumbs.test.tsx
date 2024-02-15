import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../index';

describe('Breadcrumbs', () => {
  const component = (
    <Breadcrumbs
      route={'/react/build-a-backend/auth/set-up-auth/'}
      platform={'react'}
    />
  );

  it('should render the Breadcrumbs component', async () => {
    render(component);
    const breadcrumbs = await screen.findByLabelText('Breadcrumb');
    expect(breadcrumbs).toBeInTheDocument();
  });

  it('should render Breadcrumb links', async () => {
    render(component);
    const routeList = component.props.route.split('/').filter(function (el) {
      return el != '';
    });
    const breadcrumbsNode = await screen.findByLabelText('Breadcrumb');
    const breadcrumbsList =
      breadcrumbsNode.getElementsByClassName('breadcrumb__item');

    let route = '';
    for (let i = 0; i < breadcrumbsList.length; i++) {
      const breadcrumbLink = breadcrumbsList[i].getElementsByClassName(
        'amplify-breadcrumbs__link'
      )[0];
      route = route + '/' + routeList[i];

      expect(breadcrumbLink).toBeInTheDocument();
      expect(breadcrumbLink).toHaveAttribute('href', route);
    }
  });
});
