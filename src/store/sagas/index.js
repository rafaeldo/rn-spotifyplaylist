import { all, takeLatest } from 'redux-saga/effects';

import { PodcastsTypes } from '~/store/ducks/podcasts';

// CALLBACKS (async)
import { load as LoadPodcasts } from './podcasts';
//

// SAGA CONFIG
export default function* rootSaga() {
  return yield all([takeLatest(PodcastsTypes.LOAD_REQUEST, LoadPodcasts)]);
}
