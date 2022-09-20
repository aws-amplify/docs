import Link from "next/link";
import {
  filterMetadataByOption,
  filterOptionsByName,
} from "../../../utils/filter-data";
import {
  FilterSelectStyle,
  CurrentlySelectedStyle,
  DropdownStyle,
} from "./styles";
import React from "react";

type FilterSelectProps = {
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
};

type FilterSelectState = {
  isOpen: boolean;
};

const convertToLatestUrl = (url: string) => {
  if (url.startsWith('/lib-v')) {
    return url.replace(/\/lib-v\d+/i, '/lib')
  }
  return url
}

const convertToRoutePath = (url: string, filter: {filterKey: string, filterKind: string}) => {
  return url.replace(`/${filter.filterKey}`, `/[${filter.filterKind}]`)
}

export default class FilterSelect extends React.Component<
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

  renderFilter = (name) => {
    if (name === this.props.filterKey) return;
    const query = {};
    query[this.props.filterKind] = name;

    const latestUrl = convertToLatestUrl(this.props.url)
    let href = {
      pathname: convertToRoutePath(latestUrl, this.props),
      query: query,
    } as object | string;
    if (!latestUrl.includes("/q/")) {
      href = latestUrl + `/q/${this.props.filterKind}/${name}`;
    }

    return (
      <Link href={href} key={name}>
        <a onClick={this.toggleVis}>
          <img
            alt={filterMetadataByOption[name]?.label + " icon"}
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
        if (this.props.url.startsWith("/sdk")) {
          shouldAdd = filter !== "flutter" && filter !== "js";
        }

        if (shouldAdd) {
          unsupportedFilters.push(filter);
        }
      }
    }

    let CurrentlySelected = <></>;
    if (this.props.filterKey === "all") {
      const aOrAn = "aeiou".includes(this.props.filterKind[0]) ? "an" : "a";
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
          <div className={!supported ? "unsupported" : ""}>
            <a onClick={this.toggleVis}>
              <img
                alt={
                  filterMetadataByOption[this.props.filterKey]?.label + " icon"
                }
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
