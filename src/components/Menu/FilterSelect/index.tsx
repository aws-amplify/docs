import Link from 'next/link';
import {
  filterMetadataByOption,
  filterOptionsByName
} from '../../../utils/filter-data';
import {
  FilterSelectStyle,
  CurrentlySelectedStyle,
  DropdownStyle
} from './styles';
import React from 'react';

type FilterSelectProps = {
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
};

type FilterSelectState = {
  isOpen: boolean;
};

const getFirstPathSegment = (path: string): string | undefined => {
  return path.split('/').filter((x) => !!x)[0];
};

const multiLibVersionPlatforms = ['ios'];

const convertToRouteHerf = (
  filter: FilterSelectProps,
  targetFilterKey: string
) => {
  let url = filter.url.startsWith('/') ? `file://${filter.url}` : filter.url;
  if (url.includes('?')) url = url.slice(0, url.indexOf('?'));
  if (url.includes('#')) url = url.slice(0, url.indexOf('#'));

  let path = new URL(url).pathname;

  const queryIndex = path.lastIndexOf('/q/');
  if (queryIndex >= 0) {
    path =
      path.substring(0, queryIndex) +
      `/q/${filter.filterKind}/${targetFilterKey}`;
  }
  return path;
};

export default class FilterSelect extends React.Component<
  FilterSelectProps,
  FilterSelectState
> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenu);
  }

  closeMenu = (event: MouseEvent) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target as Node) &&
      this.state.isOpen
    ) {
      this.setState({
        isOpen: false
      });
    }
  };

  toggleVis = () => {
    this.setState((oldState) => {
      return { isOpen: !oldState.isOpen };
    });
  };

  renderFilter = (name) => {
    if (name === this.props.filterKey) return;

    let href: object | string = convertToRouteHerf(this.props, name);
    if (!this.props.url.includes('/q/')) {
      href = this.props.url + `/q/${this.props.filterKind}/${name}`;
    }

    return (
      <Link href={href} key={name} legacyBehavior>
        <a onClick={this.toggleVis}>
          <img
            alt=""
            src={filterMetadataByOption[name]?.graphicURI}
            height="28px"
            width="28px"
          />
          <span>{filterMetadataByOption[name]?.label}</span>
        </a>
      </Link>
    );
  };

  render() {
    let allFilters = this.props.filters.slice();
    if (this.props.filterKind in filterOptionsByName) {
      allFilters = filterOptionsByName[this.props.filterKind];
    }
    const unsupportedFilters = [];
    for (const filter of allFilters) {
      if (!this.props.filters.includes(filter)) {
        let shouldAdd = true;

        // special cases
        if (this.props.url.startsWith('/sdk')) {
          shouldAdd = filter !== 'flutter' && filter !== 'js';
        }

        if (shouldAdd) {
          unsupportedFilters.push(filter);
        }
      }
    }

    let CurrentlySelected = <></>;
    if (this.props.filterKey === 'all') {
      const aOrAn = 'aeiou'.includes(this.props.filterKind[0]) ? 'an' : 'a';
      CurrentlySelected = (
        <CurrentlySelectedStyle>
          <a onClick={this.toggleVis}>
            <span>
              Choose {aOrAn} {this.props.filterKind}:
            </span>
          </a>
        </CurrentlySelectedStyle>
      );
    } else if (this.props.filterKey in filterMetadataByOption) {
      const supported = !unsupportedFilters.includes(this.props.filterKey);
      CurrentlySelected = (
        <CurrentlySelectedStyle>
          <div className={!supported ? 'unsupported' : ''}>
            <a onClick={this.toggleVis}>
              <img
                alt=""
                src={filterMetadataByOption[this.props.filterKey]?.graphicURI}
                height="28px"
                width="28px"
              />
              <span>{filterMetadataByOption[this.props.filterKey]?.label}</span>
            </a>
          </div>
        </CurrentlySelectedStyle>
      );
    }

    return (
      <FilterSelectStyle ref={this.wrapperRef}>
        {CurrentlySelected}
        <DropdownStyle shouldDisplay={this.state.isOpen}>
          <div>{this.props.filters.map(this.renderFilter)}</div>
          <div className="unsupported">
            {unsupportedFilters.map(this.renderFilter)}
          </div>
        </DropdownStyle>
      </FilterSelectStyle>
    );
  }
}
