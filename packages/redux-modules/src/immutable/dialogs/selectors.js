import { Map } from 'immutable';

export const getDialogStates = (state, props, dialogName) =>
  state.getIn(
    ['dialogs', dialogName],
    Map({
      isOpen: false
    })
  );
