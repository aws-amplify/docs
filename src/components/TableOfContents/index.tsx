// eslint-disable-next-line @typescript-eslint/no-var-requires
import getElementTop from "../../utils/get-element-top";
import {TOCStyle, H2AnchorStyle, H3AnchorStyle, HeaderStyle} from "./styles";
import {useEffect} from "react";
import {useRouter} from "next/router";

const stickyHeaderHeight = 54;
function scroll(hash) {
  const header = document.querySelector(`[id="${hash}"]`);
  const top = getElementTop(header, stickyHeaderHeight);
  if (top !== window.scrollY) {
    window.scrollTo({top});
  }
}

export default function TableOfContents({children, title}) {
  const router = useRouter();
  if (children.length === 0) {
    return <></>;
  }
  const headers = [];
  let activeLink = 0;
  let previousLink = 0;
  useEffect(() => {
    if (router.asPath.includes("#")) {
      const hash = router.asPath.split("#")[1];
      scroll(hash);
    }

    const headerQueries = headers.map((header) => {
      return document.querySelector(`[id="${header}"]`);
    });
    document.addEventListener("scroll", () => {
      if (headers) {
        let i = headerQueries.findIndex(
          (e) => getElementTop(e, stickyHeaderHeight) - 3 > window.scrollY,
        );
        if (i === -1) {
          i = headers.length;
        }
        activeLink = i - 1;
        if (activeLink !== previousLink) {
          previousLink = activeLink;
          headers.forEach((header) => {
            document
              .querySelectorAll(`a[href="#${header}"]`)
              .forEach((aTag) => {
                aTag.classList.remove("active");
              });
          });
          if (activeLink >= 0) {
            const activeElement = headers[activeLink];
            document
              .querySelectorAll(`a[href="#${activeElement}"]`)
              .forEach((aTag) => {
                aTag.classList.add("active");
              });
            if (activeElement) {
              router.replace(
                window.location.href.split("#")[0],
                window.location.href.split("#")[0] + "#" + activeElement,
                {shallow: true, scroll: false},
              );
            }
          } else {
            router.replace(
              window.location.href.split("#")[0],
              window.location.href.split("#")[0],
              {shallow: true, scroll: false},
            );
          }
        }
      }
    });
  }, []);
  return (
    <TOCStyle>
      <HeaderStyle>
        <h4>{title}</h4>
      </HeaderStyle>
      {children.map(([name, id, level], index) => {
        const slugged = `#${id}`;
        headers.push(id);
        const anchor = (
          <a
            href={slugged} // and then return false in onClick
            onClick={() => {
              setTimeout(scroll.bind(undefined, id), 50);
              return false;
            }}
          >
            <div>{name}</div>
          </a>
        );
        if (level === "h2")
          return <H2AnchorStyle key={index}>{anchor}</H2AnchorStyle>;
        else return <H3AnchorStyle key={index}>{anchor}</H3AnchorStyle>;
      })}
    </TOCStyle>
  );
}
