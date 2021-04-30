/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import { init } from './src/init'
import { globalize } from '@calebgregory/core'

const app = init()
globalize(app)

AppRegistry.registerComponent(appName, () => App);
