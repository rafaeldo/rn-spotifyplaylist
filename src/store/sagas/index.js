import { all, takeLatest } from 'redux-saga/effects';

import { PodcastsTypes } from '~/store/ducks/podcasts';
import { PlayerTypes } from '~/store/ducks/player';

// CALLBACKS (async)
import { load as loadPodcasts } from './podcasts';
import {
  init as initPlayer, setPodcast, play, pause, prev, next,
} from './player';
//

// SAGA CONFIG
export default function* rootSaga() {
  return yield all([
    initPlayer(),
    takeLatest(PodcastsTypes.LOAD_REQUEST, loadPodcasts),
    takeLatest(PlayerTypes.SET_PODCAST_REQ, setPodcast),
    takeLatest(PlayerTypes.PLAY, play),
    takeLatest(PlayerTypes.PAUSE, pause),
    takeLatest(PlayerTypes.PREV, prev),
    takeLatest(PlayerTypes.NEXT, next),
  ]);
}
