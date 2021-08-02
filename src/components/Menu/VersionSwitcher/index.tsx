import Link from "next/link";
import {ActiveSwitchStyle, SwitchStyle} from "./styles";

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
      <Option
        href={rightOption.href}
        title={rightOption.title}
        isActive={!leftActive}
      />
    </SwitchStyle>
  );
}
