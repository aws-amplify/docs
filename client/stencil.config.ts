import {Config} from "@stencil/core";
import nodePolyfills from "rollup-plugin-node-polyfills";

export const config: Config = {
  globalScript: "src/global/global.ts",
  nodeResolve: {
    browser: true,
  },
  plugins: [nodePolyfills()],
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
      serviceWorker: null,
      baseUrl: "https://amplify.aws/",
      copy: [
        {
          src: "browserconfig.xml",
          dest: "browserconfig.xml",
        },
        {
          src: "robots.txt",
          dest: "robots.txt",
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
      ],
    },
  ],
};
