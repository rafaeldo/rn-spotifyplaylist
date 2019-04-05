import { call, put } from 'redux-saga/effects';
import TrackPlayer from 'react-native-track-player';

import PlayerActions from '~/store/ducks/player';

// SAGAS CALLBACKS
// --- Init Player
export function* init() {
  yield call(TrackPlayer.setupPlayer); // Setup the Player

  TrackPlayer.addEventListener('playback-track-changed', console.tron.log);
  TrackPlayer.addEventListener('playback-state', console.tron.log);
}

// --- Set Podcast
export function* setPodcast(action) {
  yield call(TrackPlayer.add, [...action.podcast.tracks]);

  yield put(PlayerActions.setPodcastSuc(action.podcast));
}
