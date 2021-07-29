import {
  LinkActiveStyle,
  LinkInactiveStyle,
  SecondaryNavStyle,
  ShadowStyle,
} from "./styles";
import {
  AWS_USER_GUIDE,
  IOS_REFERENCE,
  ANDROID_REFERENCE,
  JS_REFERENCE,
} from "../../constants/links";
import ExternalLink from "../ExternalLink";
import InternalLink from "../InternalLink";
import {useRouter} from "next/router";
import {Container} from "../Container";

export default function SecondaryNav() {
  const router = useRouter();
  const path = router.pathname;
  let filterKeys = {};
  if (typeof localStorage !== "undefined")
    filterKeys = JSON.parse(localStorage.getItem("filterKeys"));

  return (
    <SecondaryNavStyle id="secondary-nav">
      <Container>
        <div>
          {[
            {
              label: "Getting Started",
              url: "/start",
            },
            {
              label: "Libraries",
              url: "/lib",
              additionalActiveChildRoots: ["/lib", "/sdk"],
            },
            {
              label: "UI Components",
              url: "/ui",
              additionalActiveChildRoots: ["/ui"],
            },
            {
              label: "CLI",
              url: "/cli",
            },
            {
              label: "Console",
              url: "/console",
            },
            {
              label: "Guides",
              url: "/guides",
            },
            ...("platform" in filterKeys &&
            (filterKeys as {platform: string}).platform
              ? [
                  {
                    label: "API Reference",
                    url: (() => {
                      switch ((filterKeys as {platform: string}).platform) {
                        case "ios": {
                          return IOS_REFERENCE;
                        }
                        case "android": {
                          return ANDROID_REFERENCE;
                        }
                        default: {
                          return JS_REFERENCE;
                        }
                      }
                    })(),
                    external: true,
                  },
                ]
              : []),
          ].map(({url, label, external, additionalActiveChildRoots}) => {
            const matchingRoots =
              additionalActiveChildRoots === undefined
                ? [url]
                : [url, ...additionalActiveChildRoots];
            const active = matchingRoots.some((root) => {
              return path.startsWith(root);
            });
            const LinkStyle = active ? LinkActiveStyle : LinkInactiveStyle;
            if (external) {
              return (
                <ExternalLink href={url} key={label} graphic="black">
                  <span>{label}</span>
                </ExternalLink>
              );
            } else {
              return (
                <InternalLink href={url} key={label}>
                  <LinkStyle href={url}>{label}</LinkStyle>
                </InternalLink>
              );
            }
          })}
          <ShadowStyle />
        </div>
      </Container>
    </SecondaryNavStyle>
  );
}
