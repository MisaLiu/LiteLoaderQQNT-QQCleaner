import spawn from 'cross-spawn';
import { resolve } from 'path';
import fs from 'fs';

const __dirname = resolve((import.meta.dirname || ''), '../'); // Workaround

const SpawnConfig = {
  shell: true,
  stdio: 'inherit',
  cwd: __dirname,
};

const deleteDir = (path, isTopLevel = true) => {
  if (!fs.existsSync(path)) return;
  const files = fs.readdirSync(path);
  files.forEach(file => {
    const filePath = resolve(path, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) deleteDir(filePath, false);
    else fs.unlinkSync(filePath);
  });
  if (!isTopLevel) fs.rmdirSync(path);
}

// Delete `/dist`
deleteDir(resolve(__dirname, './dist'));

// Build `main.js` and `preload.js`
spawn.sync('npx', [
  'electron-vite', 'build',
  '--config', 'config/electron.vite.config.ts'
], SpawnConfig);
// Build `renderer.js`
spawn.sync('npx', [
  'vite', 'build',
  '--config', 'config/vite.renderer.config.ts'
], SpawnConfig);

// Extract `main.js` and `preload.js` from dir
fs.copyFileSync(resolve(__dirname, './dist/main/index.js'), resolve(__dirname, './dist/main.js'));
fs.copyFileSync(resolve(__dirname, './dist/preload/index.js'), resolve(__dirname, './dist/preload.js'));

fs.unlinkSync(resolve(__dirname, './dist/main/index.js'));
fs.unlinkSync(resolve(__dirname, './dist/preload/index.js'));

fs.rmdirSync(resolve(__dirname, './dist/main'));
fs.rmdirSync(resolve(__dirname, './dist/preload'));

// Minify `renderer.js` via uglifyJS
spawn.sync('npx', [
  'uglifyjs', './dist/renderer.js',
  '--output', './dist/renderer.js'
], SpawnConfig);

// Generate `manifest.json`
const PackageInfo = JSON.parse(fs.readFileSync(resolve(__dirname, './package.json'), 'utf8'));
const { liteloader_manifest: PackageManifest } = PackageInfo;

const PluginManifest = {
  manifest_version: 4,

  type: PackageManifest.type,
  name: PackageManifest.name,
  slug: PackageManifest.slug,
  description: PackageInfo.description,
  version: PackageInfo.version,
  icon: PackageManifest.icon,
  authors: [],

  platform: PackageManifest.platform,
  injects: PackageManifest.injects,

  repository: PackageManifest.repository,
};

PluginManifest.authors.push({
  name: typeof PackageInfo.author === 'object' ? PackageInfo.author.name : PackageInfo.author,
  link: typeof PackageInfo.author === 'object' ? PackageInfo.author.url : 'https://github.com/ghost',
});

if (!!PackageInfo.contributors && PackageInfo.contributors.length > 0) {
  for (const contributor of PackageInfo.contributors) {
    PluginManifest.authors.push({
      name: typeof contributor === 'object' ? contributor.name : contributor,
      link: typeof contributor === 'object' ? contributor.url : 'https://github.com/ghost',
    })
  }
}

if (!!PluginManifest.repository.release) {
  PluginManifest.repository.release.tag = PackageInfo.version;
}

fs.writeFileSync(resolve(__dirname, './dist/manifest.json'), JSON.stringify(PluginManifest, null, 2), { encoding: 'utf8' });
