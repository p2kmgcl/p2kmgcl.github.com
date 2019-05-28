const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const outputPath = 'build';

mkdirp.sync(outputPath);

/**
 * @param {object} pkg
 * @param {string} pkg.title
 * @param {object} pkg.config
 * @param {object} pkg.config.favicon
 * @param {number[]} pkg.config.favicon.manifest
 * @param {string} pkg.config.backgroundColor
 * @param {string} pkg.config.themeColor
 */
module.exports = (pkg) => {
  const manifest = {
    name: pkg.title,
    short_name: pkg.title,

    scope: '/',
    start_url: '/',
    display: 'standalone',

    background_color: pkg.config.backgroundColor,
    theme_color: pkg.config.themeColor,

    icons: pkg.config.favicon.manifest.map((iconSize) => ({
      src: `/favicon/${iconSize}x${iconSize}.png`,
      sizes: `${iconSize}x${iconSize}`,
      type: 'image/png',
    })),
  };

  fs.writeFileSync(
    path.join('build', 'manifest.json'),
    JSON.stringify(manifest),
    'utf-8',
  );

  return '/manifest.json';
};
