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

    const path = this.props.router.asPath;
    if (path.startsWith("/cli") || path.startsWith("/console")) {
      // deal with cli/start/install right at the top
      this.filterKind = undefined;
    } else if (path.startsWith("/start")) {
      this.filterKind = "integration";
    } else if (path.startsWith("/lib")) {
      this.filterKind = "platform";
    } else if (path.startsWith("/sdk")) {
      this.filterKind = "platform";
    } else if (path.startsWith("/ui")) {
      this.filterKind = "framework";
    } else if (path.startsWith("/guides")) {
      this.filterKind = "platform";
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

    let href = {
      pathname: this.props.pathname,
      query: query,
    } as object | string;
    if (!this.props.pathname.includes("/q/")) {
      href = this.props.pathname + `/q/${this.filterKind}/${name}`;
    }

    return (
      <Link href={href} key={name}>
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
        let shouldAdd = true;

        // special cases
        if (this.props.router.asPath.startsWith("/guides")) {
          shouldAdd = filter !== "flutter";
        }
        if (this.props.router.asPath.startsWith("/sdk")) {
          shouldAdd = filter !== "flutter" && filter !== "js";
        }

        if (shouldAdd) {
          unsupportedFilters.push(filter);
        }
      }
    }

    let CurrentlySelected = <></>;
    if (this.props.filterKey === "all") {
      const aOrAn = "aeiou".includes(this.filterKind[0]) ? "an" : "a";
      CurrentlySelected = (
        <CurrentlySelectedStyle>
          <a onClick={this.toggleVis}>
            <span>
              Choose {aOrAn} {this.filterKind}:
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

export default withRouter(FilterSelect);
