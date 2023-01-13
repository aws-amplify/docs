import { useCallback, useEffect, useState } from 'react';
import {
  MenuHeaderStyle,
  MenuStyle,
  MenuBreakStyle,
  MenuBodyStyle
} from './styles';
import MenuOpenButton from './MenuOpenButton';
import MenuCloseButton from './MenuCloseButton';
import { MQTablet } from '../media';
import Directory from './Directory';
import RepoActions from './RepoActions';
import FilterSelect from './FilterSelect';
import { VersionSwitcher, LibVersionSwitcher } from './VersionSwitcher';
import type { PropsWithChildren } from 'react';

export type MenuProps = PropsWithChildren<{
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
  directoryPath: string;
  setMenuIsOpen?: any;
}>;

export default function Menu({
  filters,
  filterKey,
  filterKind,
  url,
  directoryPath,
  setMenuIsOpen
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    if (setMenuIsOpen) {
      setMenuIsOpen(false);
    }
  }, [setMenuIsOpen]);

  const openMenu = useCallback(() => {
    setIsOpen(true);
    if (setMenuIsOpen) {
      setMenuIsOpen(true);
    }
  }, [setMenuIsOpen]);

  useEffect(() => {
    const isTablet = window.matchMedia(MQTablet.substring(6)).matches;
    if (isTablet) setIsOpen(true);
  }, []);

  let showVersionSwitcher = false;
  let showLibVersionSwitcher = false;
  if (
    (url.startsWith('/ui') || url.startsWith('/ui-legacy')) &&
    filterKey !== 'react-native' &&
    filterKey !== 'flutter'
  ) {
    showVersionSwitcher = true;
  }

  if (
    (url.startsWith('/lib') || url.startsWith('/lib-v1')) &&
    (filterKey === 'ios' || filterKey === 'android')
  ) {
    showLibVersionSwitcher = true;
  }

  if (isOpen) {
    return (
      <MenuStyle>
        <div>
          <div>
            <MenuHeaderStyle>
              <MenuCloseButton closeMenu={closeMenu} />
              {typeof filterKey !== 'undefined' && (
                <FilterSelect
                  filters={filters}
                  filterKey={filterKey}
                  filterKind={filterKind}
                  url={url}
                />
              )}
            </MenuHeaderStyle>
            <MenuBodyStyle>
              {showVersionSwitcher && <VersionSwitcher url={url} />}
              {showLibVersionSwitcher && <LibVersionSwitcher url={url} />}
              <Directory filterKey={filterKey} url={url} />
              <MenuBreakStyle />
              <RepoActions url={url} directoryPath={directoryPath} />
            </MenuBodyStyle>
          </div>
        </div>
      </MenuStyle>
    );
  }
  return <MenuOpenButton openMenu={openMenu} />;
}
