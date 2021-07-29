import Link from "next/link";

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

  return (
    <Link href={href} passHref>
      {children}
    </Link>
  );
}
