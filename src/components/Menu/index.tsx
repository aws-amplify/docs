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
    let showVersionSwitcher = false;
    if (
      (this.props.href.includes("/ui") ||
        this.props.href.includes("/ui-legacy")) &&
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
                <FilterSelect
                  filters={this.props.filters}
                  filterKey={this.props.filterKey}
                  pathname={this.props.pathname}
                />
              </MenuHeaderStyle>
              <MenuBodyStyle>
                {showVersionSwitcher && (
                  <VersionSwitcher href={this.props.href} />
                )}
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
