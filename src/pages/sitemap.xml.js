// eslint-disable-next-line @typescript-eslint/no-empty-function
const Sitemap = () => {};

export const getServerSideProps = ({res}) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
        <loc>https://docs.amplify.aws/</loc>
        <lastmod>2005-01-01</lastmod>
        <changefreq>hourly</changefreq>
        <priority>.5</priority>
  </url>
  </urlset>`;
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
