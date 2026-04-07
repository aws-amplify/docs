import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../index';

describe('Breadcrumbs', () => {
  it('should render the Breadcrumbs component', async () => {
    const component = (
      <Breadcrumbs
        route={'/[platform]/build-a-backend/auth/set-up-auth/'}
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
        route={'/[platform]/build-a-backend/auth/set-up-auth/'}
        platform={'react'}
      />
    );
    render(component);
    const breadcrumbsNode = await screen.findByLabelText('Breadcrumb');
    const breadcrumbsList =
      breadcrumbsNode.getElementsByClassName('breadcrumb__item');

    // Verify each rendered breadcrumb has a valid link
    for (let i = 0; i < breadcrumbsList.length; i++) {
      const breadcrumbLink = breadcrumbsList[i].getElementsByClassName(
        'amplify-breadcrumbs__link'
      )[0];
      expect(breadcrumbLink).toBeInTheDocument();
      expect(breadcrumbLink).toHaveAttribute('href');
    }
    // Should have breadcrumbs for: [platform], build-a-backend, auth, set-up-auth
    expect(breadcrumbsList.length).toBeGreaterThanOrEqual(4);
  });

  it('should replace "prev" with applicable version in Breadcrumbs text', async () => {
    const component = (
      <Breadcrumbs
        route={'/gen1/javascript/prev/build-a-backend/auth/set-up-auth/'}
      />
    );
    render(component);
    const routeList = component.props.route.split('/').filter(function (el) {
      return el != '';
    });
    const breadcrumbsNode = await screen.findByLabelText('Breadcrumb');

    const link = breadcrumbsNode
      .getElementsByClassName('amplify-breadcrumbs__link')
      .item(1);

    if (
      link?.getAttribute('href')?.includes('prev') &&
      (routeList[0] == 'javascript' ||
        routeList[0] == 'react' ||
        routeList[0] == 'react-native' ||
        routeList[0] == 'angular' ||
        routeList[0] == 'nextjs' ||
        routeList[0] == 'vue')
    ) {
      expect(link.textContent).toEqual('V5');
    } else if (
      link?.getAttribute('href')?.includes('prev') &&
      (routeList[0] == 'swift' || routeList[0] == 'android')
    ) {
      expect(link.textContent).toEqual('V1');
    } else if (
      link?.getAttribute('href')?.includes('prev') &&
      routeList[0] == 'flutter'
    ) {
      expect(link.textContent).toEqual('V0');
    }
  });

  it('should render links for Breadcrumbs for gen2', async () => {
    const component = (
      <Breadcrumbs
        route={'/[platform]/build-a-backend/auth/set-up-auth/'}
        platform={'react'}
      />
    );
    render(component);
    const breadcrumbsNode = await screen.findByLabelText('Breadcrumb');
    const breadcrumbsList =
      breadcrumbsNode.getElementsByClassName('breadcrumb__item');

    for (let i = 0; i < breadcrumbsList.length; i++) {
      const breadcrumbLink = breadcrumbsList[i].getElementsByClassName(
        'amplify-breadcrumbs__link'
      )[0];
      expect(breadcrumbLink).toBeInTheDocument();
      expect(breadcrumbLink).toHaveAttribute('href');
    }
  });

  it('should skip segments without directory entries', async () => {
    const component = (
      <Breadcrumbs
        route={
          '/[platform]/build-a-backend/add-aws-services/analytics/existing-resources/'
        }
        platform={'react'}
      />
    );
    render(component);
    const breadcrumbsNode = await screen.findByLabelText('Breadcrumb');
    const breadcrumbsList = breadcrumbsNode.getElementsByClassName(
      'amplify-breadcrumbs__link'
    );

    const labels = Array.from(breadcrumbsList).map((el) => el.textContent);
    // "add-aws-services" should be skipped since it has no directory entry
    expect(labels).not.toContain('add-aws-services');
    expect(labels).not.toContain(
      '/[platform]/build-a-backend/add-aws-services'
    );
    // But other segments should still be present
    expect(labels).toContain('React');
    expect(labels).toContain('Build a Backend');
  });
});
