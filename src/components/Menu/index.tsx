import {
  MenuHeaderStyle,
  MenuStyle,
  MenuBreakStyle,
  MenuBodyStyle,
  LastUpdatedStyle
} from './styles';
import React from 'react';
import MenuOpenButton from './MenuOpenButton';
import MenuCloseButton from './MenuCloseButton';
import { MQTablet } from '../media';
import Directory from './Directory';
import RepoActions from './RepoActions';
import FilterSelect from './FilterSelect';
import { VersionSwitcher, LibVersionSwitcher } from './VersionSwitcher';

type MenuProps = {
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
  directoryPath: string;
  lastUpdatedDate: number;
  setMenuIsOpen?: any;
};

type MenuState = {
  isOpen: boolean;
};
export default class Menu extends React.Component<MenuProps, MenuState> {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  componentDidMount() {
    // We can't do this in the constructor because React will error that the prerendered version is different than live.
    // Slice off the "@media " string at the start for use in JS instead of CSS
    const MQTabletJS = MQTablet.substring(6);
    // If the media query matches, then the user is on desktop and should see the menu by default
    this.setState({
      isOpen:
        typeof window !== 'undefined' && window.matchMedia(MQTabletJS).matches
    });
  }

  closeMenu = () => {
    this.setState({
      isOpen: false
    });

    if (this.props.setMenuIsOpen) {
      this.props.setMenuIsOpen(false);
    }
  };

  openMenu = () => {
    this.setState({
      isOpen: true
    });

    if (this.props.setMenuIsOpen) {
      this.props.setMenuIsOpen(true);
    }
  };

  render() {
    let showVersionSwitcher = false;
    let showLibVersionSwitcher = false;
    if (
      (this.props.url.startsWith('/ui') ||
        this.props.url.startsWith('/ui-legacy')) &&
      this.props.filterKey !== 'react-native' &&
      this.props.filterKey !== 'flutter'
    ) {
      showVersionSwitcher = true;
    }

    if (
      (this.props.url.startsWith('/lib') ||
        this.props.url.startsWith('/lib-v1')) &&
      (this.props.filterKey == 'ios' || this.props.filterKey == 'android')
    ) {
      showLibVersionSwitcher = true;
    }
    if (this.state.isOpen) {
      return (
        <MenuStyle>
          <div>
            <div>
              <MenuHeaderStyle>
                <MenuCloseButton closeMenu={this.closeMenu} />
                {typeof this.props.filterKey !== 'undefined' && (
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
                {showLibVersionSwitcher && (
                  <LibVersionSwitcher url={this.props.url} />
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
                <LastUpdatedStyle>
                  {displayLastUpdatedString(this.props.lastUpdatedDate)}
                </LastUpdatedStyle>
              </MenuBodyStyle>
            </div>
          </div>
        </MenuStyle>
      );
    }
    return <MenuOpenButton openMenu={this.openMenu} />;
  }
}

function toReadableDate(date) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return new Date(date).toLocaleDateString('en-US', dateOptions);
}

function displayLastUpdatedString(date) {
  if (date) {
    return `Last Updated: ${toReadableDate(date)}`;
  }

  return '';
}
