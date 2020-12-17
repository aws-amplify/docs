import {Amplify, withSSRContext} from "aws-amplify";
import awsExports from "../../src/aws-exports";
import {listPosts} from "../../src/graphql/queries";

Amplify.configure({...awsExports, ssr: true});

export async function getStaticPaths() {
  const SSR = withSSRContext();
  const {data} = await SSR.API.graphql({query: listPosts});
  const paths = data.listPosts.items.map((post) => ({
    params: {id: post.id},
  }));

  return {
    fallback: true,
    paths,
  };
}
