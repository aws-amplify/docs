import {
  getSectionFromPath,
  getDefaultPathForSection,
  SECTIONS,
  SectionKey
} from '../sections';

describe('getSectionFromPath', () => {
  it('returns quickstart for /start/ paths', () => {
    expect(getSectionFromPath('/react/start/quickstart/')).toBe('quickstart');
  });

  it('returns quickstart for /how-amplify-works/ paths', () => {
    expect(getSectionFromPath('/react/how-amplify-works/concepts/')).toBe(
      'quickstart'
    );
  });

  it('returns backend for /build-a-backend/ paths', () => {
    expect(getSectionFromPath('/react/build-a-backend/auth/set-up-auth/')).toBe(
      'backend'
    );
  });

  it('returns frontend for /frontend/ paths', () => {
    expect(getSectionFromPath('/react/frontend/')).toBe('frontend');
  });

  it('returns frontend for /build-ui/ paths', () => {
    expect(getSectionFromPath('/react/build-ui/')).toBe('frontend');
  });

  it('returns frontend for /ai/ paths', () => {
    expect(getSectionFromPath('/react/ai/')).toBe('frontend');
  });

  it('returns hosting for /deploy-and-host/ paths', () => {
    expect(getSectionFromPath('/react/deploy-and-host/')).toBe('hosting');
  });

  it('returns reference for /reference/ paths', () => {
    expect(getSectionFromPath('/react/reference/')).toBe('reference');
  });

  it('returns undefined for Gen1 paths', () => {
    expect(getSectionFromPath('/gen1/react/build-a-backend/')).toBeUndefined();
  });

  it('returns undefined for home page', () => {
    expect(getSectionFromPath('/')).toBeUndefined();
  });
});

describe('getDefaultPathForSection', () => {
  it('returns quickstart path', () => {
    expect(getDefaultPathForSection('quickstart', 'react')).toBe(
      '/react/start/quickstart/'
    );
  });

  it('returns backend path', () => {
    expect(getDefaultPathForSection('backend', 'react')).toBe(
      '/react/build-a-backend/'
    );
  });

  it('returns frontend path', () => {
    expect(getDefaultPathForSection('frontend', 'react')).toBe(
      '/react/frontend/'
    );
  });

  it('returns hosting path', () => {
    expect(getDefaultPathForSection('hosting', 'vue')).toBe(
      '/vue/deploy-and-host/'
    );
  });

  it('returns reference path', () => {
    expect(getDefaultPathForSection('reference', 'swift')).toBe(
      '/swift/reference/'
    );
  });
});

describe('SECTIONS config', () => {
  it('has all 5 sections defined', () => {
    const keys = Object.keys(SECTIONS) as SectionKey[];
    expect(keys).toEqual([
      'quickstart',
      'backend',
      'frontend',
      'hosting',
      'reference'
    ]);
  });

  it('backend has subtitle', () => {
    expect(SECTIONS.backend.subtitle).toBe('What runs on AWS');
  });

  it('frontend has subtitle', () => {
    expect(SECTIONS.frontend.subtitle).toBe('What runs in your app');
  });
});
