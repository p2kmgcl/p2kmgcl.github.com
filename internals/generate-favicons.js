const mkdirp = require('mkdirp');
const path = require('path');
const sharp = require('sharp');
const favicon = path.join('templates', 'favicon.png');
const outputPath = path.join('build', 'favicon');

mkdirp.sync(outputPath);

/**
 * @param {string} size
 * @return {string}
 */
const getFaviconName = (size) => `${size}x${size}.png`;

/**
 * @param {object} pkg
 * @param {object} pkg.config
 * @param {object} pkg.config.favicon
 * @param {number} pkg.config.favicon.default
 * @param {number[]} pkg.config.favicon.manifest
 * @param {number[]} pkg.config.favicon.icon
 * @param {number[]} pkg.config.favicon.appleTouchIcon
 * @param {number[]} pkg.config.favicon.msapplication
 */
const generateFavicons = (pkg) => {
  /**
   * @type {number[]}
   */
  const sizes = Array.from(
    new Set(
      [pkg.config.favicon.default]
        .concat(pkg.config.favicon.manifest)
        .concat(pkg.config.favicon.icon)
        .concat(pkg.config.favicon.appleTouchIcon)
        .concat(pkg.config.favicon.msapplication),
    ),
  );

  sizes.forEach((size) =>
    sharp(favicon)
      .resize(size)
      .toFile(path.join(outputPath, getFaviconName(size.toString()))),
  );

  return sizes.map((size) => `/favicon/${getFaviconName(size.toString())}`);
};

module.exports = generateFavicons;
