import { call, put, select } from 'redux-saga/effects';
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
  const currentPodcast = yield select(state => state.player.podcast);

  // - There is nothing playing yet;
  // - or The Podcast playing is different from what was requested to play:
  if (!currentPodcast || action.podcast.id !== currentPodcast.id) {
    yield call(TrackPlayer.stop);
    yield call(TrackPlayer.reset);

    yield call(TrackPlayer.add, [...action.podcast.tracks]);

    yield put(PlayerActions.setPodcastSuc(action.podcast));
  }

  // - Changing the item of the Podcast:
  if (action.episodeId) {
    yield call(TrackPlayer.skip, action.episodeId);

    yield put(PlayerActions.setCurrent(action.episodeId));
  }

  yield put(PlayerActions.play());
}

// --- Play
export function* play() {
  yield call(TrackPlayer.play);
}

// --- Pause
export function* pause() {
  yield call(TrackPlayer.pause);
}
