import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/**
 * Types
 */
export const INITIALIZE_DIALOG = 'INITIALIZE_DIALOG';
export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const SET_DIALOG_DATA = 'SET_DIALOG_DATA';

/**
 * Actions
 */
export const initializeDialog = createAction(INITIALIZE_DIALOG);
export const openDialog = createAction(OPEN_DIALOG);
export const closeDialog = createAction(CLOSE_DIALOG);
export const setDialogData = createAction(SET_DIALOG_DATA);

/**
 * Selectors
 */
export const getDialogStates = (state, props, dialogName) =>
  state.getIn(
    ['dialogs', dialogName],
    Map({
      isOpen: false
    })
  );

/**
 * Reducer
 */
export const reducer = handleActions(
  {
    [INITIALIZE_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.set(
          action.payload,
          Map({
            isOpen: false
          })
        );
      }
      return state;
    },
    [OPEN_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], true);
      }
      return state;
    },
    [CLOSE_DIALOG]: (state, action) => {
      if (action.payload) {
        return state.setIn([action.payload, 'isOpen'], false);
      }
      return state;
    },
    [SET_DIALOG_DATA]: (state, action) => {
      if (action.payload) {
        const { name, ...other } = action.payload;
        return state.update(name, el => el.merge(other));
      }
      return state;
    }
  },
  Map()
);
