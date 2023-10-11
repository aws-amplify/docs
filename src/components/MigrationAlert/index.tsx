/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import React, { useState } from 'react';
import InternalLink from '../InternalLink';
export default function MigrationAlert(props) {
  const { isLegacy, url } = props;
  const [closed, setClosed] = useState(false);

  const alertText = isLegacy
    ? 'You are currently viewing the legacy GraphQL Transformer documentation.'
    : 'You are currently viewing the new GraphQL transformer v2 docs';

  const alertCTA = isLegacy
    ? 'View latest documentation'
    : 'Looking for legacy docs?';
  return (
    <div
      style={{
        display: closed ? 'none' : 'flex',
        padding: '0px 0px 0px 0px',
        position: 'fixed',
        gap: '18px',
        flexDirection: 'column',
        bottom: 20,
        left: 20,
        zIndex: 9999999
      }}
    >
      <div
        style={{
          boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.11999999731779099)',
          padding: '0px 10px 0px 0px',
          backgroundColor:
            'rgba(242.00000077486038,243.00000071525574,243.00000071525574,1)',
          alignItems: 'flex-start',
          flexShrink: 0,
          gap: '12px',
          width: '333px',
          position: 'relative',
          flexDirection: 'row',
          display: 'flex'
        }}
      >
        <div
          style={{
            padding: '0px 0px 0px 0px',
            alignSelf: 'stretch',
            backgroundColor: 'rgba(255,153.00000607967377,0,1)',
            flexShrink: 0,
            width: '36px',
            position: 'relative',
            height: '112px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.026 0C12.5082 0 14.0105 0.299864 15.4527 0.939573C21.021 3.37846 23.5548 9.86552 21.1112 15.423C21.0821 15.489 21.0471 15.5489 21.017 15.6139L22.2569 15.1311L23 17.0153L19.013 18.5666C19.011 18.5686 19.01 18.5706 19.008 18.5716L18.5894 18.7315L18.329 18.8324L18.328 18.8304L18.327 18.8314L17.6459 17.0922L17.648 17.0892L16.5082 14.1706L18.371 13.4529L19.014 15.0991C19.0991 14.9342 19.2023 14.7853 19.2784 14.6134C21.2714 10.0754 19.1983 4.75784 14.6414 2.76874C13.4897 2.25897 12.2779 1.99909 11.026 1.99909C7.45062 1.99909 4.20574 4.11813 2.76357 7.38664C0.77057 11.9246 2.84369 17.2422 7.40054 19.2413C8.55227 19.741 9.7641 20.0009 11.016 20.0009C12.8487 20.0009 14.5914 19.4512 16.0435 18.4716L16.7847 20.3707C15.0621 21.4203 13.0591 22 11.016 22C9.53375 22 8.03149 21.7001 6.58932 21.0704C1.02095 18.6315 -1.51286 12.1445 0.930811 6.58701C2.74354 2.45888 6.78962 0 11.026 0ZM12.0178 3.99818V11.9945H6.00875V9.99546H10.0148V3.99818H12.0178Z"
              fill="white"
            />
          </svg>
        </div>
        <div
          style={{
            padding: '12px 0px 12px 0px',
            flexGrow: 1,
            gap: '6px',
            width: '275px',
            position: 'relative',
            flexBasis: '275px',
            flexDirection: 'column',
            height: '112px',
            display: 'flex'
          }}
        >
          <div
            style={{
              padding: '0px 0px 0px 0px',
              alignItems: 'flex-start',
              flexShrink: 0,
              gap: '6px',
              width: '275px',
              position: 'relative',
              flexDirection: 'row',
              display: 'flex'
            }}
          >
            <div
              style={{
                padding: '0px 0px 0px 0px',
                color:
                  'rgba(22.000000588595867,25.000000409781933,31.000000052154064,1)',
                textAlign: 'left',
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'flex-start',
                fontFamily: 'Amazon Ember',
                width: '253px',
                fontSize: '14px',
                lineHeight: '22px',
                position: 'relative',
                flexDirection: 'column'
              }}
            >
              {alertText}
            </div>
            <div
              style={{
                width: '16px',
                padding: '0px 0px 0px 0px',
                position: 'relative',
                flexShrink: 0,
                height: '16px',
                display: 'flex',
                cursor: 'pointer'
              }}
              onClick={() => setClosed(true)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.364 3.05024L12.9497 1.63603L8 6.58577L3.05025 1.63603L1.63604 3.05024L6.58579 7.99999L1.63604 12.9497L3.05025 14.3639L8 9.4142L12.9497 14.3639L14.364 12.9497L9.41421 7.99999L14.364 3.05024Z"
                  fill="#545B64"
                />
              </svg>
            </div>
          </div>
          <div
            style={{
              background: '#FFFFFF',
              boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.2)',
              borderRadius: 4,
              padding: 6
            }}
          >
            <InternalLink href={url}>{alertCTA}</InternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
