/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 *
 * References:
 *   https://github.com/Carimus/metro-symlinked-deps
 */

const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');
const { applyConfigForLinkedDependencies } = require('@carimus/metro-symlinked-deps');

function getConfig(appDir) {
  // subprojects managed within workspace:
  const workspaces = getWorkspaces(appDir);

  /*
    [Metro docs](https://github.com/facebook/metro/blob/6dae16318c369f2b4b1be7d9649506e00ffffa72/docs/Configuration.md#watchfolders)

    watchFolders are added to the JestHasteMap as `roots`:
      https://github.com/facebook/metro/blob/af23a1b27bcaaff2e43cb795744b003e145e78dd/packages/metro/src/node-haste/DependencyGraph.js#L135
   */
  const watchFolders = [
    // the workspace's node_modules; note that you must know that the root is
    // two directories up.
    //
    // this allows you to use peer dependencies (like 'react-native-fs') from
    // within libraries (like 'core-init-react-native') [, which is odd.]
    path.resolve(appDir, '../..', 'node_modules'),
    // add other packages in workspace as well; this allows us to import these
    // packages and use them via symlinks to our local version of them in
    // development
    ...workspaces.filter(
      workspaceDir => workspaceDir !== appDir,
    ),
  ];

  const projectConfig = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    /* <save-for-later>

      The resolver.extraNodeModules option says, 'in addition to the
      node_modules relative to this project directory (appDir/node_modules),
      here are some more node_modules to use.
        -- https://facebook.github.io/metro/docs/configuration/#extranodemodules

      This is done automatically by `applyConfigForLinkedDependencies` for us
      whenever `resolveNodeModulesAtRoot: true` (it is false by default).

        -- https://github.com/Carimus/metro-symlinked-deps/blob/master/index.js#L331-L336
          -> https://github.com/Carimus/metro-symlinked-deps/blob/656658961517edda8349c656f408cb681ea66da3/index.js#L196

      I'm keeping the commented-out configuration here, however, because we may
      need to tweak extraNodeModules as we develop libraries that are using
      react-native, as described in this article (section 3.)
        https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906
        ^
        |
      This author combined 'blacklistRE' and 'resolver.extraNodeModules' to
      exclude various dependencies from being bundled, and then manually added
      them in as extraNodeModules.  His example is taken and used here.

      This doesn't seem to be necessary:  we can alternatively use the
      `applyConfigForLinkedDependencies` option `blacklistLinkedModules:
      ['react-native']` to blacklist any 'react-native' package imported from
      within a package 'my-lib` and, whenever it is imported from within that
      'my-lib', use the `resolveNodeModulesAtRoot` proxy (linked above) to
      resolve '{appDir}/node_modules/react-native' instead of
      'my-lib/node_modules/react-native'.

      ...but metro bundler appears to still work just fine when I remove the
      `blacklistLinkedModules` option below.  so honestly I don't know what's
      going on.
     */

    // resolver: {
    //   Resolve these module imports to the locally-installed version
    //   extraNodeModules: {
    //     'react-native': path.resolve(appDir, 'node_modules', 'react-native'),
    //     'react-native-svg': path.resolve(appDir, 'node_modules', 'react-native-svg'),
    //     'core-js': path.resolve(appDir, 'node_modules', 'core-js'),
    //   },
    // },

    /* </save-for-later> */
  }

  return applyConfigForLinkedDependencies(
    projectConfig,
    {
      projectRoot: __dirname,
      blacklistLinkedModules: ['react-native'],
      additionalWatchFolders: watchFolders,
      resolveNodeModulesAtRoot: true,
      debug: true,
    },
  )
}

module.exports = getConfig(__dirname);
