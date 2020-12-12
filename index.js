/**
 * @format
 */

import {AppRegistry, Text} from 'react-native';
import {name as appName} from './app.json';
import Search from './src/search'

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => Search);
