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
    const result = getPageSection('/[platform]/frontend/server-side-rendering');
    expect(result.section).toBe('frontend');
  });

  it('returns frontend featureRoute for backend auth pages', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/auth/set-up-auth'
    );
    expect(result.featureRoute).toBe('/[platform]/frontend/auth');
  });

  it('returns backend featureRoute for frontend auth pages', () => {
    const result = getPageSection('/[platform]/frontend/auth/sign-in');
    expect(result.featureRoute).toBe('/[platform]/build-a-backend/auth');
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

  it('returns backend add-aws-services featureRoute for frontend analytics pages', () => {
    const result = getPageSection(
      '/[platform]/frontend/analytics/record-events'
    );
    expect(result.featureRoute).toBe(
      '/[platform]/build-a-backend/add-aws-services/analytics'
    );
  });

  it('returns deep backend featureRoute for frontend kinesis page', () => {
    const result = getPageSection('/[platform]/frontend/analytics/kinesis');
    expect(result.featureRoute).toBe(
      '/[platform]/build-a-backend/add-aws-services/analytics/kinesis'
    );
  });

  it('returns frontend featureRoute for backend add-aws-services analytics page', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/add-aws-services/analytics/set-up-analytics'
    );
    expect(result.featureRoute).toBe('/[platform]/frontend/analytics');
  });

  it('returns backend featureRoute for frontend geo page', () => {
    const result = getPageSection('/[platform]/frontend/geo/maps');
    expect(result.featureRoute).toBe(
      '/[platform]/build-a-backend/add-aws-services/geo'
    );
  });

  it('returns frontend featureRoute for backend geo page', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/add-aws-services/geo/set-up-geo'
    );
    expect(result.featureRoute).toBe('/[platform]/frontend/geo');
  });

  it('returns frontend featureRoute for backend storage page', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/storage/set-up-storage'
    );
    expect(result.featureRoute).toBe('/[platform]/frontend/storage');
  });

  it('returns backend featureRoute for frontend storage page', () => {
    const result = getPageSection('/[platform]/frontend/storage/upload-files');
    expect(result.featureRoute).toBe('/[platform]/build-a-backend/storage');
  });

  it('returns undefined featureRoute for pages with no cross-section match', () => {
    const result = getPageSection(
      '/[platform]/build-a-backend/functions/set-up-function'
    );
    expect(result.featureRoute).toBeUndefined();
  });

  it('returns undefined featureRoute for Gen1 pages', () => {
    const result = getPageSection(
      '/gen1/[platform]/build-a-backend/auth/set-up-auth'
    );
    expect(result.featureRoute).toBeUndefined();
  });
});
