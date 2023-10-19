import React from 'react';
import { getProductDirectory } from '../../../utils/getLocalDirectory';
import InternalLink from '../../InternalLink';
import {
  ArrowStyle,
  DirectoryGroupHeaderStyle,
  DirectoryGroupItemStyle,
  DirectoryLinksStyle,
  ProductRootLinkStyle,
  DirectoryDiv
} from './styles';
import type { DirectoryItem } from '../../../directory/directory';

export type DirectoryGroupProps = {
  title: string;
  items: DirectoryItem[];
  url: string;
  filterKey: string;
};

export type DirectoryGroupState = {
  isExpanded: boolean;
};

class DirectoryGroup extends React.Component<
  DirectoryGroupProps,
  DirectoryGroupState
> {
  itemsToDisplay: DirectoryItem[] = [];
  currentRoute = '';

  shouldDisplay = ({ filters }): boolean => {
    return (
      // the filter key is undefined
      this.props.filterKey === undefined ||
      // href doesn't have any q/[filter]/[filter]; via ChooseFilterPage
      this.props.filterKey === 'all' ||
      // this page is available independent of filter
      filters === undefined ||
      filters.length === 0 ||
      // this page is available in specific filtered versions (one of which is the globally-selected)
      (filters && filters.includes(this.props.filterKey))
    );

  };

  constructor(props) {
    super(props);
    this.initialize();

    if (
      this.props.items &&
      this.props.items.some(({ route }) => this.currentRoute.startsWith(route))
    ) {
      this.state = { isExpanded: true };
    } else {
      this.state = { isExpanded: this.props.url.startsWith('/start') };
    }
  }

  initialize = () => {
    this.itemsToDisplay = this.props.items.filter(this.shouldDisplay);
    this.currentRoute = this.props.url.split('/q/').shift() as string;
  };

  toggleOpen = () => {
    this.setState(({ isExpanded }) => {
      return { isExpanded: !isExpanded };
    });
  };

  render() {
    this.initialize();
    if (this.itemsToDisplay.length === 0) {
      return <></>;
    }

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
                <InternalLink href={`${item.route}`}>
                  {item.isCodeTitle ? (
                    <a>
                      <code>{item.title}</code>
                    </a>
                  ) : (
                    item.title
                  )}
                </InternalLink>
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
  url: string;
  filterKey: string;
};

export default class Directory extends React.Component<DirectoryProps> {
  render() {
    const directory = getProductDirectory(this.props.url) as {
      productRoot: { title: string; route: string };
      items: {
        route: string; title: string; items: DirectoryItem[] 
}[];
    };
    const productRoot = directory.productRoot;
    const multipleContentPages = Object.entries(directory.items).filter((item) => item[1].items.length == 0).length > 1; 

    return (
      <DirectoryDiv> 
        { !multipleContentPages ? (
          <div>
          <InternalLink href={productRoot.route}>
            <ProductRootLinkStyle
              isActive={this.props.url.split('/q')[0] === productRoot.route}
            >
              {productRoot.title}
            </ProductRootLinkStyle>
          </InternalLink>
          {Object.entries(directory.items).map((folderName) => (
            <DirectoryGroup
              title={folderName[1].title}
              items={folderName[1].items}
              url={this.props.url}
              filterKey={this.props.filterKey}
              key={folderName[1].title}
            />
          ))}
          </div>
        ) : (
          Object.entries(directory.items).map((folderName) => (
            folderName[1].route ? (
              <InternalLink href={folderName[1].route}>
                <ProductRootLinkStyle
                    isActive={this.props.url.split('/q')[0] === folderName[1].route}
                  >
                  <h4>{folderName[1].title}</h4>
                </ProductRootLinkStyle>
              </InternalLink>
            ) : (
            <DirectoryGroup
              title={folderName[1].title}
              items={folderName[1].items}
              url={this.props.url}
              filterKey={this.props.filterKey}
              key={folderName[1].title}
            />
            )
          ))
        )}
      </DirectoryDiv>
    );
  }
}
