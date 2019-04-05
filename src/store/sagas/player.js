import {
  call, put, select, take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import TrackPlayer from 'react-native-track-player';

import PlayerActions from '~/store/ducks/player';

// TRACKPLAYER WATCHER EVENT
// --- Track Changed
export function* trackChanged() {
  const channel = eventChannel((emitter) => {
    const onTrackChange = TrackPlayer.addEventListener('playback-track-changed', emitter);

    return () => onTrackChange.remove();
  });

  try {
    while (true) {
      const { nextTrack } = yield take(channel);

      yield put(PlayerActions.setCurrent(nextTrack));
    }
  } finally {
    channel.close();
  }
}

// SAGAS CALLBACKS
// --- Init Player
export function* init() {
  yield call(TrackPlayer.setupPlayer); // Setup the Player

  TrackPlayer.updateOptions({
    capabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_SKIP_TO_STOP,
    ],
    notificationCapabilities: [
      TrackPlayer.CAPABILITY_PLAY,
      TrackPlayer.CAPABILITY_PAUSE,
      TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
      TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      TrackPlayer.CAPABILITY_SKIP_TO_STOP,
    ],
    compactCapabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
  });

  TrackPlayer.addEventListener('playback-state', () => ({}));
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
  yield call(trackChanged);
}

// --- Play
export function* play() {
  yield call(TrackPlayer.play);
}

// --- Pause
export function* pause() {
  yield call(TrackPlayer.pause);
}

// --- Prev
export function* prev() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(episode => episode.id === player.current);

  // Checks if there is a previous episode
  if (player.podcast.tracks[currentIndex - 1]) {
    yield call(TrackPlayer.skipToPrevious);

    // If the player is paused
    yield put(PlayerActions.play());
  }
}

// --- Next
export function* next() {
  const player = yield select(state => state.player);
  const currentIndex = player.podcast.tracks.findIndex(episode => episode.id === player.current);

  // Checks if there is a next episode
  if (player.podcast.tracks[currentIndex + 1]) {
    yield call(TrackPlayer.skipToNext);

    // If the player is paused
    yield put(PlayerActions.play());
  }
}

// --- Reset
export function* reset() {
  yield call(TrackPlayer.stop);
  yield call(TrackPlayer.reset);
}
