import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * ACTION TYPES and CREATORS
 */
const { Types, Creators } = createActions({
  setPodcastReq: ['podcast', 'episodeId'],
  setPodcastSuc: ['podcast'],
  setCurrent: ['id'],
});
export const PlayerTypes = Types;
export default Creators;

/**
 * INITIAL STATE
 */
export const INITIAL_STATE = Immutable({
  podcast: null,
  current: null,
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
});
