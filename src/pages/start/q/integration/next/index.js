import {Page} from "src/components/page";
import Head from "next/head";

export default function Index() {
  return (
    <>
      <Head>
        <title>Getting Started with Next.js</title>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <style jsx global>
        {`
          html {
            line-height: 1.15;
            -webkit-text-size-adjust: 100%;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            font-weight: 400;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          body {
            margin: 0;
            overflow-x: hidden;
            position: relative;
          }

          * {
            margin: 0;
            padding: 0;
          }

          *,
          :after,
          :before {
            box-sizing: inherit;
          }

          a {
            color: inherit;
            text-decoration: none;
          }

          ol,
          ul {
            list-style: none;
          }

          img {
            display: inline-block;
            vertical-align: top;
          }

          .ch-editor-body {
            padding: 5px 0px !important;
          }
        `}
      </style>
      <Page />
    </>
  );
}
