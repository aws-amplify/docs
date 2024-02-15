import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../index';

describe('Breadcrumbs', () => {
  it('should render the Breadcrumbs component', async () => {
    const component = (
      <Breadcrumbs
        route={'/react/build-a-backend/auth/set-up-auth/'}
        platform={'react'}
      />
    );
    render(component);
    const breadcrumbs = await screen.findByLabelText('Breadcrumb');
    expect(breadcrumbs).toBeInTheDocument();
  });

  it('should render links for Breadcrumbs including platform', async () => {
    const component = (
      <Breadcrumbs
        route={'/react/build-a-backend/auth/set-up-auth/'}
        platform={'react'}
      />
    );
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

  it('should render links for Breadcrumbs for gen2', async () => {
    const component = (
      <Breadcrumbs route={'/gen2/build-a-backend/auth/set-up-auth/'} />
    );
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

  it('should render links for Breadcrumbs with no platform', async () => {
    const component = (
      <Breadcrumbs route={'/build-a-backend/auth/set-up-auth/'} />
    );
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
