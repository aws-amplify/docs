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
import {NextRouter, withRouter} from "next/router";

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
  filterKind: string;
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.filterKind = "";
    this.wrapperRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
    this.state = {isOpen: false};
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.closeMenu);

    if ("platform" in this.props.router.query) {
      this.filterKind = "platform";
    } else if ("integration" in this.props.router.query) {
      this.filterKind = "integration";
    } else {
      this.filterKind = "framework";
    }
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
    query[this.filterKind] = name;
    return (
      <Link
        href={{
          pathname: this.props.pathname,
          query: query,
        }}
        key={name}
      >
        <a onClick={this.toggleVis}>
          <img
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
    if (this.filterKind in filterOptionsByName) {
      allFilters = filterOptionsByName[this.filterKind];
    }
    const unsupportedFilters = [];
    for (const filter of allFilters) {
      if (!this.props.filters.includes(filter)) {
        unsupportedFilters.push(filter);
      }
    }

    return (
      <FilterSelectStyle ref={this.wrapperRef}>
        {filterMetadataByOption[this.props.filterKey] && (
          <CurrentlySelectedStyle>
            <a onClick={this.toggleVis}>
              <img
                src={filterMetadataByOption[this.props.filterKey]?.graphicURI}
                height="28px"
                width="28px"
              />
              <span>{filterMetadataByOption[this.props.filterKey]?.label}</span>
            </a>
          </CurrentlySelectedStyle>
        )}
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

export default withRouter(FilterSelect);
