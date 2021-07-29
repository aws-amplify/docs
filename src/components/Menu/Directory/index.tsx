import Link from "next/link";
import React from "react";
import {getProductDirectory} from "../../../utils/getLocalDirectory";
import InternalLink from "../../InternalLink";
import {
  ArrowStyle,
  DirectoryGroupHeaderStyle,
  DirectoryGroupItemStyle,
  DirectoryLinksStyle,
  ProductRootLinkStyle,
} from "./styles";

type DirectoryItem = {
  title: string;
  filters: string[];
};

type DirectoryGroupProps = {
  title: string;
  items: DirectoryItem[];
  pathname: string;
  filterKey: string;
};

type DirectoryGroupState = {
  isExpanded: boolean;
};

class DirectoryGroup extends React.Component<
  DirectoryGroupProps,
  DirectoryGroupState
> {
  itemsToDisplay = [];
  currentRoute = "";

  shouldDisplay = ({filters}): boolean => {
    return (
      // the filter key is undefined
      this.props.filterKey === undefined ||
      // this page is available independent of filter
      filters === undefined ||
      // this page is available in specific filtered versions (one of which is the globally-selected)
      (filters && filters.includes(this.props.filterKey))
    );
  };

  constructor(props) {
    super(props);
    this.initialize();

    if (
      this.itemsToDisplay &&
      this.itemsToDisplay.some(({route}) => route === this.currentRoute)
    ) {
      this.state = {isExpanded: true};
    } else {
      this.state = {isExpanded: this.props.pathname.includes("/start")};
    }
  }

  initialize = () => {
    this.itemsToDisplay = this.props.items.filter(this.shouldDisplay);
    this.currentRoute = this.props.pathname.split("/q/").shift() as string;
  };

  toggleOpen = () => {
    this.setState(({isExpanded}) => {
      return {isExpanded: !isExpanded};
    });
  };

  render() {
    this.initialize();
    if (this.itemsToDisplay.length === 0) {
      return <></>;
    }
    return (
      <div>
        <DirectoryGroupHeaderStyle onClick={this.toggleOpen}>
          <h4>{this.props.title}</h4>
          <ArrowStyle isUp={this.state.isExpanded} />
        </DirectoryGroupHeaderStyle>
        {this.state.isExpanded && (
          <DirectoryLinksStyle>
            {this.itemsToDisplay.map((item) => (
              <DirectoryGroupItemStyle
                isActive={this.currentRoute === item.route}
                key={item.title}
              >
                <InternalLink href={`${item.route}`}>{item.title}</InternalLink>
                <br />
              </DirectoryGroupItemStyle>
            ))}
          </DirectoryLinksStyle>
        )}
      </div>
    );
  }
}

type DirectoryProps = {
  pathname: string;
  filterKey: string;
};

export default class Directory extends React.Component<DirectoryProps> {
  render() {
    const directory = getProductDirectory(this.props.pathname) as {
      productRoot: {title: string; route: string};
      items: {title: string; items: DirectoryItem[]}[];
    };
    const productRoot = directory.productRoot;

    return (
      <div>
        <InternalLink href={productRoot.route}>
          <ProductRootLinkStyle
            isActive={this.props.pathname.split("/q")[0] === productRoot.route}
          >
            {productRoot.title}
          </ProductRootLinkStyle>
        </InternalLink>
        {Object.entries(directory.items).map((folderName) => (
          <DirectoryGroup
            title={folderName[1].title}
            items={folderName[1].items}
            pathname={this.props.pathname}
            filterKey={this.props.filterKey}
            key={folderName[1].title}
          />
        ))}
      </div>
    );
  }
}
