const { join } = require('path');
const glob = require('glob');
const { fork } = require('child_process');

async function build({ cwd }) {
  return new Promise((resolve, reject) => {
    const env = {
      COMPRESS: 'none',
      PROGRESS: 'none',
      COVERAGE: 1,
      UMI_UI: 'none',
    };
    const BUILD_SCRIPT = join(process.cwd(), 'node_modules', 'umi', 'bin', 'umi.js');
    const child = fork(BUILD_SCRIPT, ['build'], {
      cwd,
      env,
    });
    child.on('exit', code => {
      if (code === 1) {
        reject(new Error('Build failed'));
        process.exit(code);
      } else {
        resolve();
      }
    });
  });
}

(async () => {
  const fixtures = glob.sync('packages/*/test/fixtures/*', {
    cwd: process.cwd(),
    dot: false,
  });
  const executors = fixtures.map(dir => build({ cwd: dir }));
  let p = Promise.resolve();
  executors.forEach(executor => {
    p = p.then(executor).catch(e => {
      console.error('executor error', e);
    });
  });
})();
