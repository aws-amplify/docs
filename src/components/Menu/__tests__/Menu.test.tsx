import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Menu } from '../index';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/[platform]/start/getting-started/introduction/',
      asPath: '/[platform]/start/getting-started/introduction/'
    };
  }
};

jest.mock('next/router', () => routerMock);

const routerMockLegacy = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      pathname: '/[platform]/tools/cli-legacy/overview',
      asPath: '/[platform]/tools/cli-legacy/overview'
    };
  }
};

jest.mock('next/router', () => routerMockLegacy);

describe('Menu', () => {
  // it('should render the Menu component', async () => {
  //   const component = <Menu currentPlatform="react" path="/" />;
  //   render(component);

  //   const menu = await screen.getByRole('navigation', {
  //     name: 'Main'
  //   });

  //   expect(menu).toBeInTheDocument();
  // });

  it('should render the cli-legacy-specific menu', async () => {
    const component = (
      <Menu
        currentPlatform="react"
        path="/[platform]/tools/cli-legacy/overview"
      />
    );

    render(component);
    const cliLegacyMenuItem = await screen.getByRole('link', {
      name: 'Legacy (GraphQL Transformer v1)'
    });
    expect(cliLegacyMenuItem).toBeInTheDocument();
  });

  // it('should render the v5-specific menu', async () => {
  //   const menuComponent = (
  //     <Menu currentPlatform="react" path="/[platform]/prev"></Menu>
  //   );
  //   render(menuComponent);
  //   const v5OnlyMenuItem = await screen.getByRole('link', {
  //     name: 'Typescript Strict Mode'
  //   });
  //   expect(v5OnlyMenuItem).toBeInTheDocument();
  // });

  // it('should render the gen2-specific menu', async () => {
  //   const menuComponent = <Menu currentPlatform="react" path="/gen2"></Menu>;
  //   render(menuComponent);
  //   const gen2OnlyMenuItem = await screen.getByRole('link', {
  //     name: 'How Amplify Gen 2 works'
  //   });
  //   expect(gen2OnlyMenuItem).toBeInTheDocument();
  // });

  // it('should render the sdk-specific menu', async () => {
  //   const menuComponent = (
  //     <Menu currentPlatform="swift" path="/[platform]/sdk"></Menu>
  //   );
  //   render(menuComponent);
  //   const sdkOnlyMenuItem = await screen.getByRole('link', {
  //     name: 'AWS Mobile SDK - Overview'
  //   });
  //   expect(sdkOnlyMenuItem).toBeInTheDocument();
  // });

  // it('should render the MenuItem component', async () => {
  //   const component = <Menu currentPlatform="react" path="/"></Menu>;
  //   render(component);
  //   const menuItems = await screen.getAllByRole('listitem');
  //   const menuItem = menuItems[0];
  //   expect(menuItem.classList).toContain('menu__list-item');
  // });

  // it('should expand menu on Subcategory MenuItem click', async () => {
  //   const component = <Menu currentPlatform="react" path="/"></Menu>;
  //   render(component);
  //   const menuItem = await screen.getByRole('link', {
  //     name: 'Existing AWS resources'
  //   });
  //   expect(menuItem.classList).toContain('menu__list-item__link--subcategory');
  //   expect(menuItem?.nextElementSibling?.classList).toContain(
  //     'menu__list--hide'
  //   );
  // });

  // it('handleFocus', async () => {
  //   const component = <Menu currentPlatform="react" path="/"></Menu>;
  //   render(component);
  //   const menuItemLink = await screen.getByRole('link', {
  //     name: 'Existing AWS resources'
  //   });
  //   const menuItem = menuItemLink.parentElement;
  //   menuItem?.focus();
  // });

  // it('should not render MenuItem if pageNode does not exist', async () => {
  //   const component = (
  //     <Menu currentPlatform="react" path="/[platform]/prev"></Menu>
  //   );
  //   render(component);
  //   const menuItems = await screen.getAllByRole('listitem');
  //   // console.log(menuItems.key['prev/[platform]/build-a-backend/auth/set-up-auth/']);
  //   console.log(menuItems);
  //   // menuItems.forEach((item) => {
  //   //   console.log(item.textContent);
  //   // });
  // });
});
