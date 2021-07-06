import Link from "next/link";
import React from "react";
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
    this.itemsToDisplay = this.props.items.filter(this.shouldDisplay);
    this.currentRoute = this.props.pathname.split("/q/").shift() as string;
    if (
      this.itemsToDisplay &&
      this.itemsToDisplay.some(({route}) => route === this.currentRoute)
    ) {
      this.state = {isExpanded: true};
    } else {
      this.state = {isExpanded: false};
    }
  }

  toggleOpen = () => {
    this.setState(({isExpanded}) => {
      return {isExpanded: !isExpanded};
    });
  };

  render() {
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
                <Link href={`${item.route}`}>{item.title}</Link>
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
    const fakeDirectory = {
      lib: {
        productRoot: {
          title: "Product Root",
          route: "/lib",
        },
        items: {
          notauth: {
            title: "Not authentication",
            items: [
              {title: "not-getting-started", filters: ["js", "ios"]},
              {title: "dont-start", filters: ["js", "ios"]},
            ],
          },
          auth: {
            title: "Authentication",
            items: [
              {
                route: "/lib/auth/getting-started",
                title: "Getting Started",
                filters: ["js", "ios"],
              },
              {title: "start", filters: ["js", "ios"]},
              {title: "emailpassword", filters: ["js", "ios"]},
              {title: "social", filters: ["js", "ios"]},
              {title: "mfa", filters: ["js", "ios"]},
              {title: "manageusers", filters: ["js", "ios"]},
              {title: "switch-auth", filters: ["js", "ios"]},
              {title: "customui", filters: ["js", "ios"]},
              {title: "advanced", filters: ["js", "ios"]},
              {title: "signin", filters: ["js", "ios"]},
              {title: "signin_with_custom_flow", filters: ["js", "ios"]},
              {title: "signin_web_ui", filters: ["js", "ios"]},
              {title: "social_signin_web_ui", filters: ["js", "ios"]},
              {title: "signin_next_steps", filters: ["js", "ios"]},
              {title: "guest_access", filters: ["js", "ios"]},
              {title: "auth-events", filters: ["js", "ios"]},
              {title: "user-attributes", filters: ["js", "ios"]},
              {title: "device_features", filters: ["js", "ios"]},
              {title: "password_management", filters: ["js", "ios"]},
              {title: "signOut", filters: ["js", "ios"]},
              {title: "access_credentials", filters: ["js", "ios"]},
              {title: "escapehatch", filters: ["js", "ios"]},
              {title: "overview", filters: ["js", "ios"]},
              {title: "existing-resources", filters: ["js", "ios"]},
            ],
          },
        },
      },
    };

    const productRoot = fakeDirectory.lib.productRoot;

    return (
      <div>
        <Link href={productRoot.route}>
          <ProductRootLinkStyle
            isActive={this.props.pathname === productRoot.route}
          >
            Product Root
          </ProductRootLinkStyle>
        </Link>
        {Object.entries(fakeDirectory.lib.items).map((folderName) => (
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
