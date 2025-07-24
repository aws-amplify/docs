import { getMetaStringObj } from '../getMetaStringObj.mjs';

describe('getMetaStringObj', () => {
  it('should return meta object for a valid page file path with valid meta object', async () => {
    const filePath = './src/directory/__tests__/helpers/valid-meta.mdx';
    const expectedMetaObject = {
      title: 'Build & connect backend',
      description:
        'Learn more about how you can build the backend for your app or connect with existing resources.',
      platforms: [
        'android',
        'angular',
        'flutter',
        'javascript',
        'nextjs',
        'react',
        'react-native',
        'swift',
        'vue'
      ],
      route: '/[platform]/build-a-backend',
      canonicalObjects: [
        {
          platforms: ['vue', 'javascript', 'react', 'angular', 'nextjs'],
          canonicalPath: '/javascript/build-a-backend/'
        }
      ]
    };

    const results = await getMetaStringObj(filePath);

    expect(results).toEqual(expectedMetaObject);
  });

  it('should throw an error for page with missing meta object', async () => {
    const filePath = './src/directory/__tests__/helpers/missing-meta.mdx';

    expect(async () => {
      await getMetaStringObj(filePath);
    }).rejects.toThrow();
  });

  it('should throw an error for page with invalid meta object', async () => {
    const filePath = './src/directory/__tests__/helpers/missing-semicolon.mdx';

    expect(async () => {
      await getMetaStringObj(filePath);
    }).rejects.toThrow();
  });

  it('should throw an error for page that does not exist', async () => {
    const filePath = './src/directory/__tests__/helpers/missing-page.mdx';

    expect(async () => {
      await getMetaStringObj(filePath);
    }).rejects.toThrow();
  });
});
