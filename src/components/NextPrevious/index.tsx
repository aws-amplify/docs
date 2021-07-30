import {
  NextPreviousContainerStyle,
  NextPreviousLinkStyle,
  NextPreviousTextStyle,
} from "./styles";
import Link from "next/link";
import {
  getChapterDirectory,
  isProductRoot,
} from "../../utils/getLocalDirectory";

type DirectoryItem = {
  filters: string[];
  route: string;
  title: string;
};
type Directory = {
  items: DirectoryItem[];
};

function Prev(item: DirectoryItem) {
  return (
    <Link href={item.route} passHref>
      <NextPreviousLinkStyle>
        <img src="/assets/arrow-left.svg" alt="Previous Page" />
        <NextPreviousTextStyle isPrevious={true}>
          <span>previous</span>
          <h4>{item.title}</h4>
        </NextPreviousTextStyle>
      </NextPreviousLinkStyle>
    </Link>
  );
}

function Next(item: DirectoryItem) {
  return (
    <Link href={item.route} passHref>
      <NextPreviousLinkStyle>
        <NextPreviousTextStyle isPrevious={false}>
          <span>next</span>
          <h4>{item.title}</h4>
        </NextPreviousTextStyle>
        <img src="/assets/arrow-right.svg" alt="Next Page" />
      </NextPreviousLinkStyle>
    </Link>
  );
}

export default function NextPrevious({pathname, filterKey}) {
  if (isProductRoot(pathname)) {
    return <></>;
  }

  const chapterDirectory = getChapterDirectory(pathname) as Directory;
  if (!chapterDirectory) {
    return null;
  }

  let {items} = chapterDirectory;
  items = items.filter((item) => {
    if (item.filters.includes(filterKey)) return true;
    return false;
  });
  let itemIndex = -1;
  for (let i = 0; i < items.length; ++i) {
    if (pathname.startsWith(items[i].route)) itemIndex = i;
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
