import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * ACTION TYPES and CREATORS
 */
const { Types, Creators } = createActions({
  setPodcastReq: ['podcast', 'episodeId'],
  setPodcastSuc: ['podcast'],
  setCurrent: ['id'],
  play: null,
  pause: null,
  prev: null,
  next: null,
});
export const PlayerTypes = Types;
export default Creators;

/**
 * INITIAL STATE
 */
export const INITIAL_STATE = Immutable({
  podcast: null,
  current: null,
  playing: false,
});
// The Immutable function has some methods,
// like 'merge', that is used below, inside
// the Reducer.

/**
 * REDUCER
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PODCAST_SUC]: (state, { podcast }) => state.merge({ podcast, current: podcast.tracks[0].id }),
  [Types.SET_CURRENT]: (state, { id }) => state.merge({ current: id }),
  // Below: It doesn't wait for Saga.
  // It sets to true at the same time Saga controls the TrackPlayer.
  [Types.PLAY]: state => state.merge({ playing: true }),
  // Below: It doesn't wait for Saga.
  // It sets to false at the same time Saga controls the TrackPlayer.
  [Types.PAUSE]: state => state.merge({ playing: false }),
});
