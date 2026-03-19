import { getPageSection } from '../getPageSection';

describe('getPageSection', () => {
  it('returns backend for a backend-tagged page', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/auth/set-up-auth'
    );
    expect(result.section).toBe('backend');
  });

  it('returns frontend for a frontend-tagged page', () => {
    const result = getPageSection('/[platform]/frontend/auth');
    expect(result.section).toBe('frontend');
  });

  it('returns frontend for a deeply nested frontend page', () => {
    const result = getPageSection('/[platform]/frontend/auth/sign-in');
    expect(result.section).toBe('frontend');
  });

  it('returns backend for auth (now backend-only)', () => {
    const result = getPageSection('/[platform]/build-a-backend/auth');
    expect(result.section).toBe('backend');
  });

  it('returns quickstart for start pages', () => {
    const result = getPageSection('/[platform]/start');
    expect(result.section).toBe('quickstart');
  });

  it('returns hosting for deploy pages', () => {
    const result = getPageSection('/[platform]/deploy-and-host');
    expect(result.section).toBe('hosting');
  });

  it('returns backend for functions pages', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/functions/set-up-function'
    );
    expect(result.section).toBe('backend');
  });

  it('returns frontend for SSR pages at new path', () => {
    const result = getPageSection(
      '/[platform]/frontend/server-side-rendering'
    );
    expect(result.section).toBe('frontend');
  });

  it('returns frontend featureRoute for backend auth pages', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/auth/set-up-auth'
    );
    expect(result.featureRoute).toBe('/[platform]/frontend/auth');
  });

  it('returns frontend featureRoute for deeply nested backend pages', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/data/data-modeling/add-fields'
    );
    expect(result.featureRoute).toBe('/[platform]/frontend/data');
  });

  it('returns undefined featureRoute for top-level pages', () => {
    const result = getPageSection('/[platform]/start/quickstart');
    expect(result.featureRoute).toBeUndefined();
  });

  it('returns undefined section for Gen1 pages', () => {
    const result = getPageSection('/gen1/[platform]/build-a-backend/auth');
    expect(result.section).toBeUndefined();
  });
});
