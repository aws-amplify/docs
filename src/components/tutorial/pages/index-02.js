import {Amplify, withSSRContext} from "aws-amplify";
import awsExports from "../src/aws-exports";
import {listPosts} from "../src/graphql/queries";

Amplify.configure({...awsExports, ssr: true});

export async function getServerSideProps({req}) {
  const SSR = withSSRContext({req});
  const response = await SSR.API.graphql({query: listPosts});

  return {
    props: {
      posts: response.data.listPosts.items,
    },
  };
}
