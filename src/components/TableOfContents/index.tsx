// eslint-disable-next-line @typescript-eslint/no-var-requires
import getElementTop from "../../utils/get-element-top";
import {
  TOCStyle,
  TOCInnerStyle,
  H2AnchorStyle,
  H3AnchorStyle,
  HeaderStyle,
} from "./styles";
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
  window.onload = (_) => {
    if (window.location.href.includes("#")) {
      const hash = window.location.href.split("#")[1];
      scroll(hash);
    }
  };
  let headers = [];
  let headerQueries = [];
  let activeLink = 0;
  let previousLink = 0;
  useEffect(() => {
    const idSet = new Set();
    const headings = document.querySelectorAll("a > h2, a > h3");
    const headings2 = document.getElementById("toc").querySelectorAll("a");
    for (let i = 0; i < headings.length; ++i) {
      const id = headings[i].id;
      let counter = 0;
      let uniqueId = id;
      while (idSet.has(uniqueId)) {
        counter++;
        uniqueId = id + "-" + counter.toString();
      }
      idSet.add(uniqueId);

      headings[i].id = uniqueId;
      if (counter !== 0) {
        (headings[i].parentElement as HTMLAnchorElement).href = `#${uniqueId}`;
        headings2[i].href = `#${uniqueId}`;
      }
      (headings[i].parentElement as HTMLAnchorElement).onclick = () => {
        setTimeout(scroll.bind(undefined, uniqueId), 50);
        return false;
      };
      headings2[i].onclick = () => {
        setTimeout(scroll.bind(undefined, uniqueId), 50);
        return false;
      };
    }
    headers = Array.from(headings).map((heading) => heading.id);
    headerQueries = headers.map((header) => {
      return document.querySelector(`[id="${header}"]`);
    });

    const scrollHandler = () => {
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
    };
    document.addEventListener("scroll", scrollHandler);
    return function cleanup() {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <TOCStyle id="toc">
      <TOCInnerStyle>
        <HeaderStyle>
          <h4>{title}</h4>
        </HeaderStyle>
        {children.map(([name, id, level], index) => {
          const slugged = `#${id}`;
          const anchor = (
            <a href={slugged}>
              <div>{name}</div>
            </a>
          );
          if (level === "h2")
            return <H2AnchorStyle key={index}>{anchor}</H2AnchorStyle>;
          else return <H3AnchorStyle key={index}>{anchor}</H3AnchorStyle>;
        })}
      </TOCInnerStyle>
    </TOCStyle>
  );
}
