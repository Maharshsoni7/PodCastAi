/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import { Text, TextInput } from 'react-native';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
} from 'react-native-reanimated';

// Configure reanimated logger
configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
});

// Disable font scaling globally
if (Text.defaultProps == null) {
    Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) {
    TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;

AppRegistry.registerComponent(appName, () => App);
