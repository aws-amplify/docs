import Link from "next/link";

export default function InternalLink({href, children}) {
  let filterKind = "";
  if (href.includes("cli/") || href.includes("console/")) {
    filterKind = "";
  } else if (href.includes("start/")) {
    filterKind = "integration";
  } else if (href.includes("lib/")) {
    filterKind = "platform";
  } else if (href.includes("sdk/")) {
    filterKind = "platform";
  } else if (href.includes("ui/")) {
    filterKind = "framework";
  } else if (href.includes("guides/")) {
    filterKind = "platform";
  }

  if (filterKind != "") {
    const filterKeys = JSON.parse(localStorage.getItem("filterKeys"));
    if (filterKind in filterKeys) {
      const filterKey = filterKeys[filterKind];
      href += `/q/${filterKind}/${filterKey}`;
    }
  }

  return <Link href={href}>{children}</Link>;
}
