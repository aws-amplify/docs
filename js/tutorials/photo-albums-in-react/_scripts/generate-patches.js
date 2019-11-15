#!/usr/bin/env node

const execa = require('execa');
const deleteEmpty = require('delete-empty');
const fs = require('fs');
const globby = require('globby');
const path = require('path');

const [, , srcDir] = process.argv;

if (!srcDir) {
  throw new Error(
    `Missing source directory argument\nUsage:./generate-scripts.js path/to/the/sample`
  );
}

if (!fs.existsSync(srcDir)) {
  throw new Error(`${srcDir} does not exist`);
}

const relative = (dir, cwd = process.cwd()) => dir.replace(cwd + '/', '');

const ignore = [
  '**/#current-cloud-backend',
  '**/build',
  '**/node_modules',
  '**.test.js',
  'aws-exports.js',
  'serviceWorker.js'
];
const onlyFiles = true;
const patchDir = path.resolve(__dirname, '../_patches');

const patchFiles = globby.sync('**.patch', {
  cwd: patchDir
});

if (patchFiles.length) {
  console.info(`Cleaning up ${patchFiles.length} .patch files...`);

  patchFiles.forEach(patchFile =>
    fs.unlinkSync(path.resolve(patchDir, patchFile))
  );
}

console.info(`Cleaning up ${relative(patchDir)}...`);
deleteEmpty.sync(patchDir);

const masterFiles = globby.sync(
  ['**/*.js', '**/package.json', '**/schema.graphql'],
  {
    cwd: srcDir,
    ignore,
    onlyFiles
  }
);

masterFiles.map(async masterFile => {
  const masterPath = path.resolve(srcDir, masterFile);
  const stepFiles = globby.sync(`${masterFile}/*.*`, {
    cwd: patchDir,
    ignore,
    onlyFiles
  });

  if (!stepFiles.length) {
    console.warn(
      `Expected step files in ${relative(patchDir)}/${masterFile}/*`
    );

    return;
  }

  let previousPath = '/dev/null';

  for (const stepFile of stepFiles) {
    const nextPath = path.resolve(patchDir, stepFile);
    const patchFile = path.resolve(`${nextPath}.patch`);

    const subprocess = await execa('git', [
      'diff',
      '--exit-code', // Disable pagination
      '--no-index', // Ignore any git history & just compare files
      `--relative="${srcDir}"`, // If the paths can be shortened, do so
      previousPath,
      nextPath
    ]).catch(error => error);

    const [, , , a, b, ...lines] = subprocess.stdout.split('\n');
    const diff = [a, b.replace(process.cwd(), ''), ...lines].join('\n');

    fs.mkdirSync(path.dirname(patchFile), { recursive: true });
    fs.writeFileSync(patchFile, diff, 'utf8');
    console.info('Created', relative(patchFile));

    previousPath = nextPath;
  }

  try {
    await execa('git', ['diff', '--exit-code', previousPath, masterPath], {
      stdio: 'inherit'
    });
  } catch (error) {
    console.error(
      new Error(
        `${relative(previousPath)} doesn't match ${relative(masterPath)}`
      )
    );
    process.exit(error.exitCode);
  }
});
