import Link from "next/link";
import Image from "next/image";
import {filterMetadataByOption} from "../../utils/filter-data";
import {
  FilterSelectStyle,
  CurrentlySelectedStyle,
  DropdownStyle,
  MenuHeaderStyle,
  MenuStyle,
  MenuBreakStyle,
  DiscordLinkStyle,
  MenuBodyStyle,
} from "./styles";
import React from "react";
import MenuOpenButton from "./MenuOpenButton";
import MenuCloseButton from "./MenuCloseButton";
import {MQTablet} from "../media";
import Directory from "./Directory";
import ExternalLink from "../ExternalLink";
import {DISCORD} from "../../constants/img";
import RepoActions from "./RepoActions";
import {withRouter, NextRouter} from "next/router";

type FilterSelectProps = {
  filters: string[];
  filterKey: string;
  pathname: string;
  router: NextRouter;
};

type FilterSelectState = {
  isOpen: boolean;
};

class FilterSelect extends React.Component<
  FilterSelectProps,
  FilterSelectState
> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {isOpen: false};
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeMenu);
  }

  closeMenu = (event: MouseEvent) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target as Node) &&
      this.state.isOpen
    ) {
      this.setState({
        isOpen: false,
      });
    }
  };

  toggleVis = () => {
    this.setState((oldState) => {
      return {isOpen: !oldState.isOpen};
    });
  };

  render() {
    let filterKind = "";
    if ("platform" in this.props.router.query) {
      filterKind = "platform";
    } else if ("integration" in this.props.router.query) {
      filterKind = "integration";
    } else {
      filterKind = "framework";
    }

    return (
      <FilterSelectStyle ref={this.wrapperRef}>
        <CurrentlySelectedStyle>
          <a onClick={this.toggleVis}>
            <Image
              src={filterMetadataByOption[this.props.filterKey].graphicURI}
              height="28px"
              width="28px"
            />
            <span>{filterMetadataByOption[this.props.filterKey].label}</span>
          </a>
        </CurrentlySelectedStyle>
        <DropdownStyle shouldDisplay={this.state.isOpen}>
          {this.props.filters.map((name) => {
            if (name === this.props.filterKey) return;
            const query = {};
            query[filterKind] = name;
            return (
              <Link
                href={{
                  pathname: this.props.pathname,
                  query: query,
                }}
                key={name}
              >
                <a onClick={this.toggleVis}>
                  <Image
                    src={filterMetadataByOption[name].graphicURI}
                    height="28px"
                    width="28px"
                  />
                  <span>{filterMetadataByOption[name].label}</span>
                </a>
              </Link>
            );
          })}
        </DropdownStyle>
      </FilterSelectStyle>
    );
  }
}
const FilterSelectWithRouter = withRouter(FilterSelect);

type MenuProps = {
  filters: string[];
  filterKey: string;
  pathname: string;
  href: string;
};

type MenuState = {
  isOpen: boolean;
};
export default class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props) {
    super(props);
    this.state = {isOpen: true};
  }

  componentDidMount() {
    // We can't do this in the constructor because React will error that the prerendered version is different than live.
    // Slice off the "@media " string at the start for use in JS instead of CSS
    const MQTabletJS = MQTablet.substring(6);
    // If the media query matches, then the user is on desktop and should see the menu by default
    this.setState({
      isOpen:
        typeof window !== "undefined" && window.matchMedia(MQTabletJS).matches,
    });
  }

  closeMenu = () => {
    this.setState({
      isOpen: false,
    });
  };

  openMenu = () => {
    this.setState({
      isOpen: true,
    });
  };

  render() {
    if (this.state.isOpen) {
      return (
        <MenuStyle>
          <div>
            <div>
              <MenuHeaderStyle>
                <MenuCloseButton closeMenu={this.closeMenu} />
                <FilterSelectWithRouter
                  filters={this.props.filters}
                  filterKey={this.props.filterKey}
                  pathname={this.props.pathname}
                />
              </MenuHeaderStyle>
              <MenuBodyStyle>
                <Directory
                  filterKey={this.props.filterKey}
                  pathname={this.props.pathname}
                />
                <MenuBreakStyle />
                <RepoActions
                  path={this.props.pathname}
                  href={this.props.href}
                />
                <DiscordLinkStyle>
                  <ExternalLink
                    href="https://discord.gg/jWVbPfC"
                    anchorTitle="Discord Community"
                  >
                    <img alt={DISCORD.alt} src={DISCORD.lightSrc} />
                    Chat with us
                  </ExternalLink>
                </DiscordLinkStyle>
              </MenuBodyStyle>
            </div>
          </div>
        </MenuStyle>
      );
    }
    return <MenuOpenButton openMenu={this.openMenu} />;
  }
}
