import Link from "next/link";
import {ActiveSwitchStyle, SwitchStyle} from "./styles";
import directory from "../../../directory/directory";

const ui = directory["ui"].items;
const uiLegacy = directory["ui-legacy"].items;
const uiLegacyPaths = [] as string[];
const uiPaths = [] as string[];
const itemsAndPaths: [object, string[]][] = [
  [ui, uiPaths],
  [uiLegacy, uiLegacyPaths],
];
for (const [dirItems, paths] of itemsAndPaths) {
  for (const [_, value] of Object.entries(dirItems)) {
    const {items} = value;
    items.forEach((item) => {
      const {route, filters} = item;
      filters.forEach((filter) => {
        const path = route + "/q/framework/" + filter + "/";
        paths.push(path);
      });
      paths.push(route);
    });
  }
}
uiLegacyPaths.push("/ui-legacy");
uiPaths.push("/ui");

const Option = function({href, title, isActive}) {
  const SwitchStyle = isActive ? ActiveSwitchStyle : "a";
  return (
    <div>
      <Link href={href}>
        <SwitchStyle href={href}>
          <span>{title}</span>
        </SwitchStyle>
      </Link>
    </div>
  );
};

export default function VersionSwitcher({url}) {
  let leftActive = true;
  let urlEnd;
  const filter = url.includes("/framework")
    ? "q/framework" + url.split("/framework")[1]
    : "";
  if (url.includes("/ui-legacy")) {
    leftActive = false;
    urlEnd = url.split("/ui-legacy")[1];
  } else {
    urlEnd = url.split("/ui")[1];
  }

  const leftHref = "/ui" + urlEnd;
  const leftOption = {
    title: "Latest",
    href: uiPaths.includes(leftHref) ? leftHref : "/ui/" + filter,
  };

  const rightHref = "/ui-legacy" + urlEnd;
  const rightOption = {
    title: "Legacy",
    href: uiLegacyPaths.includes(rightHref)
      ? rightHref
      : "/ui-legacy/" + filter,
  };

  return (
    <SwitchStyle>
      <Option
        href={leftOption.href}
        title={leftOption.title}
        isActive={leftActive}
      />
      <Option
        href={rightOption.href}
        title={rightOption.title}
        isActive={!leftActive}
      />
    </SwitchStyle>
  );
}
