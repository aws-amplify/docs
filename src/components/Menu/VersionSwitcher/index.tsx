import Link from "next/link";
import {ActiveSwitchStyle, SwitchStyle} from "./styles";
import directory from "../../../directory/directory";

const uiLegacy = directory["ui-legacy"];
const {items} = uiLegacy;
const uiLegacyPaths = [];

for (const [_, value] of Object.entries(items)) {
  const {items} = value;
  items.forEach((item) => {
    const {route, filters} = item;
    filters.forEach((filter) => {
      const path = route + "/q/framework/" + filter + "/";
      uiLegacyPaths.push(path);
    });
  });
}

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

export default function VersionSwitcher({href}) {
  let leftActive = true;
  let hrefEnd;
  if (href.includes("/ui-legacy")) {
    leftActive = false;
    hrefEnd = href.split("/ui-legacy")[1];
  } else {
    hrefEnd = href.split("/ui")[1];
  }
  const leftOption = {
    title: "Latest",
    href: "/ui" + hrefEnd,
  };
  const rightOption = {
    title: "Legacy",
    href: "/ui-legacy" + hrefEnd,
  };

  return (
    <SwitchStyle>
      <Option
        href={leftOption.href}
        title={leftOption.title}
        isActive={leftActive}
      />
      {uiLegacyPaths.includes(rightOption.href) && (
        <Option
          href={rightOption.href}
          title={rightOption.title}
          isActive={!leftActive}
        />
      )}
    </SwitchStyle>
  );
}
