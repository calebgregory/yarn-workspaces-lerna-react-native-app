# monorepo-like react-native project presentation

2021-05-04

## rush

- [their website](https://rushjs.io/)

### rush <> react-native woes

```txt
% rushx start
# ...
error: Error: Unable to resolve module react-native from /Volumes/Workspace/rush-stack-react-native-app/apps/ReactNativeApp/index.js: react-native could not be found within the project or in these directories:
  node_modules
  ../../../node_modules
```

[pnpm organizes node_modules differently than yarn](https://pnpm.io/symlinked-node-modules-structure); rush uses a similar organization scheme, regardless of package manager used.

```txt
% pwd
/Volumes/Workspace/rush-stack-react-native-app

% ls -la ./apps/ReactNativeApp/node_modules | grep 'react-native'
lrwxr-xr-x   1 calebgregory  admin   98 May  4 07:31 react-native -> ../../../common/temp/node_modules/.pnpm/react-native@0.64.0_react@17.0.1/node_modules/react-native
```

metro bundler [does not support symlinks](https://github.com/facebook/metro/issues/1) out of the box...

i wound up abandoning pursuit in using rush :/

## yarn workspaces

people have had success creating monorepos with react-native projects in them using [yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

- [1](https://medium.com/@huntie/a-concise-guide-to-configuring-react-native-with-yarn-workspaces-d7efa71b6906)
- [2](https://medium.com/@ratebseirawan/react-native-0-63-monorepo-walkthrough-36ea27d95e26)

yarn workspaces work because they allow you to [opt out of node_module hoisting](../apps/ReactNativeApp/package.json#L14).  this prevents `react-native` from being hoisted to some other directory than your RN App's root directory.  i think, practically speaking, this is required (funnily enough) because projects created using `react-native`'s project bootstrapper depend on phantom `node_modules` to function:

```txt
% yarn react-native run-android
yarn run v1.22.4
$ /Volumes/Workspace/yarn-workspaces-lerna-react-native-app/node_modules/.bin/react-native run-android
info Running jetifier to migrate libraries to AndroidX. You can disable it using "--no-jetifier" flag.
Jetifier found 0 file(s) to forward-jetify. Using 16 workers...
info JS server already running.
info Installing the app...

FAILURE: Build failed with an exception.

* Where:
Settings file '/Volumes/Workspace/yarn-workspaces-lerna-react-native-app/apps/ReactNativeApp/android/settings.gradle' line: 2

* What went wrong:
A problem occurred evaluating settings 'ReactNativeApp'.
> Could not read script '/Volumes/Workspace/yarn-workspaces-lerna-react-native-app/apps/ReactNativeApp/node_modules/@react-native-community/cli-platform-android/native_modules.gradle' as it does not exist.
```

there are alternative solutions to this problem (declaring the phantom dependency explicitly, or modifying the Gradle file to look for the dependency in the project root's `node_modules`).  maybe someday we'll do one of those.

### additional configuration in metro.config.js required

using [this wrapper around the metro bundler](https://github.com/Carimus/metro-symlinked-deps).

adding the project root's `node_modules` and the other subprojects to `watchFolders`.
