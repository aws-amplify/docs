import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {Amplify, API, Auth, withSSRContext} from "aws-amplify";
import Head from "next/head";
import awsExports from "../src/aws-exports";
import {createPost} from "../src/graphql/mutations";
import {listPosts} from "../src/graphql/queries";
import styles from "../styles/Home.module.css";

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

async function handleCreatePost(event) {
  event.preventDefault();

  const form = new FormData(event.target);

  try {
    const {data} = await API.graphql({
      authMode: "AMAZON_COGNITO_USER_POOLS",
      query: createPost,
      variables: {
        input: {
          title: form.get("title"),
          content: form.get("content"),
        },
      },
    });

    window.location.href = `/posts/${data.createPost.id}`;
  } catch ({errors}) {
    console.error(...errors);
    throw new Error(errors[0].message);
  }
}
