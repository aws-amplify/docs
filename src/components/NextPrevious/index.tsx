import {
  NextPreviousContainerStyle,
  NextPreviousLinkStyle,
  NextPreviousTextStyle,
} from "./styles";
import InternalLink from "../InternalLink";
import {
  getChapterDirectory,
  isProductRoot,
} from "../../utils/getLocalDirectory";
import type { DirectoryItem } from "../Menu/Directory";

type Directory = {
  items: DirectoryItem[];
}

function Prev(item: DirectoryItem) {
  return (
    <InternalLink href={item.route}>
      <NextPreviousLinkStyle>
        <img src="/assets/arrow-left.svg" alt="" />
        <NextPreviousTextStyle isPrevious={true}>
          <span>previous</span>
          <h4>{item.title}</h4>
        </NextPreviousTextStyle>
      </NextPreviousLinkStyle>
    </InternalLink>
  );
}

function Next(item: DirectoryItem) {
  return (
    <InternalLink href={item.route}>
      <NextPreviousLinkStyle>
        <NextPreviousTextStyle isPrevious={false}>
          <span>next</span>
          <h4>{item.title}</h4>
        </NextPreviousTextStyle>
        <img src="/assets/arrow-right.svg" alt="" />
      </NextPreviousLinkStyle>
    </InternalLink>
  );
}

export default function NextPrevious({url, filterKey}) {
  if (isProductRoot(url)) {
    return <></>;
  }

  const chapterDirectory = getChapterDirectory(url) as Directory;
  if (!chapterDirectory) {
    return null;
  }

  let {items} = chapterDirectory;
  items = items.filter((item) => {
    if (!("filters" in item) || item.filters.includes(filterKey)) return true;
    return false;
  });
  let itemIndex = -1;
  for (let i = 0; i < items.length; ++i) {
    if (url.startsWith(items[i].route)) itemIndex = i;
  }

  if (itemIndex === -1) {
    return <></>;
  }

  return (
    <NextPreviousContainerStyle>
      {itemIndex !== 0 ? Prev(items[itemIndex - 1]) : <div />}
      {itemIndex != items.length - 1 ? Next(items[itemIndex + 1]) : <div />}
    </NextPreviousContainerStyle>
  );
}
