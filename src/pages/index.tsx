import React, { useEffect, useState } from 'react';

import { Layout } from '@/components/Layout';

import { trackPageVisit } from '@/utils/track';

const meta = {
  title: 'Amplify Docs',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  url: 'https://docs.amplify.aws/'
};

export default function Page() {
  useEffect(() => {
    trackPageVisit();
  }, []);

  return <div style={{ minHeight: '600px' }}>Home page</div>;
}

Page.getLayout = function getLayout(page) {
  const [menuOpen, toggleMenuOpen] = useState(false);
  return (
    <Layout
      pageTitle={meta.title}
      pageDescription={meta.description}
      url={meta.url}
      pageType="home"
    >
      {page}
    </Layout>
  );
};
