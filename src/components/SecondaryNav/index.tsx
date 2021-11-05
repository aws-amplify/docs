import {
  HostStyle,
  LinkActiveStyle,
  LinkInactiveStyle,
  SecondaryNavStyle,
  ShadowStyle,
} from "./styles";
import {
  IOS_REFERENCE,
  ANDROID_REFERENCE,
  JS_REFERENCE,
} from "../../constants/links";
import ExternalLink from "../ExternalLink";
import InternalLink from "../InternalLink";
import {useRouter} from "next/router";
import {Container} from "../Container";
import {parseLocalStorage} from "../../utils/parseLocalStorage";

export default function SecondaryNav() {
  const router = useRouter();
  const path = router.asPath;
  const filterKeys = parseLocalStorage("filterKeys", {});

  return (
    <HostStyle>
      <Container>
        <SecondaryNavStyle id="secondary-nav">
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
        </SecondaryNavStyle>
      </Container>
    </HostStyle>
  );
}
