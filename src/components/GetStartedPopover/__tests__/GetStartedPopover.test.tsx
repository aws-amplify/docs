import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { GetStartedPopover, generateGetStartedLinks } from '../index';
import userEvent from '@testing-library/user-event';
import {
  IconAndroid,
  IconAngular,
  IconFlutter,
  IconJS,
  IconNext,
  IconReact,
  IconSwift,
  IconVue
} from '@/components/Icons';

const routerMock = {
  __esModule: true,
  useRouter: () => {
    return {
      query: { platform: 'react' },
      asPath: '/'
    };
  }
};

jest.mock('next/router', () => routerMock);

describe('GetStartedPopover', () => {
  const getStartedHref = '/[platform]/start/quickstart/';
  const getStartedLinks = [
    {
      title: 'React',
      href: {
        pathname: getStartedHref,
        query: { platform: 'react' }
      },
      icon: <IconReact />,
      platform: 'react'
    },
    {
      title: 'JavaScript',
      href: {
        pathname: getStartedHref,
        query: { platform: 'javascript' }
      },
      icon: <IconJS />,
      platform: 'javascript'
    },
    {
      title: 'Flutter',
      href: {
        pathname: getStartedHref,
        query: { platform: 'flutter' }
      },
      icon: <IconFlutter />,
      platform: 'flutter'
    },
    {
      title: 'Swift',
      href: {
        pathname: getStartedHref,
        query: { platform: 'swift' }
      },
      icon: <IconSwift />,
      platform: 'swift'
    },
    {
      title: 'Android',
      href: {
        pathname: getStartedHref,
        query: { platform: 'android' }
      },
      icon: <IconAndroid />,
      platform: 'android'
    },
    {
      title: 'React Native',
      href: {
        pathname: getStartedHref,
        query: { platform: 'react-native' }
      },
      icon: <IconReact />,
      platform: 'react-native'
    },
    {
      title: 'Angular',
      href: {
        pathname: getStartedHref,
        query: { platform: 'angular' }
      },
      icon: <IconAngular />,
      platform: 'angular'
    },
    {
      title: 'Next.js',
      href: {
        pathname: getStartedHref,
        query: { platform: 'nextjs' }
      },
      icon: <IconNext />,
      platform: 'nextjs'
    },
    {
      title: 'Vue',
      href: {
        pathname: getStartedHref,
        query: { platform: 'vue' }
      },
      icon: <IconVue />,
      platform: 'vue'
    }
  ];

  const component = (
    <GetStartedPopover platform={'react'} getStartedLinks={getStartedLinks} />
  );

  const componentWithGeneratedLinks = (
    <GetStartedPopover
      platform={'react'}
      getStartedLinks={generateGetStartedLinks(getStartedHref)}
    />
  );

  it('should render the GetStartedPopover component', async () => {
    render(component);

    const gettingStartedBtn = await screen.findByRole('link', {
      name: 'Get started'
    });

    expect(gettingStartedBtn).toBeInTheDocument();
  });

  it('should link to the selected platform on click of "Getting started"', async () => {
    render(component);

    const popoverNode = await screen.findByRole('link', {
      name: 'Get started'
    });
    expect(popoverNode.getAttribute('href')).toContain(
      '/react/start/quickstart'
    );
  });

  it('should show platform options on click of split button', async () => {
    render(component);

    const button = await screen.findByRole('button', {
      name: 'Toggle getting started guides navigation'
    });
    const dropdown = await screen.findByRole('navigation', {
      name: 'Getting started guides for other platforms'
    });

    expect(dropdown.classList).not.toContain('popover--expanded');
    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
  });

  it('should show each platform option with link to corresponding Getting Started page', async () => {
    render(component);

    const swiftOption = await screen.findByRole('link', { name: 'Swift' });
    const angularOption = await screen.findByRole('link', { name: 'Angular' });
    const nextjsOption = await screen.findByRole('link', { name: 'Next.js' });
    expect(swiftOption.getAttribute('href')).toContain(
      '/swift/start/quickstart'
    );
    expect(angularOption.getAttribute('href')).toContain(
      '/angular/start/quickstart'
    );
    expect(nextjsOption.getAttribute('href')).toContain(
      '/nextjs/start/quickstart'
    );
  });

  it('should minimize dropdown on click outside dropdown', async () => {
    render(component);
    const button = await screen.findByRole('button', {
      name: 'Toggle getting started guides navigation'
    });
    const dropdown = await screen.findByRole('navigation', {
      name: 'Getting started guides for other platforms'
    });

    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
    userEvent.click(document.body);
    expect(dropdown.classList).not.toContain('popover--expanded');
  });

  it('should minimize dropdown on tab after last platform option', async () => {
    render(component);
    const button = await screen.findByRole('button', {
      name: 'Toggle getting started guides navigation'
    });
    const dropdown = await screen.findByRole('navigation', {
      name: 'Getting started guides for other platforms'
    });
    const platformOptions =
      document.getElementsByClassName('popover-list__link');

    userEvent.click(button);
    expect(dropdown.classList).toContain('popover--expanded');
    userEvent.tab();
    expect(platformOptions[0].textContent).toBe('React');
    expect(platformOptions[0]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[1].textContent).toBe('JavaScript');
    expect(platformOptions[1]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[2].textContent).toBe('Flutter');
    expect(platformOptions[2]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[3].textContent).toBe('Swift');
    expect(platformOptions[3]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[4].textContent).toBe('Android');
    expect(platformOptions[4]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[5].textContent).toBe('React Native');
    expect(platformOptions[5]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[6].textContent).toBe('Angular');
    expect(platformOptions[6]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[7].textContent).toBe('Next.js');
    expect(platformOptions[7]).toHaveFocus();
    userEvent.tab();
    expect(platformOptions[8].textContent).toBe('Vue');
    expect(platformOptions[8]).toHaveFocus();
    userEvent.tab();
    expect(dropdown.classList).not.toContain('popover--expanded');
    expect(dropdown).not.toHaveFocus();
  });

  it('should link to the selected platform gen 1 link on click of "Getting started" if passed gen 1 links', async () => {
    const gen1GetStartedLinks = getStartedLinks.map((link) => {
      link.href.pathname =
        '/gen1/[platform]/start/getting-started/introduction/';

      return link;
    });

    routerMock.useRouter = () => {
      return {
        query: { platform: 'vue' },
        asPath: '/gen1'
      };
    };

    const gen1GetStartedPopover = (
      <GetStartedPopover
        platform={'vue'}
        getStartedLinks={gen1GetStartedLinks}
      />
    );

    render(gen1GetStartedPopover);

    const popoverNode = await screen.findByRole('link', {
      name: 'Get started'
    });

    expect(popoverNode.getAttribute('href')).toContain(
      '/gen1/vue/start/getting-started/introduction'
    );
  });

  it('should show each platform option with link to corresponding gen1 Getting Started if passed gen 1 links', async () => {
    const gen1GetStartedLinks = getStartedLinks.map((link) => {
      link.href.pathname =
        '/gen1/[platform]/start/getting-started/introduction/';

      return link;
    });

    const gen1GetStartedPopover = (
      <GetStartedPopover
        platform={'react'}
        getStartedLinks={gen1GetStartedLinks}
      />
    );

    render(gen1GetStartedPopover);

    const swiftOption = await screen.findByRole('link', { name: 'Swift' });
    const angularOption = await screen.findByRole('link', { name: 'Angular' });
    const nextjsOption = await screen.findByRole('link', { name: 'Next.js' });

    expect(swiftOption.getAttribute('href')).toContain(
      '/gen1/swift/start/getting-started/introduction'
    );

    expect(angularOption.getAttribute('href')).toContain(
      '/gen1/angular/start/getting-started/introduction'
    );

    expect(nextjsOption.getAttribute('href')).toContain(
      '/gen1/nextjs/start/getting-started/introduction'
    );
  });

  it('should generate getStartedLinks using generateGetStartedLinks function', async () => {
    render(componentWithGeneratedLinks);

    const swiftOption = await screen.findByRole('link', { name: 'Swift' });
    const angularOption = await screen.findByRole('link', { name: 'Angular' });
    const nextjsOption = await screen.findByRole('link', { name: 'Next.js' });
    expect(swiftOption.getAttribute('href')).toContain(
      '/swift/start/quickstart'
    );
    expect(angularOption.getAttribute('href')).toContain(
      '/angular/start/quickstart'
    );
    expect(nextjsOption.getAttribute('href')).toContain(
      '/nextjs/start/quickstart'
    );
  });
});
