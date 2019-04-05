import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/**
 * ACTION TYPES and CREATORS
 */
const { Types, Creators } = createActions({
  loadRequest: null,
  loadSuccess: ['data'],
  loadFailure: null,
});
export const PodcastTypes = Types;
export default Creators;

/**
 * INITIAL STATE
 */
export const INITIAL_STATE = Immutable({
  data: [],
});
// The Immutable function has some methods,
// like 'merge', that is used below, inside
// the Reducer.

/**
 * REDUCER
 */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOAD_SUCCESS]: (state, { data }) => state.merge({ data }),
});
