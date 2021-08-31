import {
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
import FilterSelect from "./FilterSelect";
import VersionSwitcher from "./VersionSwitcher";

type MenuProps = {
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
  directoryPath: string;
  setMenuIsOpen?: any;
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

    if (this.props.setMenuIsOpen) {
      this.props.setMenuIsOpen(false);
    }
  };

  openMenu = () => {
    this.setState({
      isOpen: true,
    });

    if (this.props.setMenuIsOpen) {
      this.props.setMenuIsOpen(true);
    }
  };

  render() {
    let showVersionSwitcher = false;
    if (
      (this.props.url.includes("/ui") ||
        this.props.url.includes("/ui-legacy")) &&
      this.props.filterKey !== "react-native"
    ) {
      showVersionSwitcher = true;
    }
    if (this.state.isOpen) {
      return (
        <MenuStyle>
          <div>
            <div>
              <MenuHeaderStyle>
                <MenuCloseButton closeMenu={this.closeMenu} />
                {typeof this.props.filterKey !== "undefined" && (
                  <FilterSelect
                    filters={this.props.filters}
                    filterKey={this.props.filterKey}
                    filterKind={this.props.filterKind}
                    url={this.props.url}
                  />
                )}
              </MenuHeaderStyle>
              <MenuBodyStyle>
                {showVersionSwitcher && (
                  <VersionSwitcher url={this.props.url} />
                )}
                <Directory
                  filterKey={this.props.filterKey}
                  url={this.props.url}
                />
                <MenuBreakStyle />
                <RepoActions
                  url={this.props.url}
                  directoryPath={this.props.directoryPath}
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
