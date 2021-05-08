const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

  export async function getStaticProps ({params}) {
    console.log(params);
    console.log(params.platform);

    if(params.platform == 'js') {
      return {
        props: {},
      };
    }
    else {
      return {
        props: {},
        notFound: true,
      };
    }
  }

  export async function getStaticPaths ({params}) {
    return {
      paths: [],
      fallback: true,
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const visit = require("unist-util-visit");
const mdxTocPlugin = () => (tree) => {
  const slug = function(str) {
    let slugged = "";
    for (const c of str) {
      if (c >= "A" && c <= "z") {
        slugged += c.toLowerCase();
      } else if (c >= "0" && c <= "9") {
        slugged += c;
      } else if (c === " " || c === "-") {
        slugged += "-";
      }
    }
    return slugged;
  };

  visit(tree, "heading", (heading) => {
    const node = {...heading};
    const data = node.data || (node.data = {});
    const props = data.hProperties || (data.hProperties = {});
    const id = slug(node.children[0].value);
    data.id = id;
    props.id = id;
    heading.children = [node];
    heading.type = "link";
    heading.url = `#${id}`;

    return visit.SKIP;
  });
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [mdxTocPlugin],
    renderer: mdxRenderer,
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "tsx"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  future: {
    webpack5: true,
  },
});
