import { access, writeFile } from 'node:fs/promises';

const awsExports = new URL('../src/aws-exports.js', import.meta.url);

try {
  await access(awsExports);
} catch (error) {
  // file does not exist, create it
  await writeFile(
    awsExports,
    `const awsmobile = {};\nexport default awsmobile;\n`
  );
}
