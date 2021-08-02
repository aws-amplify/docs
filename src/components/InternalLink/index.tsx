import Link from "next/link";
import {useRouter} from "next/router";

export default function InternalLink({href, children}) {
  let filterKind = "";
  if (href.includes("/cli") || href.includes("/console")) {
    filterKind = "";
  } else if (href.includes("/lib")) {
    filterKind = "platform";
  } else if (href.includes("/sdk")) {
    filterKind = "platform";
  } else if (href.includes("/ui")) {
    filterKind = "framework";
  } else if (href.includes("/guides")) {
    filterKind = "platform";
  } else if (href.includes("/start")) {
    filterKind = "integration";
  }

  if (filterKind != "") {
    let filterKeys = {};
    if (typeof localStorage !== "undefined")
      filterKeys = JSON.parse(localStorage.getItem("filterKeys"));
    if (filterKind in filterKeys) {
      const filterKey = filterKeys[filterKind];
      href += `/q/${filterKind}/${filterKey}`;
    }
  }

  if (href[0] === "#") {
    const router = useRouter();
    const prevPath = router.asPath.split("#")[0];
    href = prevPath + href;
  }

  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
}
