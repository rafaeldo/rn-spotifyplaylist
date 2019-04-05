import './src/config/ReactotronConfig';
import './src/config/DevtoolsConfig';

// TRACKPLAYER CONFIG
import TrackPlayer from 'react-native-track-player';
import player from '~/services/player';
//

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

// TRACKPLAYER CONFIG (cont.)
// Explanation: to be able to dispatch actions to the Store,
// even when the commands to the TrackPlayer comes from outside the app,
// like when the user is commanding the app via the Notifications, Control Center, etc.
TrackPlayer.registerPlaybackService(() => player);
//
