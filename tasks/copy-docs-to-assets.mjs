import { copyFile, mkdir } from 'node:fs/promises';
import { dirname } from 'path'
import flatDirectory from '../src/directory/flatDirectory.json' with { type: 'json' };

const ASSET_FOLDER = 'public/docs'

const main = async () => {
  const downloadPages = Object.values(flatDirectory).filter(value => {
    return value.aiDownload;
  });
  for await (const { path } of downloadPages) {
    const targetFile = `${ASSET_FOLDER}/${path.replace('src/pages/', '')}`;
    const targetDir = dirname(targetFile)
    await mkdir(targetDir, { recursive: true });
    await copyFile(path, targetFile);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1)
})
