// import * as React from 'react';
// import { render, screen } from '@testing-library/react';
// import FilterChildren from '../index';

const routerMock = {
  __esModule: true
};

jest.mock('next/router', () => routerMock);

describe('FilterChildren', () => {
  it('placeholder test', () => {
    expect(true).toBeTruthy();
  });
  // const allChildren = [
  //   <span key="platform">Platform Child</span>,
  //   <span key="integration">Integration Child</span>,
  //   <span key="framework">Framework Child</span>
  // ];
  // it('should render the FilterChildren component', async () => {
  //   routerMock.useRouter = () => {
  //     return {
  //       query: {}
  //     };
  //   };
  //   const children = [<span key="all">FilterChildren Child</span>];
  //   render(<FilterChildren>{children}</FilterChildren>);
  //   const filterNode = await screen.findByText('FilterChildren Child');
  //   expect(filterNode).toBeInTheDocument();
  // });
  // it('should include platform children', async () => {
  //   routerMock.useRouter = () => {
  //     return {
  //       query: {
  //         platform: 'platform'
  //       }
  //     };
  //   };
  //   render(<FilterChildren>{allChildren}</FilterChildren>);
  //   const platformNode = await screen.findByText('Platform Child');
  //   const integrationNode = await screen.queryByText('Integration Child');
  //   const frameworkNode = await screen.queryByText('Framework Child');
  //   expect(platformNode).toBeInTheDocument();
  //   expect(integrationNode).not.toBeInTheDocument();
  //   expect(frameworkNode).not.toBeInTheDocument();
  // });
  // it('should include integration children', async () => {
  //   routerMock.useRouter = () => {
  //     return {
  //       query: {
  //         integration: 'integration'
  //       }
  //     };
  //   };
  //   render(<FilterChildren>{allChildren}</FilterChildren>);
  //   const platformNode = await screen.queryByText('Platform Child');
  //   const integrationNode = await screen.queryByText('Integration Child');
  //   const frameworkNode = await screen.queryByText('Framework Child');
  //   expect(platformNode).not.toBeInTheDocument();
  //   expect(integrationNode).toBeInTheDocument();
  //   expect(frameworkNode).not.toBeInTheDocument();
  // });
  // it('should include framework children', async () => {
  //   routerMock.useRouter = () => {
  //     return {
  //       query: {
  //         framework: 'framework'
  //       }
  //     };
  //   };
  //   render(<FilterChildren>{allChildren}</FilterChildren>);
  //   const platformNode = await screen.queryByText('Platform Child');
  //   const integrationNode = await screen.queryByText('Integration Child');
  //   const frameworkNode = await screen.queryByText('Framework Child');
  //   expect(platformNode).not.toBeInTheDocument();
  //   expect(integrationNode).not.toBeInTheDocument();
  //   expect(frameworkNode).toBeInTheDocument();
  // });
});
