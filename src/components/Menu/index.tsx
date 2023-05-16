import {
  MenuHeaderStyle,
  MenuStyle,
  MenuBreakStyle,
  MenuBodyStyle,
  LastUpdatedStyle
} from './styles';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import MenuOpenButton from './MenuOpenButton';
import MenuCloseButton from './MenuCloseButton';
import { MQTablet } from '../media';
import Directory from './Directory';
import RepoActions from './RepoActions';
import FilterSelect from './FilterSelect';
import { VersionSwitcher, LibVersionSwitcher } from './VersionSwitcher';
import { useLastUpdatedDatesContext } from '../LastUpdatedProvider';
import { Button } from '@cloudscape-design/components';

type MenuProps = {
  filters: string[];
  filterKey: string;
  filterKind: string;
  url: string;
  directoryPath: string;
  setMenuIsOpen?: any;
};

function Menu(props: MenuProps, ref) {
  const [isOpen, setIsOpen] = useState(true);
  const { state } = useLastUpdatedDatesContext();
  const [onDesktop, setOnDesktop] = useState(false);
  const menuRef = useRef(null);

  console.log(props)

  useEffect(() => {
    const MQTabletJS = MQTablet.substring(6);
    // If the media query matches, then the user is on desktop and should see the menu by default

    const onDesktop =
      typeof window !== 'undefined' && window.matchMedia(MQTabletJS).matches;

    setIsOpen(onDesktop);
    setOnDesktop(onDesktop);
  }, []);

  useEffect(() => {
    const MQTabletJS = MQTablet.substring(6);
    // If the media query matches, then the user is on desktop and should see the menu by default
    setIsOpen(
      typeof window !== 'undefined' && window.matchMedia(MQTabletJS).matches
    );
  }, []);

  useImperativeHandle(ref, () => ({
    ref: menuRef,
    closeMenu: () => closeMenu(),
    openMenu: () => openMenu()
  }));

  const closeMenu = () => {
    if (!onDesktop && typeof document !== 'undefined') {
      const buttons = props.buttonsRef.current;
      if (menuRef.current) menuRef.current.style.left = '-100vw';
      if (buttons) buttons.style.right = '1rem';
      setTimeout(function() {
        setIsOpen(false);
      }, 400);
    } else {
      setIsOpen(false);
    }

    if (props.setMenuIsOpen) {
      props.setMenuIsOpen(false);
    }
  };

  const openMenu = () => {
    setIsOpen(true);

    if (props.setMenuIsOpen && onDesktop) {
      props.setMenuIsOpen(true);
    }
  };

  let showVersionSwitcher = false;
  let showLibVersionSwitcher = false;
  if (
    (props.url.startsWith('/ui') || props.url.startsWith('/ui-legacy')) &&
    props.filterKey !== 'react-native' &&
    props.filterKey !== 'flutter'
  ) {
    showVersionSwitcher = true;
  }

  if (
    (props.url.startsWith('/lib') || props.url.startsWith('/lib-v1')) &&
    (props.filterKey == 'ios' ||
      props.filterKey == 'android' ||
      props.filterKey === 'flutter')
  ) {
    showLibVersionSwitcher = true;
  }

  let lastUpdatedDate;

  if (state.files['parentPageLastUpdatedDate']) {
    const combinedDates = [state.files['parentPageLastUpdatedDate']];

    if (state.files[props.filterKey]) {
      combinedDates.push(...state.files[props.filterKey]);
    } else if (state.files['all'] && state.files['all'].length > 0) {
      combinedDates.push(...state.files['all']);
    }

    lastUpdatedDate = Math.max(
      ...combinedDates.map((e) => new Date(e).getTime())
    );
  }

  if (isOpen) {
    return (
      <MenuStyle ref={menuRef}>
        <div>
          <div>
            <MenuHeaderStyle>
              {!onDesktop && (
                <div className="mobileHeader">
                  <h2>Table of Contents</h2>
                  <Button variant="icon" iconName="close" onClick={closeMenu} />
                </div>
              )}
              <MenuCloseButton closeMenu={closeMenu} />
              {typeof props.filterKey !== 'undefined' && (
                <FilterSelect
                  filters={props.filters}
                  filterKey={props.filterKey}
                  filterKind={props.filterKind}
                  url={props.url}
                />
              )}
            </MenuHeaderStyle>
            <MenuBodyStyle>
              {showVersionSwitcher && <VersionSwitcher url={props.url} />}
              {showLibVersionSwitcher && (
                <LibVersionSwitcher
                  url={props.url}
                  legacyVersion={props.filterKey === 'flutter' ? 'v0' : 'v1'}
                  latestVersion={props.filterKey === 'flutter' ? 'v1' : 'v2'}
                />
              )}
              <Directory filterKey={props.filterKey} url={props.url} />
              <MenuBreakStyle />
              <RepoActions
                url={props.url}
                directoryPath={props.directoryPath}
              />
              <LastUpdatedStyle id="page-last-updated">
                {displayLastUpdatedString(lastUpdatedDate)}
              </LastUpdatedStyle>
            </MenuBodyStyle>
          </div>
        </div>
      </MenuStyle>
    );
  }
  return <MenuOpenButton openMenu={openMenu} />;
}

export default forwardRef(Menu);

function toReadableDate(date) {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  return new Date(date).toLocaleDateString('en-US', dateOptions);
}

function displayLastUpdatedString(date) {
  if (date) {
    return `Page updated ${toReadableDate(date)}`;
  }

  return '';
}
