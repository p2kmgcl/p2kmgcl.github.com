/** @type {any} */
const PuppeteerEnvironment = require('jest-environment-puppeteer');
const childProcess = require('child_process');
const { createServer } = require('http-server');
const { PORT } = require('./jest-constants');

/**
 * @type {any}
 */
let httpServer;

class CustomEnvironment extends PuppeteerEnvironment {
  async setup() {
    console.log('Setting up puppeteer...');
    await super.setup();

    await new Promise((resolve, reject) => {
      console.log('Building app...');
      childProcess.exec('npm run build', (error) => {
        if (error) reject(error);
        else resolve();
      });
    }).then(
      () =>
        new Promise((resolve) => {
          console.log('Creating server...\n');
          httpServer = createServer({ root: './build' });
          httpServer.listen(PORT, () => resolve());
        }),
    );
  }

  async teardown() {
    console.log('\nClosing puppeteer...');
    await super.teardown();
    console.log('Closing server...');
    await httpServer.close();
  }
}

module.exports = CustomEnvironment;
