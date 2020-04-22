import {Config} from "@stencil/core";
import nodePolyfills from "rollup-plugin-node-polyfills";
import {sass} from "@stencil/sass";

export const config: Config = {
  devServer: {
    reloadStrategy: "pageReload",
  },
  nodeResolve: {
    browser: true,
  },
  plugins: [nodePolyfills(), sass()],
  globalStyle: "src/styles/styles.scss",
  enableCache: true,
  commonjs: {
    namedExports: {
      "@aws-sdk/client-cognito-identity-browser": [
        "CognitoIdentityClient",
        "GetIdCommand",
      ],
      "@aws-sdk/credential-provider-cognito-identity": [
        "fromCognitoIdentity",
        "fromCognitoIdentityPool",
      ],
      "@aws-crypto/sha256-js": ["Sha256"],
      uuid: ["v1", "v4"],
      lodash: ["isEmpty", "isEqual", "get"],
      "@aws-sdk/eventstream-marshaller": ["EventStreamMarshaller"],
      "@aws-sdk/fetch-http-handler": ["FetchHttpHandler"],
      "@aws-crypto/sha256-browser": ["Sha256"],
      "@aws-sdk/util-uri-escape": ["escapeUri"],
      "@aws-sdk/config-resolver": [
        "resolveRegionConfig",
        "resolveEndpointsConfig",
      ],
      "@aws-sdk/middleware-signing": [
        "resolveAwsAuthConfig",
        "getAwsAuthPlugin",
      ],
      "@aws-sdk/middleware-retry": ["getRetryPlugin", "resolveRetryConfig"],
      "@aws-sdk/middleware-user-agent": [
        "getUserAgentPlugin",
        "resolveUserAgentConfig",
      ],
      "@aws-sdk/smithy-client": [
        "Client",
        "Command",
        "isa",
        "extendedEncodeURIComponent",
        "LazyJsonString",
      ],
      "@aws-sdk/protocol-http": ["HttpRequest"],
      "@aws-sdk/middleware-serde": ["getSerdePlugin"],
      "@aws-sdk/property-provider": ["ProviderError"],
      "js-cookie": ["set", "get", "remove"],
      "@aws-sdk/node-http-handler": ["NodeHttpHandler"],
      "@aws-sdk/client-cognito-identity": ["defaultProvider"],
      "@aws-sdk/region-provider": ["defaultProvider"],
      "@aws-sdk/eventstream-serde-node": ["eventStreamSerdeProvider"],
    },
  },
  outputTargets: [
    {
      type: "www",
      serviceWorker: {
        unregister: true,
      },
      baseUrl: "https://docs.amplify.aws",
      prerenderConfig: "prerender-config.js",
      copy: [
        {
          src: "sitemap.xml",
          dest: "sitemap.xml",
        },
        {
          src: "manifest.json",
          dest: "manifest.json",
        },
        {
          src: "browserconfig.xml",
          dest: "browserconfig.xml",
        },
        {
          src: "fonts",
        },
        {
          src: "assets",
          keepDirStructure: false,
        },
        {
          src: "api",
        },
        {
          src: "robots.txt",
          dest: "robots.txt",
        },
      ],
    },
  ],
};
