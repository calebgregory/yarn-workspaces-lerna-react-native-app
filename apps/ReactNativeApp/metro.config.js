/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 *
 * References:
 *
 * https://github.com/Carimus/metro-symlinked-deps
 * https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906
 */

const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');
const { applyConfigForLinkedDependencies } = require('@carimus/metro-symlinked-deps');

function getConfig(appDir) {
  const workspaces = getWorkspaces(appDir);

  const watchFolders = [
    path.resolve(appDir, '../..', 'node_modules'),
    ...workspaces.filter(
      workspaceDir => !(workspaceDir === appDir),
    ),
  ];

  const projectConfig = {
    watchFolders,
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      // Resolve these module imports to the locally-installed version
      extraNodeModules: {
        'react-native': path.resolve(appDir, 'node_modules', 'react-native'),
        'core-js': path.resolve(appDir, 'node_modules', 'core-js'),
      },
    },
  }

  return applyConfigForLinkedDependencies(
    projectConfig,
    {
      projectRoot: __dirname,
      blacklistLinkedModules: ['react-native'],
    },
  )
}

module.exports = getConfig(__dirname);
