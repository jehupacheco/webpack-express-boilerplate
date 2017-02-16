import path from 'path';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appHtml: resolveApp('app/index.tpl.html'),
  appMainJs: resolveApp('app/main.js'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('app'),
  appComponents: resolveApp('app/components'),
  appReducers: resolveApp('app/reducers'),
  appNodeModules: resolveApp('node_modules'),
  dist: resolveApp('dist'),
  ownNodeModules: resolveApp('node_modules'),
};
