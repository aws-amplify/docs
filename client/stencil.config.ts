import {Config} from "@stencil/core";
import nodePolyfills from "rollup-plugin-node-polyfills";
import {sass} from "@stencil/sass";

export const config: Config = {
  extras: {
    initializeNextTick: false,
  },
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
      "@aws-sdk/fetch-http-handler": ["FetchHttpHandler", "streamCollector"],
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
        "dateToUtcString",
        "getArrayIfSingleItem",
        "getValueFromTextNode",
      ],
      "@aws-sdk/protocol-http": ["HttpRequest", "HttpResponse"],
      "@aws-sdk/middleware-serde": ["getSerdePlugin"],
      "@aws-sdk/property-provider": ["ProviderError"],
      "js-cookie": ["set", "get", "remove"],
      "@aws-sdk/node-http-handler": ["NodeHttpHandler"],
      "@aws-sdk/client-cognito-identity": ["defaultProvider"],
      "@aws-sdk/region-provider": ["defaultProvider"],
      "@aws-sdk/eventstream-serde-node": ["eventStreamSerdeProvider"],
      "@aws-sdk/eventstream-serde-browser": ["eventStreamSerdeProvider"],
      "@aws-sdk/middleware-bucket-endpoint": [
        "resolveBucketEndpointConfig",
        "getBucketEndpointPlugin",
      ],
      "@aws-sdk/middleware-sdk-s3": ["getValidateBucketNamePlugin"],
      "@aws-sdk/xml-builder": ["XmlText", "XmlNode"],
      "@aws-sdk/middleware-apply-body-checksum": [
        "getApplyMd5BodyChecksumPlugin",
      ],
    },
  },
  outputTargets: [
    {
      type: "www",
      serviceWorker: {
        unregister: true,
      },
      baseUrl: "https://docs.amplify.aws",
      prerenderConfig: "prerender.config.ts",
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
