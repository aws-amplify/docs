import Link from "next/link";
import Image from "next/image";
import {platformFilterMetadataByOption} from "../../utils/filter-data";
import {
  PlatformSelectStyle,
  CurrentlySelectedStyle,
  DropdownStyle,
  MenuHeaderStyle,
  MenuStyle,
  DirectoryStyle,
} from "./styles";
import React from "react";
import MenuOpenButton from "./MenuOpenButton";
import MenuCloseButton from "./MenuCloseButton";
import {MQTablet} from "../media";

type PlatformSelectProps = {
  filters: string[];
  platform: string;
  pathname: string;
};

type PlatformSelectState = {
  isOpen: boolean;
};

class PlatformSelect extends React.Component<
  PlatformSelectProps,
  PlatformSelectState
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
    return (
      <PlatformSelectStyle ref={this.wrapperRef}>
        <CurrentlySelectedStyle>
          <a onClick={this.toggleVis}>
            <Image
              src={
                platformFilterMetadataByOption[this.props.platform].graphicURI
              }
              height="20px"
              width="20px"
            />
            {platformFilterMetadataByOption[this.props.platform].label}
          </a>
        </CurrentlySelectedStyle>
        <DropdownStyle shouldDisplay={this.state.isOpen}>
          {this.props.filters.map((name) => {
            if (name === this.props.platform) return;
            return (
              <Link
                href={{
                  pathname: this.props.pathname,
                  query: {platform: name},
                }}
                key={name}
              >
                <a onClick={this.toggleVis}>
                  <Image
                    src={platformFilterMetadataByOption[name].graphicURI}
                    height="20px"
                    width="20px"
                  />
                  {platformFilterMetadataByOption[name].label}
                </a>
              </Link>
            );
          })}
        </DropdownStyle>
      </PlatformSelectStyle>
    );
  }
}

type MenuState = {
  isOpen: boolean;
};
export default class Menu extends React.Component<
  PlatformSelectProps,
  MenuState
> {
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
                <PlatformSelect
                  filters={this.props.filters}
                  platform={this.props.platform}
                  pathname={this.props.pathname}
                />
              </MenuHeaderStyle>
              <DirectoryStyle>
                directory goes here; see docs-ui/menu
                <br />
                <br />
                adding extra height so that the framework switcher isn't cut off
                <br />
                <br />
                more height
              </DirectoryStyle>
            </div>
          </div>
        </MenuStyle>
      );
    }
    return <MenuOpenButton openMenu={this.openMenu} />;
  }
}
